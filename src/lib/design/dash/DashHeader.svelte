<script>
  import Icon from "$lib/Icon.svelte";
  import { states } from "$lib/states.svelte.js";
  import { goto } from "$app/navigation";

  function parsePageId(pageId) {
    if (!pageId) return null;
    const parts = pageId.split("-");
    if (parts.length !== 4) return null; // Now expecting 4 parts: ["dash", "DD", "MM", "YY"]

    // Skip the first part ("dash") and parse the date components
    const day = parseInt(parts[1], 10);
    const month = parseInt(parts[2], 10) - 1; // Convert to 0-based month
    const year = 2000 + parseInt(parts[3], 10); // Convert YY to YYYY

    return { day, month, year };
  }
  // Initialize from pageId if available, otherwise use current date
  const initializeFromPageId = () => {
    const parsed = parsePageId(states.pageId);
    if (parsed) {
      return {
        currentMonth: parsed.month,
        currentYear: parsed.year,
        activeDay: parsed.day,
        activeMonth: parsed.month,
        activeYear: parsed.year,
      };
    }
    // Fallback to current date
    const now = new Date();
    return {
      currentMonth: now.getMonth(),
      currentYear: now.getFullYear(),
      activeDay: null,
      activeMonth: null,
      activeYear: null,
    };
  };

  // Initialize state
  const initialState = initializeFromPageId();
  let currentMonth = $state(initialState.currentMonth);
  let currentYear = $state(initialState.currentYear);
  let activeDay = $state(initialState.activeDay);
  let activeMonth = $state(initialState.activeMonth);
  let activeYear = $state(initialState.activeYear);

  // React to pageId changes
  $effect(() => {
    const parsed = parsePageId(states.pageId);
    if (parsed) {
      currentMonth = parsed.month;
      currentYear = parsed.year;
      activeDay = parsed.day;
      activeMonth = parsed.month;
      activeYear = parsed.year;
    }
  });

  const today = new Date();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();
  const todayDay = today.getDate();

  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  // Day abbreviations
  const dayAbbreviations = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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

  // Check if we're viewing today's date
  let isViewingToday = $derived(
    activeDay === todayDay &&
      activeMonth === todayMonth &&
      activeYear === todayYear
  );

  // Get the today button icon color
  const todayIconColor = $derived(isViewingToday ? "#4a3797" : "#7353f7");

  const formatSlug = $derived.by(() => {
    return (day) => {
      const month = (currentMonth + 1).toString().padStart(2, "0");
      const dayStr = day.toString().padStart(2, "0");
      const yearStr = currentYear.toString().slice(-2);
      return `/ap/dash-${dayStr}-${month}-${yearStr}`;
    };
  });

  // Function to get day of week for a specific date
  function getDayOfWeek(day) {
    const date = new Date(currentYear, currentMonth, day);
    return dayAbbreviations[date.getDay()];
  }

  // Function to check if a day is the last day of the week
  function isLastDayOfWeek(day) {
    const date = new Date(currentYear, currentMonth, day);
    const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

    // If startOnMonday is 'mo' (Monday), then Sunday (0) is the last day
    // If startOnMonday is 'su' (Sunday), then Saturday (6) is the last day
    if (states.startOnMonday) {
      return dayOfWeek === 0; // Sunday
    } else {
      return dayOfWeek === 6; // Saturday
    }
  }

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
    fadeIn();
  }

  function fadeIn() {
    states.isFading = true;
    setTimeout(() => {
      states.isFading = false;
    }, 200);
  }

  function goToToday() {
    currentMonth = todayMonth;
    currentYear = todayYear;
    activeDay = todayDay;
    activeMonth = todayMonth;
    activeYear = todayYear;
    fadeIn();
    const todaySlug = formatTodaySlug();
    goto(todaySlug);
  }

  function formatTodaySlug() {
    const month = (todayMonth + 1).toString().padStart(2, "0");
    const dayStr = todayDay.toString().padStart(2, "0");
    const yearStr = todayYear.toString().slice(-2);
    return `/ap/${dayStr}-${month}-${yearStr}`;
  }

  function previousMonth() {
    if (currentMonth === 0) {
      currentMonth = 11;
      currentYear = currentYear - 1;
    } else {
      currentMonth = currentMonth - 1;
    }
    isViewingToday = false;
  }

  function nextMonth() {
    if (currentMonth === 11) {
      currentMonth = 0;
      currentYear = currentYear + 1;
    } else {
      currentMonth = currentMonth + 1;
    }
    isViewingToday = false;
  }
