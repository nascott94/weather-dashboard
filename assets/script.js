// var api = " a490b47c0a1078a315f4dc892ba775c1";

// var getTodaysWeather = (searchValue) => {
//   fetch(
//     `http://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${api}`
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data); //pull data here from object "windspeed example"
//       forcast(data.coord.lat, data.coord.lon);
//     })

//     .catch((err) => console.log(err));
// };

// var forcast = (lat, lon) => {
//   fetch(
//     `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api}`
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data); //pull data here from object "windspeed example"
//     })

//     .catch((err) => console.log(err));
// };

// getTodaysWeather("Denver");

//VARIABLE DECLARATIONS
var currentConditions =
  "https://api.openweathermap.org/data/2.5/weather?appid=";
var fiveDayForcast =
  "https://api.openweathermap.org/data/2.5/forecast?4e5dbe7db2b5e9c8b47fa40b691443d5q={city name},{country code}";
var uvIndex =
  "https://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}";
var apiKey = "a490b47c0a1078a315f4dc892ba775c1";
var city = "";
var searchedArr = JSON.parse(localStorage.getItem("searchedItems")) || [];

// USER INPUTS
$(document).ready(function () {
  $("#search-input").on("click", function (event) {
    var userInput = $("#search").val();
    console.log(userInput);
    getTodaysWeather(userInput);
  });
});

function getTodaysWeather(cityName) {
  var apiCall = "";

  if (cityName !== "") {
    apiCall = currentConditions + apiKey + "&q=" + cityName;
  } else {
    apiCall = currentConditions + apiKey + "&q=" + city;
  }

  $.ajax({
    url: apiCall,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    var feelslike = response.main.temp;
    feelslike = (feelslike - 273.15) * 1.8 + 32;
    feelslike = Math.floor(feelslike);
    city = response.name;
    $("#current-weather").append("<div>" + feelslike + "</div>");
    $("#current-weather").append("<div>" + city + "</div>");
    fiveDayForcast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    $.ajax({
      url: fiveDayForcast,
      method: "GET",
    }).then(function (response) {
      console.log(response);

      var averageTemp = 0;
      var previousdate = "";
      previousdate = moment().format("MM/DD/YYYY");
      for (let index = 0; index < response.list.length; index++) {
        var currentDate = moment(response.list[index].dt, "X").format(
          "MM/DD/YYYY"
        );
        var temp = response.list[index].main.temp;
        temp = (temp - 273.15) * 1.8 + 32;
        temp = Math.floor(temp);
        console.log(currentDate);
        console.log(temp);

        if (previousdate === currentDate) {
          averageTemp = averageTemp + temp;
          count++;
          previousdate = currentDate;
        } else {
          results = averageTemp / count;
          results = Math.floor(results);
          console.log("results:", results);
          var card = $("<div class = 'card col-sm-2'>");

          var div1 = $("<div class= 'card-header'>");
          div1.append("Date" + "" + currentDate);
          card.append(div1);

          var div2 = $("<div class= 'card-body'>");
          div2.append("Average Temperature:" + results);
          card.append(div2);
        }
      }
    });
  });
}
