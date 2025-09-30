<script>
  export let daysInMonth = 31;
  export let yStart = "19:00";
  export let yEnd = "19:00"; // full 24h window

  // ✅ Desired sleep window overlay (on for all days)
  export let desiredRange = { start: "22:30", end: "05:30", show: true };

  export let sessions = [
    { day: 1, start: "22:00", end: "6:30", scoreTop: 6.8, scoreBottom: 99 },
    { day: 2, start: "1:10", end: "8:00", scoreTop: 7.2, scoreBottom: 86 },
    { day: 3, start: "1:30", end: "6:30", scoreTop: 8, scoreBottom: 88 },
    { day: 4, start: "22:00", end: "6:30", scoreTop: 6.5, scoreBottom: 99 },
    { day: 5, start: "22:10", end: "8:00", scoreTop: 7.5, scoreBottom: 86 },
    { day: 6, start: "22:30", end: "6:30", scoreTop: 8, scoreBottom: 88 },
    { day: 7, start: "22:00", end: "6:30", scoreTop: 9, scoreBottom: 99 },
    { day: 8, start: "22:10", end: "8:00", scoreTop: 9, scoreBottom: 86 },
    { day: 9, start: "21:30", end: "6:30", scoreTop: 8, scoreBottom: 88 },
    { day: 10, start: "22:00", end: "6:30", scoreTop: 9, scoreBottom: 99 },
    { day: 11, start: "21:10", end: "8:00", scoreTop: 9, scoreBottom: 86 },
    { day: 12, start: "21:30", end: "6:30", scoreTop: 8, scoreBottom: 88 },
  ];

  // 24×24 grid
  export let hourHeight = 20;
  export let colWidth = 24;
  export let gutter = 8;
  export let showMinorGrid = false;

  function timeToMinutes(t) {
    const [hh, mm] = t.split(":").map(Number);
    return hh * 60 + mm;
  }
  function minutesToLabel(m) {
    let h = Math.floor(m / 60) % 24;
    let mm = m % 60;
    if (h < 0) h += 24;
    return `${h}:${mm.toString().padStart(2, "0")}`;
  }

  const startMin = timeToMinutes(yStart); // 18:00 => 1080
  const endMinRaw = timeToMinutes(yEnd);
  const wrappedEnd = endMinRaw <= startMin ? endMinRaw + 1440 : endMinRaw;
  const totalMinutes = wrappedEnd - startMin; // 1440
  const totalHours = totalMinutes / 60; // 24

  // hour ticks 18:00 .. 18:00 (inclusive)
  const times = [];
  for (let m = startMin; m <= wrappedEnd; m += 60) {
    const label = minutesToLabel(m % (24 * 60));
    times.push({ m, label });
  }

  // Minutes from the top of the window (18:00) in [0..1440)
  function relMinute(t) {
    let m = timeToMinutes(t);
    if (m < startMin) m += 1440;
    return m - startMin; // 0..1439
  }

  // Split a window so it never crosses the 18:00 boundary
  function splitDesired(range) {
    if (!range?.show) return [];
    const a = relMinute(range.start);
    const b = relMinute(range.end);
    if (a === b) return [{ a: 0, b: 1440 }]; // full day
    if (b > a) return [{ a, b }]; // same day
    return [
      { a, b: 1440 },
      { a: 0, b },
    ]; // wraps across 18:00
  }

  // compute bands once reactively
  $: desiredBands = splitDesired(desiredRange);

  // convert minutes to px using your hourHeight
  function yPx(mins, hourHeight) {
    return (mins / 60) * hourHeight;
  }

  // Split every session so no block crosses the 18:00 boundary
  function splitToColumns(list) {
    const out = [];
    for (const s of list) {
      let a = relMinute(s.start);
      let b = relMinute(s.end);

      // If end equals start, treat as 24h — unlikely here, so skip
      if (a === b) continue;

      if (b > a) {
        // whole block stays within this day column
        out.push({ ...s, _a: a, _b: b });
      } else {
        // wraps across 18:00 — split into two pieces
        out.push({ ...s, _a: a, _b: 1440 }); // day n: a..18:00
        if (b > 0) {
          out.push({ ...s, day: s.day + 1, _a: 0, _b: b }); // day n+1: 18:00..b
        }
      }
    }
    return out;
  }

  // Use split sessions for rendering
  $: renderedSessions = splitToColumns(sessions);

  function sessionStyle(s) {
    const top = (s._a / 60) * hourHeight;
    const height = Math.max(8, ((s._b - s._a) / 60) * hourHeight);
    const left = (s.day - 1) * colWidth;
    return `left:${left}px;top:${top}px;height:${height}px;width:${colWidth - 1}px`;
  }

  // tooltip (unchanged)
  let tip = { show: false, x: 0, y: 0, content: "" };
  function showTip(e, s) {
    tip = {
      show: true,
      x: e.clientX + 12,
      y: e.clientY + 12,
      content: `Day ${s.day} • ${s.start} → ${s.end}${s.label ? ` • ${s.label}` : ""}`,
    };
  }
  function hideTip() {
    tip.show = false;
  }
