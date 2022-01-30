const url = 'https://api.wheretheiss.at/v1/satellites/25544'

const map = L.map('map', {
    center: [0, 0],
    zoom: 3
})

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const myIcon = L.icon({
    iconUrl: 'issimg.png',
    iconSize: [50, 36],
    iconAnchor: [25, 18],
});

const marker = L.marker([0, 0],{icon: myIcon}).addTo(map)

let first = true

async function whereIss() {
    const response = await fetch(url)
    const data = await response.json()
    const {latitude, longitude} = data
     if(first) {
        map.setView([latitude, longitude], 3)
        first = false
    }
    marker.setLatLng([latitude, longitude])
}


whereIss()

setInterval(whereIss, 1000)