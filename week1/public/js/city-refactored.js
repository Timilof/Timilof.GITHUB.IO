'use strict'


const router = {
  overview: function() {
    routie({
      '': function() {
        api.getData(api.overviewUrl)
          .then(data => {
            // sections.showMain();
            render.elementMake(data)
            console.log('data is home')
          })
          .catch(function(error){
            render.errorpoep()
          });
      },
      'detail/:capital': function() {
        const currentUrl = document.URL; //Get current url from document
        const id = currentUrl.substring(currentUrl.lastIndexOf('/') + 1); //Take out the id from url.

        api.getData(api.detailUrl + id)
          .then(data => {
            console.log('data is detail')
            // sections.showDetail();
            render.detailMake(data)
          })
      }
    })
  }
}
// const router = {
//   overview: function() {
//     api.getdata(api.overviewUrl)
//       .then(data => {
//         routie('/', () => {
//           render.elementMake(data)
//           console.log('data is de home')
//         })
//       });
//     routie('/')
//   },
//
//   detail: function() {
//     const currentUrl = document.URL; //Get current url from document
//     const id = currentUrl.substring(currentUrl.lastIndexOf('/') + 1); //Take out the id from url.
//     api.getdata(api.detailUrl+id)
// console.log(id});
//     //   .then(data => {
//     // window.location.hash = `detail/${id}`
//     routie('detail/:capital', data => {
//       render.detailMake(data)
//       console.log('data is de detail')
//       // window.location.hash = 'detail'
//     })
//     // })
//   }


// document.querySelector('#search').addEventListener('input', (e) => {
// const template = document.getElementById('main');
//   const filteredCountries = countries.filter((countries) => countries.toLowerCase().includes(e.target.value.toLowerCase()));
//   // template.innerHTML = '';
//   filteredCountries.forEach((countries) => {
//     console.log(countries);
//
//     const saveData = [];
//     countries.map(country => {
//       const templateElements = { // create elements for the class and div's.
//         country: country.name,
// capital: country.capital,
//       };
//       tempData.push(templateElements)
//
//       // routie("detail/" + this.capital);
//     })
// Transparency.render(template, tempData);
//     // render.elementMake(countries);
//   });
// })

const api = {
  countries : [],
  detailUrl: 'https://restcountries.eu/rest/v2/capital/',
  // function () {
  //            const url = `${api.baseUrl}${this.id}`;
  //            return url;
  //        },
  overviewUrl: 'https://restcountries.eu/rest/v2/all',
  baseUrl: 'https://restcountries.eu/rest/v2/',
  getData: function(url) {
    return new Promise(function(resolve, reject) {
      const request = new XMLHttpRequest();
      request.open('GET', url, true)
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          const data = api.parse(request);
          const slicedData = data.slice(0, 52);
          resolve(slicedData);
          // router.detail();
          slicedData.forEach((countryName) => {
            api.countries.push(countryName.name);
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

  elementMake: function(data) {
    // map is used to get only country name and capital form the array
    const template = document.getElementById('main');
    const saveData = [];
    data.map(country => {
      const templateElements = { // create elements for the class and div's.
        country: country.name,
capital: country.capital,
      };
      saveData.push(templateElements)

      // routie("detail/" + this.capital);
    })
Transparency.render(template, saveData);
window.localStorage.setItem('country', JSON.stringify(saveData));
const froot = JSON.parse(window.localStorage.getItem('country'));
console.log(froot);

    const directives = { // Directives are plain javascript functions defined in a two-dimensional object literal, i.e.,
      link: {
        href() {
          return "#detail/" + this.capital;
        }
      }
    }
    Transparency.render(template,data, directives, saveData);
    document.querySelector('.link').addEventListener('click', () => {
      console.log('this.capital');
    })
  },

  detailMake: function(data) {
    // console.log(json);
    const template = document.getElementById('main');
    const saveDetailData = [];
    console.log(data);
    const currentUrl = document.URL; //Get current url from document
    const id = currentUrl.substring(currentUrl.lastIndexOf('/') + 1); //Take out the id from url.
    const countyid = data.filter(county => {
      return county.capital === id; //if data id is same as id from url return true.
    });
    console.log(id);
    countyid.map(country => {
      const templateElements = { // create elements for the class and div's.
        country: country.name,
        capital: country.capital,
        // latitude: country.latlng[1],
      };
      saveDetailData.push(templateElements)

    })
    Transparency.render(template, saveDetailData);

  }
}
router.overview();
