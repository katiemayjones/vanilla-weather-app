let now = new Date();

let currently = document.querySelector(".currently");

let currentHours = now.getHours();
let currentMinutes = now.getMinutes().toString().padStart(2, "0");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDay = days[now.getDay()];

currently.innerHTML = `${currentDay}<br/>
${currentHours}:${currentMinutes}`;
