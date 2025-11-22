"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default function AirQualityBox() {
    return (
        <Box
            sx={{
                width: "977.38px",
                height: "437.71px",
                borderRadius: "60px",
                p: "30px",
                display: "flex",
                flexDirection: "column",
                background: "linear-gradient(to right, #EEEEEE, #E0D7E8)",
                boxShadow: "0px 0px 60px 0px #C1AFD1",
                alignItems: "center",
            }}
        >
            {/* 💟หัวข้อด้านบนกลาง */}
            <Typography
            sx={{
                color: "#EEEEEE",
                fontSize: "39.37px",
                borderRadius: "60px",
                width: "100%",
                py: "2px",
                px: "auto",
                backgroundColor: "#8260A2",
                fontWeight: "bold",
                textAlign: "center"
            }}>
                Air Quality
            </Typography>

            {/* 💟เนื้อหาแบ่งซ้าย/ขวา */}
            <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                flex: "1",
                justifyContent: "space-between",
                gap: "20px",
            }}>
                {/* 💟ซ้าย: รูป */}
                <Image
                src="/img/air.svg"
                alt="Air Quality Icon"
                width={135.62}
                height={291.59}
                className="object-contain"
                />

                {/* 💟ขวา: % + ข้อความ */}
                <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    ml: "50px",
                    gap: "3px",
                }}>
                    <Typography
                    sx={{
                        color: "#8260A2",
                        fontSize: "95px",
                        fontWeight: "bold",
                    }}>
                        85
                    </Typography>

                    <Typography
                    sx={{
                        color: "#8260A2",
                        fontSize: "46.13px",
                        fontWeight: "bold",
                    }}>
                        Perfect!!
                    </Typography>
                </Box>
            </Box>
        </Box>
        
    );
}