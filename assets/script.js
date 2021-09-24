//VARIABLE DECLARATIONS
var currentConditions =
  "https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=";
var fiveDayForcast =
  "https://api.openweathermap.org/data/2.5/forecast?units=imperial&appid=";
var uvIndex =
  "https://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}";
var apiKey = "a490b47c0a1078a315f4dc892ba775c1";
var city = "";
var searchedArr = JSON.parse(localStorage.getItem("searchedItems")) || [];

//USER INPUTS
$(document).ready(function () {
  $("#search-input").on("click", function (event) {
    var userInput = $("#search").val();
    console.log(userInput);
    getTodaysWeather(userInput);
    getFiveDayWeather(userInput);
    saveToLocalStorage(userInput);
    displaySearchHistory();
  });
});

$("#clear-search").on("click", function () {
  localStorage.removeItem("SearchHistory");
  displaySearchHistory();
});

function getTodaysWeather(cityName) {
  var apiCall = "";

  if (cityName !== "") {
    apiCall = currentConditions + apiKey + "&q=" + cityName;
  } else {
    alert("Please enter city name");
    return;
  }

  $.ajax({
    url: apiCall,
    method: "GET",
  }).then(function (response) {
    // console.log(response);
    var feelslike = Math.floor(response.main.temp);

    city = response.name;
    $("#current-weather").empty();
    $("#current-weather").append("<div> Temp: " + feelslike + "</div>");
    $("#current-weather").append("<div> Location: " + city + "</div>");
  });
}

function getFiveDayWeather(cityName) {
  $.ajax({
    url: `${fiveDayForcast}${apiKey}&q=${cityName}`,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    var averageTemp = 0;
    var previousdate = moment().format("MM/DD/YYYY");
    $("#five-day").empty();
    for (let index = 0; index < response.list.length; index++) {
      var currentDate = moment(response.list[index].dt, "X").format(
        "MM/DD/YYYY"
      );
      var temp = Math.floor(response.list[index].main.temp);
      console.log(currentDate);

      if (previousdate === currentDate) {
        averageTemp += temp;
        console.log(averageTemp);
      } else {
        previousdate = currentDate;
        averageTemp = temp;
      }

      if ((index + 1) % 8 === 0) {
        var results = Math.floor(averageTemp / 8);
        var card = $("<div class = 'card col-sm-2'>");
        var div1 = $("<div class= 'card-header'>");
        div1.append(`<h2> ${moment(currentDate).format("dddd")} </h2>`);
        card.append(div1);

        var div2 = $("<div class= 'card-body'>");
        div2.append(`<p> Average Temp: ${results} </p>`);
        card.append(div2);

        $("#five-day").append(card);
      }
    }
  });
}

function saveToLocalStorage(cityName) {
  var itemsFromStorage = localStorage.getItem("SearchHistory");
  if (itemsFromStorage) {
    var updatedItems = JSON.parse(itemsFromStorage);
    updatedItems.push(cityName);
    localStorage.setItem("SearchHistory", JSON.stringify(updatedItems));
  } else {
    localStorage.setItem("SearchHistory", JSON.stringify([cityName]));
  }
}

function displaySearchHistory() {
  var itemsFromStorage = localStorage.getItem("SearchHistory");
  if (itemsFromStorage) {
    var history = JSON.parse(itemsFromStorage);
    $(".search-history").empty();
    history.forEach((city) => {
      $(".search-history").append(`<p> ${city} </p>`);
    });
  } else {
    $(".search-history").empty();
  }
}

displaySearchHistory();
