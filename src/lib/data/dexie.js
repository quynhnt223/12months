// $lib/data/dexie.js
import Dexie from "dexie";

// Create a database named "12months"
export const dbd = new Dexie("12months");

// Define tables (schema)
dbd.version(16).stores({
  docs: "id",
});
