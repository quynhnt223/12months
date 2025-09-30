export const defaulData = {
  id: "side-nav",
  lastUpdated: "sometime",
  lastDocId: "someid",
  lastFocusId: "someId",
  data: [
    {
      // folder type have 6 property---------------------------------------
      id: "1",
      type: "folder",
      name: "1",
      isOpen: true,
      children: [
        {
          id: "1.1",
          type: "folder",
          name: "folder 1.1",
          isOpen: false,
          children: [{ id: "1.1.1", name: "child1.1.1" }],
        },
        // file type have only 3 property---------------------------------------------------
        { id: "1.2", type: "file", name: "1.2" },
      ],
    },
  ],
};

// Factory functions instead of static objects
export const createFolder = () => ({
  id: crypto.randomUUID(),
  type: "folder",
  name: "folder",
  isOpen: true,
  isFocus: false,
  children: [],
});

export const createFile = () => ({
  id: crypto.randomUUID(),
  type: "file",
  name: "file",
});
