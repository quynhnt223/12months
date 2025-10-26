<script>
  let isOpen = $state(null);
  let data = $state([
    {
      date: "25-10-25",
      lunaDate: "6 thg 9",
      todo: [
        { todo: "Cầu nguyện", at: "17:00", check: false },
        {
          todo: "Làm từ thiện",
          at: "Ngay sau Lễ",
          note: "Ghi chú nhỏ2",
          check: false,
        },
      ],
    },
    {
      date: "30-10-25",
      lunaDate: "10 thg 9",
      todo: [
        { todo: "Cầu nguyện", at: "17:00", check: false },
        {
          todo: "Làm từ thiện",
          at: "17:45",
          note: "Ghi chú nhỏ",
          check: false,
        },
      ],
    },
    {
      date: "15-11-25",
      lunaDate: "25 thg 9",
      todo: [
        { todo: "Cầu nguyện2", at: "17:00", check: false },
        {
          todo: "Làm từ thiện",
          at: "17:45",
          note: "Ghi chú nhỏ",
          check: false,
        },
      ],
    },
  ]);

  const now = new Date();
  let current = $state(new Date(2025, 9, 1)); // October 2025
  let selected = $state(null);

  // ✅ derived (Svelte 5 runes mode)
  const year = $derived(current.getFullYear());
  const month = $derived(current.getMonth());
  const daysInMonth = $derived(new Date(year, month + 1, 0).getDate());
  const startDayRaw = $derived(new Date(year, month, 1).getDay());
  const startDay = $derived((startDayRaw + 6) % 7); // Monday first

  // ✅ localized month name
  const monthNames = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  // ✅ next upcoming
  function getNextUpcoming() {
    const todayNum = parseInt(
      `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(
        now.getDate()
      ).padStart(2, "0")}`
    );
    const parsed = data
      .map((d) => ({
        ...d,
        num: parseInt(
          `20${d.date.split("-")[2]}${d.date.split("-")[1]}${d.date.split("-")[0]}`
        ),
      }))
      .filter((d) => d.num >= todayNum)
      .sort((a, b) => a.num - b.num);
    return parsed[0] || data[0];
  }

  selected = getNextUpcoming();

  function format(d, m, y) {
    return `${String(d).padStart(2, "0")}-${String(m + 1).padStart(
      2,
      "0"
    )}-${String(y).slice(2)}`;
  }

  function getEvents(dateStr) {
    return data.find((d) => d.date === dateStr);
  }

  function isToday(dayNum, m, y) {
    return (
      now.getDate() === dayNum &&
      now.getMonth() === m &&
      now.getFullYear() === y
    );
  }

  function nextMonth() {
    current = new Date(current.getFullYear(), current.getMonth() + 1, 1);
  }

  function prevMonth() {
    current = new Date(current.getFullYear(), current.getMonth() - 1, 1);
  }

  function goToday() {
    current = new Date(now.getFullYear(), now.getMonth(), 1);
  }
  // Add this function after the goToday() function
  function getDaysUntil(dateStr) {
    // Parse dateStr format: "DD-MM-YY"
    const [day, month, yearShort] = dateStr.split("-");
    const eventDate = new Date(
      2000 + parseInt(yearShort),
      parseInt(month) - 1,
      parseInt(day)
    );

    // Reset time to midnight for accurate day calculation
    const todayMidnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const eventMidnight = new Date(
      eventDate.getFullYear(),
      eventDate.getMonth(),
      eventDate.getDate()
    );

    const diffTime = eventMidnight - todayMidnight;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Hôm nay";
    if (diffDays === 1) return "Ngày mai";
    if (diffDays < 0) return `${Math.abs(diffDays)} ngày trước`;
    return `${diffDays} ngày tới`;
  }
</script>

