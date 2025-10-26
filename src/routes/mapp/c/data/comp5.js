export const data = [
  {
    step: "1",
    name: "Chuẩn bị (30 phút)",
    type: "list",
    list: [
      {
        section: "Vật Phẩm",
        items: [
          { name: "Nước đã đun sôi để nguội", check: false },
          { name: "item 2", check: true },
          { name: "item 3", check: false },
        ],
      },
      {
        step: "2",
        section: "section 2",
        items: [
          { name: "item 4", check: true },
          { name: "item 5", check: false },
        ],
      },
    ],
  },
  { step: "2", name: "Lưu ý Quan trọng", type: "list2" },
  { step: "3", name: "3", type: "chant" },
  { step: "4", name: "3", type: "chant" },
  { step: "5", name: "3", type: "chant" },
  { step: "6", name: "Lịch Nghi Quỹ", type: "cal" },
];
