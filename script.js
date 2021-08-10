var api = " a490b47c0a1078a315f4dc892ba775c1";

var getTodaysWeather = (searchValue) => {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${api}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data); //pull data here from object "windspeed example"
      forcast(data.coord.lat, data.coord.lon);
    })

    .catch((err) => console.log(err));
};

var forcast = (lat, lon) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data); //pull data here from object "windspeed example"
    })

    .catch((err) => console.log(err));
};

getTodaysWeather("Denver");
