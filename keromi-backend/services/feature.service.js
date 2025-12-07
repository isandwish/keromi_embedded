export function computeFeatures(d) {
  const temp_deviation = Math.abs(d.temperature - 25);
  const humidity_deviation = Math.abs(d.humidity - 50);
  const light_norm = Math.min(d.light / 500, 3);
  const light_deviation = Math.abs(light_norm - 1);
  const sound_burst_ratio = d.peak / (d.rms + 1e-6);
  const sound_stress = d.rms * 0.8 + sound_burst_ratio * 0.2;
  const gas_index = (d.mq2 * 0.4 + d.mq135 * 0.6) / 4096;
  const gas_stress = gas_index * 1.5;

  return {
    avgAbs: d.avgAbs,
    humidity: d.humidity,
    light: d.light,
    mq135: d.mq135,
    mq2: d.mq2,
    peak: d.peak,
    rms: d.rms,
    temperature: d.temperature,
    temp_deviation,
    humidity_deviation,
    light_norm,
    light_deviation,
    sound_burst_ratio,
    sound_stress,
    gas_index,
    gas_stress
  };
}
