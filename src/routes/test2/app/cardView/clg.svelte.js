// Main CArd View Business Logic write here
import { dm } from "../dexie.js";

class BusinessLogic {
  data = $state({});

  async update(docId) {
    this.data = { cool: "not cool" };
    await dm.update(docId, this.data);
  }
}

export const clg = new BusinessLogic();
