import { dbd } from "./dexie";
import { goto } from "$app/navigation";

class SidenavAction {
  data = $state([]); // Complete tree (always preserved)
  displayData = $state([]); // What's currently shown in UI
  selectedId = $state(null);
  focusedPath = $state([]);
  lastOpenedDoc = $state(null); // Track last opened document

  constructor() {
    this.initializeDB();
  }

  // Initialize and load data
  async initializeDB() {
    try {
      await dbd.open(); // Explicitly open the database
      await this.loadFromDB();

      // Navigate to last opened document if it exists
      if (this.lastOpenedDoc) {
        await this.navigateToLastOpened();
      }
    } catch (error) {
      console.error("Failed to initialize DB:", error);
      // Set default data if DB fails
      this.setDefaultData();
    }
  }

  setDefaultData() {
    this.data = [
      {
        id: crypto.randomUUID(),
        name: "Documents",
        type: "folder",
        expanded: true,
        children: [],
      },
    ];
    this.displayData = this.data; // Initialize display data
  }

  async loadFromDB() {
    try {
      const saved = await dbd.files.get("sidenav-data");
      if (saved?.data) {
        this.data = saved.data;
        this.lastOpenedDoc = saved.lastOpenedDoc || null;

        // Restore focus state if it exists
        if (saved.focusedPath && saved.focusedPath.length > 0) {
          this.focusedPath = saved.focusedPath;

          // Restore the focused view
          const focusedId = this.focusedPath[this.focusedPath.length - 1].id;
          const focusedItem = this.findItem(this.data, focusedId);
          this.displayData = focusedItem ? focusedItem.children : this.data;
        } else {
          this.displayData = this.data;
        }
      } else {
        this.setDefaultData();
        await this.saveToDB();
      }
    } catch (error) {
      console.error("Failed to load from DB:", error);
      this.setDefaultData();
    }
  }

  async saveToDB() {
    try {
      // Deep clone to remove any Svelte reactivity and ensure plain objects
      const dataToSave = {
        id: "sidenav-data",
        data: JSON.parse(JSON.stringify(this.data)),
        focusedPath: JSON.parse(JSON.stringify(this.focusedPath)),
        lastOpenedDoc: this.lastOpenedDoc
          ? JSON.parse(JSON.stringify(this.lastOpenedDoc))
          : null,
      };

      await dbd.files.put(dataToSave);
    } catch (error) {
      console.error("Failed to save to DB:", error);
    }
  }

  // Navigate to the last opened document
  async navigateToLastOpened() {
    if (!this.lastOpenedDoc) return;

    // Check if the document still exists
    const item = this.findItem(this.data, this.lastOpenedDoc.id);
    if (!item) {
      // Document no longer exists, clear the last opened
      this.lastOpenedDoc = null;
      await this.saveToDB();
      return;
    }

    try {
      // Select the document
      this.select(this.lastOpenedDoc.id);

      // Navigate to the document's route
      await goto(this.lastOpenedDoc.route);
    } catch (error) {
      console.error("Failed to navigate to last opened document:", error);
    }
  }

  // Set and save the last opened document
  async setLastOpenedDoc(id, route) {
    const item = this.findItem(this.data, id);

    if (item) {
      // Create a plain object to avoid Svelte reactivity issues
      this.lastOpenedDoc = {
        id: String(id),
        name: String(item.name),
        route: String(route),
        timestamp: Date.now(),
      };
      await this.saveToDB();
    }
  }

  // Clear the last opened document
  async clearLastOpenedDoc() {
    this.lastOpenedDoc = null;
    await this.saveToDB();
  }

  // Generate unique ID
  generateId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  // Find item by ID recursively
  findItem(items, id) {
    for (const item of items) {
      if (item.id === id) return item;
      if (item.children) {
        const found = this.findItem(item.children, id);
        if (found) return found;
      }
    }
    return null;
  }

  // Find parent of item by ID
  findParent(items, targetId, parent = null) {
    for (const item of items) {
      if (item.id === targetId) return parent;
      if (item.children) {
        const found = this.findParent(item.children, targetId, item);
        if (found) return found;
      }
    }
    return null;
  }

