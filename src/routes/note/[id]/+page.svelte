<script>
  import Icon from "$lib/Icon.svelte";
  import FullscreenBtn from "../FullscreenBtn.svelte";
  import { states } from "../states.svelte.js";
  import { act } from "../noteAction.svelte.js";
  import NoteCardContent from "../NoteCardContent.svelte";
  import { flip } from "svelte/animate";
  import { dndzone } from "svelte-dnd-action";

  let { data } = $props();

  // Reactive references to the action state
  let note = $derived(act.note);
  let loading = $derived(act.loading);
  let error = $derived(act.error);

  // Link dialog state
  let showLinkDialog = $state(false);
  let linkDialogData = $state({
    sectionIndex: 0,
    itemId: "",
    link1: "",
    link2: "",
  });

  const flipDurationMs = 100;

  // Load note when component mounts
  $effect(async () => {
    await act.loadNote(data.id);
  });

  // Handle adding new item with Enter key
  function handleKeydown(event, sectionIndex) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      act.addItem(sectionIndex, "");

      // Focus the new input after a brief delay
      setTimeout(() => {
        const inputs = document.querySelectorAll(
          `[data-section="${sectionIndex}"] input`
        );
        const lastInput = inputs[inputs.length - 1];
        if (lastInput) lastInput.focus();
      }, 50);
    }
  }

  // Handle item deletion with backspace on empty input
  function handleItemKeydown(event, sectionIndex, itemId, itemText) {
    if (event.key === "Backspace" && itemText.trim() === "") {
      event.preventDefault();
      act.deleteItem(sectionIndex, itemId);
    }
  }

  // Handle link management - open custom dialog
  function handleLinkEdit(sectionIndex, itemId, item) {
    linkDialogData = {
      sectionIndex,
      itemId,
      link1: item.link1 || "",
      link2: item.link2 || "",
    };
    showLinkDialog = true;
  }

  // Save links from dialog
  function saveLinkDialog() {
    act.updateItemLinks(
      linkDialogData.sectionIndex,
      linkDialogData.itemId,
      linkDialogData.link1,
      linkDialogData.link2
    );
    showLinkDialog = false;
  }

  // Cancel link dialog
  function cancelLinkDialog() {
    showLinkDialog = false;
  }

  // Handle drag and drop - multiple save strategies
  async function handleDrop(e, sectionIndex) {
    const items = e.detail.items;

    // Update the section's items with the new order
    const oldItems = [...note.sections[sectionIndex].items];
    note.sections[sectionIndex].items = [...items];

    try {
      // Try multiple save strategies based on your working pattern
      if (act.isFocused) {
        // If in focus mode, update actual data and save
        console.log("Saving in focus mode...");
        await act.saveToDB();
      } else {
        // Try different save methods
        if (typeof act.saveToDB === "function") {
          console.log("Using saveToDB...");
          await act.saveToDB();
        } else if (typeof act.autoSave === "function") {
          console.log("Using autoSave...");
          act.autoSave();
        } else if (typeof act.save === "function") {
          console.log("Using save...");
          await act.save();
        } else {
          console.warn("No save method found, data may not persist");
        }
      }
      console.log("Data saved successfully");
    } catch (error) {
      console.error("Error saving data:", error);
      // Revert changes on error
      note.sections[sectionIndex].items = oldItems;
    }
  }

  function editMode() {
    states.isEditMode = !states.isEditMode;
  }
</script>

