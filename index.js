const { ESP8266HTTPClient } = require("esp8266-http-client");
const { SSD1306 } = require("ssd1306/i2c");
const font = require("simple-fonts/lee-sans");

const esp8266 = new ESP8266HTTPClient(null, { debug: true });
const ssd1306 = new SSD1306();

// weather update interval
const interval = 1000 * 60 * 10; // 10 min.

// OpenWeatherMap location id
// e.g.) storage.setItem('OWM_LOC', '1835848'); // Seoul, Korea
// List of city ID city.list.json.gz can be downloaded from
//   http://bulk.openweathermap.org/sample/
const OWM_LOC = storage.getItem("OWM_LOC"); // seoul

// OpenWeatherMap API Key
const OWM_APIKEY = storage.getItem("OWM_APIKEY");

// weather icons
const w01d = require("./w01d.bmp.json");
const w02d = require("./w02d.bmp.json");
const w03d = require("./w03d.bmp.json");
const w04d = require("./w04d.bmp.json");
const w09d = require("./w09d.bmp.json");
const w10d = require("./w10d.bmp.json");
const w11d = require("./w11d.bmp.json");
const w13d = require("./w13d.bmp.json");
const w50d = require("./w50d.bmp.json");
const w01n = require("./w01n.bmp.json");
const w02n = require("./w02n.bmp.json");
const w10n = require("./w10n.bmp.json");

const icons = {
  "01d": w01d,
  "02d": w02d,
  "03d": w03d,
  "04d": w04d,
  "09d": w09d,
  "10d": w10d,
  "11d": w11d,
  "13d": w13d,
  "50d": w50d,
  "01n": w01n,
  "02n": w02n,
  "03n": w03d,
  "04n": w04d,
  "09n": w09d,
  "10n": w10n,
  "11n": w11d,
  "13n": w13d,
  "50n": w50d,
};

// graphic context
let gc = null;

function draw(data) {
  const icon = icons[data.weather[0].icon];
  const t = Math.round(data.main.temp);
  const tmin = Math.round(data.main.temp_min);
  const tmax = Math.round(data.main.temp_max);
  const hum = Math.round(data.main.humidity);
  gc.clearScreen();
  // gc.drawRect(0, 0, 127, 63);
  gc.drawBitmap(0, 0, icon, { scaleX: 2, scaleY: 2 });
  gc.setFontScale(3, 3);
  gc.drawText(70, 10, `${t}`);
  gc.setFontScale(1, 1);
  gc.drawText(70, 40, `${tmin}~${tmax} ${hum}%`);
  gc.drawText(70, 50, data.name);
  gc.display();
}

function update() {
  esp8266
    .http(
      `http://api.openweathermap.org/data/2.5/weather?id=${OWM_LOC}&appid=${OWM_APIKEY}&units=metric`
    )
    .then((res) => {
      console.log(res);
      var data = JSON.parse(res.body);
      console.log(data);
      console.log(data.weather);
      draw(data);
    })
    .catch((err) => {
      console.log(err);
      gc.clearScreen();
      gc.drawText(0, 20, "Failed to get\nweather info.");
      gc.display();
    });
}

function start() {
  gc.clearScreen();
  gc.display();
  gc.setFont(font);
  update();
  setInterval(update, interval);
}

// setup SSD1306
ssd1306.setup(board.i2c(0), { width: 128, height: 64 });
gc = ssd1306.getContext();
gc.setFont(font);
gc.clearScreen();
gc.display();

// setup ESP8266
console.log("connecting Wi-Fi...");
esp8266
  .wifi()
  .then(() => {
    console.log("Wi-Fi connected.");
    start();
  })
  .catch((err) => {
    console.log(err);
    gc.clearScreen();
    gc.drawText(0, 20, "Unable to connect\nWiFi network");
    gc.display();
  });
