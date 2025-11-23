"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default function HumidityBox() {
    return (
                <Box
                    sx={{
                        width: "168.94px",
                        height: "100%",
                        borderRadius: "21.83px",
                        p: "10px",
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
                        fontSize: "14.32px",
                        borderRadius: "60px",
                        width: "100%",
                        py: "2px",
                        px: "auto",
                        backgroundColor: "#8260A2",
                        fontWeight: "bold",
                        textAlign: "center"
                    }}>
                        Humidity
                    </Typography>
        
                    {/* 💟เนื้อหาแบ่งซ้าย/ขวา */}
                    <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        flex: "1",
                        justifyContent: "space-between",
                    }}>
                        {/* 💟ซ้าย: รูป */}
                        <Image
                        src="/img/humid.svg"
                        alt="Humidity Icon"
                        width={49.35}
                        height={106.11}
                        className="object-contain"
                        />
        
                        {/* 💟ขวา: % + ข้อความ */}
                        <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            ml: "15px",
                            gap: "3px",
                        }}>
                            <Typography
                            sx={{
                                color: "#8260A2",
                                fontSize: "22px",
                                fontWeight: "bold",
                            }}>
                                sth
                            </Typography>
        
                            <Typography
                            sx={{
                                color: "#8260A2",
                                fontSize: "16.79px",
                                fontWeight: "bold",
                            }}>
                                Perfect!!
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                
            );
}