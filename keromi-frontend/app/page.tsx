"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "3120px",
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
          width: "1440px",
          maxHeight: "100vh",
          background: "linear-gradient(to bottom, #3D383E, #8260A2, #8260A2)",
          // border: "2px solid black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          p: 4,
          overflowY: "scroll",
          position: "relative",
        }}
      >
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
            width={370.1}
            height={288
            }
          />
        </Box>

        {/* ✳️row 1: timer⏱️ */}
        {/* 💟backgorund หน้าคุโรมิ🐈‍⬛ */}
          {/* 💟detail: วงกลม🟣 */}
          <Box
            sx={{
              width: "1300px",
              minHeight: "1093.04px",
              bgcolor: "#EEEEEE",
              borderRadius: "50%",
              // mt: 10,
              // boxShadow: "0px 0px 60px 0px #C1AFD1",
              position: "relative",
              overflow: "visible",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              clipPath: 'polygon(30% 0%, 50% 25%, 70% 0%, 80% 0%, 100% 20%, 100% 100%, 0% 100%, 0% 20%)',          
              }}
          >
          {/* 💟detail: สามเหลี่ยมคว่ำ🔻 commit test test*/}
          {/* <Box
            sx={{
              width: 0,
              height: 0,
              borderLeft: "360px solid transparent",
              borderRight: "360px solid transparent",
              borderTop: "420px solid #3D383E",
              position: "absolute",
              top: "-120px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          /> */}

          {/* ✳️text✳️ */}
          {/* ตัวเลข */}
          <Typography
            sx={{
              fontSize: "250px",
              fontWeight: "bold",
              color: "#3D383E",
              textAlign: "center",
              zIndex: 2,
            }}
          >
            11 : 11
          </Typography>

          {/* ปุ่มตั้งค่า (ซ้าย) */}
          <Box
            sx={{
              position: "absolute",
              left: "calc(50% - 600px)", // ปรับระยะห่างซ้าย-เลข
              // top: "50%",
              // transform: "translateY(-50%)",
            }}
          >
            <button className="px-6 py-4 rounded-lg bg-[#8260A2] text-white font-bold text-5xl">
              ปุ่ม
            </button>
          </Box>

          {/* ปุ่มเริ่ม (ขวา) */}
          <Box
            sx={{
              position: "absolute",
              right: "calc(50% - 600px)", // ปรับระยะห่างขวา-เลข
              // top: "50%",
              // transform: "translateY(-50%)",
            }}
          >
            <button className="px-6 py-2 rounded-lg bg-[#3D383E] text-white font-bold text-5xl">
              ปุ่ม
            </button>
          </Box>
        </Box>

        {/* ✳️row 2: focus*/}
        <div className="
        w-[1300px] 
        h-[583px] 
        mt-[180px] 
        rounded-[80px] 
        p-6 
        shadow-lg 
        flex 
        justify-between
        bg-gradient-to-r from-[#B19CC5] via-[#8260A2] to-[#3D383E]
        "
        style={{
          boxShadow: "0px 0px 60px 0px #C1AFD1",
        }}
        >
          {/* 💟column LEFT: img + text บอกสถานะว่าเปอร์เซ็นเท่านี้แล้วอยู่ในเกณฑ์ไหน */}
          <div className="
          w-1/2 
          flex 
          flex-col 
          items-center 
          justify-center 
          relative
          
          ">
            {/* 💟detail: image */}
            <div className="absolute -top-1/3">
              <Image
                src="/img/perfect.png" 
                alt="Perfect Icon"
                width={540}
                height={512.3}
                className="object-contain"
              />
            </div>
            {/* 💟detail: text */}
            <p className="
              mt-[320px]  // เว้นที่สำหรับรูปที่ลอยขึ้น
              font-semibold 
              text-white
              text-[90px]
            ">
              Perfect!!
            </p>
          </div>

          {/* 💟coloumn RIGHT: header + % */}
          <div className="
          w-1/2 
          flex 
          flex-col 
          items-center 
          justify-center
          mr-4
          ">
            {/* detail: header */}
            <p className="
            px-50
            py-2 
            bg-[#3D383E]
            rounded-full 
            text-[65px]
            text-[#EEEEEE]
            font-semibold"
            >
              Focus
            </p>
            {/* 💟detail: % */}
            <p className="
            mt-4 
            text-[200px]
            font-bold 
            text-white"
            >
              90%
            </p>
          </div>
        </div>

        {/* ✳️row 3: temp❄️ + light💡 */}
          <div className="w-[1300px] mt-[65px] flex justify-between">
          {/* 💟LEFT Box: temp❄️ */}
          <div
            className="
              w-[620px] 
              rounded-[80px] 
              p-6 
              flex 
              flex-col
              bg-gradient-to-r from-[#EEEEEE] to-[#E0D7E8]"
            style={{ boxShadow: "0px 0px 60px 0px #C1AFD1" }}
          >
            {/* 💟หัวข้อด้านบนกลาง */}
            <p className="
              text-[#EEEEEE] 
              text-[60px] 
              rounded-full
              px-4 py-2
              bg-[#8260A2]
              font-bold 
              text-center 
              
            ">
              Temperature
            </p>

            {/* 💟เนื้อหาแบ่งซ้าย/ขวา */}
            <div className="flex flex-row justify-between flex-1">
              {/* 💟ซ้าย: รูป */}
              <div className="w-[180.83px] flex items-center justify-center">
                <Image
                  src="/img/temp.svg"
                  alt="Temperature Icon"
                  width={180.83}
                  height={388.78}
                  className="object-contain"
                />
              </div>

              {/* 💟ขวา: % + ข้อความ */}
              <div className="w-[319px] flex flex-col items-center justify-center ml-6">
                {/* 💟detail: % */}
                <p className="
                  px-4 py-2 
                  rounded-lg 
                  text-[#8260A2] 
                  text-[80px]
                  font-bold
                ">
                  26 ํ
                </p>
                {/* 💟detail: บอกว่าอุณหภูมิเท่านี้เหมาะสมไหม */}
                <p className="
                  px-4 py-2 
                  rounded-lg 
                  text-[#8260A2] 
                  text-[40px]
                  font-regular
                ">
                  Perfect!!
                </p>
              </div>
            </div>
          </div>

          {/* 💟RIGHT Box: Light💡 */}
          <div
            className="
              w-[620px] 
              rounded-[80px] 
              p-6 
              flex 
              flex-col
              bg-gradient-to-r from-[#EEEEEE] to-[#E0D7E8]"
            style={{ boxShadow: "0px 0px 60px 0px #C1AFD1" }}
          >
            {/* 💟หัวข้อด้านบนกลาง */}
            <p className="
              text-[#EEEEEE] 
              text-[60px] 
              rounded-full
              px-4 py-2
              bg-[#8260A2]
              font-bold 
              text-center 
              
            ">
              Light
            </p>

            {/* 💟เนื้อหาแบ่งซ้าย/ขวา */}
            <div className="flex flex-row justify-between flex-1">
              {/* 💟ซ้าย: รูป */}
              <div className="w-[180.83px] flex items-center justify-center">
                <Image
                  src="/img/light.svg"
                  alt="Light Icon"
                  width={180.83}
                  height={388.78}
                  className="object-contain"
                />
              </div>

              {/* 💟ขวา: % + ข้อความ */}
              <div className="w-[319px] flex flex-col items-center justify-center ml-6">
                {/* 💟detail: % */}
                <p className="
                  px-4 py-2 
                  rounded-lg 
                  text-[#8260A2] 
                  text-[80px]
                  font-bold
                ">
                  350 lux
                </p>
                {/* 💟detail: บอกว่าอุณหภูมิเท่านี้เหมาะสมไหม */}
                <p className="
                  px-4 py-2 
                  rounded-lg 
                  text-[#8260A2] 
                  text-[40px]
                  font-regular
                ">
                  Perfect!!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ✳️row 4: humidity💧 + sound🔊 */}
        <div className="w-[1300px] mt-[65px] flex justify-between">
        {/* 💟LEFT Box: humidity💧 */}
          <div
            className="
              w-[620px] 
              rounded-[80px] 
              p-6 
              flex 
              flex-col
              bg-gradient-to-r from-[#EEEEEE] to-[#E0D7E8]"
            style={{ boxShadow: "0px 0px 60px 0px #C1AFD1" }}
          >
            {/* 💟หัวข้อด้านบนกลาง */}
            <p className="
              text-[#EEEEEE] 
              text-[60px] 
              rounded-full
              px-4 py-2
              bg-[#8260A2]
              font-bold 
              text-center 
              
            ">
              Humidity
            </p>

            {/* 💟เนื้อหาแบ่งซ้าย/ขวา */}
            <div className="flex flex-row justify-between flex-1">
              {/* 💟ซ้าย: รูป */}
              <div className="w-[180.83px] flex items-center justify-center">
                <Image
                  src="/img/temp.svg"
                  alt="Temperature Icon"
                  width={180.83}
                  height={388.78}
                  className="object-contain"
                />
              </div>

              {/* 💟ขวา: % + ข้อความ */}
              <div className="w-[319px] flex flex-col items-center justify-center ml-6">
                {/* 💟detail: % */}
                <p className="
                  px-4 py-2 
                  rounded-lg 
                  text-[#8260A2] 
                  text-[80px]
                  font-bold
                ">
                  26 ํ
                </p>
                {/* 💟detail: บอกว่าอุณหภูมิเท่านี้เหมาะสมไหม */}
                <p className="
                  px-4 py-2 
                  rounded-lg 
                  text-[#8260A2] 
                  text-[40px]
                  font-regular
                ">
                  Perfect!!
                </p>
              </div>
            </div>
          </div>

        {/* 💟RIGHT Box: Sound🔊 */}
        <div
            className="
              w-[620px] 
              rounded-[80px] 
              p-6 
              flex 
              flex-col
              bg-gradient-to-r from-[#EEEEEE] to-[#E0D7E8]"
            style={{ boxShadow: "0px 0px 60px 0px #C1AFD1" }}
          >
            {/* 💟หัวข้อด้านบนกลาง */}
            <p className="
              text-[#EEEEEE] 
              text-[60px] 
              rounded-full
              px-4 py-2
              bg-[#8260A2]
              font-bold 
              text-center 
              
            ">
              Sound
            </p>

            {/* 💟เนื้อหาแบ่งซ้าย/ขวา */}
            <div className="flex flex-row justify-between flex-1">
              {/* 💟ซ้าย: รูป */}
              <div className="w-[180.83px] flex items-center justify-center">
                <Image
                  src="/img/temp.svg"
                  alt="Temperature Icon"
                  width={180.83}
                  height={388.78}
                  className="object-contain"
                />
              </div>

              {/* 💟ขวา: % + ข้อความ */}
              <div className="w-[319px] flex flex-col items-center justify-center ml-6">
                {/* 💟detail: % */}
                <p className="
                  px-4 py-2 
                  rounded-lg 
                  text-[#8260A2] 
                  text-[80px]
                  font-bold
                ">
                  26 ํ
                </p>
                {/* 💟detail: บอกว่าอุณหภูมิเท่านี้เหมาะสมไหม */}
                <p className="
                  px-4 py-2 
                  rounded-lg 
                  text-[#8260A2] 
                  text-[40px]
                  font-regular
                ">
                  Perfect!!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ✳️row 5: คุณภาพอากาศ☁️*/}
        <div className="w-[1300px] mt-[65px] flex justify-center">
          <div
            className="
              w-[1300px] 
              rounded-[80px] 
              p-6 
              flex 
              flex-col
              bg-gradient-to-r from-[#EEEEEE] to-[#E0D7E8]"
            style={{ boxShadow: "0px 0px 60px 0px #C1AFD1" }}
          >
            {/* 💟หัวข้อด้านบนกลาง */}
            <p className="
              text-[#EEEEEE] 
              text-[60px] 
              rounded-full
              px-4 py-2
              bg-[#8260A2]
              font-bold 
              text-center 
              mb-6
            ">
              Air Quality
            </p>

            {/* 💟เนื้อหาแบ่งซ้าย/ขวา */}
            <div className="flex flex-row justify-center gap-x-10 flex-1">
              {/* 💟ซ้าย: รูป */}
              <div className="w-[180.83px] flex items-center justify-center">
                <Image
                  src="/img/temp.svg"
                  alt="Air Quality Icon"
                  width={180.83}
                  height={388.78}
                  className="object-contain"
                />
              </div>

              {/* 💟ขวา: % + ข้อความ */}
              <div className="w-[319px] flex flex-col items-center justify-center">
                <p className="
                  px-4 py-2 
                  rounded-lg 
                  text-[#8260A2] 
                  text-[80px]
                  font-bold
                ">
                  26 ํ
                </p>
                <p className="
                  px-4 py-2 
                  rounded-lg 
                  text-[#8260A2] 
                  text-[40px]
                  font-regular
                ">
                  Perfect!!
                </p>
              </div>
            </div>
          </div>
        </div>

      </Box>
    </Box>
  );
}
