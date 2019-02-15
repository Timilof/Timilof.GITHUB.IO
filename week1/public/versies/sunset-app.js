'use strict'

const container = document.querySelector("#root")
// let dDay = document.querySelector('#day').value;
// let mMonth = document.querySelector('#month').value;
// let yYear = document.querySelector('#year').value;
const dayButton = document.querySelector('#dateButton')

let dDay = '11'
let mMonth = '02'
let yYear = '2019'

// dayButton.addEventListener('click', (e) => {
//     // e.preventDefault();
//     // searchRecipe(inputRecipeField.value);
//     // inputRecipeField.value = '';
// console.log(yYear);
// });

const myUrl = 'https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&date=';
const loadData = new Promise(function(resolve, reject) {
  const request = new XMLHttpRequest();
  request.open('GET',myUrl  + lat +"-"+ mMonth +"-"+ dDay, true)
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
    const sunrise = data.results.sunrise;
    const sunHours = data.results.day_length;
    const sunset = data.results.sunset;
    console.log(sunrise)
    console.log(sunHours)
    console.log(sunset)

    const elemet =
          `
    <div class="container">
    <div class="card rise">${sunrise}</div>
    <div class="card set">${sunset}</div>
    <div class="card lengt">${sunHours}</div>
    </div>
    `
        container.insertAdjacentHTML('beforeend', elemet)
        // document.querySelector(".naam").addEventListener('click', function() {
        //   console.log(this)
        // })
  });
//
// function elementMaker(times) {
// container.querySelectorAll(".naam").forEach((x) => {
//   x.addEventListener("click", function() {
//     this.style.background = "lime"
//   })
// })
// }
