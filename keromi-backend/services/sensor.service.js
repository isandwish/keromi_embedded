import { realtimeDB } from "../config/db.js";
import { normalizeGas } from "./gas.service.js";
import { normalizeSound } from "./sound.service.js";
import { normalizeLight } from "./light.service.js";
import { predictScore } from "../services/aiScore.service.js";

export async function getAllSensorService() {
  const snapshot = await realtimeDB.ref("/sensor").once("value");
  return snapshot.val() || {};
}

export async function getLatestSensorService() {
  const snapshot = await realtimeDB
    .ref("/sensor")
    .orderByKey()
    .limitToLast(1)
    .once("value");

  const data = snapshot.val();
  const key = Object.keys(data)[0];
  return { id: key, ...data[key] };
}

export async function getLatestFormattedService() {
  const snapshot = await realtimeDB
    .ref("/sensor")
    .orderByKey()
    .limitToLast(1)
    .once("value");

  const data = snapshot.val();
  const key = Object.keys(data)[0];
  const record = data[key];

  const temperature = record.temperature;
  const humidity = record.humidity;
  const light = normalizeLight(record.light);
  const gas = normalizeGas(record.mq2, record.mq135);
  const sound = normalizeSound(record);
  
  // prepare raw input for AI prediction
  const scoreInput = {
    temperature,
    humidity,
    light: record.light,
    mq135: record.mq135,
    mq2: record.mq2,
    rms: record.rms,
    avgAbs: record.avgAbs,
    peak: record.peak
  };

  const envScore = predictScore(scoreInput);

  return {
    id: key,
    temperature,
    humidity,
    light,
    gas,
    sound,
    envScore,
    pir: record.pir,
    timestamp: record.timestamp_iso
  };
}