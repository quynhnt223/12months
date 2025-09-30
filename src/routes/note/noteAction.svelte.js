import { dbd, createDefaultNote } from "./dexie.js";

export class NoteAction {
  // Runes for reactive state
  note = $state(null);
  loading = $state(false);
  error = $state(null);
  isNoteCardOpen = $state(false);

  constructor() {
    // Initialize empty note
    this.note = null;
  }

  // Load note by ID
  async loadNote(id) {
    this.loading = true;
    this.error = null;

    try {
      let note = await dbd.files.get(id);

      if (!note) {
        // Create default note if doesn't exist
        note = createDefaultNote(id);
      }

      // Ensure all items have both link fields for backward compatibility
      if (note && note.sections) {
        note.sections.forEach((section) => {
          section.items = section.items.map((item) => ({
            ...item,
            link1: item.link1 || item.link || "", // Use old link as link1 if exists
            link2: item.link2 || "", // Ensure link2 field exists
          }));
        });
      }

      this.note = note;
    } catch (err) {
      this.error = `Failed to load note: ${err.message}`;
      console.error("Error loading note:", err);
    } finally {
      this.loading = false;
    }
  }

  // Save note to IndexedDB
  async saveNote(noteData = null) {
    const dataToSave = noteData || this.note;
    if (!dataToSave) return;

    try {
      // Create a clean, serializable copy of the note
      const cleanNote = {
        id: dataToSave.id,
        title: dataToSave.title,
        sections: dataToSave.sections.map((section) => ({
          title: section.title,
          color: section.color,
          items: section.items.map((item) => ({
            id: item.id,
            text: item.text,
            completed: item.completed,
            link1: item.link1 || "", // Include both link fields
            link2: item.link2 || "",
          })),
        })),
        createdAt: dataToSave.createdAt,
        updatedAt: new Date(),
      };

      await dbd.files.put(cleanNote);
    } catch (err) {
      this.error = `Failed to save note: ${err.message}`;
      console.error("Error saving note:", err);
    }
  }

  // Update note title
  updateTitle(newTitle) {
    if (this.note) {
      this.note.title = newTitle;
      this.saveNote();
    }
  }

  // Add new item to a section
  addItem(sectionIndex, text = "") {
    if (this.note && this.note.sections[sectionIndex]) {
      const newItem = {
        id: crypto.randomUUID(),
        text,
        completed: false,
        link1: "", // Add both link fields to new items
        link2: "",
      };

      this.note.sections[sectionIndex].items.push(newItem);
      this.saveNote();
      return newItem;
    }
  }

  // Update item text
  updateItem(sectionIndex, itemId, newText) {
    if (this.note && this.note.sections[sectionIndex]) {
      const item = this.note.sections[sectionIndex].items.find(
        (i) => i.id === itemId
      );
      if (item) {
        item.text = newText;
        this.saveNote();
      }
    }
  }

  // Update item links - Updated to handle both links
  updateItemLinks(sectionIndex, itemId, link1, link2) {
    if (this.note && this.note.sections[sectionIndex]) {
      const item = this.note.sections[sectionIndex].items.find(
        (i) => i.id === itemId
      );
      if (item) {
        // Trim and handle empty strings
        item.link1 = link1 ? link1.trim() : "";
        item.link2 = link2 ? link2.trim() : "";

        // Add basic URL validation and auto-fix for both links
        [item.link1, item.link2].forEach((link, index) => {
          if (link && !link.match(/^https?:\/\//)) {
            if (link.includes(".") && !link.includes(" ")) {
              if (index === 0) {
                item.link1 = "https://" + link;
              } else {
                item.link2 = "https://" + link;
              }
            }
          }
        });

        this.autoSave();
        return { link1: item.link1, link2: item.link2 };
      }
    }
    return null;
  }

  // Toggle item completion
  toggleItem(sectionIndex, itemId) {
    if (this.note && this.note.sections[sectionIndex]) {
      const item = this.note.sections[sectionIndex].items.find(
        (i) => i.id === itemId
      );
      if (item) {
        item.completed = !item.completed;
        this.saveNote();
      }
    }
  }

  // Delete item
  deleteItem(sectionIndex, itemId) {
    if (this.note && this.note.sections[sectionIndex]) {
      const items = this.note.sections[sectionIndex].items;
      const index = items.findIndex((i) => i.id === itemId);
      if (index !== -1) {
        items.splice(index, 1);
        this.saveNote();
      }
    }
  }

  // Update section title
  updateSectionTitle(sectionIndex, newTitle) {
    if (this.note && this.note.sections[sectionIndex]) {
      this.note.sections[sectionIndex].title = newTitle;
      this.saveNote();
    }
  }

  // Update section color
  updateSectionColor(sectionIndex, newColor) {
    if (this.note && this.note.sections[sectionIndex]) {
      this.note.sections[sectionIndex].color = newColor;
      this.saveNote();
    }
  }

  // Add new section
  addSection(title = "New Section", color = "#10b981") {
    if (this.note) {
      const newSection = {
        title,
        color,
        items: [],
      };

      this.note.sections.push(newSection);
      this.saveNote();
      return newSection;
    }
  }

  // Delete section
  deleteSection(sectionIndex) {
    if (this.note && this.note.sections[sectionIndex]) {
      this.note.sections.splice(sectionIndex, 1);
      this.saveNote();
    }
  }

  autoSave = (() => {
    let timeoutId;
    return () => {
      console.log("Auto-save triggered");
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        this.saveNote();
      }, 500);
    };
  })();

  // Additional methods for better link management

  // Get item by ID across all sections - HELPER METHOD
  getItem(itemId) {
    if (!this.note) return null;

    for (
      let sectionIndex = 0;
      sectionIndex < this.note.sections.length;
      sectionIndex++
    ) {
      const item = this.note.sections[sectionIndex].items.find(
        (i) => i.id === itemId
      );
      if (item) {
        return { item, sectionIndex };
      }
    }
    return null;
  }

  // Open link in new tab - Enhanced to handle both links
  openLink(sectionIndex, itemId, linkNumber = 1) {
    if (this.note && this.note.sections[sectionIndex]) {
      const item = this.note.sections[sectionIndex].items.find(
        (i) => i.id === itemId
      );
      if (item) {
        const link = linkNumber === 1 ? item.link1 : item.link2;
        if (link) {
          let url = link.trim();

          // Handle different URL formats
          if (url.match(/^https?:\/\//)) {
            // Already has protocol
            window.open(url, "_blank");
          } else if (url.includes(".") && !url.includes(" ")) {
            // Looks like a domain, add https://
            window.open("https://" + url, "_blank");
          } else {
            // Might be a search term or other format
            window.open(
              "https://www.google.com/search?q=" + encodeURIComponent(url),
              "_blank"
            );
          }
        }
      }
    }
  }

  // Check if item has valid links - Updated for both links
  hasValidLinks(sectionIndex, itemId) {
    if (this.note && this.note.sections[sectionIndex]) {
      const item = this.note.sections[sectionIndex].items.find(
        (i) => i.id === itemId
      );
      return {
        hasLink1: item && item.link1 && item.link1.trim().length > 0,
        hasLink2: item && item.link2 && item.link2.trim().length > 0,
      };
    }
    return { hasLink1: false, hasLink2: false };
  }
}

// Create singleton instance
export const act = new NoteAction();
