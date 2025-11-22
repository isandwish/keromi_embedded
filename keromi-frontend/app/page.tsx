"use client";

import TemperatureBox from "@/components/temperatureBox";
import LightBox from "@/components/lightBox";
import { Box } from "@mui/material";
import HumidityBox from "@/components/humidBox";
import AirQualityBox from "@/components/airQualityBox";
import SoundBox from "@/components/soundBox";
import FocusBox from "@/components/focusBox";
import TimerBox from "@/components/timerBox";

export default function Home() {
  return (
    <Box
      sx={{
        maxWidth: "1300px", //1440
        maxHeight: "100vh", //3120
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "grey.400",
        // fontFamily: "sans-serif",
        overflow: "visible",
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
          gap: "60px",
        }}
      >
        {/* ✳️row 1: timer⏱️ */}
        <TimerBox />

        {/* ✳️row 2: focus*/}
        <FocusBox />

        {/* ✳️row 3: temp❄️ + light💡 */}
        <Box
          sx={{
            width: "977.38px",
            height: "437.71px",
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
            width: "977.38px",
            height: "437.71px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <HumidityBox />
          <SoundBox />
        </Box>

        {/* ✳️row 5: คุณภาพอากาศ☁️*/}
        <AirQualityBox />
      
      </Box>
    </Box>
  );
}
