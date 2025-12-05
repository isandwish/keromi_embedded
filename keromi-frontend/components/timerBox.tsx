"use client";

import { Box, Typography, IconButton } from "@mui/material";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import TimerStopwatchSwitch from "./materialUISwitch";
import PomodoroSettingPopup from "./pomodoroSettingPopup";
import { PIRProps } from "@/interfaces";

export default function TimerBox() {
  const safeSeconds = (val: number | null) => {
    const defaultSeconds = 25 * 60;
    if (!val) return defaultSeconds;
    if (isNaN(val)) return defaultSeconds;
    if (val > 18000) return defaultSeconds;
    if (val <= 0) return defaultSeconds;
    return val;
  };

  // --- ตั้งค่า Focus / Break ---
  const [focusTime, setFocusTime] = useState<number>(() => {
    if (typeof window === "undefined") return 25 * 60;
    const saved = localStorage.getItem("timerSeconds");
    return safeSeconds(saved ? Number(saved) : 25 * 60);
  });
  const [breakTime, setBreakTime] = useState<number>(() => {
    if (typeof window === "undefined") return 5 * 60;
    const savedBreak = localStorage.getItem("breakTimeSeconds");
    return safeSeconds(savedBreak ? Number(savedBreak) : 5 * 60);
  });
  const [timeLeft, setTimeLeft] = useState<number>(focusTime);

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [mode, setMode] = useState<"pomodoro" | "stopwatch">("pomodoro");
  const [isOnBreak, setIsOnBreak] = useState<boolean>(false);
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  // State: ติดตามว่ามีการเริ่มจับเวลาไปแล้วหรือยัง (ใช้สำหรับแสดงปุ่ม Stop ค้างไว้ใน Pomodoro)
  const [isTimeSet, setIsTimeSet] = useState<boolean>(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // ------------------------------
  // ⏳ ตัวนับเวลา
  // ------------------------------
  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (mode === "pomodoro") {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);

            if (!isOnBreak) {
              // Focus เสร็จ → เริ่ม Break
              setIsOnBreak(true);
              return breakTime;
            } else {
              // Break เสร็จ → reset
              setIsOnBreak(false);
              setIsRunning(false);
              setIsTimeSet(false);
              return focusTime;
            }
          }
          return prev - 1;
        }

        return prev + 1; // stopwatch mode
      });
    }, 1000);

    return () => clearInterval(intervalRef.current!);
  }, [isRunning, mode, isOnBreak, focusTime, breakTime]);

  // ------------------------------
  // ⏳ format เวลา
  // ------------------------------
  const formatTime = (seconds: number) => {
    const absSeconds = Math.abs(seconds);
    const h = Math.floor(absSeconds / 3600).toString().padStart(2, "0");
    const m = Math.floor((absSeconds % 3600) / 60).toString().padStart(2, "0");
    const s = Math.floor(absSeconds % 60).toString().padStart(2, "0");
    return `${h} : ${m} : ${s}`;
  };

  // ------------------------------
  // ▶ Pomodoro Pause / Start
  // ------------------------------
  const handlePomodoroStartPause = () => {
    setIsRunning((prev) => {
        // ถ้าสถานะเดิมเป็น 'ไม่วิ่ง' (กำลังจะเริ่ม) ให้ตั้งค่า isTimeSet เป็น true
        if (!prev) {
            setIsTimeSet(true);
        }
        return !prev;
    });
  };

  // ------------------------------
  // ▶ Stopwatch Start
  // ------------------------------
  const handleStopwatchStart = () => {
      // ใน Stopwatch, Start ก็คือการรัน
      setIsTimeSet(true); 
      setIsRunning(true);
  }

  // ------------------------------
  // ❌ Stop/Cancel (Reset)
  // ------------------------------
  const handleStop = () => {
    setIsRunning(false);
    setIsOnBreak(false);
    // เมื่อกด Stop ให้ reset isTimeSet เป็น false
    setIsTimeSet(false); 
    
    if (mode === "pomodoro") {
        setTimeLeft(focusTime);
    } else {
        setTimeLeft(0);
    }
  };

  // ------------------------------
  // 💾 Save setting จาก popup
  // ------------------------------
  const handleSaveSetting = (focusSec: number, breakSec: number) => {
    const safeFocus = safeSeconds(focusSec);
    const safeBreak = safeSeconds(breakSec);
    
    localStorage.setItem("timerSeconds", safeFocus.toString());
    localStorage.setItem("breakTimeSeconds", safeBreak.toString());

    setFocusTime(safeFocus);
    setBreakTime(safeBreak);
    setTimeLeft(safeFocus);
    setOpenPopup(false);
    setIsOnBreak(false);
    setIsTimeSet(false);
  };

  // ------------------------------
  // 🔁 Switch mode
  // ------------------------------
  const handleModeSwitch = (m: "pomodoro" | "stopwatch") => {
    setMode(m);
    setIsRunning(false);
    setIsOnBreak(false);
    setIsTimeSet(false);

    if (m === "pomodoro") {
      const saved = localStorage.getItem("timerSeconds");
      const seconds = safeSeconds(saved ? Number(saved) : 25 * 60);
      setFocusTime(seconds);
      setTimeLeft(seconds);
    } else {
      setTimeLeft(0);
    }
  };

  // ------------------------------
  // ⚙️ Icon Button Style
  // ------------------------------
  const iconButtonStyle = {
    width: 40,
    height: 40,
    backgroundColor: "#001e3c",
    borderRadius: "50%",
    boxShadow: "0px 2px 4px rgba(0,0,0,0.3)",
    color: "#FFFFFF",
    transition: "0.2s",
    "&:hover": { backgroundColor: "#001e3c" },
    "&:active": { transform: "scale(0.92)" },
  };

  // ------------------------------
  // ⬇️ Component Render
  // ------------------------------
  return (
    <Box sx={{ justifyContent: "center", justifyItems: "center" }}>
      {/* Head */}
      <Box sx={{ position: "center", zIndex: 1 }}>
        <Image src="/img/head.png" alt="Keromi Logo" width={101.01} height={78.6} />
      </Box>

      {/* Background */}
      <Box
        sx={{
          width: "354.79px",
          height: "298.31px",
          bgcolor: "#EEEEEE",
          borderRadius: "50%",
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
        {/* Mode Switch */}
        <Box sx={{ mt: "60px", mb: "10px" }}>
          <TimerStopwatchSwitch onModeChange={handleModeSwitch} />
        </Box>

        {/* Time Display */}
        <Typography
            onClick={() => setOpenPopup(true)}
            sx={{
              fontSize: "40px",
              fontWeight: "bold",
              color: "#3D383E",
              textAlign: "center",
              zIndex: 2,
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            {formatTime(timeLeft)}
          </Typography>

        {/* ------------------------------ */}
        {/* ⏸️ Play/Pause/Stop Buttons */}
        {/* ------------------------------ */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "15px",
            mt: "10px",
          }}
        >
          {/* ------------------------------------- */}
          {/* 1. ปุ่มหลัก: Start/Pause (Pomodoro) หรือ Start (Stopwatch) */}
          {/* ------------------------------------- */}
          {mode === "pomodoro" ? (
            // Pomodoro: แสดง Play หรือ Pause
            <IconButton onClick={handlePomodoroStartPause} sx={iconButtonStyle}>
              <Image
                src={isRunning ? "/img/pause.svg" : "/img/play.svg"}
                alt={isRunning ? "Pause Button" : "Play Button"}
                width={32}
                height={32}
              />
            </IconButton>
          ) : (
            // Stopwatch: แสดง Play ถ้ายังไม่วิ่ง หรือไม่มีปุ่ม ถ้ากำลังวิ่งอยู่
            !isRunning && (
              <IconButton onClick={handleStopwatchStart} sx={iconButtonStyle}>
                <Image
                  src="/img/play.svg"
                  alt="Play Button"
                  width={32}
                  height={32}
                />
              </IconButton>
            )
          )}
          
          {/* ------------------------------------- */}
          {/* 2. ปุ่ม Stop: แสดงเมื่อ Pomodoro ถูกเริ่มแล้ว หรือ Stopwatch กำลังวิ่งอยู่ */}
          {/* ------------------------------------- */}
          {(mode === "pomodoro" && isTimeSet) || (mode === "stopwatch" && isRunning) ? (
            <IconButton onClick={handleStop} sx={iconButtonStyle}>
              <Image
                src="/img/stop.svg"
                alt="Stop Button"
                width={32}
                height={32}
              />
            </IconButton>
          ) : null}

        </Box>


        {/* เด้ง block (Focus/Break Time Indicator) */}
        <Box
          sx={{
            minHeight: "40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isTimeSet && mode === "pomodoro" && (
            <>
              <Typography
                sx={{
                  fontSize: "19.9px",
                  color: "#8260A2",
                  fontWeight: "bold",
                  mb: "6px",
                }}
              >
                {isOnBreak ? "Break Time" : "Focus Time"}
              </Typography>
            </>
          )}
        </Box>
      </Box>

      {/* Popup */}
      <PomodoroSettingPopup
        open={openPopup}
        onClose={() => setOpenPopup(false)}
        onSave={handleSaveSetting}
        defaultFocus={focusTime}
        defaultBreak={breakTime}
      />
    </Box>
  );
}