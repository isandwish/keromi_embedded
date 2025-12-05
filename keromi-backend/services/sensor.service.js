import { realtimeDB } from "../config/db.js";
import { normalizeGas } from "./gas.service.js";
import { normalizeSound } from "./sound.service.js";
import { normalizeLight } from "./light.service.js";

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

  return {
    id: key,
    temperature: record.temperature,
    humidity: record.humidity,
    light: normalizeLight(record.light),
    gas: normalizeGas(record.mq2, record.mq135),
    sound: normalizeSound(record),
    pir: record.pir,
    timestamp: record.timestamp_iso,
  };
}
