<script>
  import { states } from "../../utils/states.svelte.js";
  let list = $state([
    {
      section: "⏱️ Về Thời gian Cúng",
      items: [
        {
          name: "🗓️ Ngày cúng",
          check: false,
          time: "hôm trước",
          img: "a1",
        },
        {
          name: "⏳ Giờ cúng",
          check: false,
          time: "16:50",
          img: "a2",
        },
        {
          name: "Các Đồng Tiền, Xếp vào Đàn Pháp",
          check: false,
          time: "17:00",
          img: "a3",
        },
      ],
    },
    {
      section: "🧠 Tâm Thế",
      items: [
        { name: "Tắm rửa, đánh răng", check: false, time: "16:30" },
        { name: "Thay quần áo", check: false },
        { name: "Thanh tẩy bằng Thần Thủy", check: false },
      ],
    },
    {
      section: "⚙️ Pháp hành",
      items: [
        { name: "🥢 Cách hơ lửa 3 cây nhang", check: false, time: "16:50" },
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
            <button
              class="item-name"
              class:checked={item.check}
              onclick={() => {
                states.img = item.img;
                states.isImageOpen = true;
                states.currentImgTitle = item.name;
              }}>{item.name}</button
            >
            <div class="time-wrap">
              <div class="time">
                <span class="material-symbols-rounded">timer</span>
                {item.time}
              </div>
            </div>
            <div class="checkbox-wrap">
              <button
                class="checkbox pop2"
                class:box-checked={item.check}
                onclick={() => check(item)}
                aria-label="btn"
                ><span class="material-symbols-rounded">check_small</span
                ></button
              >
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
    border-radius: 6px;
    margin-bottom: 1rem;
    color: #fff;
    overflow: hidden;
  }

  .section-header {
    height: 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #a6b9aa;
    padding-bottom: 2px;
  }
  .section-header h4 {
    padding: 8px;
    border-radius: 8px 8px 0 0;
    background: #3a3a3a;
    width: 100%;
  }
  .list {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }
  .num {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    background: #212121;
    border-left: none;
    font-weight: 800;
    font-size: 18px;
    display: grid;
    place-content: center;
    color: rgb(0, 206, 62);
  }
  .item {
    display: flex;
    align-items: center;
    height: 42px;
    background: rgb(66, 66, 66);
    padding-left: 3px;
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
    color: #424242;
    border: solid 2px rgb(0, 206, 62);
  }
  .box-checked {
    background: rgb(0, 206, 62);
    color: #212121;
  }
  .item-name {
    flex: 1;
    padding-left: 10px;
    color: #fff;
    font-size: 1rem;
    transition: all 0.3s;
    background: none;
    text-align: left;
  }

  .item-name.checked {
    text-decoration: line-through;
    color: #999;
  }
  .time {
    font-size: 10px;
    height: 32px;
    background: rgb(0, 206, 62);
    color: #000;
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
  .time-wrap {
    padding-left: 10px;
  }
</style>
