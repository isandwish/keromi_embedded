#include "inmp441.h"
#include "driver/i2s.h"

#define I2S_PORT I2S_NUM_0

static int PIN_BCLK = -1;
static int PIN_LRCLK = -1;
static int PIN_DATA = -1;

void inmp441_init(int pin_bclk, int pin_lrclk, int pin_data)
{
    PIN_BCLK  = pin_bclk;
    PIN_LRCLK = pin_lrclk;
    PIN_DATA  = pin_data;

    const i2s_config_t i2s_config = {
        .mode = (i2s_mode_t)(I2S_MODE_MASTER | I2S_MODE_RX),
        .sample_rate = 44100,
        .bits_per_sample = I2S_BITS_PER_SAMPLE_32BIT,
        .channel_format = I2S_CHANNEL_FMT_ONLY_LEFT,
        .communication_format = I2S_COMM_FORMAT_STAND_I2S,
        .intr_alloc_flags = ESP_INTR_FLAG_LEVEL1,
        .dma_buf_count = 4,
        .dma_buf_len = 256,
        .use_apll = false,
        .tx_desc_auto_clear = false,
        .fixed_mclk = 0
    };

    const i2s_pin_config_t pin_config = {
        .bck_io_num = PIN_BCLK,
        .ws_io_num = PIN_LRCLK,
        .data_out_num = -1,
        .data_in_num = PIN_DATA
    };

    i2s_driver_install(I2S_PORT, &i2s_config, 0, NULL);
    i2s_set_pin(I2S_PORT, &pin_config);
    i2s_zero_dma_buffer(I2S_PORT);
}

float calculate_dB(int32_t *samples, int count)
{
    double sum = 0;
    for (int i = 0; i < count; i++)
        sum += (double)samples[i] * samples[i];

    double rms = sqrt(sum / count);

    float dB = 20.0 * log10(rms / 1000.0);
    return dB;
}

float inmp441_readDB()
{
    int32_t samples[256];
    size_t bytes_read;

    i2s_read(I2S_PORT, samples, sizeof(samples), &bytes_read, portMAX_DELAY);

    int count = bytes_read / sizeof(int32_t);

    return calculate_dB(samples, count);
}
