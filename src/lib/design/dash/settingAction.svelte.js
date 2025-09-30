//loading data for menu component
//dm = data Manager
import { dm } from "$lib/data/sync.svelte.js";
import { states } from "$lib/states.svelte.js";

class Setting {
  data = $state("cool");

  constructor() {
    this.loadData(); // Start loading immediately
  }

  async loadData() {
    this.data = "not cool";

    // Wait for 3 seconds
    await new Promise((resolve) => setTimeout(resolve, 3000));

    this.data = "cool again :";
  }
}
export const setting = new Setting();
//import this setting in menu component and it will run as start??
