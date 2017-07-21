const express = require('express');
const hbs = require('hbs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials'); //registering partials
app.set('view engine' , 'hbs')
app.use(express.static(__dirname + '/public')); //this is a middleware
//Middleware are created by app.uppercase
//Creating another middleware
app.use((req, res, next) => {
  var now = new Date().toString();
  console.log(`${now} : ${req.method} : ${req.url}`);
  next(); //If we don't use next() then the routes will not execute. This can be useful when the site is under maintenance and then we wont write next()
})
app.get('/', (req, res)=>{
  // res.send("<h1>This is a webpage</h1>");
  res.send([{
    name : "Amol",
    age : 25,
    likes: ['Studying','TV','Reading']
  }]);
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {pageTitle : 'About Page', currentYear : new Date().getFullYear()});
})

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
