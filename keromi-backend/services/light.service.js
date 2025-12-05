export function normalizeLight(light) {
  const value = Math.min(100, Math.round((light / 4095) * 100));
  return { value };
}
