import { states } from "$lib/states.svelte.js";

export async function load({ params }) {
  states.pageId = params.id;
  states.docId = JSON.stringify(params);
  return {
    pageId: params.id,
  };
}
// load data và gán data here: điều kiện cần(docID và logic)
