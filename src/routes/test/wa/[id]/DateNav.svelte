<script>
  import { states } from "./states.svelte.js";
  let currentMonth = $state(new Date().getMonth()); // 0-11
  let currentYear = $state(new Date().getFullYear());

  const today = new Date();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();
  const todayDay = today.getDate();

  // Track active day (clicked day)
  let activeDay = $state(null);
  let activeMonth = $state(null);
  let activeYear = $state(null);

  const months = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];

  const monthName = $derived(months[currentMonth]);
  const daysInMonth = $derived(
    new Date(currentYear, currentMonth + 1, 0).getDate()
  );
  const days = $derived(Array.from({ length: daysInMonth }, (_, i) => i + 1));
  const isCurrentMonth = $derived(
    currentMonth === todayMonth && currentYear === todayYear
  );
  const isPastMonth = $derived(
    currentYear < todayYear ||
      (currentYear === todayYear && currentMonth < todayMonth)
  );

  const formatSlug = $derived.by(() => {
    return (day) => {
      const month = (currentMonth + 1).toString().padStart(2, "0");
      const dayStr = day.toString().padStart(2, "0");
      const yearStr = currentYear.toString().slice(-2);
      return `./${dayStr}-${month}-${yearStr}`;
    };
  });

  function isActiveDay(day) {
    return (
      activeMonth === currentMonth &&
      activeYear === currentYear &&
      activeDay === day
    );
  }

  function handleDayClick(day) {
    activeDay = day;
    activeMonth = currentMonth;
    activeYear = currentYear;
  }

  function previousMonth() {
    if (currentMonth === 0) {
      currentMonth = 11;
      currentYear = currentYear - 1;
    } else {
      currentMonth = currentMonth - 1;
    }
  }

  function nextMonth() {
    if (currentMonth === 11) {
      currentMonth = 0;
      currentYear = currentYear + 1;
    } else {
      currentMonth = currentMonth + 1;
    }
  }
</script>

<div class="monthly-nav">
  <div class="nav-header">
    <button class="nav-arrow" onclick={previousMonth}>◀</button>
    <h2 class="month-title">{monthName}, {currentYear}</h2>
    <button class="nav-arrow" onclick={nextMonth}>▶</button>
  </div>

  <div class="days-grid">
    {#each days as day}
      <a
        href={formatSlug(day)}
        class="day-link"
        class:active={isActiveDay(day)}
        class:selected={isCurrentMonth && day === todayDay}
        class:filled={isPastMonth || (isCurrentMonth && day <= todayDay)}
        onclick={() => handleDayClick(day)}
      >
        {day.toString().padStart(2, "0")}
      </a>
    {/each}
  </div>
  <h1>{states.docId}</h1>
</div>

<style>
  .monthly-nav {
    max-width: 800px;
    margin: 0 auto;
    font-family:
      system-ui,
      -apple-system,
      sans-serif;
  }

  .nav-header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    gap: 20px;
  }

  .nav-arrow {
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    padding: 8px;
    border-radius: 4px;
    transition: background-color 0.2s;
  }

  .nav-arrow:hover {
    background-color: #f0f0f0;
  }

  .month-title {
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 2px;
    margin: 0;
    min-width: 140px;
    text-align: center;
  }

  .days-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
  }

  .day-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    text-decoration: none;
    font-size: 12px;
    font-weight: 500;
    color: #666;
    border: 2px solid transparent;
    transition: all 0.2s ease;
    background-color: #f8f8f8;
  }

  .day-link:hover {
    background-color: #e8e8e8;
    transform: translateY(-1px);
  }

  .day-link.filled {
    background-color: #4caf50;
    color: white;
  }

  .day-link.selected {
    border-color: #2196f3;
    background-color: #2196f3;
    color: white;
  }

  .day-link.active {
    border-color: #ff9800;
    background-color: #ff9800;
    color: white;
    box-shadow: 0 0 8px rgba(255, 152, 0, 0.4);
  }

  .day-link.selected:hover {
    background-color: #1976d2;
  }

  .day-link.active:hover {
    background-color: #f57c00;
  }

  @media (max-width: 600px) {
    .days-grid {
      gap: 4px;
    }

    .day-link {
      width: 28px;
      height: 28px;
      font-size: 11px;
    }
  }
</style>
