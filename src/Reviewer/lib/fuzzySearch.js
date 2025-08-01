export function fuzzySearch(substr, str) {
  const words = substr.toLowerCase().split(" ");
  str = str.toLowerCase();

  for (const word of words) {
    if (!str.includes(word)) return false;
  }

  return true;
}
