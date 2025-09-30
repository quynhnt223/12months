import { dbd } from "./dexie.js";
import { states } from "./states.svelte.js";
class CardViewLogic {
  cardData = $state("");
  isLoading = $state(false);
  cardId = $derived(states.cardId);
  saveTimeout = null;

  constructor() {}

  async loadCardData(id) {}

  async saveCardData(content) {}
}

export const act = new CardViewLogic();
