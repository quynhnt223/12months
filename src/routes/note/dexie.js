import Dexie from "dexie";

// Database setup
export const dbd = new Dexie("12monthsNote");
dbd.version(2).stores({
  files: "id", // Remove the ", data" - just use id as primary key
});

// Default note structure
export const createDefaultNote = (id) => ({
  id,
  title: "Title...",
  sections: [
    {
      title: "Understand",
      color: "#cbf434", // green-500
      items: [
        {
          id: crypto.randomUUID(),
          text: "What",
          completed: false,
          link1: "", // First link
          link2: "", // Second link
        },
        {
          id: crypto.randomUUID(),
          text: "Your Strategy",
          completed: false,
          link1: "", // First link
          link2: "", // Second link
        },
      ],
    },
    {
      title: "Steps",
      color: "#746afb", // green-500
      items: [],
    },
    {
      title: "Deep dives",
      color: "#56fb7f", // green-500
      items: [],
    },
    {
      title: "Notes & ideas",
      color: "#8b49ee", // green-500
      items: [],
    },
    {
      title: "Bugs",
      color: "#e15b5b", // green-500
      items: [],
    },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
});
