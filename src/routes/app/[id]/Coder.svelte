<script>
  import { nanoid } from "nanoid";
  import { page } from "$app/state";
  import { dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME } from "svelte-dnd-action";
  import { tick } from "svelte";
  import { fade } from "svelte/transition";
  import { dm } from "$lib/data/sync6.svelte.js";
  import { states } from "$lib/states.svelte.js";
  import { clickOutside } from "$lib/utils/clickOutside.js";
  import Icon from "$lib/Icon.svelte";

  // ────────────────────────────────
  // Utils
  // ────────────────────────────────

  function defaultDoc() {
    return {
      title: "Step...",
      fields: [
        {
          id: nanoid(8),
          title: "...",
          html: "",
          visible: true,
          comments: [
            { id: nanoid(8), title: "Note 1", content: "Remember to drink 2L" },
            {
              id: nanoid(8),
              title: "Note 2",
              content: "Check on step2 layout",
            },
          ],
        },
      ],
    };
  }

  // ────────────────────────────────
  // State
  // ────────────────────────────────
  let docId = $derived(
    `${states.userId}-docs-${page.route.id.split("/").slice(-2).join("-")}`
  );

  let doc = $state({ mainData: defaultDoc() });

  // local UI state
  let editors = $state([]);
  let commentEditor = $state(null);
  let isCommentOpen = $state(false);
  let currentComment = $state({});
  let currentCommentIndex = $state(null);
  let isEditMode = $state(false);
  let isToggle = $state(false);

  // 2. Sync editor HTML
  $effect(() => {
    doc.mainData.fields.forEach((field, i) => {
      const el = editors[i];
      if (el && el.innerHTML !== field.html) {
        el.innerHTML = field.html;
      }
    });
  });

  // 3. Reset + load when docId changes
  $effect(() => {
    doc.mainData = defaultDoc(); // safe reset
    dm.loadData(docId, doc);
  });

  // ────────────────────────────────
  // Actions
  // ────────────────────────────────
  function saveOnBlur() {
    dm.saveData(docId, doc);
  }

  function updateField(i, e) {
    doc.mainData.fields[i].html = e.target.innerHTML;
  }

  function closeModal() {
    isCommentOpen = false;
  }

  // ────────────────────────────────
  // Fields
  // ────────────────────────────────
  function addField() {
    doc.mainData.fields.push({
      id: nanoid(8),
      title: "",
      html: "",
      visible: true,
      comments: [],
    });
    dm.saveData(docId, doc);
  }

  function removeField(i) {
    doc.mainData.fields.splice(i, 1);
    dm.saveData(docId, doc);
  }

  function toggleField(i) {
    doc.mainData.fields[i].visible = !doc.mainData.fields[i].visible;
    dm.saveData(docId, doc);
  }

  function toggleAllFields() {
    const anyVisible = doc.mainData.fields.some((f) => f.visible);
    doc.mainData.fields.forEach((f) => (f.visible = !anyVisible));
    isToggle = !anyVisible;
    dm.saveData(docId, doc);
  }

  // ────────────────────────────────
  // Comments
  // ────────────────────────────────
  function addComment(fieldIndex) {
    doc.mainData.fields[fieldIndex].comments.push({
      id: nanoid(8),
      title: "New Comment",
      content: "",
    });
    dm.saveData(docId, doc);
  }

  function removeComment(fieldIndex, commentIndex) {
    doc.mainData.fields[fieldIndex].comments.splice(commentIndex, 1);
    dm.saveData(docId, doc);

    if (currentCommentIndex === commentIndex) {
      isCommentOpen = false;
      currentComment = {};
      currentCommentIndex = null;
    }
  }

  function handleInput(e) {
    currentComment.content = e.target.innerHTML;
  }

  // ────────────────────────────────
  // Drag & Drop
  function handleDndConsider(e) {
    doc.mainData.fields = e.detail.items;
  }

  function handleDndFinalize(e) {
    // Restore original visibility states
    doc.mainData.fields = e.detail.items;
    dm.saveData(docId, doc);
  }
</script>