</script>

<div class="wrap sleep-report">
  <div
    class="chart"
    style={`--days:${daysInMonth}; --col:${colWidth}px; --hour:${hourHeight}px; --hours:${totalHours}; --g:${gutter}px;`}
  >
    <div class="xaxis">
      {#each Array.from({ length: daysInMonth }) as _, i}
        <div class="xcell">{i + 1}</div>
      {/each}
    </div>

    <div class="yaxis" aria-hidden="true">
      {#each times as t}
        <div
          class="ylabel"
          style={`top:${((t.m - startMin) / 60) * hourHeight}px`}
        >
          {t.label}
        </div>
      {/each}
    </div>

    <div class="grid">
      {#each Array.from({ length: daysInMonth }) as _, i}
        <div class="vline" style={`left:${i * colWidth}px`}></div>
      {/each}
      {#each times as t}
        <div
          class="hline"
          style={`top:${((t.m - startMin) / 60) * hourHeight}px`}
        ></div>
      {/each}
      {#if showMinorGrid}
        {#each times.slice(0, -1) as t}
          <div
            class="hline minor"
            style={`top:${((t.m - startMin + 30) / 60) * hourHeight}px`}
          ></div>
        {/each}
      {/if}
    </div>
    <!-- 🔹 Desired window bands (drawn across ALL day columns) -->
    <div class="bands" aria-hidden="true">
      {#each desiredBands as b}
        <div
          class="band"
          style={`top:${yPx(b.a, hourHeight)}px;height:${yPx(b.b - b.a, hourHeight)}px`}
        />
      {/each}
    </div>
    <div class="layers" role="list">
      {#each renderedSessions as s (s.day + s.start + s.end + s._a)}
        <button
          role="listitem"
          class="block"
          style={sessionStyle(s)}
          aria-label={`Sleep day ${s.day}, from ${s.start} to ${s.end}`}
          on:mouseenter={(e) => showTip(e, s)}
          on:mousemove={(e) => showTip(e, s)}
          on:mouseleave={hideTip}
        >
          {#if s.scoreTop !== undefined}<span class="score top"
              >{s.scoreTop}</span
            >{/if}
          {#if s.scoreBottom !== undefined}<span class="score bottom"
              >{s.scoreBottom}</span
            >{/if}
        </button>
      {/each}
    </div>
  </div>

  {#if tip.show}
    <div class="tooltip" style={`left:${tip.x}px; top:${tip.y}px`}>
      {tip.content}
    </div>
  {/if}
</div>

<style>
  .sleep-report {
    --bg: #2f3e50;
    --panel: #2b3644;
    --panel-2: #232c37;
    --muted: #8fa0b3;
    --text: #e9f0f7;
    --grid: #07ec4c3d;
    --grid-minor: rgba(255, 255, 255, 0.03);
    --accent: #bde54f;
    --accent-text: #0f1a24;
    --shadow: rgba(0, 0, 0, 0.35);
    --radius: 14px;
  }

  .wrap {
    color: var(--text);
    padding: 24px;
    box-sizing: border-box;
  }

  .chart {
    position: relative;
    border-radius: var(--radius);
    padding: calc(var(--g) * 2) calc(var(--g) * 2) calc(var(--g) * 2)
      calc(var(--g) * 6.5);
    overflow: hidden;
    min-width: 720px;
    height: calc(var(--hours) * 22px); /* 24 rows × 24px */
  }

  .xaxis {
    position: absolute;
    left: calc(var(--g) * 6.5);
    right: var(--g);
    top: 0;
    display: grid;
    grid-template-columns: repeat(var(--days), var(--col));
    pointer-events: none;
  }
  .xcell {
    text-align: center;
    font-size: 0.9rem;
    color: var(--text);
    opacity: 0.9;
  }

  .yaxis {
    position: absolute;
    left: var(--g);
    top: calc(var(--g) * 2);
    bottom: calc(var(--g) * 2);
    width: calc(var(--g) * 5);
    /* REMOVED margin-top that caused 10px misalignment */
  }
  .ylabel {
    position: absolute;
    transform: translateY(-0.3rem);
    font-size: 11px;
    color: var(--muted);
  }

  .grid {
    position: absolute;
    inset: calc(var(--g) * 2) var(--g) calc(var(--g) * 2) calc(var(--g) * 6.5);
    pointer-events: none;
    /* REMOVED margin-top here too */
  }
  .vline,
  .hline {
    position: absolute;
    background: var(--grid);
  }
  .vline {
    top: 0;
    bottom: 0;
    width: 1px;
  }
  .hline {
    left: 0;
    right: 0;
    height: 1px;
  }
  .hline.minor {
    background: var(--grid-minor);
  }

  .layers {
    position: absolute;
    inset: calc(var(--g) * 2) var(--g) calc(var(--g) * 2) calc(var(--g) * 6.5);
  }

  .block {
    position: absolute;
    border: 0;
    border-radius: 3px;
    background: var(--accent);
    color: var(--accent-text);

    display: grid;
    grid-template-rows: auto 1fr auto;
    align-items: start;
    outline-offset: 3px;
    cursor: pointer;
    background: linear-gradient(
      180deg,
      #6cff1d 0%,
      #6cff1d 80.29%,
      #384252 80.3%
    );
    margin-left: 1px;
  }
  .block:hover {
    filter: brightness(1.03);
  }
  .score {
    font-weight: 700;
    font-size: 11px;
    padding: 2px 4px;
    line-height: 1;
  }
  .score.top {
    justify-self: center;
    align-self: start;
    margin-top: 6px;
  }
  .score.bottom {
    justify-self: center;
    align-self: end;
    margin-bottom: 6px;
    color: #fff;
  }

  .tooltip {
    position: fixed;
    z-index: 10;
    padding: 8px 10px;
    background: var(--panel-2);
    color: var(--text);
    border-radius: 8px;
    box-shadow: 0 6px 20px var(--shadow);
    font-size: 0.9rem;
    pointer-events: none;
    transform: translateY(-6px);
    white-space: nowrap;
  }
  .bands {
    position: absolute;
    inset: calc(var(--g) * 2) var(--g) calc(var(--g) * 2) calc(var(--g) * 6.5);
    pointer-events: none;
    z-index: 0; /* behind blocks */
  }
  .band {
    position: absolute;
    left: 0;
    right: 0;
    /* subtle highlight + top/bottom edges */
    background: rgba(27, 70, 179, 0.3);
    box-shadow:
      2px 2px 1px rgba(33, 28, 72, 0.53),
      inset 2px 2px 1px #8389b6;
    border-radius: 4px;
  }
</style>
