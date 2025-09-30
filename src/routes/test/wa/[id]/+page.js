import { dataManager } from "./sync2.js";
import { states } from "./states.svelte.js";
import { b01 } from "./waterAction.svelte.js";

export async function load({ params }) {
  states.docId = `b01-${params.id.substring(3)}`;
  b01.data = await dataManager.load("test", "someid23-09-25", "formData", {
    createIfMissing: true,
    validateDocId: true,
    defaultValue: { name: "test2" },
  });
}
//bug: this will run when hover this link
//how to fix: change link, not "/"
