<script>
  import { page } from "$app/state";
  import { tick } from "svelte";
  import { fade } from "svelte/transition";
  import { dm } from "$lib/data/sync6.svelte.js";
  import { states } from "$lib/states.svelte.js";
  import { clickOutside } from "$lib/utils/clickOutside.js";
  import Icon from "$lib/Icon.svelte";

  let { children } = $props();

  // 🔹 reactive docId (depends on user + route param)
  let docId = $derived(
    `${states.userId}-docs-${page.route.id.split("/").slice(-2).join("-")}`
  );

  let doc = $state({
    mainData: {
      title: "Step...",
      fields: [
        {
          title: "Field title",
          html: "",
          visible: true,
          comments: [
            { title: "Note 1", content: "Remember to drink 2L" },
            { title: "Note 2", content: "Check on step2 layout" },
          ],
        },
      ],
    },
  });
</script>

{@render children()}
<div class="coder move">
  <header class="header">
    <input type="text" value="Title" />
    <button class="darkbtn"><Icon name="eye" size="14"></Icon></button>
    <button class="darkbtn"><Icon name="plus" size="16"></Icon></button>
  </header>
  <div class="body">
    {#each doc.mainData.fields as field, i}
      <div class="field">{field.title}</div>
    {/each}
  </div>
</div>

<style>
  input {
    background: none;
    outline: none;
    border: none;
  }
  .darkbtn {
    border-radius: 3px;
    width: 24px;
    height: 24px;
    background: #42414b;
    margin-right: 6px;
  }
  .coder {
    position: absolute;
    z-index: 999;
    width: 568px;
    height: calc(100% - 45px);
    right: 200px;
    top: 12px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    background: #272630;
    border-radius: 6px;
    border: solid 1px rgb(83, 83, 10);
  }
  .header {
    display: flex;
    align-items: center;
    height: 36px;
  }
  .header input {
    flex: 1;
    color: #858585;
    padding: 12px;
    padding-left: 15px;
  }
  .body {
    padding: 20px;
  }
  .field {
    padding: 20px;
    background: #fff;
    border-radius: 6px;
  }
</style>
