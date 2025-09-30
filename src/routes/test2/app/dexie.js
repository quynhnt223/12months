import Dexie from "dexie";

// Database setup
export const dbd = new Dexie("12monthsNoteTest");
dbd.version(1).stores({
  files: "id", // Remove the ", data" - just use id as primary key
});

class DataManager {
  async load(fileId, data) {
    try {
      const result = await dbd.files.get(fileId);

      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async save(fileId, data) {
    try {
      const record = { id: fileId, data: JSON.parse(JSON.stringify(data)) };

      await dbd.files.put(record);
      console.log("Data saved");
    } catch (error) {
      console.log(error);
    }
  }
  // update specific field
  async update(fileId, data) {
    try {
      const result = await dbd.files.update(fileId, data);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  dfData1 = { lastUpdated: new Date().toISOString(), items: [] };
}

export const dm = new DataManager();
