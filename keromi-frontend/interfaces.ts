export interface SensorData {
  id: string;
  temperature: number;
  humidity: number;
  light: {
    value: number;
  };
  gas: {
    level: string;
    value: number;
  };
  sound: {
    level: string;
    value: number;
  };
  pir: string;
  timestamp: string; // ISO timestamp
}

export interface GasBoxProps {
  level: string | null; 
  value: number | null; 
}
export interface TemperatureBoxProps {
  temp: number | null; 
}

export interface LightBoxProps {
  light: number | null; 
}

export interface HumidBoxProps {
  humid: number | null; 
}

export interface SoundBoxProps {
  level: string | null; 
  value: number | null; 
}

export interface PIRProps {
  pir: string | null; 
}