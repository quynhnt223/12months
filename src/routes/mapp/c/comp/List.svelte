<script>
  let list = $state([
    {
      section: "Vật phẩm",
      items: [
        {
          name: "Nước đã đun sôi để nguội, nhớ phải cho vào",
          check: false,
          time: "hôm trước",
        },
        { name: "Giấy đỏ quấn đốt nến", check: false, time: "16:50" },
        {
          name: "Các Đồng Tiền, Xếp vào Đàn Pháp",
          check: false,
          time: "17:00",
        },
      ],
    },
    {
      section: "Vệ Sinh",
      items: [
        { name: "Tắm rửa, đánh răng", check: false, time: "16:30" },
        { name: "Thay quần áo", check: false },
        { name: "Thanh tẩy bằng Thần Thủy", check: false },
      ],
    },
    {
      section: "Vào Lễ",
      items: [
        { name: "Rót nước", check: false, time: "16:50" },
        { name: "Thắp nến", check: false, time: "16:50" },
        { name: "Chỉnh Setting phone never", check: false },
        { name: "Check check Check", check: false },
        { name: "Gắn Phone vào Giá", check: false },
        { name: "Thắp nến", check: false },
      ],
    },
  ]);

  let newSection = $state("");
  let newItems = $state({});

  function addSection() {
    if (newSection.trim()) {
      list.push({ section: newSection, items: [] });
      newSection = "";
    }
  }

  function deleteSection(sectionIdx) {
    list.splice(sectionIdx, 1);
  }

  function addItem(sectionIdx) {
    const itemName = newItems[sectionIdx] || "";
    if (itemName.trim()) {
      list[sectionIdx].items.push({ name: itemName, check: false });
      newItems[sectionIdx] = "";
    }
  }

  function deleteItem(sectionIdx, itemIdx) {
    list[sectionIdx].items.splice(itemIdx, 1);
  }

  function check(item) {
    item.check = !item.check;
  }
</script>

<div class="container">
  <!-- Sections -->
  {#each list as section, sectionIdx}
    <div class="section">
      <div class="section-header">
        <h4>{section.section}</h4>
      </div>

      <!-- Items -->
      <div class="list">
        {#each section.items as item, itemIdx}
          <div class="item">
            <div class="num">{itemIdx + 1}</div>
            <span class="item-name" class:checked={item.check}>{item.name}</span
            >
            <div class="time-wrap">
              <div class="time">⏱️ {item.time}</div>
            </div>
            <div class="checkbox-wrap">
              <button
                class="checkbox pop2"
                class:box-checked={item.check}
                onclick={() => check(item)}
                aria-label="btn"
              ></button>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/each}
</div>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
  }

  .section {
    border-radius: 12px;
    margin-bottom: 1rem;
    color: #fff;
  }

  .section-header {
    height: 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #a6b9aa;
    padding-left: 6px;
  }
  .section-header h4 {
    padding: 8px;
    background: linear-gradient(157.28deg, #4d4d58 13.59%, #404046 85.24%);
    box-shadow: inset 0px 1px 1px #7b7b7b;
    border-radius: 6px 6px 2px 2px;
  }
  .list {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 5px;
  }
  .num {
    width: 36px;
    height: 50px;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    background: #2f2f34;
    display: grid;
    place-content: center;
    color: var(--gr1);
  }
  .item {
    display: flex;
    align-items: center;
    border-radius: 5px;
    height: 50px;
    background: linear-gradient(90deg, #3e3e44 0%, #45454c 100%);
    box-shadow: inset 0px 1px 1px #5a5050;
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
    border: solid 2px var(--gr1);
  }
  .box-checked {
    background: var(--gr1);
  }
  .item-name {
    flex: 1;
    padding-left: 10px;
    color: #fff;
    font-size: 1rem;
    transition: all 0.3s;
  }

  .item-name.checked {
    text-decoration: line-through;
    color: #999;
  }
  .time {
    font-size: 10px;
    height: 32px;
    background: var(--gr1);
    color: #000;
    font-weight: 700;
    border-radius: 5px;
    display: grid;
    place-content: center;
    padding: 5px;
  }
  .time-wrap {
    padding-left: 10px;
  }
</style>
