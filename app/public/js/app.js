'use strict';
(function(){
const router = {
  // handle : function(){
  // localStoreData.handle();
  // },
  routing: function() {
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
    loader.start();
    api.getData(api.mainUrl)
      .then(function(data) {
        render.mainTemplate(data)
      })
      .catch(function() {
        render.errorPage()
      });
  },
  detailpage: function() {
    loader.start();
    api.getData(api.detailUrl+api.id())
      .then(function(data) {
        render.detailTemplate(data)
      })
      .catch(function() {
        render.errorPage()
      });
  }
}

const localStoreData = {
  handle: function() {
    let getLocalstorageData = localStorage.getItem('country');
    getLocalstorageData = JSON.parse(getLocalstorageData);

    if (getLocalstorageData) { //If localData has data then use this data
      router.mainpage(getLocalstorageData)
    } else { //If localstorage is empty, do a get request
      api.getData(api.overviewUrl)
        .then(function(data) {
          render.mainTemplate(data)
        })
        .catch(function() {
          render.errorPage()
        });
    }
  },
  localData: function(data) {
    const saveLocalData = [];

    data.map(country => { // Map is used to get only an array that contains the title and descriptions of the data from each country.
      const localElements = { // create elements for the class and div's.
        country: country.name,
        capital: country.capital,
      };
      saveLocalData.push(localElements)
      // console.log(country.name);
    })
    window.localStorage.setItem('country', JSON.stringify(saveLocalData)); //Set title and description in localStorage
  }
}

const api = {
  id: function(){const id = document.URL.substring(document.URL.lastIndexOf('/') + 1)
      return id},
  detailUrl: 'https://restcountries.eu/rest/v2/capital/',
  mainUrl: 'https://restcountries.eu/rest/v2/all',
  getData: function(url) {
    return new Promise(function(resolve, reject) {
      const request = new XMLHttpRequest();
      request.open('GET', url, true)
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          const data = api.parse(request);
          const slicedData = data.slice(0, 250);
          resolve(slicedData);
          // slicedData.forEach((countryName) => {
          //   api.countries.push(countryName.name);
          // })
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


const loader = {
  start: function() {
    const template = document.body;
    template.classList.remove('hidden');
    template.classList.add('loadingt');
  },
  stop: function() {
    const template = document.body;
    template.classList.remove('loadingt');
    template.classList.add('hidden');
  }
}

const contentStyler ={
  slimView: function() {
    const template = document.getElementById('main');
    template.classList.remove('wide');
  },

  wideView: function() {
    const template = document.getElementById('main');
    template.classList.add('wide');
  },
  disabledLinks: function disableLinks() {
    const inactiveLinks = document.querySelectorAll("a[href='#detail/']");
    inactiveLinks.forEach((link) => {
      link.classList.add('inactive');
      link.href = '#';
    })
  }
}

const render = {
  mainTemplate: function(data) {
    // map is used to get only country name and capital form the array
    const template = document.getElementById('main');
    const directives = { // Directives are plain javascript functions defined in a two-dimensional object literal, i.e.,
      country: {
        text() {
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
    loader.stop();
    contentStyler.slimView()
    contentStyler.disabledLinks()
  },

  detailTemplate: function(data) {
    // console.log(json);
    const template = document.getElementById('main');
    const saveDetailData = [];
    // console.log(data);
    const id = document.URL.substring(document.URL.lastIndexOf('/') + 1); //Take out the id from url.
    // console.log()
    const countyid = data.filter(county => {
      return county.capital === decodeURIComponent(id); //if data id is same as id from url return true.
    });
    // console.log(id);
    countyid.map(countryDetail => {
      const templateElementsDetail = { // create elements for the class and div's.
        flag: countryDetail.flag,
        country: countryDetail.name,
        capital: 'capital: ' + countryDetail.capital,
        population: 'population: ' + countryDetail.population,
        latitude: 'latitude: ' + countryDetail.latlng[1],
        longtitude: 'longtidude: ' + countryDetail.latlng[0],
      };
      saveDetailData.push(templateElementsDetail)
      const flagg = document.querySelector('.flag');
      flagg.src = templateElementsDetail.flag
      contentStyler.wideView();
      console.log('detail')
    })

    loader.stop();
    Transparency.render(template, saveDetailData);

  },

  errorPage: function() {
    const template = document.getElementById('main');
    const saveErrorElements = [];
    const errorElements = {
      e_msg: 'Data unavailable',
      wdid: 'Could not retrieve data from server',
    }
    contentStyler.wideView();
    saveErrorElements.push(errorElements);
    loader.stop();
    Transparency.render(template, saveErrorElements);
  }
}



router.routing();

})();
