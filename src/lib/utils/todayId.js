export function todayId() {
  const today = new Date();

  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // +1 because months are 0-indexed
  const year = String(today.getFullYear()).slice(-2); // Get last 2 digits of year

  return `${day}-${month}-${year}`;
}

// Alternative one-liner version:
const getTodayShort = () => {
  const d = new Date();
  return `${String(d.getDate()).padStart(2, "0")}-${String(
    d.getMonth() + 1
  ).padStart(2, "0")}-${String(d.getFullYear()).slice(-2)}`;
};
