import admin from "firebase-admin";
import { readFile } from "fs/promises";

// โหลด JSON ของ service account
const serviceAccount = JSON.parse(
  await readFile(new URL("./serviceAccountKey.json", import.meta.url), "utf-8")
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://keromiproject-default-rtdb.asia-southeast1.firebasedatabase.app/" // Realtime DB
  });
}

export default admin.database(); // หรือ admin.database() ถ้าใช้ Realtime DB

