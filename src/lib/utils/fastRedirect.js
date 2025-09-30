export function fastRedirect() {
  const is12MonthsUser = localStorage.getItem("12monthsuser");

  if (is12MonthsUser === "true") {
    window.location.href = "/app";
  }
}
