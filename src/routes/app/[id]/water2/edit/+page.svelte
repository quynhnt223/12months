<script>
  //step 1:
  console.log("you visit ");
  let items = {
    sharedDay: {
      name: "this is shared name...",
      goal: 2000,
      items: [{ ammount: 200, time: "6:30", realtime: "00:00" }],
    },
    days: {
      day01: {
        key: 1,
        name: "Cool",
        goal: 1000,
        items: [{ ammount: 100, time: "7:00", realtime: "00:00" }],
      },
      day02: {
        key: 2,
        name: "haha",
        goal: 1500,
        items: [{ ammount: 150, time: "8:00", realtime: "00:00" }],
      },
      day03: {
        key: 3,
        name: "ok mama",
        goal: 1200,
        items: [{ ammount: 120, time: "9:00", realtime: "00:00" }],
      },
      day06: {
        key: 4,
      },
      day07: {
        key: 5,
        name: "haha",
        goal: 900,
        items: [{ ammount: 90, time: "11:00", realtime: "00:00" }],
      },
      day08: {
        key: 6,
        name: "ok mama",
        goal: 1100,
        items: [{ ammount: 110, time: "12:00", realtime: "00:00" }],
      },
    },
  };

  // Reactive statement that updates name, goal, and items for days with key > 3 when sharedDay changes
  $: {
    if (items.sharedDay && items.days) {
      Object.keys(items.days).forEach((dayKey) => {
        if (items.days[dayKey].key > 3) {
          items.days[dayKey].name = items.sharedDay.name;
          items.days[dayKey].goal = items.sharedDay.goal;
          items.days[dayKey].items = [
            ...items.sharedDay.items.map((item) => ({ ...item })),
          ]; // Deep copy
        }
      });
    }
  }

  // Function to add new item to shared day
  function addItemToSharedDay() {
    items.sharedDay.items = [
      ...items.sharedDay.items,
      {
        ammount: Math.floor(Math.random() * 300) + 100, // Random amount between 100-400
        time: `${Math.floor(Math.random() * 12) + 6}:${Math.random() < 0.5 ? "00" : "30"}`, // Random time 6:00-18:30
        realtime: "00:00",
      },
    ];
  }
</script>

<div class="edit move">
  <h4>Design your day</h4>
  <div class="goal">
    <!-- Input to change shared day properties -->
    <label for="sharedName">Shared Day Name:</label>
    <input
      id="sharedName"
      type="text"
      bind:value={items.sharedDay.name}
      placeholder="Enter shared name"
    />

    <label for="sharedGoal">Shared Goal:</label>
    <input
      id="sharedGoal"
      type="number"
      bind:value={items.sharedDay.goal}
      placeholder="Enter goal amount"
    />

    <!-- Button to add items -->
    <button on:click={addItemToSharedDay}>Add Item to Shared Day</button>

    <!-- Display current values -->
    <div class="preview">
      <h5>Current Values:</h5>
      <div class="shared-section">
        <p>
          <strong>Shared:</strong>
          {items.sharedDay.name} (Goal: {items.sharedDay.goal})
        </p>
        <p><strong>Shared Items ({items.sharedDay.items.length}):</strong></p>
        <ul>
          {#each items.sharedDay.items as item, index}
            <li>
              #{index + 1} - Amount: {item.ammount}, Time: {item.time}, Real: {item.realtime}
            </li>
          {/each}
        </ul>
      </div>

      {#each Object.entries(items.days) as [dayKey, dayData]}
        <div class="day-section" class:synced={dayData.key > 3}>
          <p>
            <strong>{dayKey}:</strong>
            {dayData.name} (Goal: {dayData.goal || "N/A"}) {dayData.key > 3
              ? "🔄 Synced"
              : "🔒 Independent"}
          </p>
          <p><strong>Items ({dayData.items.length}):</strong></p>
          <ul>
            {#each dayData.items as item, index}
              <li>
                #{index + 1} - Amount: {item.ammount}, Time: {item.time}, Real: {item.realtime}
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .edit {
    position: absolute;
    z-index: 99;
    width: 700px;
    height: 700px;
    top: 68px;
    right: 300px;
    background: #fff;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 8px;
    border: solid 1px #eceaebff;
    padding: 20px;
    overflow-y: auto;
  }

  .goal {
    margin-top: 20px;
  }

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 15px;
  }

  button {
    background: #007cba;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 20px;
  }

  button:hover {
    background: #005a87;
  }

  .preview {
    background: #f5f5f5;
    padding: 15px;
    border-radius: 4px;
    border: 1px solid #ddd;
  }

  .preview h5 {
    margin: 0 0 15px 0;
  }

  .preview p {
    margin: 5px 0;
  }

  .shared-section {
    background: #e3f2fd;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 15px;
  }

  .day-section {
    background: #f9f9f9;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 10px;
    border-left: 4px solid #ddd;
  }

  .day-section.synced {
    background: #e8f5e8;
    border-left-color: #4caf50;
  }

  ul {
    margin: 5px 0 0 20px;
    padding: 0;
  }

  li {
    margin: 3px 0;
    font-size: 0.9em;
    color: #666;
  }
</style>