{#if states.isCardOpen}
  <NoteCardContent></NoteCardContent>
{/if}

<!-- Link Dialog Modal -->
{#if showLinkDialog}
  <div class="modal-overlay" onclick={cancelLinkDialog}>
    <div class="link-dialog" onclick={(e) => e.stopPropagation()}>
      <h3>Manage Links</h3>
      <div class="link-inputs">
        <div class="link-input-group">
          <label>Link 1:</label>
          <input
            type="text"
            bind:value={linkDialogData.link1}
            placeholder="Enter first URL..."
            class="link-input"
          />
        </div>
        <div class="link-input-group">
          <label>Link 2:</label>
          <input
            type="text"
            bind:value={linkDialogData.link2}
            placeholder="Enter second URL..."
            class="link-input"
          />
        </div>
      </div>
      <div class="dialog-actions">
        <button onclick={cancelLinkDialog} class="cancel-btn">Cancel</button>
        <button onclick={saveLinkDialog} class="save-btn">Save</button>
      </div>
    </div>
  </div>
{/if}

<div class="note-content-wrap">
  {#if loading}
    <div class="loading">
      <div class="text-lg">Loading...</div>
    </div>
  {:else if error}
    <div class="error">
      {error}
    </div>
  {:else if note}
    <!-- Title -->
    <div class="note-content-header">
      <input
        type="text"
        bind:value={note.title}
        oninput={() => act.autoSave()}
        class="note-title"
        placeholder="Enter note title..."
      />
      {#if states.isEditMode}
        <button
          class="add-section"
          onclick={() => act.addSection()}
          data-label="Add New Section"
        >
          <Icon name="add" color="#464654" size="16"></Icon>
        </button>
      {/if}
      <button class="edit-btn" onclick={editMode}
        ><Icon
          name="edit"
          color={states.isEditMode ? "#66FF14" : "#373A3E"}
          size="16"
        ></Icon></button
      >

      <FullscreenBtn></FullscreenBtn>
    </div>

    <!-- Main Grid Layout -->
    <div class="note-content-body">
      {#each note.sections as section, sectionIndex (sectionIndex)}
        <div class="note-layout-section" data-section={sectionIndex}>
          <!-- Section Header -->
          <div class="note-section-header">
            <input
              type="text"
              bind:value={section.title}
              oninput={() => act.autoSave()}
              class="section-title"
              style="color: {section.color}"
              placeholder="Section title..."
            />

            <!-- Color picker -->
            <div class="section-color" style="background:{section.color}">
              <input
                type="color"
                bind:value={section.color}
                onchange={() => act.autoSave()}
              />
            </div>
          </div>

          <!-- Section Items with DND -->
          <div
            class="note-section-body"
            use:dndzone={{
              dragDisabled: states.isEditMode ? false : true,
              items: section.items,
              flipDurationMs,
              dropTargetStyle: {
                outline: `2px dashed ${section.color}`,
                outlineOffset: "2px",
              },
            }}
            onconsider={(e) => {
              // Update local state immediately for smooth UI
              section.items = e.detail.items;
            }}
            onfinalize={(e) => {
              handleDrop(e, sectionIndex);
            }}
          >
            {#each section.items as item, itemIndex (item.id)}
              <div
                class="note-card"
                animate:flip={{ duration: flipDurationMs }}
                onclick={() => {
                  states.isCardOpen = true;
                  states.cardId = item.id;
                  states.cardLink = item.link1;
                  states.editCardLink = item.link2;
                }}
              >
                <div class="drag-handle">
                  <Icon name="drag" size="12" color="#464654"></Icon>
                </div>
                <button
                  style="border-color: {section.color}; background: {item.completed
                    ? section.color
                    : 'transparent'}"
                  aria-label="text"
                  class="note-card-checkbox"
                  onclick={() => act.toggleItem(sectionIndex, item.id)}
                >
                </button>

                <div class="note-card-content">
                  <input
                    style="color:{section.color}"
                    type="text"
                    bind:value={item.text}
                    oninput={() => act.autoSave()}
                    onkeydown={(e) =>
                      handleItemKeydown(e, sectionIndex, item.id, item.text)}
                    class="note-card-text {item.completed
                      ? 'line-through opacity-60'
                      : ''}"
                    placeholder="Add item..."
                  />
                </div>
                <!-- Link management button -->
                {#if states.isEditMode}
                  <button
                    class="link-button"
                    onclick={(e) => {
                      e.stopPropagation();
                      handleLinkEdit(sectionIndex, item.id, item);
                    }}
                    title="Manage links"
                    class:has-links={item.link1 || item.link2}
                    >e
                  </button>
                {/if}

                <button
                  class="delete-card"
                  onclick={() => act.deleteItem(sectionIndex, item.id)}
                >
                  <Icon name="bin" size="16" color="#464654"></Icon>
                </button>
              </div>
            {/each}
          </div>

          <!-- Section actions -->
          {#if states.isEditMode}
            <div class="section-actions">
              <!-- Add new item button -->
              <button onclick={() => act.addItem(sectionIndex, "")}>
                <Icon name="add" size="15" color="#464654"></Icon>
              </button>
              <button onclick={() => act.deleteSection(sectionIndex)}>
                <Icon name="bin" size="15" color="#464654"></Icon>
              </button>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .note-content-wrap {
    height: 100%;
    background: #3e3f4d;
    border-radius: 12px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.35);
    overflow: hidden;
  }
  .note-content-header {
    display: flex;
    height: 36px;
    align-items: center;
    background: #31313d;
  }

  .note-content-body {
    height: calc(100% - 36px);
  }
  .note-content-body {
    display: flex;
  }

  .note-layout-section {
    border-radius: 8px;
    padding: 8px;
    color: #1cfa3d;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .note-section-header {
    display: flex;
    align-items: center;
    display: none;
  }
  .note-section-body {
    flex: 1;
    padding-top: 8px;
  }
  .note-card {
    background: #302e36;
    box-shadow:
      1px 1px 1px rgba(0, 0, 0, 0.39),
      inset 0px 1px 0px rgba(163, 168, 194, 0.25);
    border-radius: 3px;
    text-transform: capitalize;
    margin-bottom: 3px;
    display: flex;
    align-items: center;
    padding-left: 6px;
    transition: transform 0.2s ease;
  }

  .note-card:hover {
    transform: translateY(-1px);
  }

  .drag-handle {
    cursor: grab;
    display: flex;
    align-items: center;
    padding-right: 4px;
    opacity: 0.5;
  }

  .drag-handle:hover {
    opacity: 1;
  }

  .drag-handle:active {
    cursor: grabbing;
  }

  .note-card-content {
    flex: 1;
    display: flex;
    align-items: center;
    position: relative;
  }

  .link-indicator {
    position: absolute;
    right: 4px;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0.7;
    cursor: pointer;
    padding: 2px;
    border-radius: 2px;
    transition: all 0.2s ease;
  }

  .link-indicator:hover {
    opacity: 1;
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-50%) scale(1.1);
  }

  input {
    background: none;
    border: none;
    outline: none;
  }
  .section-color {
    width: 8px;
    height: 8px;
    border-radius: 100px;
    cursor: pointer;
  }
  .section-color input {
    opacity: 0;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  .note-title {
    flex: 1;
    padding: 6px;
    padding-left: 20px;
    font-weight: 600;
    text-transform: capitalize;
    font-size: 16px;
    background: linear-gradient(90deg, #52555c 0%, #ffffff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: #fff;
  }
  .section-title {
    flex: 1;
    font-size: 14px;
    opacity: 0.6;
  }
  .note-card-checkbox {
    width: 10px;
    height: 10px;
    border-radius: 12px;
    border: solid 2px;
    background: none;
  }
  .note-card-text {
    padding: 8px;
    flex: 1;
    width: 100%;
  }

  .link-button {
    width: 24px;
    height: 24px;
    background: none;
    border: none;
    border-radius: 4px;
    margin-right: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0.5;
    transition: all 0.2s ease;
    color: #1cfa3d00;
  }

  .link-button.has-link {
    opacity: 1;
    background: rgba(255, 255, 255, 0);
  }

  .link-button:hover {
    opacity: 1 !important;
    transform: scale(1.1);
    color: #1cfa3d;
  }

  .section-actions {
    display: flex;
    align-items: center;
    justify-content: end;
  }
  .section-actions button,
  .delete-card,
  .add-section {
    width: 28px;
    height: 28px;
    background: none;
    border-radius: 6px;
    margin-left: 8px;
    margin-right: 20px;
  }
  .delete-card {
    display: none;
  }

  button:hover {
    opacity: 0.6;
  }

  /* DND specific styles */
  :global(.note-section-body[data-dnd-action]) {
    min-height: 50px;
  }

  :global(.note-card[data-dnd-action]) {
    cursor: grab;
  }

  :global(.note-card[data-dnd-action]:active) {
    cursor: grabbing;
  }
  .modal-overlay {
    position: fixed;
    z-index: 9999;
    padding: 20px;
    top: 15px;
    left: 50%;
    width: 300px;
    overflow: hidden;
    background: gray;
    border-radius: 6px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.35);
  }
  .dialog-actions {
    display: flex;
    align-items: center;
    padding-top: 8px;
  }
  .dialog-actions button {
    padding: 6px;
    background: green;
    border-radius: 3px;
    color: #fff;
    margin-right: 8px;
  }
  .edit-btn {
    width: 36px;
    height: 36px;
    display: grid;
    place-content: center;
    background: none;
    margin-right: 8px;
  }
</style>
