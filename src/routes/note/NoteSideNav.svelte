<script>
    import { page } from "$app/state";
    import { flip } from "svelte/animate";
    import { dndzone } from "svelte-dnd-action";
    import { act } from "./sidenavAction.svelte.js";
    import { states } from "./states.svelte.js";

    const flipDurationMs = 100;
    let editingId = $state(null);
    let editingName = $state("");

    function handleItemClick(item) {
        act.select(item.id);
    }

    function startEditing(item, event) {
        event?.stopPropagation();
        editingId = item.id;
        editingName = item.name;

        // Use setTimeout to ensure the input is rendered before focusing
        setTimeout(() => {
            const input = document.querySelector(".edit-input");
            if (input) {
                input.focus();
                input.select();
            }
        }, 0);
    }

    function finishEditing() {
        if (editingId && editingName.trim()) {
            act.edit(editingId, editingName.trim());
        }
        editingId = null;
        editingName = "";
    }

    function cancelEditing() {
        editingId = null;
        editingName = "";
    }

    function handleEditKeydown(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            finishEditing();
        } else if (e.key === "Escape") {
            e.preventDefault();
            cancelEditing();
        }
    }

    // Handle clicks outside the component to finish editing
    function handleDocumentClick(event) {
        if (editingId && !event.target.classList.contains("edit-input")) {
            finishEditing();
        }
    }
    // Add document click listener when editing starts
    $effect(() => {
        if (editingId) {
            document.addEventListener("click", handleDocumentClick);
            return () => {
                document.removeEventListener("click", handleDocumentClick);
            };
        }
    });

    function addRootItem(type) {
        const newId = act.add(null, type);
        act.select(newId);
    }

    // Handle drag and drop - following your working pattern
    async function handleDrop(e, items) {
        items.length = 0;
        items.push(...e.detail.items);

        // If in focus mode, we need to update the actual data, not just display
        if (act.isFocused) {
            // Update the actual data structure and save
            await act.saveToDB();
        } else {
            await act.saveToDB();
        }
    }
</script>

