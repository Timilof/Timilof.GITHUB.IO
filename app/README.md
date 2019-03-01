## Hello API 🐒
My repository for web app from scratch

In the three weeks this course lasted I was tasked to make a web app from scratch using only vanilla JavaScript.
### My App
My App displays all countries and independent states in the world (currently 250 countries total) and allows you to view a few details/some information about them. To do this the app uses the api [restcountries](https://restcountries.eu/).
More specifically the app makes an api call once the page is loaded and displays all countries onze the data has been collected. The user then has the option to click on any one country which will trigger a second api call which displays more information about that specific country. 

### 
My script fetches data from an API and displays 10 countries with capitals. The user can view the countries and capitals and see the latitude and lontitude of each country seperately.
  
  It looks like this.
  ![screen cap img](public/img/screen_2.png)  
  
### Welke API wordt gebruikt en wat zijn de beperkingen? (rate limit)
  I'm using the [restcountries](https://restcountries.eu/) API.
  I haven't come across any restrictions in my use case, the only problem i found was routing to each country's capital however it wasn't limiting rather a case of understanding.

### Actor diagram
There is a user and the API server
  ![actor diagram img](public/img/actoren_diagram_v1.png)
  
### Interaction diagram

![interactin img](public/img/interaction_diagram_v1.png)

  The interaction flow is instant and easy to understand.

### Best practices I've applied
   I've used object literals to structure my code
   I don't use global variables
   Use Strict
   Use camelCase and clear descriptive English names
   Neatly indented code
   Variables are declared at the top of each scope
   
### Libraries
   [Transparency templating engine](https://github.com/leonidas/transparency)
   [Routie](http://projects.jga.me/routie/)

### Wat zou je nog willen toevoegen (feature wishlist / backlog)
  I'd like to attempt to link a second API (sunset API) which can show what time the sun sets and rises for each county depending on the longtitude and latitude coordinates.
  I had tried to implement a local storage to reduce the number of api calls however I found it rather difficult.
  a filter option so the user can fill in a value in a search field and the app would filter the countries based on the input... so basically I'd like to make it possible for the user to search.

