const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const apiKey = "cb577e6b8d77df016b4072dc0591acc3";

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


app.get('/', function (req, res) {
  //res.send('Hello World!')
  res.render('index');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

app.post('/', function (req, res) {
    let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees celcius in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
});