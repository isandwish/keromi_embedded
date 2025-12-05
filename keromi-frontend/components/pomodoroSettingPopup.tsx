/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";

interface PopupProps {
  open: boolean;
  onClose: () => void;
  onSave: (focusSec: number, breakSec: number) => void;
  defaultFocus: number;
  defaultBreak: number;
}

// ค่ามาตรฐานที่ต้องการให้รีเซ็ตกลับไป (25 นาที และ 5 นาที)
const DEFAULT_FOCUS_MINUTES = 25;
const DEFAULT_BREAK_MINUTES = 5;

// แปลงเป็นวินาที: 25 นาที = 1500 วินาที, 5 นาที = 300 วินาที
const RESET_FOCUS_SEC = DEFAULT_FOCUS_MINUTES * 60;
const RESET_BREAK_SEC = DEFAULT_BREAK_MINUTES * 60;

export default function PomodoroSettingPopup({
  open,
  onClose,
  onSave,
  defaultFocus,
  defaultBreak,
}: PopupProps) {
  // Helper function to convert total seconds to H/M/S
  const secondsToTime = (totalSeconds: number) => ({
    h: Math.floor(totalSeconds / 3600),
    m: Math.floor((totalSeconds % 3600) / 60),
    s: totalSeconds % 60,
  });

  const initialFocusTime = secondsToTime(defaultFocus);
  const initialBreakTime = secondsToTime(defaultBreak);

  const [focusH, setFocusH] = useState(initialFocusTime.h);
  const [focusM, setFocusM] = useState(initialFocusTime.m);
  const [focusS, setFocusS] = useState(initialFocusTime.s);

  const [breakH, setBreakH] = useState(initialBreakTime.h);
  const [breakM, setBreakM] = useState(initialBreakTime.m);
  const [breakS, setBreakS] = useState(initialBreakTime.s);

  // 🔹 อัปเดตเวลาเมื่อ defaultFocus/defaultBreak เปลี่ยน
  useEffect(() => {
    const newFocusTime = secondsToTime(defaultFocus);
    setFocusH(newFocusTime.h);
    setFocusM(newFocusTime.m);
    setFocusS(newFocusTime.s);

    const newBreakTime = secondsToTime(defaultBreak);
    setBreakH(newBreakTime.h);
    setBreakM(newBreakTime.m);
    setBreakS(newBreakTime.s);
  }, [defaultFocus, defaultBreak]);

  // 🔄 Function to reset the state to hardcoded default values (25 min focus, 5 min break)
  const onReset = () => {
    // Reset Focus Time to 25:00
    const resetFocusTime = secondsToTime(RESET_FOCUS_SEC);
    setFocusH(resetFocusTime.h); // 0
    setFocusM(resetFocusTime.m); // 25
    setFocusS(resetFocusTime.s); // 0

    // Reset Break Time to 05:00
    const resetBreakTime = secondsToTime(RESET_BREAK_SEC);
    setBreakH(resetBreakTime.h); // 0
    setBreakM(resetBreakTime.m); // 5
    setBreakS(resetBreakTime.s); // 0
  };

  if (!open) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 99,
      }}
      onClick={onClose}
    >
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          width: "350px",
          bgcolor: "#fff",
          borderRadius: "25px",
          maxWidth: "90%",
          p: 3,
        }}
      >
        {/* Focus Time */}
        <Typography sx={{ fontSize: 20, fontWeight: 700, mb: 1 }}>
          Focus Time
        </Typography>

        <Box sx={{ display: "flex", gap: 1.5, mb: 3 }}>
          {[focusH, focusM, focusS].map((value, index) => (
            <input
              key={index}
              type="number"
              min={0}
              value={value}
              onChange={(e) => {
                const val = Number(e.target.value);
                // Ensure value is non-negative
                if (val < 0) return;

                if (index === 0) setFocusH(val);
                if (index === 1) setFocusM(val);
                if (index === 2) setFocusS(val);
              }}
              style={{
                width: "75px",
                padding: "10px",
                fontSize: "18px",
                borderRadius: "10px",
                textAlign: "center",
                border: "1px solid #ccc",
              }}
            />
          ))}
        </Box>

        {/* Break Time */}
        <Typography sx={{ fontSize: 20, fontWeight: 700, mb: 1 }}>
          Break Time
        </Typography>

        <Box sx={{ display: "flex", gap: 1.5 }}>
          {[breakH, breakM, breakS].map((value, index) => (
            <input
              key={index}
              type="number"
              min={0}
              value={value}
              onChange={(e) => {
                const val = Number(e.target.value);
                // Ensure value is non-negative
                if (val < 0) return;

                if (index === 0) setBreakH(val);
                if (index === 1) setBreakM(val);
                if (index === 2) setBreakS(val);
              }}
              style={{
                width: "75px",
                padding: "10px",
                fontSize: "18px",
                borderRadius: "10px",
                textAlign: "center",
                border: "1px solid #ccc",
              }}
            />
          ))}
        </Box>

        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Reset Button */}
          <Typography
            sx={{
              color: "#f44336",
              fontSize: 16,
              fontWeight: 700,
              cursor: "pointer",
            }}
            onClick={onReset} // 👈 เรียกใช้ onReset ที่แก้ไขใหม่
          >
            Reset
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            {/* Cancel Button */}
            <Typography
              sx={{ color: "#888", fontSize: 16, cursor: "pointer" }}
              onClick={onClose}
            >
              Cancel
            </Typography>

            {/* Save Button */}
            <Typography
              sx={{ color: "#000", fontSize: 16, fontWeight: 700, cursor: "pointer" }}
              onClick={() => {
                const totalFocus = focusH * 3600 + focusM * 60 + focusS;
                const totalBreak = breakH * 3600 + breakM * 60 + breakS;

                // Simple validation to prevent negative or zero total time
                if (totalFocus <= 0 && totalBreak <= 0) {
                  alert("Both Focus and Break times cannot be zero or negative.");
                  return;
                }

                onSave(totalFocus, totalBreak);
                onClose();
              }}
            >
              Save
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}