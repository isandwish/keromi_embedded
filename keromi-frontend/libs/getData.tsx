export default async function getData() {
    const url = process.env.BACKEND_URL+`/api/v1/sensor/latest/formatted`;
    console.log("Fetching:", url);

    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) throw new Error("Failed to fetch data");

    return res.json();
}
