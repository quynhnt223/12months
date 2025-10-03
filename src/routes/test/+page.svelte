<script>
  import { page } from "$app/state";
  import { dm } from "$lib/data/sync6.svelte.js";
  import { lg } from "./logic.svelte.js";

  let doc = $state({ id: null, mainData: {}, additionalField: "add later" });

  $effect(() => dm.loadData("doc102", doc));
</script>

{JSON.stringify(doc)}
<a href="/test1">back</a>
{JSON.stringify(page.route.id)}
