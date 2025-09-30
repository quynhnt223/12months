import { goto } from "$app/navigation";

export function load() {
  const val = localStorage.getItem("12monthsuser");
  if (val !== "true") {
    goto("/");
  }
}
