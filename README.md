## Running the project
The project does not use any javascript library except for express to start up a server 
#### Install dependencies
```
$ npm i
```
#### Run
```
$ npm start
```
Then open the browser to the specified url printed in the console . Default at [http://localhost:3000](http://localhost:3000) 
### Architecture
 - This project implements the MVVM architecture
 - The VM is a singleton to hold data to be shared across  1 or more views (in this case 2).
 - The datalayer is enhanced with a cache first repository that acts as a switch to fetch from the network or fetch from cache
 - The data in the cache have a time to live of 30 seconds (30*1000 ms)
#### Scafolding
- The code is hosted under the  src/static directory
- The index html holds a reference to a single js file and a single css file. For production ready app these two files could be minified(uglified)
  through bundlers such as Webpack, Babel, roll up. 
- Each app view under src/static/js/views is contained in their own directory along with its respective css file. I went with template literal 
  representation of the views one could use web component and even make use of shadow dom to isolate the css so that the style rules don't affect each others
- The css  of every view are imported in index.css to have a single entry
- The js files make use of es6 modules with src/static/js/index.js as a single entry point to the project
#### Routing
- I implemented the router based on this  [https://www.youtube.com/watch?v=6BozpmSjk-Y](article)
- In a nutshell it makes uses of the browser history apis combined with a render (getHtml) method to transform the template literal into html pages
#### API & Caching
- This project does not implemented html caching or lifecycle event to prevent the network calls from being performed every time the html is rendered
- To avoid making network calls everytime someone visits the home page (especially when viewing an item and going back with a back button),
 a repository layer was implemented as a switch
- This project makes use of the browser fetch api with a basic error handling logic