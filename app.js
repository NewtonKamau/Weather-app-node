/*jshint esversion: 6 */
const express = require("express");
const https = require("https");
var bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function (req, res) {

  var query = req.body.cityName;
  const apiKey = "";
  const units = "metrics";
  var url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      query +
      "&appid=" +
      apiKey +
      "&units=" +
      units;

  https.get(url, function (response) {
      console.log(response.statusCode);

      response.on("data", function (data) {
          const weatherData = JSON.parse(data);
          // console.log(weatherData);
          const temp = weatherData.main.temp;
          console.log(temp);
          const weatherDescription = weatherData.weather[0].description;
          console.log(weatherDescription);
          const weatherIcon = weatherData.weather[0].icon;
          const imageUrl =
              "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
          res.write("<p>The clouds are " + weatherDescription + "</p>");
          res.write("<img src=" + imageUrl + ">");
          res.write(
              "<h1>The temperature in "+ query+" is " + temp + "degress celsius</h1>"
          );
          res.send();
      });
  });
});

app.listen(3000, () => console.log("serving art 300"));