  // Add new item
  async add(parentId = null, type = "file", name = "") {
    const newItem = {
      id: this.generateId(),
      name: name || (type === "folder" ? "New Folder" : "New File"),
      type,
      expanded: type === "folder",
      children: [],
    };

    if (parentId) {
      const parent = this.findItem(this.data, parentId);
      if (parent && parent.type === "folder") {
        parent.children.push(newItem);
        parent.expanded = true;
      }
    } else {
      this.data.push(newItem);
    }
    await this.saveToDB();
    return newItem.id;
  }

  // Delete item
  async delete(id) {
    const deleteFromArray = (items) => {
      for (let i = 0; i < items.length; i++) {
        if (items[i].id === id) {
          items.splice(i, 1);
          return true;
        }
        if (items[i].children && deleteFromArray(items[i].children)) {
          return true;
        }
      }
      return false;
    };

    // Clear last opened doc if it's being deleted
    if (this.lastOpenedDoc && this.lastOpenedDoc.id === id) {
      this.lastOpenedDoc = null;
    }

    deleteFromArray(this.data);
    if (this.selectedId === id) {
      this.selectedId = null;
    }
    await this.saveToDB();
  }

  // Edit item name
  async edit(id, newName) {
    const item = this.findItem(this.data, id);
    if (item) {
      item.name = newName;

      // Update last opened doc name if it matches
      if (this.lastOpenedDoc && this.lastOpenedDoc.id === id) {
        this.lastOpenedDoc.name = newName;
      }
    }
    await this.saveToDB();
  }

  // Toggle folder expansion
  async toggle(id) {
    const item = this.findItem(this.data, id);
    if (item && item.type === "folder") {
      item.expanded = !item.expanded;
    }
    await this.saveToDB();
  }

  // Select item and optionally set as last opened
  async select(id, route = null) {
    this.selectedId = id;

    // If a route is provided and it's a file, set as last opened
    if (route) {
      const item = this.findItem(this.data, id);
      if (item && item.type === "file") {
        await this.setLastOpenedDoc(id, route);
      }
    }
  }

  // Move item (for drag and drop)
  move(itemId, newParentId, index = -1) {
    const item = this.findItem(this.data, itemId);
    if (!item) return;

    // Remove from current location
    this.delete(itemId);

    // Add to new location
    if (newParentId) {
      const newParent = this.findItem(this.data, newParentId);
      if (newParent && newParent.type === "folder") {
        if (index >= 0) {
          newParent.children.splice(index, 0, item);
        } else {
          newParent.children.push(item);
        }
        newParent.expanded = true;
      }
    } else {
      if (index >= 0) {
        this.data.splice(index, 0, item);
      } else {
        this.data.push(item);
      }
    }
  }

  // Focus on a specific branch
  async focus(id) {
    const item = this.findItem(this.data, id);
    if (item && item.type === "folder") {
      this.focusedPath = this.buildPath(this.data, id);
      this.displayData = item.children;
      await this.saveToDB(); // Save the focus state
    }
  }

  // Go back to parent level or root
  async unfocus() {
    if (this.focusedPath.length > 0) {
      this.focusedPath.pop();

      if (this.focusedPath.length === 0) {
        this.displayData = this.data;
      } else {
        const parentId = this.focusedPath[this.focusedPath.length - 1].id;
        const parentItem = this.findItem(this.data, parentId);
        this.displayData = parentItem.children;
      }
      await this.saveToDB(); // Save the updated focus state
    }
  }

  // Build breadcrumb path to an item
  buildPath(items, targetId, currentPath = []) {
    for (const item of items) {
      const newPath = [...currentPath, { id: item.id, name: item.name }];

      if (item.id === targetId) {
        return newPath;
      }

      if (item.children) {
        const found = this.buildPath(item.children, targetId, newPath);
        if (found) return found;
      }
    }
    return null;
  }

  // Check if currently in focused mode
  get isFocused() {
    return this.focusedPath.length > 0;
  }

  // Get last opened document info
  get lastOpened() {
    return this.lastOpenedDoc;
  }
}

export const act = new SidenavAction();
