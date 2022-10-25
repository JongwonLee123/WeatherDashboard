# WeatherDashboard

In this weatherdashboard, if a user wishes to find a cities weather conditions for the current day and the next five days, the site will produce the current weather conditions and the 5-day forecast. 

In order to call this data, the OpenWeather API was used by fetching from two different links that provided current weather conditions and anothe that provided forecast weather conditions. 

For the CSS and styling used on the website, bootstrap was mainly used to create a nice format. 

The javascript file contains the a local storage, which saves past cities that were searched before. There are three functions used to get data for the index.html. The getConditions is able to collect the cities coordinates and current conditions, which is updated through renderCurrent. RenderForecast is implemented after getting the latitude and longitude of the city and the data collected is updated onto the index.html file. 
