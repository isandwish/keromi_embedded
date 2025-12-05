#ifndef PIR_LOGIC_H
#define PIR_LOGIC_H

#include <Arduino.h>

// Exported status string for cloud/UI
extern String presenceStatus;

// Call this every loop with the current PIR reading (true = present)
void updatePirLogic(bool pirNow);

// Optional: reset logic (if needed)
void resetPirLogic();

#endif
