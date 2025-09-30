import { dbd } from "./dexie.js";
import { defaulData, createFolder, createFile } from "./schema.js";

class DataManager {
  data = $state(defaulData.data);
  displayData = $state(this.data);
  isFocus = $state(false);
  focusTitle = $state("");
  focusId = $state(false);
  lastOpenedDoc = $state(false);

  async load() {
    const saved = await dbd.files.get("sidenav-data");
    if (saved?.data) {
      this.data = saved.data;
      console.log("data loaded");
    }
  }

  async save() {
    try {
      // Deep clone to remove any Svelte reactivity and ensure plain objects
      const dataToSave = {
        id: "sidenav-data",
        data: this.data,
        focusId: this.focusId,
        lastOpenedDoc: this.lastOpenedDoc
          ? JSON.parse(JSON.stringify(this.lastOpenedDoc))
          : null,
      };
      await dbd.files.put(dataToSave);
    } catch (error) {
      console.logr(error);
    }
  }

  async add(parent, type) {
    if (type === "folder") {
      parent.push(createFolder()); // Call the factory function
    } else {
      parent.push(createFile()); // Call the factory function
    }
  }
  toggle(item) {
    item.isOpen = !item.isOpen;
  }
  focus(item) {
    this.displayData = item.children;
    this.isFocus = true;
    this.focusTitle = item.name;
  }
  unFocus() {
    this.displayData = this.data;
    this.isFocus = false;
  }
  findById(items, id) {
    for (const item of items) {
      if (item.id === id) return item; // found!
      if (item.children) {
        const found = findById(item.children, id); // search deeper
        if (found) return found;
      }
    }
    return null; // not found
  }
}
export const act = new DataManager();
