import Dexie from "dexie";

const dbd = new Dexie("12months");

dbd.version(1).stores({
  b: "id",
  c: "id",
  w: "id",
});

export async function add() {
  try {
    await dbd.b.put({ id: "1", name: "Item in b", baby: "cool" });
  } catch (err) {
    console.error("Save failed :", err);
  }
}

export async function remove() {
  try {
    await dbd.b.delete("1");
  } catch (err) {
    console.error("delete failed:", err);
  }
}
