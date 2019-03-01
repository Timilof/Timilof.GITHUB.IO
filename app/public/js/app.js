'use strict'


const router = {
  // handle : function(){
  // localStoreData.handle();
  // },
routie: function(){
  routie({
      '': function() {
        router.mainpage();
      },
      'detail/:capital': function() {
        router.detailpage()
      },
      'detail': function() {
              // render.errorPage()
console.log('prooooooo')
            }
    });
},
mainpage: function() {
      render.loader();
      api.getData(api.overviewUrl)
        .then(function(data) {
          render.elementMake(data)
          render.stopLoader();
          render.links();
        })
        .catch(function(){
          render.errorPage()
          render.stopLoader();
        });
    },
    detailpage: function() {
          render.loader();
          api.getData(api.overviewUrl)
            .then(function(data) {
              render.detailMake(data)
              render.stopLoader();
              render.links();
            })
            .catch(function(){
              render.errorPage()
              render.stopLoader();
            });
        }
}

const localStoreData = {
  handle: function() {
          let getLocalstorageData = localStorage.getItem('country');
          getLocalstorageData = JSON.parse(getLocalstorageData);

          if (getLocalstorageData){ //If localData has data then use this data
              render.elementMake(getLocalstorageData);
              console.log(getLocalstorageData)
              console.log('Timd')
              console.log('Timd')
          }
          else{              //If localstorage is empty, do a get request
             router.overview();
          }
      },
      localData: function(data){
          const saveLocalData = [];

          data.map(country => { // Map is used to get only an array that contains the title and descriptions of the data from each country.
              const localElements = { // create elements for the class and div's.
              country: country.name,
              capital: country.capital,
              };
              saveLocalData.push(localElements)
                  // console.log(country.name);
          })
          window.localStorage.setItem('country', JSON.stringify(saveLocalData));          //Set title and description in localStorage
      }
}

const api = {
id: function(){
  const currentUrl = document.URL; //Get current url from document
  const id = currentUrl.substring(currentUrl.lastIndexOf('/') + 1); //Take out the id from url.
},
  countries : [],
  detailUrl: 'https://restcountries.eu/rest/v2/capital/',
  overviewUrl: 'https://restcountries.eu/rest/v2/all',
  getData: function(url) {
    return new Promise(function(resolve, reject) {
      const request = new XMLHttpRequest();
      request.open('GET', url, true)
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          const data = api.parse(request);
          const slicedData = data.slice(0, 250);
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

const elements = {

}

const render = {
  loader: function(){
      const template = document.body;
      template.classList.remove('hidden');
      template.classList.add('loadingt');
},
stopLoader:function(){
    const template = document.body;
    template.classList.remove('loadingt');
    template.classList.add('hidden');
},
  elementMake: function(data) {
    // map is used to get only country name and capital form the array
    const template = document.getElementById('main');
    const directives = { // Directives are plain javascript functions defined in a two-dimensional object literal, i.e.,
      country: {
          text(){
          return this.name;
}
},
      link: {
        href() {
          return "#detail/" + this.capital;
        }
      }
    }
    Transparency.render(template, data, directives);
            render.mainSlim()
  },

  detailMake: function(data) {
    // console.log(json);
    const template = document.getElementById('main');
    const saveDetailData = [];
    // console.log(data);
    const currentUrl = document.URL; //Get current url from document
    const id = currentUrl.substring(currentUrl.lastIndexOf('/') + 1); //Take out the id from url.
    // console.log()
    const countyid = data.filter(county => {
      return county.capital === decodeURIComponent(id); //if data id is same as id from url return true.
    });
    // console.log(id);
    countyid.map(countryDetail => {
      const templateElementsDetail = { // create elements for the class and div's.
        flag: countryDetail.flag,
        country: countryDetail.name,
        capital: 'capital: '+countryDetail.capital,
        population: 'population: ' +countryDetail.population,
        latitude: 'latitude: ' + countryDetail.latlng[1],
        longtitude: 'longtidude: ' +countryDetail.latlng[0],
      };
      saveDetailData.push(templateElementsDetail)
      const flagg = document.querySelector('.flag');
      flagg.src = templateElementsDetail.flag
      render.mainWide();
console.log('detail')
    })



    Transparency.render(template, saveDetailData);

  },
mainSlim: function(){
const template = document.getElementById('main');
template.classList.remove('wide');
},

mainWide: function(){
const template = document.getElementById('main');
template.classList.add('wide');
},

errorPage: function(){
const template = document.getElementById('main');
const saveErrorElements = [];
const errorElements = {
  e_msg: 'Data unavailable',
  wdid: 'Could not retrieve data from server',
    }
render.mainWide();
saveErrorElements.push(errorElements);

Transparency.render(template, saveErrorElements);
},

links: function disableLinks(){
const inactiveLinks = document.querySelectorAll("a[href='#detail/']");
inactiveLinks.forEach((link) => {
link.classList.add('inactive');
link.href = '#';
})
}

}

router.routie();
