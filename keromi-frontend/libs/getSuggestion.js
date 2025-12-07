export function getSuggestion(score) {
  if (score > 80) return "Excellent environment for studying ✨";
  if (score > 60) return "Good, but can be slightly improved.";
  if (score > 40) return "Not ideal. Check sound/light.";
  return "Poor environment ⚠️ Try adjusting lighting or reduce noise.";
}
