"use client";

import TemperatureBox from "@/components/temperatureBox";
import LightBox from "@/components/lightBox";
import { Box } from "@mui/material";
import HumidityBox from "@/components/humidBox";
import AirQualityBox from "@/components/airQualityBox";
import SoundBox from "@/components/soundBox";
import FocusBox from "@/components/focusBox";
import TimerBox from "@/components/timerBox";
import AirMQ2Box from "@/components/airMQ2Box";
import AirMQ135Box from "@/components/airMQ135Box";

export default function Home() {

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
        <TimerBox />

        {/* ✳️row 2: focus*/}
        <FocusBox />

        {/* ✳️row 3: temp❄️ + light💡 */}
        <Box
          sx={{
            width: "354.79px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <TemperatureBox />
          <LightBox />
        </Box>

        {/* ✳️row 4: humidity💧 + sound🔊 */}
        <Box
          sx={{
            width: "354.79px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <HumidityBox />
          <SoundBox />
        </Box>

        {/* ✳️row 5: airMQ-2💨 + airMQ-135☁️ */}
        <Box
          sx={{
            width: "354.79px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <AirMQ2Box />
          <AirMQ135Box />
        </Box>

        {/* ✳️row 5: คุณภาพอากาศ☁️ */}
        {/* <AirQualityBox /> */}
      
      </Box>
    </Box>
  );
}
