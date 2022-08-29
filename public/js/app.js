const searchBar = document.getElementById("searchBar");
const searchBtn = document.getElementById("searchBtn");
const sunny = document.getElementById("sunny");
const hipHop = document.getElementById("hipHop");
const subBtn = document.getElementById("submit");
const weatherContainer = document.getElementById("forecast_container");
const weatherTitle = document.getElementById("forecast_title");
const instructions = document.getElementById("instructions");
const trackContainer = document.getElementById("track_container");
const trackRec = document.getElementById("track_rec")
const key = document.querySelector(".secret");
const searchContainer = document.getElementById("search_container");
const loader = document.getElementById("loader");
const resetBtn = document.getElementById("reset");
const genreTag = document.getElementById("genre_id");

let counter = 0;
loader.hidden = true;
resetBtn.hidden = true;
let pop;
let dance;
let instr;
let val;
let mood;
let genreTotal = [];

document.querySelectorAll("#genre_id").forEach((tag) => {
  tag.addEventListener("click", function () {
    let value = tag.innerHTML;
    genreToggle(tag, value);
  });
});

function genreToggle(tag, value) {
  if (counter > 2) {
    if (tag.classList.contains("genreBackground")) {
      tag.classList.toggle("genreBackground");
      counter--;
      genreTotal.pop(value);
    }
  } else {
      if (tag.classList.contains("genreBackground")) {
      tag.classList.toggle("genreBackground");
      counter--;
      genreTotal.pop(value);
    } else {
      tag.classList.toggle("genreBackground");
      counter++;
      genreTotal.push(value);
    }

    genreTotal.join(',');
  }
}


searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  loading();
  getWeather();
  hideDuringSearch();
});

async function getWeather() {
  const address = searchBar.value;
  const url = `https://api.geocod.io/v1.6/geocode?q=${address}&api_key=661f10101f5551601645516fff5559650249f94`;

  try {
    const response = await fetch(url, {
      method: "GET",
    });
    const data = await response.json();
    weatherAPI(data);
  } catch (error) {
    console.log(error);
  }
}

async function weatherAPI(data) {
  const lat = data.results[0].location.lat;
  const lng = data.results[0].location.lng;

  const url = `https://api.weather.gov/points/${lat},${lng}`;
  try {
    const response = await fetch(url, {
      method: "GET",
    });
    const data = await response.json();
    forecastAPI(data);
  } catch (error) {
    console.log(error);
  }
}

function forecastAPI(data) {
  let locationData = data.properties.relativeLocation.properties;
  const url = data.properties.forecast;

  fetch(url)
    .then((res) => res.json())
    .then((forecastResponse) => {
      let data = forecastResponse.properties.periods;
      forecastRender(data, locationData);
    });
}

function forecastRender(forecastData, location) {
  complete();
  resetBtn.hidden = false;
  searchContainer.hidden = true;
  weatherContainer.style.display = 'flex';

  weatherTitle.innerHTML += `<h2> ${location.city}, ${location.state}<h2>`;

  forecastData.forEach((day, index) => {
    if (index % 2 == 0) {
      weatherContainer.innerHTML += 
      `<div class = weatherCard id = "${day.shortForecast}">
        <img class = 'dailyImg' src= "${day.icon}">
        <p class ='dailyName'> ${day.name.slice(0, 3)} </p>
        <p class = 'dailyTemp'> ${day.temperature}° </p>`;
    }
  });
}

weatherContainer.addEventListener("click", function (e) {
  trackContainer.style.visibility = 'hidden';
  trackRec.style.visibility = 'hidden';
  

  if (e.target.classList.contains("weatherCard")) {
    trackContainer.innerHTML = "";
    let temp = e.target.getAttribute("id").split(" ")[0];
    console.log(temp);
    tempParse(temp);
    instructions.style.visibility = "hidden";
  }
});

function tempParse(temp) {
  switch (temp) {
    case "Mostly":
      temp = "Patchy";
      break;
    case "Chance":
      temp = "Thunderstorms";
      break;
    case "Scattered":
      temp = "Thunderstorms";
      break;
    case "Partly":
      temp = "Cloudy";
      break;
    case "Areas":
      temp = "Cloudy";
      break;
    case "Slight":
      temp = "Thunderstorms";
      break;
    case "Showers":
      temp = "Cloudy";
      break;
  }
  console.log(temp);
  weatherParameters(temp);
}

