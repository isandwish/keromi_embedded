#include "actuator.h"
#include <ESP32Servo.h>

static Servo fanServo;
static int servoPin;
static bool fanState = false;

static const float TEMP_THRESHOLD = 30.0;
static const int FAN_ON_ANGLE  = 90;

void actuator_init(int pin) {
    servoPin = pin;

    fanServo.detach();
    fanState = false;

    Serial.println("[ACTUATOR] Servo initialized (detached).");
}

void actuator_on() {
    fanServo.attach(servoPin, 500, 2400);
    fanServo.write(FAN_ON_ANGLE);

    fanState = true;
    Serial.println("[ACTUATOR] Fan ON (servo attached & rotating)");
}

void actuator_off() {
    // ปิดจริงแบบไม่ค้าง PWM ไม่กินไฟ ไม่ jitter
    fanServo.detach();

    fanState = false;
    Serial.println("[ACTUATOR] Fan OFF (servo detached)");
}

void actuator_setTemperature(float temperature) {
    if (isnan(temperature)) return;

    Serial.printf("[ACTUATOR] Temp: %.2f°C\n", temperature);

    if (temperature > TEMP_THRESHOLD && !fanState) {
        actuator_on();
    }
    else if (temperature <= TEMP_THRESHOLD && fanState) {
        actuator_off();
    }
}
