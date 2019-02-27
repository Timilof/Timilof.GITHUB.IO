'use strict'


const router = {
  // handle : function(){
  // localStoreData.handle();
  // },
  overview: function() {
    routie({
      '': function() {
        render.loader();
        api.getData(api.overviewUrl)
          .then(data => {
            render.elementMake(data)
            render.stopLoader();
            localStoreData.localData(data);
            console.log('data is home')
          })
          .catch(function(error){
            // render.errorpoep()
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
    // console.log(data);
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
