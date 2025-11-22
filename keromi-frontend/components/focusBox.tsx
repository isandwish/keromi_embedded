"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default function FocusBox() {
    return (
        <Box
          sx={{
            width: "977.38px",
            height: "437.71px",
            background: "linear-gradient(to right, #B19CC5, #8260A2, #3D383E)",
            borderRadius: "60px",
            boxShadow: "0px 0px 30px 0px #C1AFD1",
            mt: "35px",
            p: "15px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* 💟column LEFT: img + text บอกสถานะว่าเปอร์เซ็นเท่านี้แล้วอยู่ในเกณฑ์ไหน */}
          <Box
            sx={{
              width: "1/2",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {/* 💟detail: image */}
            <Box
              sx={{
                mt: "-100px",
              }}
            >
              <Image
                src="/img/perfect.png" 
                alt="Perfect Icon"
                width={405}
                height={384.23}
                className="object-contain"
              />
            </Box>

            {/* 💟detail: text */}
            <Typography
              sx={{
                fontWeight: "bold",
                color: "#EEEEEE",
                fontSize: "72px",
                mt: "5px"
              }}
            >
              Perfect!!
            </Typography>
          </Box>
            
          {/* 💟coloumn RIGHT: header + % */}
          <Box
            sx={{
              width: "1/2",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {/* 💟detail: text */}
            {/* 💟detail: header */}
            <Typography
              sx={{
                fontWeight: "bold",
                color: "#EEEEEE",
                fontSize: "48.64px",
                backgroundColor: "#3D383E",
                px: "170px",
                py: "10px",
                borderRadius: "60px",
                mt: "40px",
                mr: "20px",
              }}
            >
              Focus
            </Typography>
            {/* 💟detail: 90% */}
            <Typography
              sx={{
                fontWeight: "bold",
                color: "#EEEEEE",
                fontSize: "202.05px",
                mt: "-2px"
              }}
            >
              90%
            </Typography>
          </Box>
        </Box>
    );
}