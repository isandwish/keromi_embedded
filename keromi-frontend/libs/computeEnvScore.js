import baseline from "../../public/baseline_env.json";

function dev(x, median, iqr) {
  if (iqr === 0) return 1;
  return Math.exp(-Math.abs(x - median) / iqr);
}

export function computeEnvScore(sensor) {
  const temp = dev(sensor.temperature, baseline.temperature.median, baseline.temperature.iqr);
  const hum  = dev(sensor.humidity, baseline.humidity.median, baseline.humidity.iqr);
  const climate = (temp + hum) / 2;

  const light = dev(sensor.light, baseline.light.median, baseline.light.iqr);

  const rms  = dev(sensor.rms, baseline.rms.median, baseline.rms.iqr);
  const peak = dev(sensor.peak, baseline.peak.median, baseline.peak.iqr);
  const avg  = dev(sensor.avgAbs, baseline.avgAbs.median, baseline.avgAbs.iqr);
  const sound = (rms + peak + avg) / 3;

  const mq2 = dev(sensor.mq2, baseline.mq2.median, baseline.mq2.iqr);
  const mq135 = dev(sensor.mq135, baseline.mq135.median, baseline.mq135.iqr);
  const air = (mq2 + mq135) / 2;

  const final =
    100 * (
      0.30 * sound +
      0.25 * light +
      0.20 * climate +
      0.15 * air +
      0.10 * 1.0
    );

  return Math.min(100, Math.max(0, final));
}
