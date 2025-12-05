import { useState } from "react";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";

const ModeSwitch = styled(Switch)(({}) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#aab4be'
      },
    },
  },

  // สี + ขนาด thumb เดิม
  '& .MuiSwitch-thumb': {
    backgroundColor: '#001e3c',
    width: 32,
    height: 32,
    borderRadius: 999,
    backgroundSize: "70% 70%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },

  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#aab4be',
    borderRadius: 20 / 2
  },
}));

interface TimerStopwatchSwitchProps {
  onModeChange?: (mode: "pomodoro" | "stopwatch") => void;
}

export default function TimerStopwatchSwitch({
  onModeChange,
}: TimerStopwatchSwitchProps) {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);

    // true = stopwatch, false = pomodoro
    onModeChange?.(newChecked ? "stopwatch" : "pomodoro");
  };

  return (
    <FormGroup>
      <FormControlLabel
        label={checked ? "Stop Watch" : "Pomodoro"}
        slotProps={{
          typography: { fontWeight: "bold" }
        }}
        control={
          <ModeSwitch
            checked={checked}
            onChange={handleChange}
            sx={{
              "& .MuiSwitch-thumb": {
                backgroundImage: `url(${checked ? "./img/stopwatch.svg" : "./img/timer.svg"})`,
                backgroundColor: "#001e3c",
              }
            }}
          />
        }
      />
    </FormGroup>
  );
}