<div class="wrap">
  <div class="header">
    <button class="nav" onclick={prevMonth}
      ><span class="material-symbols-rounded">arrow_left</span></button
    >
    <div class="month">
      {monthNames[month]}

      <button class="todayBtn" onclick={goToday}>Hôm nay</button>
    </div>
    <button class="nav" onclick={nextMonth}
      ><span class="material-symbols-rounded">arrow_right</span></button
    >
  </div>

  <div class="grid">
    {#each ["T2", "T3", "T4", "T5", "T6", "T7", "CN"] as dayName}
      <div class="dayName">{dayName}</div>
    {/each}

    {#each Array(startDay).fill(null) as _}
      <div class="empty"></div>
    {/each}

    {#each Array(daysInMonth) as _, i}
      {@const dayNum = i + 1}
      {@const f = format(dayNum, month, year)}
      {@const hasEvent = getEvents(f)}
      {@const isNow = isToday(dayNum, month, year)}

      <div
        class="day"
        class:selected={selected?.date === f}
        class:today={isNow}
        onclick={() => (selected = hasEvent || selected)}
      >
        <span>{dayNum}</span>
        {#if hasEvent}
          <div class="dot"></div>
        {/if}
      </div>
    {/each}
  </div>

  <div class="events">
    {#if selected}
      <div class="title">
        <div class="normal">{selected.date}</div>
        <div class="luna">{selected.lunaDate}</div>
        <div class="coming">
          <span class="material-symbols-rounded">timer</span>{getDaysUntil(
            selected.date
          )}
        </div>
      </div>
      {#each selected.todo as t, i}
        <div class="todo">
          <div class="num">{i + 1}</div>
          <button class="item-name">{t.todo}</button>
          {#if t.note}
            <button class="open-note" onclick={() => (isOpen = i)}
              ><span class="material-symbols-rounded">sticky_note_2</span
              ></button
            >
          {/if}
          <div class="time-wrap">
            <div class="time">
              <span class="material-symbols-rounded">timer</span>
              {t.at}
            </div>
          </div>
          <div class="checkbox-wrap">
            <button
              onclick={() => (t.check = !t.check)}
              aria-label="btn"
              class="checkbox pop2"
              class:box-checked={t.check}
              ><span class="material-symbols-rounded">check_small</span></button
            >
          </div>
          {#if t.note && isOpen === i}<div class="note">
              {t.note}<button class="note-close" onclick={() => (isOpen = null)}
                ><span class="material-symbols-rounded">close</span></button
              >
            </div>{/if}
        </div>
      {/each}
    {:else}
      <div class="empty-event">Không có sự kiện sắp tới</div>
    {/if}
  </div>
</div>

<style>
  .wrap {
    border-radius: 8px;
    color: #f2f2f2;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .header {
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 2px;
    background: #54555c;
    border-radius: 5px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    padding: 6px;
    text-transform: uppercase;
  }
  .nav {
    background: #454345;
    border: none;
    color: #b8b8b8;
    height: 36px;
    width: 36px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 18px;
    transition: 0.2s;
    display: grid;
    place-content: center;
  }
  .nav:hover {
    background: #2f2f34;
    color: #1ef875;
  }

  .month {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    font-size: 36px;
    font-weight: 800;
    color: #888;
  }
  .todayBtn {
    background: #1ef875;
    border: none;
    color: #2f2f34;
    font-size: 16px;
    border-radius: 6px;
    padding: 2px 8px;
    height: 32px;
    margin-left: 8px;
    cursor: pointer;
    font-weight: 600;
    text-transform: uppercase;
  }
  .todayBtn:hover {
    opacity: 0.9;
  }

  .grid {
    background: #54555c;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
    border-radius: 5px;
    overflow: hidden;
    padding: 12px;
    padding-bottom: 20px;
    padding-top: 20px;
  }
  .dayName {
    text-align: center;
    font-size: 16px;
    opacity: 0.6;
    font-weight: 800;
    margin-bottom: 10px;
  }
  .empty {
    height: 40px;
  }
  .day {
    height: 50px;
    border-radius: 3px;
    font-size: 21px;
    font-weight: 600;
    text-align: center;
    position: relative;
    cursor: pointer;
    background: #454345;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    transition: 0.15s;
    color: #888;
  }
  .day.selected {
    background: #2f2f34;
  }
  .day:hover {
    background: #2f2f34;
  }

  .day.today {
    background: rgba(30, 248, 117, 0.15);
    color: #1ef875;
    border: 2px solid #1ef875;
  }
  .dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #1ef875;
    margin-top: 2px;
  }
  .events {
    margin-top: 6px;
    border-radius: 6px;
    min-height: 80px;
    overflow: hidden;
  }
  .title {
    background: #54555c;
    height: 48px;
    display: flex;
    align-items: center;
    font-size: 24px;
    font-weight: 600;
    padding: 3px;
    padding-left: 6px;
    color: #b8b8b8;
  }
  .todo {
    background: #454345;
    margin-top: 1px;
    height: 42px;
    display: flex;
    align-items: center;
    padding-left: 3px;
  }
  .note {
    position: absolute;
    z-index: 999;
    inset: 24px;
    top: 50%;
    height: 168px;
    font-size: 16px;
    border-radius: 6px;
    background: #2f2f34;
    border: 1px solid #454345;
    box-shadow:
      0px 6px 8px 3px rgba(0, 0, 0, 0.25),
      inset 0px 2px 1px #54555c;
    padding: 8px;
  }
  .note-close {
    position: absolute;
    top: 6px;
    right: 6px;
    width: 36px;
    height: 36px;
    border-radius: 6px;
    background: #1ef875;
    display: grid;
    place-content: center;
    color: #2f2f34;
    border: none;
    cursor: pointer;
  }
  .empty-event {
    opacity: 0.6;
    text-align: center;
    font-size: 14px;
  }
  .normal,
  .luna {
    background: #454345;
    box-shadow:
      0px 3px 1px rgb(21 19 19 / 45%),
      inset 0px 1px 1px rgb(2 2 2 / 56%);
    backdrop-filter: blur(4px);
    height: 36px;
    padding: 3px;
    border-radius: 5px;
    margin-right: 6px;
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
    align-items: center;
  }
  .luna {
    color: #1ef875;
  }
  .num {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    background: #2f2f34;
    border-left: none;
    font-weight: 800;
    font-size: 18px;
    display: grid;
    place-content: center;
    color: #1ef875;
  }
  .item-name {
    flex: 1;
    padding-left: 10px;
    color: #b8b8b8;
    font-size: 1rem;
    transition: all 0.3s;
    background: none;
    text-align: left;
    border: none;
    cursor: pointer;
  }
  .time {
    font-size: 10px;
    height: 32px;
    background: #1ef875;
    color: #2f2f34;
    font-weight: 700;
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 5px;
  }
  .time .material-symbols-rounded {
    font-size: 18px;
    margin-right: 3px;
  }
  .checkbox-wrap {
    width: 45px;
    height: 45px;
    display: grid;
    place-content: center;
  }
  .checkbox {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: none;
    color: #454345;
    border: solid 2px #1ef875;
    cursor: pointer;
  }
  .box-checked {
    background: #1ef875;
    color: #2f2f34;
  }
  .coming {
    font-size: 16px;
    height: 36px;
    background: #454345;
    padding: 6px;
    border-radius: 5px;
    flex: 1;
    display: flex;
    align-items: center;
  }
  .coming .material-symbols-rounded {
    font-size: 16px;
    margin-right: 6px;
  }
  .open-note {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    display: grid;
    place-content: center;
    opacity: 0.3;
    margin-right: 6px;
    background: none;
    border: none;
    cursor: pointer;
    color: #b8b8b8;
  }
</style>
