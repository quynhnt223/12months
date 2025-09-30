import { states } from "$lib/states.svelte.js";
/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  states.pageId = params.id;
  return {
    doc: {
      docId: `${params.id}`,
    },
  };
}
