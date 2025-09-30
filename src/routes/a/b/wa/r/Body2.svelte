<script>
  // Sample data for September (30 days)
  let monthlyData = [
    { day: 1, from: "22:00", to: "06:00" },
    { day: 2, from: "23:00", to: "07:00" },
    { day: 3, from: "21:30", to: "05:30" },
    { day: 4, from: "22:30", to: "06:30" },
    { day: 5, from: "23:30", to: "07:30" },
    { day: 6, from: "22:00", to: "06:00" },
    { day: 7, from: "21:00", to: "05:00" },
    { day: 8, from: "22:00", to: "06:00" },
    { day: 9, from: "23:00", to: "07:00" },
    { day: 10, from: "22:30", to: "06:30" },
    { day: 11, from: "21:30", to: "05:30" },
    { day: 12, from: "22:00", to: "06:00" },
    { day: 13, from: "23:30", to: "07:30" },
    { day: 14, from: "22:00", to: "06:00" },
    { day: 15, from: "21:00", to: "05:00" },
    { day: 16, from: "22:30", to: "06:30" },
    { day: 17, from: "23:00", to: "07:00" },
    { day: 18, from: "22:00", to: "06:00" },
    { day: 19, from: "21:30", to: "05:30" },
    { day: 20, from: "22:30", to: "06:30" },
    { day: 21, from: "23:00", to: "07:00" },
    { day: 22, from: "22:00", to: "06:00" },
    { day: 23, from: "21:00", to: "05:00" },
    { day: 24, from: "22:30", to: "06:30" },
    { day: 25, from: "23:30", to: "07:30" },
    { day: 26, from: "22:00", to: "06:00" },
    { day: 27, from: "21:30", to: "05:30" },
    { day: 28, from: "22:00", to: "06:00" },
    { day: 29, from: "23:00", to: "07:00" },
    { day: 30, from: "22:30", to: "06:30" },
  ];

  // Generate time labels for the 24-hour period from 18:00 to 16:00 (hourly)
  const timeLabels = [];
  for (let i = 0; i < 23; i++) {
    const hour = (18 + i) % 24;
    timeLabels.push(`${hour.toString().padStart(2, "0")}:00`);
  }

  // Convert time string to hour number
  function timeToHour(timeStr) {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours + minutes / 60; // Include minutes for more precision
  }

  // Check if a given hour index is within sleep period for a specific day
  function isSleepingAtIndex(dayData, index) {
    const currentHour = (18 + index) % 24;
    const startHour = timeToHour(dayData.from);
    const endHour = timeToHour(dayData.to);

    if (startHour <= endHour) {
      // Sleep period doesn't cross midnight
      return currentHour >= startHour && currentHour < endHour;
    } else {
      // Sleep period crosses midnight
      return currentHour >= startHour || currentHour < endHour;
    }
  }

  // Generate sleep data for all days
  $: allSleepData = monthlyData.map((dayData) => ({
    day: dayData.day,
    sleepPattern: timeLabels.map((_, index) =>
      isSleepingAtIndex(dayData, index)
    ),
    totalSleepHours: calculateActualSleepHours(dayData),
  }));

  // Calculate actual sleep hours based on precise start/end times
  function calculateActualSleepHours(dayData) {
    const startHour = timeToDecimalHour(dayData.from);
    const endHour = timeToDecimalHour(dayData.to);

    if (startHour <= endHour) {
      return (endHour - startHour).toFixed(1);
    } else {
      return (24 - startHour + endHour).toFixed(1);
    }
  }
</script>

<div class="container">
  <h2>September Sleep Tracker</h2>

  <div class="wrap">
    <!-- Time column -->
    <div class="time-column">
      <div class="day-header">Time</div>
      {#each timeLabels as timeLabel}
        <div class="time">{timeLabel}</div>
      {/each}
    </div>

    <!-- Sleep visual columns for each day -->
    {#each allSleepData as dayData}
      <div class="sleep-column">
        <div class="day-header">{dayData.day}</div>
        {#each dayData.sleepPattern as isSleeping, index}
          <div class="block {isSleeping ? 'sleeping' : 'awake'}">
            {#if isSleeping}
              <span class="sleep-icon">😴</span>
            {/if}
          </div>
        {/each}
        <div class="sleep-total">{dayData.totalSleepHours}h</div>
      </div>
    {/each}
  </div>

  <!-- Summary stats -->
  <div class="summary">
    <p>
      Average sleep: {(
        allSleepData.reduce(
          (sum, day) => sum + parseFloat(day.totalSleepHours),
          0
        ) / allSleepData.length
      ).toFixed(1)} hours
    </p>
    <p>Total days tracked: {allSleepData.length}</p>
  </div>
</div>

<style>
  .container {
    padding: 20px;
    font-family: Arial, sans-serif;
  }

  h2 {
    margin-bottom: 20px;
    color: #333;
  }

  .wrap {
    display: flex;
    gap: 2px;
    overflow-x: auto;
    padding-bottom: 10px;
  }

  .time-column {
    flex-shrink: 0;
    margin-right: 10px;
  }

  .sleep-column {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
  }

  .block {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    border: 1px solid #ccc;
  }

  .time {
    width: 65px;
    height: 24px;
    display: flex;
    align-items: center;
    font-size: 12px;
    border: 1px solid #eee;
    padding-left: 5px;
  }

  .sleeping {
    background: #4caf50;
    color: white;
  }

  .awake {
    background: #ffc107;
  }

  .day-header {
    width: 24px;
    height: 24px;
    background: #2196f3;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 10px;
    border: 1px solid #1976d2;
  }

  .time-column .day-header {
    width: 65px;
    font-size: 12px;
  }

  .sleep-total {
    width: 24px;
    height: 20px;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 8px;
    font-weight: bold;
    border: 1px solid #ddd;
    margin-top: 2px;
  }

  .summary {
    margin-top: 20px;
    padding: 15px;
    background: #f9f9f9;
    border-radius: 5px;
    border: 1px solid #ddd;
  }

  .summary p {
    margin: 5px 0;
    font-size: 14px;
  }

  .sleep-icon {
    font-size: 8px;
  }
</style>
