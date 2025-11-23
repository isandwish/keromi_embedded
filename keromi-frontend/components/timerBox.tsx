"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default function TimerBox() {
    return (
        <Box
        sx={{
            justifyContent: "center",
            justifyItems: "center",
            // mt: "1300px",
        }}>
            {/* ✳️head: 🩷 */}
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

            {/* 💟backgorund หน้าคุโรมิ🐈‍⬛ */}
            {/* 💟detail: วงกลม🟣 */}
            <Box
            sx={{
                width: "354.79px", 
                height: "298.31px",
                bgcolor: "#EEEEEE",
                borderRadius: "50%",
                // boxShadow: "0px 0px 60px 0px #C1AFD1",
                position: "relative",
                overflow: "visible",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                clipPath: 'polygon(30% 0%, 50% 25%, 70% 0%, 80% 0%, 100% 20%, 100% 100%, 0% 100%, 0% 20%)',          
                px: "17.45px",
                }}
            >

                {/* ✳️text✳️ */}
                <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyItems: "center",
                    alignItems: "center",
                    mt: "30px",
                    gap: "10px",
                }}
                >
                    {/* ปุ่มตั้งค่า (ซ้าย) */}
                    <button className="
                    px-2 py-1 
                    rounded-lg 
                    bg-[#8260A2] 
                    text-white 
                    font-bold 
                    text-xl">
                    ปุ่ม
                    </button>

                    {/* ตัวเลข */}
                    <Typography
                    sx={{
                    fontSize: "67.12px",
                    fontWeight: "bold",
                    color: "#3D383E",
                    textAlign: "center",
                    zIndex: 2,
                    }}
                    >
                    11 : 11
                    </Typography>

                    {/* ปุ่มเริ่ม (ขวา) */}
                    <button className="
                    px-2 py-1 rounded-lg 
                    bg-[#3D383E] text-white 
                    font-bold text-xl">
                        ปุ่ม
                    </button>
                </Box>

                <Typography
                sx={{
                    fontSize: "19.9px",
                    color: "#8260A2",
                    fontWeight: "bold",
                }}>
                    Keep reading na
                </Typography>
            </Box>
            
        </Box>
    );
}