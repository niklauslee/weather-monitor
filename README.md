# Overview

A classic Macintosh-style weather monitor with Wi-Fi and OLED display. It is programmed by JavaScript running on [Kaluma](https://kalumajs.org/) runtime. It requests weather information to [OpenWeatherMap](https://openweathermap.org/) and then show the info on the OLED display.

![photo1](https://github.com/niklauslee/weather-monitor/blob/main/images/photo1.jpg?raw=true)

# Components

| Part                            | Quantity | Note                      |
| ------------------------------- | -------- | ------------------------- |
| Raspberry Pi Pico               | 1        |                           |
| 1.3" OLED Display (SSD1306 I2C) | 1        | Purchased from Aliexpress |
| Wi-Fi module (ESP-01 module)    | 1        |                           |
| M3x6 screws                     | 4        |                           |
| M2x5 screws                     | 4        |                           |
| 3D printed case                 | 3 pieces |                           |
| Wires                           |          |                           |

# Prototype and Wiring

You can make a prototype with a breadboard.

| Raspberry Pi Pico | ESP8266    | SSD1306   |
| ----------------- | ---------- | --------- |
| 3V3               | VCC, CH_PD | VCC (VDD) |
| GND               | GND        | GND       |
| GP0 (UART0 TX)    | RXD        |           |
| GP1 (UART0 RX)    | TXD        |           |
| GP4 (I2C0 SDA)    |            | SDA       |
| GP5 (I2C0 SCL)    |            | SCL (SCK) |

![circuit](https://github.com/niklauslee/weather-monitor/blob/main/images/circuit.jpg?raw=true)

![assemble](https://github.com/niklauslee/weather-monitor/blob/main/images/assemble.jpg?raw=true)

# Assembly

To make it with a usable case, you need to print the case model using a 3D printer. I printed it using FDM-type printer with PLA filament. You can get model from Tinkercad and Thingiverse.

- Tinkercad: https://www.tinkercad.com/things/5YltzTUPnss
- Thingiverse: https://www.thingiverse.com/thing:4164035

![design](https://github.com/niklauslee/weather-monitor/blob/main/images/design.png?raw=true)

When you got the printed case, first you need to solder Pico and parts with wires without a breadboard. Guess enough length of wires based on the how the pieces of case will be assembled.

Then you need to mount OLED display to the front cover using M3x6 screws. Don't tighten too much the screws into the case.

![assembly1](https://github.com/niklauslee/weather-monitor/blob/main/images/assembly1.jpg?raw=true)

And mount Raspberry Pi Pico on the 3D-printed plate using M2x5 screws.

![assembly2](https://github.com/niklauslee/weather-monitor/blob/main/images/assembly2.jpg?raw=true)

Insert the plate into the case body and insert the case front cover to the case body.

![assembly3](https://github.com/niklauslee/weather-monitor/blob/main/images/assembly3.jpg?raw=true)

Lastly you can connect USB-cable through a hole on the back of the case body.

![assembly4](https://github.com/niklauslee/weather-monitor/blob/main/images/assembly4.jpg?raw=true)

# Setup

To run this project, you need to store several keys in storage via Terminal as below.

First, you have to assign `WIFI_SSID`, `WIFI_PASSWORD` keys in storage for your Wi-Fi network.

```js
> storage.setItem('WIFI_SSID', 'MyHome'); // WiFi SSID
> storage.setItem('WIFI_PASSWORD', '********'); // Wi-Fi Password
```

Then, you need to obtain API key from [OpenWeatherMap](https://openweathermap.org/).

```js
> storage.setItem('OWM_APIKEY', '********************'); // OpenWeatherMap API Key
```

Set the location where you want to get weather information from OpenWeatherMap.
List of city ID `city.list.json.gz` can be downloaded here: http://bulk.openweathermap.org/sample/

```js
> storage.setItem('OWM_LOC', '1835848'); // e.g.) Seoul
```

Lastly, upload this project to the Raspberry Pi Pico board.

# Usage

It periodically (10 min.) request weather information to OpenWeatherMap and show it on OLED display.
