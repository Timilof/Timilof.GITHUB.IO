
const app = document.querySelector('#root');
const container = document.createElement('div');
const characters = [];

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
      console.log(res)
      const peopleArray = []
      res.results.forEach((x) => {
        peopleArray.push(x.url)
      })

      return peopleArray
    })
    .then(x => {
      x.forEach(function(pepoLink) {
        fetch(pepoLink)
          .then(data => {
            return data.json()
          }).then(pepoboy => {
            characters.push(pepoboy);
            objectMaker(pepoboy)
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
  const card = document.createElement('div');
  card.setAttribute('class', 'card');
  const h1 = document.createElement('h1');
  const h2 = document.createElement('h2');
  h1.textContent = pi.name;
  h2.textContent = pi.height + ' cm';
  container.appendChild(card);
  card.appendChild(h1);
  card.appendChild(h2)
}