<div class="iframe">
  <div class="doc-header">
    <input
      type="text"
      class="doc-title"
      placeholder="Step..."
      bind:value={doc.mainData.title}
      onblur={saveOnBlur}
    />
    <div class="sync">
      <div class={dm.status}><Icon name="save"></Icon></div>
    </div>
    <button onclick={() => (isEditMode = !isEditMode)}
      ><Icon
        name="lock"
        size="14"
        color={isEditMode ? "var(--code-active)" : "#585D6B"}
      ></Icon></button
    >
    <button onclick={toggleAllFields}
      ><Icon
        name="toggle"
        size="14"
        color={isToggle ? "var(--code-active)" : "#585D6B"}
      ></Icon></button
    >
    <button onclick={addField}
      ><Icon name="plus" size="16" color="#585D6B"></Icon></button
    >
  </div>
  <div
    class="doc-body"
    use:dndzone={{
      items: doc.mainData.fields,
      dropTargetStyle: { outline: "none" },
    }}
    onconsider={handleDndConsider}
    onfinalize={handleDndFinalize}
  >
    {#each doc.mainData.fields as field, i (field.id)}
      <div class="editor-wrap">
        {#if field[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
          <div class="custom-shadow-item"></div>
        {/if}
        <div class="code-header">
          {#if isEditMode}
            <div class="drag"><Icon name="drag" color="#57595E"></Icon></div>
          {/if}
          <button
            onclick={() => toggleField(i)}
            class="header-num"
            style="color: {field.visible ? 'var(--code-active)' : '#585D6B'}"
            >{i + 1}</button
          >
          <input
            type="text"
            class="field-title"
            placeholder="..."
            bind:value={doc.mainData.fields[i].title}
            onblur={saveOnBlur}
          />
          <div class="btns">
            {#if isEditMode}
              <button onclick={() => addComment(i)}
                ><Icon name="addcomment" size="16" color="#585D6B"
                ></Icon></button
              >
              <button onclick={() => removeField(i)}
                ><Icon name="bin" size="16" color="#585D6B"></Icon></button
              >
            {/if}
          </div>
        </div>
        {#if field.visible}
          <div class="editor" transition:fade={{ duration: 300 }}>
            <div
              class="editor-edit"
              contenteditable="true"
              bind:this={editors[i]}
              oninput={(e) => updateField(i, e)}
              onblur={saveOnBlur}
            ></div>
            <div class="comments">
              {#each field.comments as comment, i}
                <button
                  class="comment-btn sound1"
                  onclick={() => {
                    isCommentOpen = true;
                    currentComment = comment;
                    currentCommentIndex = i;
                    // 🟢 set the editor HTML only once here
                    tick().then(() => {
                      if (commentEditor) {
                        commentEditor.innerHTML = comment.content ?? "";
                      }
                    });
                  }}
                  ><Icon
                    name="comment"
                    size="18"
                    color={isCommentOpen && currentCommentIndex === i
                      ? "var(--code-active)"
                      : "#585D6B"}
                  ></Icon></button
                >
              {/each}
            </div>
          </div>
        {/if}
      </div>
    {/each}
  </div>
  {#if isCommentOpen}
    <div class="comment-box move" use:clickOutside={closeModal}>
      <div class="comment-header">
        <input
          type="text"
          bind:value={currentComment.title}
          onblur={saveOnBlur}
        /><button
          onclick={() =>
            removeComment(
              // find which field this comment belongs to
              doc.mainData.fields.findIndex((f) =>
                f.comments.includes(currentComment)
              ),
              currentCommentIndex
            )}><Icon name="bin" color="#282830"></Icon></button
        >
      </div>
      <div class="comment-body">
        <div
          class="comment-editor"
          contenteditable="true"
          bind:this={commentEditor}
          oninput={handleInput}
          onblur={saveOnBlur}
        ></div>
      </div>
    </div>
  {/if}
</div>

<style>
  .iframe {
    position: fixed;
    display: flex;
    flex-direction: column;
    top: 0;
    left: 0;
    bottom: 0;
    width: 668px;
    background: #272630;
    z-index: 2;
    border-right: solid 1px #9f9f9f;
    box-shadow: rgb(0 0 0 / 69%) 1px 1px 2px;
  }
  .editor-wrap {
    position: relative;
    display: flex;
    flex-direction: column;
    z-index: 9;
    padding: 6px;
    padding-left: 12px;
    border-radius: 12px;
    margin-bottom: 10px;
  }

  :global(.editor-wrap#dnd-action-dragged-el) {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background: #32313e !important;
    z-index: 99999999 !important;
  }
  .editor {
    flex: 1;
    min-height: 36px;
    margin-bottom: 20px;
    position: relative;
  }
  .editor-edit {
    color: #afa9ce;
    font-weight: 300;
    font-family: "JetBrains Mono", "Fira Code", Consolas, "Courier New",
      monospace, Consolas, "Courier New", monospace;
    font-size: 14px;
    line-height: 20px;
  }
  .editor-edit:focus {
    min-height: 36px;
    outline: none;
    border: none;
  }
  :global(.editor-edit div) {
    background: #272630 !important;
  }
  .field-title {
    flex: 1;
    padding-left: 16px;
    height: 24px;
    display: flex;
    align-items: center;
    outline: none;
    background: none;
    width: 100%;
    border: none;
    color: #6a9955;
    border-radius: 2px;
    font-size: 14px;
    font-family: "JetBrains Mono", "Fira Code", Consolas, "Courier New",
      monospace, Consolas, "Courier New", monospace;
  }
  .code-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }
  .btns {
    display: flex;
    align-items: center;
  }
  .btns button {
    margin-right: 6px;
    padding-left: 3px;
    padding-top: 2px;
  }
  .doc-header {
    display: flex;
    align-items: center;
    padding-right: 6px;
  }
  .doc-header input {
    background: none;
    font-weight: 800;
    font-size: 18px;
    outline: none;
    border: none;
    padding: 12px;
    padding-left: 20px;
    color: var(--dark-icon);
    font-family: "JetBrains Mono", "Fira Code", Consolas, "Courier New",
      monospace, Consolas, "Courier New", monospace;
    text-transform: capitalize;
  }
  .doc-header button {
    display: grid;
    padding-left: 3px;
    padding-top: 2px;
    place-content: center;
    margin-right: 6px;
  }
  .doc-body {
    padding: 8px;
    padding-right: 6px;
    flex: 1;
    height: calc(100% - 24px);
    overflow: auto;
    padding-bottom: 168px;
  }
  * {
    scrollbar-width: none; /* hides scrollbar */
  }
  .header-num,
  .doc-header button,
  .btns button {
    width: 28px;
    height: 28px;
    border-radius: 6px;
    padding-right: 3px;
    padding-bottom: 2px;
    display: grid;
    place-content: center;
    font-weight: 800;
    font-size: 16px;
    background: #353441;
    color: #12f042;
    box-shadow:
      inset -1px -1px 1px rgba(0, 0, 0, 0.61),
      inset 1px 1px 1px rgba(131, 84, 84, 0.25);
    border-radius: 9px;
  }
  .comment-btn {
    width: 36px;
    height: 36px;
    border-radius: 6px;
    display: grid;
    place-content: center;
    background: none;
  }
  .comments {
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 6px;
    top: 0;
    right: 0;
    z-index: 1;
  }
  .comments button:hover {
    opacity: 0.6;
  }
  .comment-box {
    min-width: 300px;
    max-width: 368px;
    min-height: 368px;
    max-height: 500px;
    overflow: auto;
    background: #413f4b;
    border-radius: 12px;
    position: absolute;
    right: 68px;
    top: 136px;
    z-index: 9999;
    box-shadow:
      rgba(0, 0, 0, 0.3) 0px 19px 38px,
      rgba(0, 0, 0, 0.22) 0px 15px 12px;
  }
  .comment-header {
    display: flex;
    align-items: center;
  }
  .comment-header input {
    background: none;
    outline: none;
    border: none;
    padding: 15px;
    padding-left: 20px;
    flex: 1;
    color: var(--code-active);
    font-weight: 400;
    font-family: "Barlow", sans-serif;
    font-size: 18px;
  }
  .comment-header button {
    background: none;
    width: 24px;
    height: 24px;
    display: grid;
    place-content: center;
    margin-right: 20px;
  }
  .comment-editor {
    padding: 20px;
    color: #c4bebe;
    padding-top: 0;
  }
  :global(.comment-editor b) {
    color: var(--code-active);
    border-radius: 6px;
    text-align: center;
    margin-left: 6px;
    margin-right: 6px;
    font-weight: 400;
  }
  :global(.comment-editor i) {
    color: #818181;
    margin-left: 6px;
    margin-right: 6px;
    font-style: normal;
    border-bottom: dotted 1px #818181;
  }
  :global(.comment-editor u) {
    font-size: 10px;
    line-height: 21px;
    text-align: center;
    display: inline-block;
    border-radius: 8px;
    width: 21px;
    height: 21px;
    position: relative;
    top: -1.5px;
    margin-right: 6px;
    background: #353441;
    color: var(--code-active);
    box-shadow:
      inset -1px -1px 1px rgba(0, 0, 0, 0.61),
      inset 1px 1px 1px rgba(131, 84, 84, 0.25);
  }
  :global(.editor-edit i) {
    background: #6a6887 !important;
    padding: 1px 6px;
    border-radius: 3px;
  }
  :global(.editor-edit i span) {
    color: #000 !important;
  }
  :global(.editor-edit i) {
    color: #000 !important;
    font-weight: 500;
  }
  :global(.editor-edit u) {
    background: #8f0202;
  }
  :global(.editor-edit img) {
    max-width: 80%;
    border-radius: 6px;
  }
  :global(.editor-edit .quote) {
    padding: 20px;
    background: #181818 !important;
    border-radius: 6px;
    margin-right: 20px;
    border: solid 1px #ffffff0d;
    background: #202024;
    box-shadow:
      0px 2px 1px #121115,
      inset 0px 2px 2px #383333;
  }
  .comment-editor:focus {
    outline: none;
    border: none;
  }

  :global(#dnd-action-dragged-el) {
    position: relative;
    outline: none !important;
    border: none !important;
    box-shadow: none;
    z-index: 999999 !important;
  }
  .custom-shadow-item {
    position: absolute !important;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    visibility: visible;

    border-radius: 8px;
    z-index: 9999999999;
    border: 1px dashed #828282;
  }
  .drag {
    width: 45px;
    height: 24px;
    border-radius: 6px;
  }
  .sync {
    flex: 1;
    display: flex;
    align-items: center;
  }
  .sync div {
    display: flex;
    align-items: center;
  }
  :global(.white svg) {
    fill: #fff;
  }
  :global(.green svg) {
    fill: var(--green1);
  }
  :global(.red svg) {
    fill: red;
  }
  :global(.purple svg) {
    fill: #6a6ee5;
  }
</style>
