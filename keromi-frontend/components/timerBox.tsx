"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Setting from "@/app/setting/page";

export default function TimerBox() {
  const router = useRouter();

  // โหลดค่านาทีจาก Setting
  const getInitialTime = () => {
    const saved = localStorage.getItem("timerMinutes");
    return saved ? Number(saved) * 60 : 25 * 60;
  };

  // ⏳ State ของเวลา
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25:00 default
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // ⏱ นับถอยหลัง
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
            const saved = localStorage.getItem("timerMinutes");
            const min = saved ? Number(saved) : 25;
            return min * 60; // reset
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current!);
  }, [isRunning]);

  // ฟอร์แมตเวลา mm:ss
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m} : ${s}`;
  };

  // Start / Pause
  const handleStartPause = () => {
    setIsRunning((prev) => !prev);
  };

  // Cancel → reset time
  const handleCancel = () => {
    setIsRunning(false);
    const saved = localStorage.getItem("timerMinutes");
    const min = saved ? Number(saved) : 25;
    setTimeLeft(min * 60);
  };

  return (
    <Box sx={{ justifyContent: "center", justifyItems: "center" }}>
      {/* ✳️head */}
      <Box
        sx={{
          position: "center",
          zIndex: 1,
        }}
      >
        <Image
          src="/img/head.png"
          alt="Keromi Logo"
          width={101.01}
          height={78.6}
        />
      </Box>

      {/* 💟background */}
      <Box
        sx={{
          width: "354.79px",
          height: "298.31px",
          bgcolor: "#EEEEEE",
          borderRadius: "50%",
          position: "relative",
          overflow: "visible",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          clipPath:
            "polygon(30% 0%, 50% 25%, 70% 0%, 80% 0%, 100% 20%, 100% 100%, 0% 100%, 0% 20%)",
          px: "17.45px",
        }}
      >
        {/* ✳️ตัวเลข + ปุ่ม */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            mt: "30px",
            gap: "15px",
          }}
        >
          {/* Setting */}
          <Image
            src="/img/setting button.svg"
            alt="Setting Button"
            width={40}
            height={40}
            className="object-contain cursor-pointer"
            onClick={() => router.push("/setting")}
          />

          {/* เวลา */}
          <Typography
            sx={{
              fontSize: "60px",
              fontWeight: "bold",
              color: "#3D383E",
              textAlign: "center",
              zIndex: 2,
            }}
          >
            {formatTime(timeLeft)}
          </Typography>

          {/* Start / Pause */}
          <Image
            src={isRunning ? "/img/pause button.svg" : "/img/play button.svg"}
            alt="Play Button"
            width={40}
            height={40}
            className="object-contain cursor-pointer"
            onClick={handleStartPause}
          />
        </Box>

        {/* Keep reading na */}
        {isRunning && (
          <Typography
            sx={{
              fontSize: "19.9px",
              color: "#8260A2",
              fontWeight: "bold",
              mt: "10px",
            }}
          >
            Keep reading na
          </Typography>
        )}

        {/* 🔥 ปุ่ม Cancel */}
        {isRunning && (
          <Box
            onClick={handleCancel}
            sx={{
              mt: "10px",
              padding: "2px 14px",
              borderRadius: "20px",
            //   backgroundColor: "#E0D7E8",
              color: "#E0D7E8",
              fontSize: "12px",
              fontWeight: "bold",
              cursor: "pointer",
            //   boxShadow: "0px 0px 10px #C1AFD1",
              border: "2px solid #E0D7E8",
              "&:active": { transform: "scale(0.96)" },
            }}
          >
            Cancel
          </Box>
        )}
      </Box>
    </Box>
  );
}
