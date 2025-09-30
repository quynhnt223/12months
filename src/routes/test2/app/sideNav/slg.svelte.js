// Main Side Nav Business Logic write here
import { dm } from "../dexie.js";

class BusinessLogic {
  data = $state({});

  async update() {
    this.data = { cool: "not cool" };
    await dm.update("123", this.data);
  }
}

export const slg = new BusinessLogic();
