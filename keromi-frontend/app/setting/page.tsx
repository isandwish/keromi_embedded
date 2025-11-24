"use client";

import { Box, Typography, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TimerBox from "@/components/timerBox";

export default function Setting() {
  const router = useRouter();

  const DEFAULT_MIN = 25;

  const getInitialMinutes = () => {
    const saved = localStorage.getItem("timerMinutes");
    return saved ? Number(saved) : DEFAULT_MIN;
  };

  const [minutes, setMinutes] = useState(getInitialMinutes);

  //   รีเซ็ตเป็นค่า default
  const handleReset = () => {
    setMinutes(DEFAULT_MIN);
    localStorage.setItem("timerMinutes", DEFAULT_MIN.toString());
  };

  //   บันทึก + กลับหน้าแรก
  const handleEnter = () => {
    localStorage.setItem("timerMinutes", minutes.toString());
    router.push("/");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
          gap: "30px",
        }}
      >
        <Typography
          sx={{
            fontSize: "34px",
            color: "#EEEEEE",
            fontWeight: "bold",
            mt: "40px",
          }}
        >
          Timer Setting
        </Typography>

        {/* ช่องกรอกนาที */}
        <TextField
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(Number(e.target.value))}
          sx={{
            width: "120px",
            input: {
              textAlign: "center",
              fontSize: "24px",
              fontWeight: "bold",
              color: "#3D383E",
              backgroundColor: "#FFFFFF",
              borderRadius: "10px",
            },
          }}
        />

        <Typography sx={{ color: "#FFFFFF", fontSize: "18px" }}>
          minutes
        </Typography>

        {/* ปุ่ม Reset */}
        <Button
          onClick={handleReset}
          sx={{
            backgroundColor: "#E0D7E8",
            color: "#3D383E",
            fontWeight: "bold",
            px: 4,
            py: 1,
            borderRadius: "14px",
            "&:hover": { backgroundColor: "#D1C3DD" },
          }}
        >
          Reset to Default
        </Button>

        {/* ปุ่ม Enter */}
        <Button
          onClick={handleEnter}
          sx={{
            backgroundColor: "#C1AFD1",
            color: "#3D383E",
            fontWeight: "bold",
            px: 5,
            py: 1.5,
            borderRadius: "18px",
            "&:hover": { backgroundColor: "#B39BC7" },
          }}
        >
          Enter
        </Button>
      </Box>
    </Box>
  );
}
