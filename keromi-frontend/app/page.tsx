"use client";

import TemperatureBox from "@/components/temperatureBox";
import LightBox from "@/components/lightBox";
import { Box,TextField } from "@mui/material";
import HumidityBox from "@/components/humidBox";
import AirQualityBox from "@/components/airQualityBox";
import SoundBox from "@/components/soundBox";
import FocusBox from "@/components/focusBox";
import TimerBox from "@/components/timerBox";
import { useEffect, useState } from "react";
import getData from "@/libs/getData";
import { SensorData } from "@/interfaces";

export default function Home() {
  const [data, setData] = useState<SensorData | null>(null);

    useEffect(() => {
      const interval = setInterval(async () => {
        const result: SensorData = await getData();
        console.log("Received data:", result);
        setData(result);
      }, 2000); // 2 วินาที

      return () => clearInterval(interval); // cleanup
    }, []);

      if (data != null) {
    console.log(data.light);       // 2799
    console.log(data.humidity);    // 64.5
    console.log(data.temperature); // 25.3
    console.log(data.sound);       // -120
  }

  return (
    <Box
      sx={{
        // maxWidth: "100vw", //1440
        minHeight: "100vh", //3120
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // bgcolor: "grey.400",
        overflow: "visible",
        // padding: 6,
      }}
    >
      {/* ❇️main */}
      <Box
        sx={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(to bottom, #3D383E, #8260A2, #8260A2)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          p: 4,
          overflow: "visible",
          position: "relative",
          gap: "20px",
        }}
      >
        {/* ✳️row 1: timer⏱️ */}
        <TimerBox pir={data?.pir ?? null}/>

        {/* Test PIR */}
        {/* <TextField
        label={data?.pir ?? null}    // แสดง label ด้านบน
        placeholder="Type here..." // placeholder
        size="small"             // ทำให้ TextBox เล็ก
        variant="outlined"       // หรือ filled / standard
        /> */}
        
        {/* ✳️row 2: focus*/}
        <FocusBox envScore={data?.envScore ?? null} />

        {/* ✳️row 3: temp❄️ + light💡 */}
        <Box
          sx={{
            width: "354.79px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <TemperatureBox temp={data?.temperature ?? null}/>
          <LightBox light={data?.light.value ?? null}/>
        </Box>

        {/* ✳️row 4: humidity💧 + sound🔊 */}
        <Box
          sx={{
            width: "354.79px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <HumidityBox humid={data?.humidity ?? null}/>
          <SoundBox value={data?.sound.value ?? null} level={data?.sound.level?? null}/>
        </Box>

        {/* ✳️row 5: airMQ-2💨 + airMQ-135☁️ */}
        {/* <Box
          sx={{
            width: "354.79px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <AirMQ2Box />
          <AirMQ135Box />
        </Box> */}

        {/* ✳️row 5: คุณภาพอากาศ☁️ */}
        <AirQualityBox value={data?.gas.value ?? null} level={data?.gas.level ?? null}/>
      
      </Box>
    </Box>
  );
}
