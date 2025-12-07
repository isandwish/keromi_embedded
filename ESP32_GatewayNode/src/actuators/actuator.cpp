#include "actuator.h"
#include <Servo.h>

static Servo fanServo;
static int servoPin;
static bool fanState = false;

static const float TEMP_THRESHOLD = 30.0;   // อุณหภูมิเกณฑ์เปิดพัดลม
static const int FAN_ON_ANGLE  = 90;        // มุมเปิดพัดลม
static const int FAN_OFF_ANGLE = 0;         // มุมปิดพัดลม

void actuator_init(int pin) {
    servoPin = pin;
    fanServo.attach(servoPin);
    fanServo.write(FAN_OFF_ANGLE);
    fanState = false;

    Serial.println("[ACTUATOR] Servo initialized.");
}

void actuator_on() {
    fanServo.write(FAN_ON_ANGLE);
    fanState = true;
    Serial.println("[ACTUATOR] Fan ON (servo rotating)");
}

void actuator_off() {
    fanServo.write(FAN_OFF_ANGLE);
    fanState = false;
    Serial.println("[ACTUATOR] Fan OFF");
}

bool actuator_isOn() {
    return fanState;
}

void actuator_setTemperature(float temperature) {
    Serial.printf("[ACTUATOR] Temperature: %.2f°C\n", temperature);

    if (temperature > TEMP_THRESHOLD) {
        if (!fanState) {
            actuator_on();
        }
    } else {
        if (fanState) {
            actuator_off();
        }
    }
}
