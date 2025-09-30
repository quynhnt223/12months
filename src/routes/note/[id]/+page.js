import { goto } from "$app/navigation";
export async function load({ params }) {
  return {
    id: params.id,
  };
}
