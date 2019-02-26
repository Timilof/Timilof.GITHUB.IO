'use strict'

var request = new XMLHttpRequest();
const app = document.querySelector('#root');
const container = document.createElement('div');
container.setAttribute('class', 'container');
app.appendChild(container);

request.open('GET', 'https://pokeapi.co/api/v2/pokemon', true);
//
// let butts = document.querySelector('.buttons');
// butts
// for (var i = 0; i < buttons.length; i++) {
//   butts[i]
// }
//
// butts[i].addEventListener('click', testPress);
//
//
// function testPress(event) {
//   console.log('test werkt')
// }
//
// for (var i = 0; i < pokearray.length; i++) {
//   pokearray[i]
// }

// function start(event) {
  request.onload = function() {
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    data.results.forEach((pokemon, index) => {
      console.log(pokemon, index);

      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const h1 = document.createElement('h1');
      const button = document.createElement('button')
      card.appendChild(button)
      h1.textContent = pokemon.name;
      container.appendChild(card);
      card.appendChild(h1);

      // const h1 = document.createElement('h1');
      // const p = document.createElement('p');
      // h1.textContent = pokemon.name;
      // p.textContent = pokemon.url;
      // container.appendChild(h1);
    });
  } else {
    console.log('err. werkt niet xp');
  }
}
// start()




// request2.open('GET', baseUrl + url, true);

// var data = JSON.parse(this.response);
// console.log(data.results)
// console.log(url.weight);
// });

request.send();
