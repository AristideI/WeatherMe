const apiKey = "50820dfac8d349a147f676612199f649";
let city = "kigali";
let deg = document.querySelector(".deg");
let country = document.querySelector(".country");
let time = document.querySelector(".time");
let lat = document.querySelector(".lat");
let lon = document.querySelector(".lon");
let templ = document.querySelector(".templ");
let temph = document.querySelector(".temph");
let wind = document.querySelector(".wind");
let pres = document.querySelector(".pres");
let humid = document.querySelector(".humid");
let wea = document.querySelector(".wea");
let wicon = document.querySelector(".wicon");
let desc = document.querySelector(".desc");
let clouds = document.querySelector(".clouds");
let img = document.querySelector(".img");
const days = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];
let future = document.querySelector(".future");

document.querySelector("select").addEventListener("change", function () {
  city = document.querySelector("select").value;
  console.log(city);
});

document.querySelector("button").addEventListener("click", function (e) {
  future.textContent = "";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const response = fetch(url);
  response
    .then((data) => data.json())
    .then((data) => {
      let d = new Date();
      let f = data["weather"][0]["main"];
      deg.textContent = `${data["main"]["temp"].toFixed(1)}`;
      country.textContent = `${data["sys"]["country"]}, ${data["name"]}`;
      time.textContent = `${d.getHours()}:${String(d.getMinutes()).padStart(
        2,
        0
      )}`;
      lat.textContent = data["coord"]["lat"];
      lon.textContent = data["coord"]["lon"];
      templ.textContent = data["main"]["temp_min"];
      temph.textContent = data["main"]["temp_max"];
      wind.textContent = data["wind"]["speed"];
      pres.textContent = data["main"]["pressure"];
      humid.textContent = data["main"]["humidity"];
      wea.textContent = data["weather"][0]["main"];
      wicon.src = `img/${f}.png`;
      desc.textContent = data["weather"][0]["description"];
      clouds.textContent = data["clouds"]["all"];
      img.src = `img/${city}.jpg`;

      const url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
      return fetch(url2);
    })
    .then((data) => data.json())
    .then((data) => {
      let a = new Date().getDay() - 1;
      let counter = 0;
      for (let i = a; i < a + 5; i++) {
        let sect = document.createElement("section");
        sect.setAttribute(
          "class",
          "flex flex-col justify-center items-center h-[100%] border-2 border-purple-600 w-1/5 rounded-xl"
        );
        let p1 = document.createElement("p");
        p1.setAttribute("class", "text-xl font-bold");
        p1.textContent = days[i];
        let p2 = document.createElement("p");
        p2.setAttribute("class", "font-serif text-lg font-semibold");
        p2.textContent = `${data["list"][counter]["main"]["temp"]} c`;
        let p3 = document.createElement("p");
        p3.setAttribute("class", "text-xl font-bold");
        p3.textContent = data["list"][counter]["weather"][0]["main"];
        counter++;

        sect.append(p1);
        sect.append(p2);
        sect.append(p3);

        future.append(sect);
      }
    });
});

// // For next 5 days

// async function fetchForecast(city) {
//   const apiKey = "YOUR_API_KEY";
//   const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
//   const response = await fetch(url);
//   const data = await response.json();
//   return data;
// }

// // History

// async function fetchHistoricalWeather(city, timestamp) {
//   const apiKey = "YOUR_API_KEY";
//   const url = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${city.lat}&lon=${city.lon}&dt=${timestamp}&appid=${apiKey}&units=metric`;
//   const response = await fetch(url);
//   const data = await response.json();
//   return data;
// }
