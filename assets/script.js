var APIKey = "292a5bc2a130c9a19792d9742852aa49";

var button = $("#button");
var searchCity = $("#inputValue");
button.on("click", function(event){
    event.preventDefault();
    getConditions(searchCity.val());
});

var leftBarContainer = $("#leftBarContainer");
var cityList = JSON.parse(localStorage.getItem("cityList")) || [];
function populateHistory(){
    if(cityList.length > 0){
        for(j = 0; j < cityList.length; j++){
            addCity(cityList[j], true);
        }
    }
}

populateHistory();

function addCity(cityName, check){
    for(i = 0; i < cityList.length; i++){
        if(cityList[i] === cityName && !check){
            console.log(`${cityName} card already exists`);
            return;
        }
    }

    var cityChoice = true;
    for(i = 0; i < cityList.length; i++){
        if(cityList[i] == cityName){
            cityChoice = false;
        }
    }

    if(cityChoice){
        cityList.push(cityName);
    }

    var newCityCard = $("<div>");
    newCityCard.addClass("card my-1 ");
    newCityCard.attr("id", cityName);
    newCityCard.addClass("hoverShadow");
    newCityCard.on("click", function(event) {
        event.preventDefault();
        getConditions(cityName);
    });
    var newCityBody = $("<div>");
    newCityBody.addClass("card-body custom-card-body p-1");
    newCityBody.text(cityName);

    newCityCard.append(newCityBody);
    leftBarContainer.append(newCityCard);
    localStorage.setItem("cityList", JSON.stringify(cityList));
}

function getConditions(cityName){
    var apiUrlCityCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}&units=metric`;
    fetch(apiUrlCityCurrent)
        .then(function(response){
            if (response.status === 200){
                $(".customRightArea").css("display", "block");
                addCity(cityName, false);
            } 
            else if (response.status === 404) {
                console.log("Wrong city name");
            }
            return response.json();
        })
        .then(function(data) {
            update(data);
        });
}

function update(data){
    var currentTemp = data.main.temp;
    var currentHumidity = data.main.humidity;
    var currentWind = data.wind.speed;
    var cityName = data.name;
    var icon = data.weather[0].icon;

    var lat = data.coord.lat;
    var lon = data.coord.lon;
    var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric`;
    fetch(apiUrl)
        .then(function (response){
            return response.json();
        })
        .then(function (data){
            renderCurrent(data, currentTemp, currentHumidity, currentWind, cityName, icon);

            renderForecast(data);
        });
}

function renderCurrent(data, currentTemp, currentHumidity, currentWind, cityName, icon){
    var cityNameTitle = $("#cityName");
    cityNameTitle.text(cityName);
    
    var date = $("#currentDate");
    date.text(moment().format('L'));
    
    var currentIcon = $("#weatherIcon");
    currentIcon.attr(
        "src", 
        `http://openweathermap.org/img/wn/${icon}@2x.png`
    );

    var temp = $("#temperature");
    temp.text(`Temperature: ${currentTemp}\u2103`);
    
    var humidity = $("#humidity");
    humidity.text(`Humidity: ${currentHumidity}%`);

    var wind = $("#wind");
    wind.text(`Wind speed: ${currentWind}m/s`);

    var currentConditions = $("#currentWeather");
    currentConditions.css("display", "block");
}

function renderForecast(data){
    for(i = 0; i < 5; i++){
        var currentMoment = moment().add(i + 1, "days");
        var currentDate = $(`#dateElement${i}`);
        currentDate.text(currentMoment.format('L'));

        var currentIconElement = $(`#iconElement${i}`);
        currentIconElement.attr(
            "src", 
            `http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`
        );

        var currentTemp = $(`#temperatureElement${i}`);
        currentTemp.text(`Temp(\u2103): ${data.list[i].main.temp}`);

        var currentHumidity = $(`#humidityElement${i}`);
        currentHumidity.text(`Humidity: ${data.list[i].main.humidity}%`);

        var currentWind = $(`#windElement${i}`);
        currentWind.text(`Wind speed: ${data.list[i].wind.speed}m/s`);
    }

    var forecastConditions = $("#fivedays");
    forecastConditions.css("display", "block");
}


