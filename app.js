const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/",function(req,res){
  const query=req.body.cityName;
  const apiKey="6e0c064d1a909f46365f6b1333538476";
  const unit="metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
  https.get(url, function(response) {
    //console.log(response);
    console.log(response.statusCode);
    response.on("data", function(data) {
      //console.log(data);
      const weatherData=JSON.parse(data);
      //console.log(weatherData);
      /*const object={
        name: "Belma",
        favouriteFood: "Pizza"
      }
      console.log(JSON.stringify(object));
      */
      const temp=weatherData.main.temp;
      //console.log(temp);
      const desc=weatherData.weather[0].description;
      //console.log(desc);
      const icon=weatherData.weather[0].icon;
      const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<h1>The temperature in "+query+" is "+temp +" degrees Celcius</h1>");
      res.write("<p>The weather is currently "+desc+"</p>");
      res.write("<img src="+imageURL+">");
      res.send();
    })
  });
  //res.send("Server is up and running.");

//npm i body-parser
})
app.post("/", function(req, res) {
  console.log(req.body.cityName);
  //console.log("Post request received.");
})

app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});
