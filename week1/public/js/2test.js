// var request = new XMLHttpRequest();
const app = document.querySelector('#root');
const container = document.createElement('div');
const characters = [];
// const url = 'https://api.sunrise-sunset.org/json?lat=52.370216&lng=-4.895168&date=today'
// sunrise and sunset api
// const url = 'http://api.open-notify.org/iss-now.json'
// Space station location
const url = 'https://swapi.co/api/people'
container.setAttribute('class', 'container');
app.appendChild(container);

getData()

function getData() {
  fetch(url)
    .then(data => {
      return data.json()
    })
    .then(res => {
      // console.log(res.iss_position.latitude);
      // console.log(res.iss_position.longitude);
      // console.log(res.results)
      // console.log(res.results.sunrise)
      // console.log(res.results.sunset)
      // console.log(res.results.day_length)
      console.log(res)
      const peopleArray = []
      res.results.forEach((x) => {
        // console.log(x)


        peopleArray.push(x.url)
      })

      return peopleArray
    })
    .then(x => {
      // console.log(x)
      //dit is een array met 20 strings
      x.forEach(function(pepoLink) {
        //voor elke iteratie gaat hij iets doen
        // console.log(pepoLink)
        // doet alles x aantal keer totdat array klaar
        //elke individuele link stoppen we in pokelink
        fetch(pepoLink)
          .then(data => {
            // console.log(data)
            return data.json()
          }).then(pepoboy => {
            characters.push(pepoboy);
            objectMaker(pepoboy)
            // console.log(pokeboy)
            // console.log(pokeboy.sprites.front_default)
            // console.log(pepoboy)

          })
      })

    })

}
document.querySelector('#search').addEventListener('input', (e) => {
  const filteredCharacters = characters.filter((character) => character.name.toLowerCase().includes(e.target.value.toLowerCase()));
  container.innerHTML = '';
  filteredCharacters.forEach((character) => {
    objectMaker(character);
  })
});


function objectMaker(pi) {
  // console.log(pi.name)
  // console.log(pi)
  const card = document.createElement('div');
  card.setAttribute('class', 'card');
  const h1 = document.createElement('h1');
  const h2 = document.createElement('h2');

  // const img = document.createElement('img');
  // img.src = pi.sprites.front_default
  h1.textContent = pi.name;
  h2.textContent = pi.height + ' cm';
  container.appendChild(card);
  // card.appendChild(img)
  card.appendChild(h1);
  card.appendChild(h2)
}
