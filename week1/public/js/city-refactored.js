'use strict'

const container = document.querySelector("#root")
const dayButton = document.querySelector('#dateButton')

const router = {
  // overview: function() {
  //   api.getdata(api.url)
  //     .then(data => render.elementMake(data))
  // },
  overview: function () {
     api.getdata(api.url)
     .then(data => { routie('/', () => {
       render.elementMake(data)
       console.log('data is de home')
     })
   });
   routie('/')
 },

 detail: function () {
    api.getdata(api.url)
    .then(data => { routie('detail', () => {
      render.detailMake(data)
      console.log('data is de home')
      window.location.hash = 'detail'
    })
  });
  window.location.hash = 'detail'
}
  // detail : 'https://restcountries.eu/rest/v2/all' + this // waar je op klikt
}

const api = {
  url: 'https://restcountries.eu/rest/v2/all',
  getdata: function(overview) {
    return new Promise(function(resolve, reject) {
      const request = new XMLHttpRequest();
      request.open('GET', api.url, true)
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          const data = api.parse(request);
          resolve(data);
        } else {
          reject(request.status);
        }
      };
      request.onerror = () => {
        reject(request.status);
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
    const template = document.querySelector('.template');


    const newData = json.slice(0, 10); //vanuit api?
    newData.forEach(country => {
      const element = {
        country: country.name,
        capital: country.capital
      };
      console.log(country.name)
      console.log(country.capital)
      Transparency.render(template, element);
      // Transparency.render(template, element.);
      // `
      //       <div class="container">
      //         <div class="card rise">${country.name}</div>
      //       </div>
      //       `;
      //       container.insertAdjacentHTML('beforeend', element);
    });
  },
  detailMake: function(json) {
    const template = document.querySelector('.template');


    const newData = json.slice(0, 10); //vanuit api?
    newData.forEach(country => {
      const deteailElements = {
        latitude: country.latlng[1],
        longtitude: country.latlng[0]
      };
      console.log('Latitude' + country.latlng[1])
      console.log('Latitude' + country.latlng[0])
      Transparency.render(template, deteailElements);
});
}
}

router.overview() + router.detail();
