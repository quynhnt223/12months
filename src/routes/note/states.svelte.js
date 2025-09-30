class AppState {
  isCardOpen = $state(false);
  cardId = $state(null);
  cardLink = $state(null);
  editCardLink = $state(null);
  isEditMode = $state(false);
}
export const states = new AppState();