{#snippet folder(items)}
    <div
        class="menu-wrap dnd-zone"
        use:dndzone={{
            items,
            flipDurationMs,
            dragDisabled: states.isEditMode ? false : true,
        }}
        onconsider={(e) => handleDrop(e, items)}
        onfinalize={(e) => handleDrop(e, items)}
    >
        {#each items as item (item.id)}
            <div
                class="item-container"
                animate:flip={{ duration: flipDurationMs }}
            >
                <div class="item-header">
                    <a
                        class:active-link={page.params.id === item.id}
                        href="/note/{item.id}"
                        class="name-container sound1"
                        onclick={async (e) => {
                            if (editingId === item.id) {
                                e.preventDefault();
                            } else {
                                // Set this document as the last opened
                                await act.setLastOpenedDoc(
                                    item.id,
                                    `/note/${item.id}`,
                                );
                            }
                        }}
                    >
                        {#if item.children?.length > 0}
                            <button
                                class="toggle-btn"
                                onclick={() => act.toggle(item.id)}
                            >
                                {item.expanded ? "-" : "+"}
                            </button>
                        {/if}

                        {#if editingId === item.id}
                            <input
                                type="text"
                                bind:value={editingName}
                                onkeydown={(e) => handleEditKeydown(e)}
                                class="edit-input"
                            />
                        {:else}
                            <h4
                                class="{item.type} {act.selectedId === item.id
                                    ? 'selected'
                                    : ''}"
                                onclick={() => handleItemClick(item)}
                            >
                                {item.name}
                            </h4>
                        {/if}
                    </a>

                    {#if states.isEditMode}
                        <div class="actions">
                            {#if item.type === "folder"}
                                <button
                                    onclick={() => act.focus(item.id)}
                                    title="Focus on this folder">🔍</button
                                >
                                <button onclick={() => act.add(item.id, "file")}
                                    >📄</button
                                >
                                <button
                                    onclick={() => act.add(item.id, "folder")}
                                    >📁</button
                                >
                            {:else}
                                <button onclick={() => act.add(item.id, "file")}
                                    >📄</button
                                >
                            {/if}
                            <button onclick={(e) => startEditing(item, e)}
                                >E</button
                            >
                            <button onclick={() => act.delete(item.id)}
                                >D</button
                            >
                        </div>
                    {/if}
                </div>

                {#if item.expanded && item.children?.length > 0}
                    <div class="parent">
                        {@render folder(item.children)}
                    </div>
                {/if}
            </div>
        {/each}
    </div>
{/snippet}

<div class="wrap">
    <div class="header">
        <div class="breadcrumb">
            {#if act.isFocused}
                <button onclick={() => act.unfocus()} class="back-btn">P</button
                >
                <span class="breadcrumb-path">
                    {act.focusedPath.map((item) => item.name).join(" / ")}
                </span>
            {:else}
                <h3>Projects</h3>
                <div class="header-actions">
                    <button
                        onclick={() => addRootItem("folder")}
                        title="Add root folder">📁</button
                    >
                    <button
                        onclick={() => addRootItem("file")}
                        title="Add root file">📄</button
                    >
                </div>
            {/if}
        </div>
    </div>

    <div class="tree">
        {@render folder(act.displayData)}
        <!-- Changed from act.data -->
    </div>
</div>

<style>
    .wrap {
        width: 100%;
        height: 100vh;
        font-size: 14px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .header h3 {
        margin: 0;
        padding-left: 8px;
        font-size: 16px;
        font-weight: 600;
        color: #333;
    }

    .header-actions {
        display: flex;
        gap: 4px;
    }

    .header-actions button {
        padding: 4px 6px;
        border: none;
        background: transparent;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
        opacity: 0.7;
        transition: all 0.2s;
    }

    .header-actions button:hover {
        opacity: 1;
        background: #f1f3f4;
    }

    .tree {
        flex: 1;
        overflow-y: auto;
        padding-left: 16px;
    }

    /* Modern, clean styling */
    .menu-wrap {
        color: #333;
        height: 100%;
        padding: 0;
    }

    .folder {
        color: #9df30e;
        font-weight: 600;
    }

    .file {
        background: linear-gradient(90deg, #777a82 0%, #ffffff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        flex: 1;
        text-transform: capitalize;
        padding-left: 15px;
    }

    .parent {
        margin-top: 4px;
    }

    :global(.item-container) {
        margin: 0;
        border-radius: 0;
        padding: 0;
        position: relative;
        background: #373840;
        border-radius: 8px;
    }

    .item-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 1px 0;
        border-radius: 4px;
        transition: background-color 0.15s ease;
        position: relative;
    }

    .item-header:hover {
        opacity: 0.6;
    }

    .name-container {
        display: flex;
        align-items: center;
        gap: 6px;
        flex: 1;
        min-width: 0;
    }

    .actions {
        display: flex;
        gap: 4px;
        opacity: 0;
        transition: opacity 0.2s ease;
        margin-left: 8px;
    }

    /* Fix the hover issue - only show actions for the directly hovered item */
    .item-header:hover .actions {
        opacity: 1;
    }

    .actions button {
        padding: 6px 6px;
        font-size: 11px;
        cursor: pointer;
        background: #2d2b37;
        color: #333;
        border-radius: 6px;
        transition: all 0.15s ease;
        color: #666;
        white-space: nowrap;
    }

    .actions button:hover {
        opacity: 0.6;
    }

    .toggle-btn {
        background: none;
        border: none;
        cursor: pointer;
        padding: 2px 6px;
        font-size: 21px;
        color: #999;
        border-radius: 3px;
        transition: all 0.15s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 20px;
    }

    .toggle-btn:hover {
        background: #e0e0e0;
        color: #666;
    }

    h4 {
        margin: 0;
        cursor: pointer;
        padding: 4px 6px;
        border-radius: 4px;
        transition: all 0.15s ease;
        font-size: 14px;
        font-weight: 600;
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    h4.folder {
        font-weight: 500;
    }

    .edit-input {
        padding: 4px 8px;
        border: 2px solid #1976d2;
        border-radius: 4px;
        font-size: 14px;
        font-family: inherit;
        background: white;
        font-weight: inherit;
        flex: 1;
        min-width: 0;
    }

    .edit-input:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
    }

    :global(.dnd-zone) {
        min-height: 2rem;
        border-radius: 0;
    }

    /* Clean scrollbar */
    .menu-wrap::-webkit-scrollbar {
        width: 6px;
    }

    .menu-wrap::-webkit-scrollbar-track {
        background: transparent;
    }

    .menu-wrap::-webkit-scrollbar-thumb {
        background: #c1c1c1;
        border-radius: 3px;
    }

    .menu-wrap::-webkit-scrollbar-thumb:hover {
        background: #a8a8a8;
    }

    :global(.item-content) {
        display: flex;
        align-items: center;
        padding: 4px 8px;
        margin: 1px 8px;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.15s;
        position: relative;
        min-height: 28px;
    }

    :global(.item-content:hover) {
        background: #e8f0fe;
    }

    :global(.item-content.selected) {
        background: #1976d2;
        color: white;
    }

    :global(.toggle-btn) {
        width: 20px;
        height: 20px;
        border: none;
        background: transparent;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        color: #666;
        border-radius: 2px;
    }

    :global(.toggle-btn:hover) {
        background: rgba(0, 0, 0, 0.1);
    }

    :global(.file-icon) {
        width: 20px;
        text-align: center;
        font-size: 12px;
    }

    :global(.item-name) {
        flex: 1;
        margin-left: 6px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    :global(.item-name.folder) {
        font-weight: 500;
    }

    :global(.edit-input) {
        flex: 1;
        margin-left: 6px;
        padding: 2px 4px;
        border: 1px solid #4285f4;
        border-radius: 2px;
        font-size: 14px;
        font-family: inherit;
        background: white;
    }

    :global(.edit-input:focus) {
        outline: none;
        box-shadow: 0 0 0 1px #4285f4;
    }

    :global(.item-actions) {
        display: flex;
        gap: 2px;
        opacity: 0;
        transition: opacity 0.2s;
    }

    :global(.item-content:hover .item-actions) {
        opacity: 1;
    }

    :global(.item-content.selected .item-actions) {
        opacity: 1;
    }

    :global(.item-actions button) {
        padding: 2px 4px;
        border: none;
        background: transparent;
        border-radius: 2px;
        cursor: pointer;
        font-size: 10px;
        color: #666;
        transition: background-color 0.15s;
    }

    :global(.item-actions button:hover) {
        background: rgba(0, 0, 0, 0.1);
    }

    :global(.selected .item-actions button) {
        color: rgba(255, 255, 255, 0.8);
    }

    :global(.selected .item-actions button:hover) {
    }

    :global(.children) {
        /* Children are rendered with increased padding-left from renderItem function */
    }

    /* Scrollbar styling */
    .tree::-webkit-scrollbar {
        width: 0;
    }

    .breadcrumb {
        display: flex;
        width: 100%;
        align-items: center;
        height: 55px;
        padding-left: 15px;
    }
    .breadcrumb h3 {
        flex: 1;
    }
    .back-btn {
        width: 24px;
        height: 24px;
        display: grid;
        place-content: center;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 21px;
        font-weight: 900;
        margin-left: 3px;
        background: #b6fd32;
        color: #27272f;
        border-radius: 2px;
        margin-right: 6px;
        box-shadow:
            rgba(0, 0, 0, 0.4) 0px 2px 4px,
            rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
            rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    }

    .back-btn:hover {
        background: #1565c0;
    }

    .breadcrumb-path {
        font-size: 24px;
        font-weight: 900;
        color: #b6fd32;
    }

    .active-link .file {
        color: #1976d2 !important;
    }

    .parent .menu-wrap .item-container {
        padding-bottom: 2px;
        padding-top: 2px;
    }
    .dnd-zone {
        padding-bottom: 20px !important;
    }
    .breadcrumb h3 {
        font-size: 24px;
        font-weight: 800;
        background: linear-gradient(90deg, #777a82 0%, #ffffff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        padding-left: 0;
    }
    .active-link::before {
        content: " ";
        width: 6px;
        height: 6px;
        border-radius: 12px;
        background: rgb(32, 95, 220);
        position: absolute;
        top: 44%;
        left: -3px;
    }
</style>
