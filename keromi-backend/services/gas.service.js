export function normalizeGas(mq2, mq135) {
  const gasIndex = (mq2 + mq135) / 2;
  const value = Math.min(100, Math.round((gasIndex / 4000) * 100));

  let level = "good";
  if (value > 60) level = "bad";
  else if (value > 30) level = "moderate";

  return { level, value };
}
