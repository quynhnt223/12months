import Dexie from "dexie";

export const dbd = new Dexie("noteApp");
dbd.version(1).stores({
  files: "id",
});
