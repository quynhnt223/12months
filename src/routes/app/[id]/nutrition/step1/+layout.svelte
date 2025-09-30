<script>
  // Fixed month id (mmyy)
  let monthId = $state("0925");

  // Monthly data: always 31 days
  let monthData = $state({
    id: monthId,
    days: {},
  });

  function initMonth() {
    for (let d = 1; d <= 31; d++) {
      const key = String(d).padStart(2, "0");
      if (!monthData.days[key]) {
        monthData.days[key] = [];
      }
    }
  }

  // Save & Load
  function saveData() {
    console.log("Saving monthData:", monthData);
    localStorage.setItem("water-tracker-" + monthId, JSON.stringify(monthData));
  }

  $effect(() => {
    const saved = localStorage.getItem("water-tracker-" + monthId);
    if (saved) {
      monthData = JSON.parse(saved);
    } else {
      initMonth();
      saveData();
    }
  });
</script>

<div class="wrap">
  <h2>Water Tracker — {monthId}</h2>
  <pre>{JSON.stringify(monthData, null, 2)}</pre>
</div>

<style>
  .wrap {
    padding: 20px;
    background: #fff;
    border: 1px solid #ccc;
    width: 500px;
    font-size: 0.8rem;
    white-space: pre-wrap;
  }
</style>