function weatherParameters(temp) {
  switch (temp) {
    case "Sunny":
      track = "4zxvC7CRGvggq9EWXOpwAo";
      pop = "100";
      dance = "50";
      instr = "50";
      val = "100";
      mood = "1";
      callRec(track, pop, dance, instr, val, mood, genreTotal);
      break;
    case "Thunderstorms":
      track = "5he5w2lnU9x7JFhnwcekXX";
      pop = "75";
      dance = "10";
      instr = "75";
      val = "10";
      mood = "0";
      callRec(track, pop, dance, instr, val, mood, genreTotal);
      break;
    case "Cloudy":
      track = "1YuknfkSYTTbolRpwZBOv4";
      pop = "50";
      dance = "25";
      instr = "100";
      val = "50";
      mood = "0";
      callRec(track, pop, dance, instr, val, mood, genreTotal);
      break;
    case "Clear":
      track = "1YuknfkSYTTbolRpwZBOv4";
      pop = "25";
      dance = "50";
      instr = "100";
      val = "50";
      mood = "0";
      callRec(track, pop, dance, instr, val, mood, genreTotal);
      break;
    case "Patchy":
      track = "1YuknfkSYTTbolRpwZBOv4";
      pop = "50";
      dance = "50";
      instr = "100";
      val = "50";
      mood = "1";
      callRec(track, pop, dance, instr, val, mood, genreTotal);
      break;
  }
}

async function callRec(tr, pop, dan, ins, val, mood, genre) {
  const url = `https://api.spotify.com/v1/recommendations?seed_artists=${tr}&limit=14&popularity=${pop}&danceability=${dan}&instrumentalness=${ins}&valence=${val}&mood=${mood}&genre=${genre}`;
  try {
    const accessToken = await fetch("/accesstoken");
    const stringifyToken = await accessToken.json();
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + stringifyToken.access_token,
      },
    });

    const data = await response.json();
    console.log(data.tracks);
    renderTracks(data.tracks);
  } catch (error) {
    console.log(error);
  }
}

function renderTracks(tracks) {
  for (track of tracks) {
    trackContainer.innerHTML += `<div class= 'songContainer'>
    <div>
    <img id ='albumArt' src =${track.album.images[0].url}>
    </div>
    <div class = 'songArtist'>
    ${track.artists[0].name}
    </div>
    <a href=${track.preview_url}>${
      track.preview_url ? "Preview" : ""
    }</a>
    <i class="fa-solid fa-heart-circle-plus favoritesBtn" id = "${
      track.name
    } - ${track.artists[0].name}"></i>
    </div>`;
  }
  setTimeout(() =>{
   trackContainer.style.visibility = 'visible';
   trackRec.style.visibility = 'visible';
  }, '1000') 
}

  // <div>
  // Song:${track.name}
  // </div>

document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("favoritesBtn")) {
      if (e.target.style.color == "red") {
        e.target.style.color = "black";
        return;
      } else {
        let savedTrack = e.target.id;
        e.target.style.color = "red";
        saveTrack(savedTrack);
      }
    }
  });
});

async function saveTrack(savedTrack) {
  const url = "/search";

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        track: savedTrack,
      }),
    });
  } catch (err) {
    console.log(err);
  }
}

function loading() {
  loader.hidden = false;
  searchContainer.hidden = true;
  trackContainer.style.visibility = 'hidden';
  trackRec.style.visibility = 'hidden';
  weatherContainer.hidden = true;
}

function complete() {
  loader.hidden = true;
  searchContainer.hidden = true;
}

function hideDuringSearch() {
  weatherContainer.innerHTML = "";
  trackContainer.innerHTML = "";
  instructions.style.visibility = "hidden";
  instructions.style.visibility = "visible";
  weatherContainer.style.visibility = "visible";
}

resetBtn.addEventListener("click", function () {
weatherTitle.innerHTML = "";
resetBtn.hidden = true;
searchContainer.hidden = false;
  weatherContainer.style.display = "none";
  trackContainer.style.visibility = "hidden";
  trackRec.style.visibility = 'hidden';
  instructions.style.visibility = "hidden";
});

trackContainer.style.visibility = 'hidden';
trackRec.style.visibility = 'hidden';
