export async function fetchCards() {
  const res = await fetch("/api/v1/cards");
  const cards = await res.json();
  return cards;
}
