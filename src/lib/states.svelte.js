//global states
class States {
  todayDate = $state(this.formatDate(new Date()));
  userId = $state(localStorage.getItem("userId") || "");

  formatDate(date) {
    return date.toISOString().split("T")[0]; // "YYYY-MM-DD"
  }

  updateToday() {
    this.todayDate = this.formatDate(new Date());
  }

  setUserId(id) {
    this.userId = id;
    localStorage.setItem("userId", id);
  }
}

export const states = new States();
