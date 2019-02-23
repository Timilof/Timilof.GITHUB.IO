'use strict'
const countries = [];
const template = document.getElementById('main');

const router = {
  overview: function() {
    api.getdata(api.overviewUrl)
      .then(data => {
        routie('/', () => {
          render.elementMake(data)
          console.log('data is de home')
        })
      });
    routie('/')
  },

  detail: function(id) {
    // api.getdata(api.detailUrl${id})
    //   .then(data => {
// window.location.hash = `detail/${id}`
    routie('/:capital', data => {
      render.detailMake(data)
      console.log('data is de detail')
      // window.location.hash = 'detail'
    })
  // })
}
}

document.querySelector('#search').addEventListener('input', (e) => {

  const filteredCountries = countries.filter((countries) => countries.toLowerCase().includes(e.target.value.toLowerCase()));
  template.innerHTML = '';
  filteredCountries.forEach((countries) => {
console.log(countries);
const fixc =
  `
<a href="${'#'+(countries.capital)}">
<section class="template">
<a href="index.html">Go back!</a>
<h1 class="naam">${countries.name}</h1>
<p class="hit">${countries.capital}</p>
</section>
</a>
`
template.insertAdjacentHTML('beforeend', fixc);
    // render.elementMake(countries);
  });
})

const api = {
  detailUrl: 'https://restcountries.eu/rest/v2/capital/kabul',
// function () {
//            const url = `${api.baseUrl}${this.id}`;
//            return url;
//        },
  overviewUrl : 'https://restcountries.eu/rest/v2/all',
  baseUrl: 'https://restcountries.eu/rest/v2/',
  getdata: function(url) {
    return new Promise(function(resolve, reject) {
      const request = new XMLHttpRequest();
      request.open('GET', url, true)
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          const data = api.parse(request);
          const slicedData = data.slice(0, 52);
          resolve(slicedData);
          router.detail();
          slicedData.forEach((countryName) => {
            countries.push(countryName.name);
          })
        } else {
          reject(request.status);
        }
      };
      request.onerror = () => {
        reject(request.status); // error handling
      };
      request.send();
    });
  },
  parse: function(request) {
    return JSON.parse(request.responseText);
  }
}

const render = {

  elementMake: function(json) {
    // map is used to get only country name and capital form the array
    json.map(country => {
      const html =
        `
<a href="#/${country.capital}">
  <section class="template">
  <h1 class="naam">${country.name}</h1>
  <p class="hit">${country.capital}</p>
</section>
</a>
  `
      template.insertAdjacentHTML('beforeend', html);

      // countryLinks.forEach(function(countryLink){
      // countryLink.addEventListener('click', function(e) {
      // const id = e.currentTarget.hash.split('#')[1];
      // router.detail(id);
      // })
      // })
    })
  },

  detailMake: function(json) {
console.log(json);
    template.innerHTML = '';
    // map is used to get only country name and capital form the array
    // json.map(country => {
      const html =
        `
<a href="${'#'+(json.capital)}">
  <section class="template">
  <a href="index.html">Go back!</a>
  <h1 class="naam">${json.name}</h1>
  <p class="hit">${json.capital}</p>
</section>
</a>
  `
      template.insertAdjacentHTML('beforeend', html);

      // template.addEventListener('click', function() {
      //   console.log(country.capital);
      //   routie("detail/" + country.capital);
      // })

    // })
  }
}

router.overview()
