<script>
  let currentMonth = "SEPTEMBER";
  let currentYear = 2024;
  let selectedDate = 6; // Default selected date

  // Split days into two halves
  const leftDays = Array.from({ length: 15 }, (_, i) => i + 1); // 1-15
  const rightDays = Array.from({ length: 16 }, (_, i) => i + 16); // 16-31

  // Sample data for filled/active dates (you can modify this)
  const activeDates = [1, 2, 3, 4, 5, 6]; // First 6 days are filled

  function selectDate(day) {
    selectedDate = day;
  }

  function previousMonth() {
    // Add logic to navigate to previous month
    console.log("Previous month");
  }

  function nextMonth() {
    // Add logic to navigate to next month
    console.log("Next month");
  }
</script>

<div class="calendar-container">
  <!-- Left side: Days 1-15 -->
  <div class="calendar-section left">
    <div class="dates-row">
      {#each leftDays as day}
        <div class="date-item">
          <div class="date-number">{day.toString().padStart(2, "0")}</div>
          <button
            class="date-dot"
            class:filled={activeDates.includes(day)}
            class:selected={selectedDate === day}
            on:click={() => selectDate(day)}
          >
          </button>
        </div>
      {/each}
    </div>
  </div>

  <!-- Center: Month Navigation -->
  <div class="month-navigation">
    <button class="nav-arrow left" on:click={previousMonth}>
      <svg
        width="8"
        height="10"
        viewBox="0 0 8 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.5 5.86603C-0.166666 5.48113 -0.166666 4.51887 0.5 4.13397L6.5 0.669874C7.16667 0.284974 8 0.766099 8 1.5359L8 8.4641C8 9.2339 7.16667 9.71503 6.5 9.33013L0.5 5.86603Z"
          fill="currentColor"
        />
      </svg>
    </button>

    <div class="month-title">{currentMonth}</div>

    <button class="nav-arrow right" on:click={nextMonth}>
      <svg
        width="8"
        height="10"
        viewBox="0 0 8 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.5 4.13397C8.16667 4.51887 8.16667 5.48113 7.5 5.86603L1.5 9.33013C0.833333 9.71503 -4.47338e-07 9.2339 -4.13689e-07 8.4641L-1.10848e-07 1.5359C-7.71986e-08 0.766098 0.833333 0.284973 1.5 0.669873L7.5 4.13397Z"
          fill="currentColor"
        />
      </svg>
    </button>
  </div>

  <!-- Right side: Days 16-31 -->
  <div class="calendar-section right">
    <div class="dates-row">
      {#each rightDays as day}
        <div class="date-item">
          <div class="date-number">{day}</div>
          <button
            class="date-dot"
            class:filled={activeDates.includes(day)}
            class:selected={selectedDate === day}
            on:click={() => selectDate(day)}
          >
          </button>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .calendar-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
  }

  .calendar-section {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .dates-row {
    display: flex;
    justify-content: space-between;
    height: 40px;
  }

  .date-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    flex: 1;
    cursor: pointer;
  }
  .date-item:hover {
    border-top: solid 3px var(--dblue);
    opacity: 0.6;
  }
  .date-number {
    font-size: 10px;
    font-weight: 700;
    color: var(--dblue);
    text-align: center;
    line-height: 1;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .date-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: 1px solid var(--dblue);
    cursor: pointer;
    transition: all 0.2s ease;
    padding: 0;
    margin: 0;
    background: transparent;
  }

  .date-dot:hover {
    border-color: #007bff;
    transform: scale(1.2);
  }

  .date-dot.filled {
    background: var(--dblue);
  }

  .date-dot.selected {
    background: #4caf50;
    border-color: #4caf50;
  }

  .month-navigation {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .month-title {
    font-size: 16px;
    font-weight: 900;
    color: var(--dblue);
    letter-spacing: 1px;
    margin: 0 8px;
    white-space: nowrap;
  }

  .nav-arrow {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: background-color 0.2s ease;
    color: var(--dblue);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
  }

  .nav-arrow:hover {
    background: var(--dblue);
    color: #ffffff;
  }

  .nav-arrow:active {
    background: #e5e5e5;
  }

  .nav-arrow svg {
    width: 11px;
    height: 11px;
  }
</style>
