'use strict'

const container = document.querySelector("#root")
const dayButton = document.querySelector('#dateButton')

let dDay = '11'
let mMonth = '02'
let yYear = '2019'
let coordinates = [];
// request.open('GET',myUrl  + "lat=" latl +"&lng"+ longt +"&date=today", true)

const myUrl = 'https://restcountries.eu/rest/v2/all';
const loadData = new Promise(function(resolve, reject) {
  const request = new XMLHttpRequest();
  request.open('GET', myUrl, true)
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      const data = JSON.parse(request.responseText);
      resolve(data);
    } else {

      reject("did not get data");
    }
  };

  request.onerror = () => {
    console.log("did not get data");
  };

  request.send();
});

loadData.then(data => {
  const newData = data.slice(0, 10);
  newData.forEach((country) => {
    console.log(country.name);
    console.log(country.capital);
    console.log('Latitude', country.latlng[0]);
    console.log('Longtitude', country.latlng[1]);
    console.log(country.flag);
    coordinates.push("lat=" + country.latlng[0] + "&lng" + country.latlng[1]);
    // const img = document.createElement('img');
    // const img = country.flag
    // const elemet =
    //   `
    // <div class="container">
    // <div class="card rise">${country.name}</div>
    // </div>
    // `
    //
    // container.insertAdjacentHTML('beforeend', elemet)
    // coordinates.push({countryName: country.name, lat: country.latlng[0], long: country.latlng[1]});
  })
  // console.log(coordinates[0].countryName);
  // console.log(coordinates[0].lat);
  // console.log(coordinates[0].long);



});
//
// function elementMaker(times) {
// container.querySelectorAll(".naam").forEach((x) => {
//   x.addEventListener("click", function() {
//     this.style.background = "lime"
//   })
// })
// }
