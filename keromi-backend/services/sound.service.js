export function normalizeSound(record) {
  const score = (record.rms + record.peak + record.avgAbs) / 3;
  const value = Math.min(100, Math.round((score / 0.02) * 100));

  let level = "quiet";
  if (value > 80) level = "very_noisy";
  else if (value > 60) level = "noisy";
  else if (value > 30) level = "normal";

  return { level, value };
}
