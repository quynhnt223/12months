import { dataManager } from "./sync3.svelte.js";
import { states } from "./states.svelte.js";
import { dbd } from "$lib/data/dexie.js";

class B01 {
  data = $state(null);

  async add() {
    this.data = await dataManager.load("test", "someid", "formData");
  }
  async remove() {
    await dataManager.saveToLocal("doc103");
  }
  async reset() {}

  async loadFromLocal(docId) {}
}
export const b01 = new B01();
