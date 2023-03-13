function myGitHub() {
  location.href = "https://github.com/zacharyjohnkline";
}
const stopList = document.querySelector(".stop-list");

mapboxgl.accessToken =
  "pk.eyJ1IjoiemFydGlzdDc3IiwiYSI6ImNsYXNhcG9iZDAwNmozc28xM3UxcGc5ZDUifQ.GknsAjmOxS31lPc6RgYdug";

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-71.0, 42.3],
  zoom: 10,
});
//determines gray or white background to location
let counter = 0;

async function run() {
  counter++;
  const locations = await getBusLocations();
  const longitude = locations[1].attributes.longitude;
  const latitude = locations[1].attributes.latitude;
  console.log(new Date());
  console.log(locations);
  console.log(locations);
  counter;
  let stopInfo = document.createElement("p");
  if (counter % 2 == 0) {
    stopInfo.classList.add("gray");
  } else {
    stopInfo.classList.add("white");
  }
  stopInfo.innerText = `Bus is currently at latitude ${latitude} and longitude ${longitude}.`;
  stopList.appendChild(stopInfo);

  var marker = new mapboxgl.Marker()
    .setLngLat([longitude, latitude])
    .addTo(map);

  // timer
  setTimeout(run, 15000);
}

async function getBusLocations() {
  const url = "https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip";
  const response = await fetch(url);
  const json = await response.json();
  return json.data;
}
