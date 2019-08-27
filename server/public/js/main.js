// Add map to the website and the initial position
const map = L.map('map-template').setView([45.50884, -73.58781], 8);

const tileUrl = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png';

// More tiles here => https://wiki.openstreetmap.org/wiki/Tiles
L.tileLayer(tileUrl, {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
}).addTo(map);

// Socket

const socket = io();
// console.log('IO IN CLIENT'. socket);

map.locate({ enableHighAccuracy: true });

map.on('locationfound', e => {
  // current browser location
  userCoords = [e.latlng.lat, e.latlng.lng];
  L.marker(userCoords).addTo(map).bindPopup('This is me!');
  socket.emit('userConnected', e.latlng);
});

socket.on('showNewUser', userCoords => {
  
  L.marker([userCoords.lat + 1, userCoords.lng])
  
  .addTo(map).bindPopup('Im the new user');
});

const marker = L.marker([45.50884, -73.58781])
  .bindPopup('Hello there')
  .addTo(map);