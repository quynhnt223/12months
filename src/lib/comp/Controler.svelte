<script>
  import { createEventDispatcher } from "svelte";

  export let currentDate = new Date(2026, 5, 26); // June 26, 2026
  export let currentTime = "6:00:25 pm";
  export let activeView = "Day";

  const dispatch = createEventDispatcher();
  const views = ["Day", "Week", "Month", "Quarter", "Year"];

  // Format date as DD-MM-YYYY
  $: formattedDate = currentDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  function goToPrevious() {
    const newDate = new Date(currentDate);

    switch (activeView) {
      case "Day":
        newDate.setDate(newDate.getDate() - 1);
        break;
      case "Week":
        newDate.setDate(newDate.getDate() - 7);
        break;
      case "Month":
        newDate.setMonth(newDate.getMonth() - 1);
        break;
      case "Quarter":
        newDate.setMonth(newDate.getMonth() - 3);
        break;
      case "Year":
        newDate.setFullYear(newDate.getFullYear() - 1);
        break;
    }

    currentDate = newDate;
    dispatch("dateChange", { date: currentDate, view: activeView });
  }

  function goToNext() {
    const newDate = new Date(currentDate);

    switch (activeView) {
      case "Day":
        newDate.setDate(newDate.getDate() + 1);
        break;
      case "Week":
        newDate.setDate(newDate.getDate() + 7);
        break;
      case "Month":
        newDate.setMonth(newDate.getMonth() + 1);
        break;
      case "Quarter":
        newDate.setMonth(newDate.getMonth() + 3);
        break;
      case "Year":
        newDate.setFullYear(newDate.getFullYear() + 1);
        break;
    }

    currentDate = newDate;
    dispatch("dateChange", { date: currentDate, view: activeView });
  }

  function selectView(view) {
    activeView = view;
    dispatch("viewChange", { view: activeView, date: currentDate });
  }
</script>

<div class="date-controller">
  <!-- Navigation arrows with date/time -->
  <div class="date-navigation">
    <button class="nav-arrow" on:click={goToPrevious}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d="M7 9L4 6L7 3"
          stroke="#6366f1"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>

    <div class="date-time-display">
      <span class="date-time">
        {formattedDate} <span class="time">{currentTime}</span>
      </span>
    </div>

    <button class="nav-arrow" on:click={goToNext}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d="M5 3L8 6L5 9"
          stroke="#6366f1"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </div>

  <!-- View selector tabs -->
  <div class="view-selector">
    {#each views as view}
      <button
        class="view-tab"
        class:active={view === activeView}
        on:click={() => selectView(view)}
      >
        {view}
      </button>
    {/each}
  </div>
</div>

<style>
  .date-controller {
    display: flex;
    align-items: center;
    gap: 0;
    height: 32px;
    margin-left: 20px;
    flex: 1;
  }

  .date-navigation {
    display: flex;
    align-items: center;
    background: white;
    border-radius: 4px;
    height: 32px;
    padding: 0 8px;
    margin-right: 8px;
    border: 1px solid #e5e7eb;
  }

  .nav-arrow {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
    transition: background-color 0.2s;
    height: 20px;
    width: 20px;
  }

  .nav-arrow:hover {
    background: rgba(99, 102, 241, 0.1);
  }

  .date-time-display {
    padding: 0 12px;
    display: flex;
    align-items: center;
    min-width: 140px;
    justify-content: center;
  }

  .date-time {
    font-size: 14px;
    font-weight: 500;
    color: #1f2937;
    white-space: nowrap;
  }

  .time {
    color: #6366f1;
    font-weight: 500;
  }

  .view-selector {
    display: flex;
    background: #374151;
    border-radius: 4px;
    height: 32px;
    overflow: hidden;
  }

  .view-tab {
    background: none;
    border: none;
    color: #d1d5db;
    padding: 0 12px;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s;
    white-space: nowrap;
    height: 32px;
    display: flex;
    align-items: center;
    border-right: 1px solid #4b5563;
  }

  .view-tab:last-child {
    border-right: none;
  }

  .view-tab:hover:not(.active) {
    background: #4b5563;
    color: #f3f4f6;
  }

  .view-tab.active {
    background: #22c55e;
    color: white;
    font-weight: 600;
  }
</style>
