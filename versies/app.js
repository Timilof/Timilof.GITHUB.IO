const url = 'https://swapi.co/api/people';
const container = document.querySelector("#root")
const characters = [];

function dataFetch() {
  fetch(url)
    .then(function(data) {
      return data
    })
    .then(function(ongeparsteData) {
      return ongeparsteData.json()
    })
    .then(function(gepasrsteData) {

      looping(gepasrsteData.results)
      gepasrsteData.results.forEach((charachterName) => {
        characters.push(charachterName.name);
      })
    })
}

dataFetch()

document.querySelector('#search').addEventListener('input', (e) => {

  const filteredCharacters = characters.filter((character) => character.toLowerCase().includes(e.target.value.toLowerCase()));
  container.innerHTML = '';
  filteredCharacters.forEach((character) => {
console.log(character);
    looping(character);
  })
});
function looping(array) {


  array.forEach(function(iteraties, index) {
    const elemet =
      `
<div class="">
<h1 class="naam">${iteraties.name}</h1>
<p class="hit">${iteraties.height} cm</p>
</div>
`

    container.insertAdjacentHTML('beforeend', elemet)
    document.querySelector(".naam").addEventListener('click', function() {
      console.log(this)
    })

    container.querySelectorAll(".naam").forEach((x) => {
      x.addEventListener("click", function() {
        this.style.background = "lime"
      })
    })
    // objectMaker()
  })
}
