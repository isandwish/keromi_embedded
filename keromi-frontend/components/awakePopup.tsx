import { Box, Typography, Button } from "@mui/material";

// 💡 กำหนด Type ให้กับ Props ที่รับเข้ามา
interface AwakePopupProps {
  open: boolean;
  onClose: () => void; // ฟังก์ชันที่เรียกเมื่อต้องการปิด
}

// 💡 รับ Props open และ onClose
export default function AwakePopup({ open, onClose }: AwakePopupProps) {
  // หาก 'open' เป็น false จะไม่แสดง Component ใด ๆ เลย (Early Return)
  if (!open) {
    return null;
  }

  return (
    // 1. Overlay / Backdrop (พื้นหลังสีเทาเข้ม)
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.5)", // ปรับความเข้มขึ้นเล็กน้อย
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999, // ควรมี Z-Index สูงกว่า Component อื่น
      }}
    >
      {/* 2. Popup Content Box */}
      <Box
        sx={{
          width: "350px",
          bgcolor: "#fff",
          borderRadius: "25px",
          maxWidth: "90%",
          p: 3,
        }}
      >
        <Typography variant="h5" component="h2" mb={2}>
          Where are you?
        </Typography>
        <Typography mb={3}>
          {/* คุณกำลังอยู่ในช่วง **Focus Time** หรือ **Break Time** การกดหยุดจะทำให้ Pomodoro Cycle สิ้นสุดลง */}
        </Typography>

        {/* 3. ปุ่มควบคุม */}
        <Box sx={{ display: "flex", justifyContent: "space-around", mt: 2 }}>
          {/* <Button
            variant="outlined"
            onClick={onClose} // 💡 เรียกฟังก์ชัน onClose ที่ส่งมาจาก Component แม่
            color="primary"
          >
            ยกเลิก
          </Button> */}
          <Button
            variant="contained"
            // ในสถานการณ์จริง ปุ่มนี้ควรเรียกฟังก์ชัน handleStop จาก TimerBox ผ่าน Props
            // แต่เนื่องจากโค้ดนี้ใช้สำหรับการทดสอบ ผมจะให้มันเรียก onClose แทนเพื่อให้ Popup ปิดได้
            onClick={onClose} 
            sx={{
                backgroundColor: "#8260A2",
                fontWeight: "bord"
            }}
          >
            Back to study
          </Button>
        </Box>
      </Box>
    </Box>
  );
}