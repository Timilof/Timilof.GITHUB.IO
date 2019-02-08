// var request = new XMLHttpRequest();
const app = document.querySelector('#root');
const container = document.createElement('div');
const url = 'https://pokeapi.co/api/v2/pokemon'
container.setAttribute('class', 'container');
app.appendChild(container);

getData()

function getData(){
   fetch(url)
   .then(data=>{
       return data.json()
   })
   .then(res=>{
  console.log(res);
       const pokemonArray = []
       res.results.forEach((x)=>{
            // console.log(x)


           pokemonArray.push(x.url)
       })
       return pokemonArray
   })
   .then(x=>{
console.log(x)
//dit is een array met 20 strings
      x.forEach(function(pokeLink){
//voor elke iteratie gaat hij iets doen
  console.log(pokeLink)
// doet alles x aantal keer totdat array klaar
//elke individuele link stoppen we in pokelink
      fetch(pokeLink)
      .then(data=>{
      // console.log(data)
      return data.json()
}).then(pokeboy=>{
// console.log(pokeboy)
// console.log(pokeboy.sprites.front_default)

objectMaker(pokeboy)
})
})

   })

}

function objectMaker(pi){
console.log(pi.name)
console.log(pi)
  const card = document.createElement('div');
  card.setAttribute('class', 'card');
  const h1 = document.createElement('h1');
  const h2 = document.createElement('h2');

  const img = document.createElement('img');
  img.src = pi.sprites.front_default
  h1.textContent = pi.name;
  h2.textContent = pi.weight + ' kg';
  container.appendChild(card);
  card.appendChild(img)
  card.appendChild(h1);
  card.appendChild(h2)
}
