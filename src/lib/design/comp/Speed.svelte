<script>
  export let startTime = "10:30 pm";
  export let endTime = "5:00 am";
  export let goalHours = 8;
  export let minSize = 150; // Minimum size for very small screens
  export let maxSize = 400; // Maximum size for very large screens

  // Function to parse time string to minutes since midnight
  function parseTimeToMinutes(timeStr) {
    const [time, period] = timeStr.split(" ");
    const [hours, minutes] = time.split(":").map(Number);

    let totalMinutes = (hours % 12) * 60 + minutes;
    if (period.toLowerCase() === "pm" && hours !== 12) {
      totalMinutes += 12 * 60;
    }
    if (period.toLowerCase() === "am" && hours === 12) {
      totalMinutes = minutes;
    }

    return totalMinutes;
  }

  // Calculate hours between start and end time
  function calculateHours(start, end) {
    const startMinutes = parseTimeToMinutes(start);
    const endMinutes = parseTimeToMinutes(end);

    let diffMinutes;
    if (endMinutes < startMinutes) {
      // Next day scenario (like 11:30 pm to 5:30 am)
      diffMinutes = 24 * 60 - startMinutes + endMinutes;
    } else {
      // Same day scenario
      diffMinutes = endMinutes - startMinutes;
    }

    return diffMinutes / 60;
  }

  // Calculate actual hours and progress
  $: actualHours = calculateHours(startTime, endTime);
  $: progress = Math.min(actualHours / goalHours, 1);
  $: displayHours = Math.round(actualHours * 10) / 10; // Round to 1 decimal

  // Calculate responsive size based on container width
  let containerElement;
  let containerWidth = 200;

  $: if (containerElement) {
    containerWidth = Math.max(
      minSize,
      Math.min(maxSize, containerElement.offsetWidth - 40)
    ); // Account for padding
  }

  // SVG semicircle properties (responsive)
  $: radius = containerWidth * 0.4;
  $: strokeWidth = containerWidth * 0.08;
  $: circumference = Math.PI * radius;
  $: svgWidth = containerWidth;
  $: svgHeight = containerWidth * 0.6;
  $: containerHeight = containerWidth * 0.7;

  // Calculate stroke dash offset for progress
  $: strokeDashoffset = circumference - progress * circumference;
</script>

<div
  class="timer-container"
  bind:this={containerElement}
  style="height: {containerHeight}px; --container-width: {containerWidth}px;"
>
  <svg
    width={svgWidth}
    height={svgHeight}
    class="progress-semicircle"
    viewBox="0 0 {svgWidth} {svgHeight}"
  >
    <!-- Background semicircle -->
    <path
      d="M {containerWidth * 0.1} {svgHeight -
        20} A {radius} {radius} 0 0 1 {containerWidth * 0.9} {svgHeight - 20}"
      fill="none"
      stroke="#2B6949"
      stroke-width={strokeWidth}
      opacity="1"
      stroke-linecap="round"
    />

    <!-- Progress semicircle -->
    <path
      d="M {containerWidth * 0.1} {svgHeight -
        20} A {radius} {radius} 0 0 1 {containerWidth * 0.9} {svgHeight - 20}"
      fill="none"
      stroke="#57F078"
      stroke-width={strokeWidth}
      stroke-dasharray={circumference}
      stroke-dashoffset={strokeDashoffset}
      stroke-linecap="round"
      class="progress-bar"
    />
  </svg>

  <!-- Center content -->
  <div class="center-content">
    <div class="hours">{displayHours}</div>
    <div class="hours-label">hrs</div>
  </div>
  <!-- time -->
  <div class="time-labels">
    <div class="number-label start-number">0</div>
    <div class="number-label end-number">{goalHours}</div>
  </div>
</div>

<style>
  .timer-container {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 10px;
    box-sizing: border-box;
  }

  .progress-semicircle {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
  }

  .progress-bar {
    transition: stroke-dashoffset 0.5s ease-in-out;
  }

  .center-content {
    position: absolute;
    top: 68%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: white;
  }

  .hours {
    font-size: calc(var(--container-width, 200px) * 0.25);
    font-weight: 500;
    line-height: 1;
    margin-bottom: 2px;
  }

  .hours-label {
    font-size: calc(var(--container-width, 200px) * 0.08);
    opacity: 0.8;
    font-weight: 500;
  }

  .number-label {
    position: absolute;
    font-size: calc(var(--container-width, 200px) * 0.1);
    color: white;
    font-weight: 600;
  }

  .start-number {
    bottom: -5px;
    left: calc(var(--container-width, 200px) * 0.125);
  }

  .end-number {
    bottom: -5px;
    right: calc(var(--container-width, 200px) * 0.125);
  }
</style>