</script>

<div class="dash-header">
  <div class="dash-dates">
    {#each days as day}
      <a
        href={formatSlug(day)}
        class="dash-date"
        class:dash-date-active={isActiveDay(day)}
        class:dash-date-today={isCurrentMonth && day === todayDay}
        class:dash-date-pass={isPastMonth ||
          (isCurrentMonth && day <= todayDay)}
        class:dash-last-day-of-week={isLastDayOfWeek(day)}
        onclick={() => handleDayClick(day)}
        ><div class="dash-date-indicator"></div>
        <div class="day-of-week">{getDayOfWeek(day)}</div>
        <div class="day-of-month">{day.toString().padStart(2, "0")}</div>
      </a>
    {/each}
  </div>
  <div class="dash-month-nav">
    <button class="today-btn" data-label="Go to Today" onclick={goToToday}
      ><Icon name="today" color={todayIconColor} size="18"></Icon><span
        style="color:{todayIconColor}">Today</span
      ></button
    >
    <div class="dash-date-wrap">
      <button class="dash-btn" onclick={previousMonth}
        ><Icon name="previous" color="#566F31" size="28"></Icon></button
      >
      <div class="dash-month-name">
        <span>{monthName}</span><span class="dash-year-name">{currentYear}</span
        >
      </div>
      <button class="dash-btn" onclick={nextMonth}
        ><Icon name="next" color="#566F31" size="28"></Icon></button
      >
    </div>
    <button class="dash-btn dash-report"
      ><Icon name="report" color="#7353F7" size="28"></Icon></button
    >
  </div>
</div>

<style>
  .dash-header {
    background: #31313d;
    height: 55px;
    width: 100%;
    display: flex;
  }
  .dash-dates {
    flex: 1;
    display: flex;
    padding-left: 10px;
    align-items: center;
    justify-content: space-between;
  }
  .dash-date {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    flex-direction: column;
    font-size: 11px;
    font-weight: 500;
    height: 100%;
    color: var(--dashlime);
  }

  /* Add your custom styles for the last day of week here */
  .dash-last-day-of-week {
    border-right: solid 1px #515170;
  }
  .dash-date-indicator {
    width: 8px;
    height: 8px;
    border: solid 1px #fff;
    border-radius: 6px;
    margin-bottom: 3px;
  }
  .dash-date-pass .dash-date-indicator {
    background: var(--dashlime);
    border: solid 1px var(--dashlime);
    opacity: 0.3;
  }

  .dash-date-active .dash-date-indicator {
    background: #fff;
    opacity: 1;
  }
  .dash-date-today .dash-date-indicator {
    background: var(--dashlightblue);
    border: solid 1px var(--dashlightblue);
    opacity: 1;
  }
  .dash-date-active,
  .dash-date:hover {
    background: #1f2023;
    background: #232429;
    box-shadow: 0px 2px 1px rgba(17, 17, 32, 0.61);
    border-radius: 6px;
    margin-top: 2px;
    margin-bottom: 2px;
    height: 45px;
  }
  .day-of-week {
    font-weight: 700;
    font-size: 8px;
    color: #8b8c99;
  }
  .day-of-month {
    width: 16px;
    height: 16px;
    border-radius: 6px;
    display: grid;
    place-content: center;
    font-size: 12px;
  }
  .dash-month-nav {
    display: flex;
    align-items: center;
    padding-right: 8px;
    padding-left: 8px;
    padding-bottom: 5px;
  }
  .dash-btn {
    width: 36px;
    height: 36px;
    display: grid;
    place-content: center;
    border-radius: 8px;
    background: none;
  }
  .dash-btn:hover {
    opacity: 0.6;
  }
  .dash-month-name {
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-weight: 700;
    color: var(--dashlime);
    font-size: 12px;
  }
  .dash-year-name {
    font-size: 10px;
    color: #ffffff44;
    font-weight: 500;
  }
  .dash-report {
    margin-left: 6px;
    background: #232330;
    border-radius: 6px;
    box-shadow: 0px 2px 0px #121326;
  }
  .dash-date-wrap {
    display: flex;
    align-items: center;
    background: #232330;
    border-radius: 6px;
    box-shadow: 0px 2px 0px #121326;
  }
  .today-btn {
    width: 36px;
    height: 36px;
    background: #232330;
    margin-right: 6px;
    border-radius: 6px;
    box-shadow: 0px 2px 0px #121326;
    font-size: 8px;
    font-weight: 700;
    color: var(--dashlime);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 4px;
  }
</style>
