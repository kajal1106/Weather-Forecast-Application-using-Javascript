var counter = 0;

function searchWeather2() {
    searchTerm = document.querySelector('#searchContainer2 #searchInput1').value;
    if (document.querySelector('#switchToggle').checked == true) {
        units = 'metric';
    } else {
        units = 'imperial';
    }
    var request = new XMLHttpRequest();
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&APPID=" + appId + "&mode=xml&units=" + units;

    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = request.responseXML;
            console.log(data);
            var cityname = data.getElementsByTagName("city")[0];
            var names = cityname.getAttribute("name");
            var country = data.getElementsByTagName("country")[0].textContent;
            var sun = data.getElementsByTagName("sun")[0];
            var sunrise = sun.getAttribute("rise");
            var sunset = sun.getAttribute("set");
            var weather = data.getElementsByTagName("weather")[0];
            var weathercurr = weather.getAttribute("icon");
            var temperature = data.getElementsByTagName("temperature")[0];
            var temperaturecurr = temperature.getAttribute("value");
            var humidity = data.getElementsByTagName("humidity")[0];
            var humiditycurr = humidity.getAttribute("value");
            var clouds = data.getElementsByTagName("clouds")[0];
            var cloudstatus = clouds.getAttribute("name");
            var wind = data.getElementsByTagName("speed")[0];
            var windspeed = wind.getAttribute("value");


            console.log(names);

            let sunriseIcon = document.querySelector('#weatherContainer2 #sunriseIcon');
            console.log('sunriseIcon' + sunriseIcon);
            let sunsetElement = document.querySelector('#weatherContainer2 #sunset');
            let sunsetIcon = document.querySelector('#weatherContainer2 #sunsetIcon')
            let sunriseData = document.querySelector('#weatherContainer2 #sunriseData');
            let sunsetData = document.querySelector('#weatherContainer2 #sunsetData');
            let windIcon = document.querySelector('#weatherContainer2 #windIcon');
            let windElement = document.querySelector('#weatherContainer2 #wind');
            let windData = document.querySelector('#weatherContainer2 #windData');
            let humidIcon = document.querySelector('#weatherContainer2 #humidIcon');
            let humidElement = document.querySelector('#weatherContainer2 #humidity');
            let humidData = document.querySelector('#weatherContainer2 #humidData');



            var wicon = document.querySelector('#weatherContainer2 #sunriseIcon');
            console.log(wicon);
            wicon.setAttribute("src", "sunrise.png");

            var wicon1 = document.querySelector('#weatherContainer2 #sunsetIcon');
            console.log(wicon1);
            wicon1.setAttribute("src", "sunset.png");

            var wicon2 = document.querySelector('#weatherContainer2 #humidIcon');
            console.log(wicon2);
            wicon2.setAttribute("src", "humidity.png");

            var wicon3 = document.querySelector('#weatherContainer2 #windIcon');
            console.log(wicon3);
            wicon3.setAttribute("src", "wind.png");


            setPositionForWeatherInfo();

            var divdesc = document.querySelector('#weatherContainer2 #cityHeader');
            divdesc.innerHTML = names + ",<span style='font-size:27px;'>" + country + "</span>";
            // divdesc.innerHTML = country;
            var sunrisediv = document.querySelector('#weatherContainer2 #sunriseData');
            var sunriseT = new Date(sunrise);
            sunrisediv.innerHTML = 'Sunrise  ' + sunriseT.getHours() + ":" + sunriseT.getMinutes() + ' am';
            var sunsetdiv = document.querySelector('#weatherContainer2 #sunsetData');
            var sunsetT = new Date(sunset);
            sunsetdiv.innerHTML = 'Sunset  ' + sunsetT.getHours() + ":" + sunsetT.getMinutes() + ' pm';
            var temperaturediv = document.querySelector('#weatherContainer2 #temperature');
            temperaturediv.innerHTML = Math.floor(temperaturecurr) + '<sup class="degree">°</sup>';
            var humiditydiv = document.querySelector('#weatherContainer2 #humidity');
            humidData.innerHTML = 'Humidity ' + humiditycurr + '%';
            var weatherdescription = document.querySelector('#weatherContainer2 #weatherDescriptionHeader');
            // weatherdescription.innerHTML = cloudstatus.charAt(0).toUpperCase() + cloudstatus.slice(1) +  cloudstatus.charAt(7).toUpperCase() + cloudstatus.slice(1);

            weatherdescription.innerHTML = cloudstatus;

            // var weathercurr = document.getElementById('documentIconImg');
            var windspeeddiv = document.querySelector('#weatherContainer2 #windSpeed');
            windData.innerHTML = 'Wind ' + Math.floor(windspeed) + 'm/s';
            let weatherIcon = document.querySelector('#weatherContainer2 #documentIconImg');

            weatherIcon.src = 'http://openweathermap.org/img/w/' + data.getElementsByTagName("weather")[0].getAttribute("icon") + '.png';

            init(weathercurr);
            searchWeatherHourly2(searchTerm);
        }
    };
    request.open("GET", url, true);
    request.send();
}

function init(weathercurr) {
    console.log(weathercurr);
    switch (weathercurr) {
        case '01d':
        case '01n':
            //document.body.style.backgroundImage = 'url("clear.jpg")';
            //break;
        case '02d':
        case '02n':
        case '03d':
        case '03n':
        case '04d':
        case '04n':
        //     document.body.style.backgroundImage = 'url("cloudy.jpg")';
        //     break;
        case '10d':
        case '09d':
        case '50d':
        case '10n':
        case '09n':
        case '50n':
            //document.body.style.backgroundImage = 'url("rain.jpg")';
            //break;
        case '11d':
        case '11n':
            //document.body.style.backgroundImage = 'url("storm.jpg")';
            //break;
        case '13d':
        case '13n':
            //document.body.style.backgroundImage = 'url("snow.jpg")';
           // break;
        default:
            break;
    }
}

function setPositionForWeatherInfo() {
    let weatherContainer = document.querySelector('#weatherContainer2 ');
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidht = weatherContainer.clientWidth;

    // weatherContainer.style.left = `calc(50% - ${weatherContainerWidht/2}px)`;
    // weatherContainer.style.top =   `calc(50% - ${weatherContainerHeight/1.7}px)`;
    weatherContainer.style.visibility = 'visible';

}

function searchWeatherHourly2(searchTerm1) {

    var request1 = new XMLHttpRequest();
    var url1 = "http://api.openweathermap.org/data/2.5/forecast?q=" + searchTerm1 + "&APPID=" + appId + "&mode=xml&units=" + units;



    request1.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data1 = request1.responseXML;
            console.log(data1);

            var locationname = data1.getElementsByTagName("location")[0];
            var names = locationname.getElementsByTagName("name")[0].textContent;
            console.log(names);
            var forecast = data1.getElementsByTagName("forecast")[0];
            var days = forecast.getElementsByTagName("time");
            // console.log(time1);
            var times = [];
            var daysArray = [];
            for (let i = 0; i < days.length; i++) {
                times[i] = days[i].getAttribute("from");
                // console.log(times[i]);
                var getdate = new Date(times[i]);
                daysArray[i] = getdate.getDate();
                console.log(getdate.getDate());
            }
            var dayNames = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
                "Friday", "Saturday");
            var daysI = [];
            var daysII = [];
            var daysIII = [];
            var daysIV = [];
            var daysV = [];
            var daysVI = [];
            var singledays = Array.from(new Set(daysArray));


            var tomIcon = [];

            console.log(singledays);
            for (let j = 0; j < days.length; j++) {
                if (new Date(times[j]).getDate() == singledays[0]) {
                    var temperature = days[j].getElementsByTagName("temperature")[0];
                    daysI.push(temperature.getAttribute("value"));
                    console.log(daysI[j]);

                    let weathercurrIcon = document.querySelector('#weatherContainer2 #weatherIconImg');
                    var symbolIcon = days[j].getElementsByTagName("symbol")[0].getAttribute("var") + ".png";
                    weathercurrIcon.src = 'http://openweathermap.org/img/w/' + symbolIcon;
                    console.log(symbolIcon);
                    var allDay = new Date(times[j]).getDay();
                    document.querySelector('#weatherContainer2 #wthree-day').innerHTML = dayNames[allDay];
                }
                if (new Date(times[j]).getDate() == singledays[1]) {
                    var temperature = days[j].getElementsByTagName("temperature")[0];
                    daysII.push(temperature.getAttribute("value"));

                    let weathercurrIcon1 = document.querySelector('#weatherContainer2 #weatherIconImg1');
                    var symbolIcon1 = days[j].getElementsByTagName("symbol")[0].getAttribute("var") + ".png";
                    weathercurrIcon1.src = 'http://openweathermap.org/img/w/' + symbolIcon1;
                    console.log(symbolIcon1);

                    var allDay = new Date(times[j]).getDay();
                    document.querySelector('#weatherContainer2 #wthree-day1').innerHTML = dayNames[allDay];

                    tomIcon.push(days[j].getElementsByTagName("symbol")[0].getAttribute("var") + ".png");


                }
                if (new Date(times[j]).getDate() == singledays[2]) {
                    var temperature = days[j].getElementsByTagName("temperature")[0];
                    daysIII.push(temperature.getAttribute("value"));

                    let weathercurrIcon2 = document.querySelector('#weatherContainer2 #weatherIconImg2');
                    var symbolIcon2 = days[j].getElementsByTagName("symbol")[0].getAttribute("var") + ".png";
                    weathercurrIcon2.src = 'http://openweathermap.org/img/w/' + symbolIcon2;
                    console.log(symbolIcon2);

                    var allDay = new Date(times[j]).getDay();
                    document.querySelector('#weatherContainer2 #wthree-day2').innerHTML = dayNames[allDay];
                }
                if (new Date(times[j]).getDate() == singledays[3]) {
                    var temperature = days[j].getElementsByTagName("temperature")[0];
                    daysIV.push(temperature.getAttribute("value"));

                    let weathercurrIcon3 = document.querySelector('#weatherContainer2 #weatherIconImg3');
                    var symbolIcon3 = days[j].getElementsByTagName("symbol")[0].getAttribute("var") + ".png";
                    weathercurrIcon3.src = 'http://openweathermap.org/img/w/' + symbolIcon3;
                    console.log(symbolIcon3);

                    var allDay = new Date(times[j]).getDay();
                    document.querySelector('#weatherContainer2 #wthree-day3').innerHTML = dayNames[allDay];

                }
                if (new Date(times[j]).getDate() == singledays[4]) {
                    var temperature = days[j].getElementsByTagName("temperature")[0];
                    daysV.push(temperature.getAttribute("value"));

                    let weathercurrIcon4 = document.querySelector('#weatherContainer2 #weatherIconImg4');
                    var symbolIcon4 = days[j].getElementsByTagName("symbol")[0].getAttribute("var") + ".png";
                    weathercurrIcon4.src = 'http://openweathermap.org/img/w/' + symbolIcon4;
                    console.log(symbolIcon4);

                    var allDay = new Date(times[j]).getDay();
                    document.querySelector('#weatherContainer2 #wthree-day4').innerHTML = dayNames[allDay];

                }
                if (new Date(times[j]).getDate() == singledays[5]) {
                    var temperature = days[j].getElementsByTagName("temperature")[0];
                    daysVI.push(temperature.getAttribute("value"));

                    let weathercurrIcon5 = document.querySelector('#weatherContainer2 #weatherIconImg5');
                    var symbolIcon5 = days[j].getElementsByTagName("symbol")[0].getAttribute("var") + ".png";
                    weathercurrIcon5.src = 'http://openweathermap.org/img/w/' + symbolIcon5;
                    console.log(symbolIcon);

                    var allDay = new Date(times[j]).getDay();
                    document.querySelector('#weatherContainer2 #wthree-day5').innerHTML = dayNames[allDay];
                }
            }
            console.log(daysI);
            console.log(daysII);
            console.log(daysIII);
            console.log(daysIV);
            console.log(daysV);
            console.log(daysVI);

            document.querySelector('#weatherContainer2 #min-temp').innerHTML = Math.floor(Math.min.apply(null, daysI)) + '<sup class="degree">°</sup>';
            document.querySelector('#weatherContainer2 #max-temp').innerHTML = Math.floor(Math.max.apply(null, daysI)) + '<sup class="degree">°</sup>';
            document.querySelector('#weatherContainer2 #min-temp1').innerHTML = Math.floor(Math.min.apply(null, daysII)) + '<sup class="degree">°</sup>';
            document.querySelector('#weatherContainer2 #max-temp1').innerHTML = Math.floor(Math.max.apply(null, daysII)) + '<sup class="degree">°</sup>';
            document.querySelector('#weatherContainer2 #min-temp2').innerHTML = Math.floor(Math.min.apply(null, daysIII)) + '<sup class="degree">°</sup>';
            document.querySelector('#weatherContainer2 #max-temp2').innerHTML = Math.floor(Math.max.apply(null, daysIII)) + '<sup class="degree">°</sup>';
            document.querySelector('#weatherContainer2 #min-temp3').innerHTML = Math.floor(Math.min.apply(null, daysIV)) + '<sup class="degree">°</sup>';
            document.querySelector('#weatherContainer2 #max-temp3').innerHTML = Math.floor(Math.max.apply(null, daysIV)) + '<sup class="degree">°</sup>';
            document.querySelector('#weatherContainer2 #min-temp4').innerHTML = Math.floor(Math.min.apply(null, daysV)) + '<sup class="degree">°</sup>';
            document.querySelector('#weatherContainer2 #max-temp4').innerHTML = Math.floor(Math.max.apply(null, daysV)) + '<sup class="degree">°</sup>';
            document.querySelector('#weatherContainer2 #min-temp5').innerHTML = Math.floor(Math.min.apply(null, daysVI)) + '<sup class="degree">°</sup>';
            document.querySelector('#weatherContainer2 #max-temp5').innerHTML = Math.floor(Math.max.apply(null, daysVI)) + '<sup class="degree">°</sup>';

            console.log(tomIcon);
            for (let i = 1; i <= 8; i++) {
                var el = "#weatherContainer2 #weatherHourly" + i;
                document.querySelector(el + " > #iconDiv > #forecastIcon"   ).src = "http://openweathermap.org/img/w/" + tomIcon[i - 1];
                document.querySelector(el + " > #temperaturecurr").innerHTML = Math.floor(daysII[i - 1]) + '<sup class="degree">°</sup>';
            }
        }
    };
    request1.open("GET", url1, true);
    request1.send();

}

document.getElementById('searchBtn').addEventListener('click', () => {
    searchTerm = document.getElementById('searchInput1').value;
    if (searchTerm)
        searchWeather1(searchTerm);
    searchWeatherHourly(searchTerm);
});

function showHideDiv1() {
    if (counter == 0) {
        document.querySelector("#weatherContainer2 #searchForecast").style.display = "none";
        document.querySelector("#weatherContainer2 #weatherMiddle").style.display = "none";
        counter = 1;
    } else if (counter == 1) {
        document.querySelector("#weatherContainer2 #searchForecast").style.display = "block";
        document.querySelector("#weatherContainer2 #weatherMiddle").style.display = "block";
        counter = 0;
    }

} 

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    };
    return i;
}

//Card 1 Weather container1 
function searchWeather1() {
    searchTerm = document.querySelector('#searchContainer1 #searchInput1').value;
    if (document.querySelector(' #switchToggle').checked == true) {
        units = 'metric';
    } else {
        units = 'imperial';
    }
    var request = new XMLHttpRequest();
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&APPID=" + appId + "&mode=xml&units=" + units;

    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = request.responseXML;
            console.log(data);
            var cityname = data.getElementsByTagName("city")[0];
            var names = cityname.getAttribute("name");
            var country = data.getElementsByTagName("country")[0].textContent;
            var sun = data.getElementsByTagName("sun")[0];
            var sunrise = sun.getAttribute("rise");
            var sunset = sun.getAttribute("set");
            var weather = data.getElementsByTagName("weather")[0];
            var weathercurr = weather.getAttribute("icon");
            var temperature = data.getElementsByTagName("temperature")[0];
            var temperaturecurr = temperature.getAttribute("value");
            var humidity = data.getElementsByTagName("humidity")[0];
            var humiditycurr = humidity.getAttribute("value");
            var clouds = data.getElementsByTagName("clouds")[0];
            var cloudstatus = clouds.getAttribute("name");
            var wind = data.getElementsByTagName("speed")[0];
            var windspeed = wind.getAttribute("value");


            console.log(names);

            let sunriseIcon = document.querySelector('#weatherContainer1 #sunriseIcon');
            console.log('sunriseIcon' + sunriseIcon);
            let sunsetElement = document.querySelector('#weatherContainer1 #sunset');
            let sunsetIcon = document.querySelector('#weatherContainer1 #sunsetIcon')
            let sunriseData = document.querySelector('#weatherContainer1 #sunriseData');
            let sunsetData = document.querySelector('#weatherContainer1 #sunsetData');
            let windIcon = document.querySelector('#weatherContainer1 #windIcon');
            let windElement = document.querySelector('#weatherContainer1 #wind');
            let windData = document.querySelector('#weatherContainer1 #windData');
            let humidIcon = document.querySelector('#weatherContainer1 #humidIcon');
            let humidElement = document.querySelector('#weatherContainer1 #humidity');
            let humidData = document.querySelector('#weatherContainer1 #humidData');



            var wicon = document.querySelector('#weatherContainer1 #sunriseIcon');
            console.log(wicon);
            wicon.setAttribute("src", "sunrise.png");

            var wicon1 = document.querySelector('#weatherContainer1 #sunsetIcon');
            console.log(wicon1);
            wicon1.setAttribute("src", "sunset.png");

            var wicon2 = document.querySelector('#weatherContainer1 #humidIcon');
            console.log(wicon2);
            wicon2.setAttribute("src", "humidity.png");

            var wicon3 = document.querySelector('#weatherContainer1 #windIcon');
            console.log(wicon3);
            wicon3.setAttribute("src", "wind.png");


            setPositionForWeatherInfo();

            var divdesc = document.querySelector('#weatherContainer1 #cityHeader');
            divdesc.innerHTML = names + ",<span style='font-size:27px;'>" + country + "</span>";
            // divdesc.innerHTML = country;
            var sunrisediv = document.querySelector('#weatherContainer1 #sunriseData');
            var sunriseT = new Date(sunrise);
            sunrisediv.innerHTML = 'Sunrise  ' + sunriseT.getHours() + ":" + sunriseT.getMinutes() + ' am';
            var sunsetdiv = document.querySelector('#weatherContainer1 #sunsetData');
            var sunsetT = new Date(sunset);
            sunsetdiv.innerHTML = 'Sunset  ' + sunsetT.getHours() + ":" + sunsetT.getMinutes() + ' pm';
            var temperaturediv = document.querySelector('#weatherContainer1 #temperature');
            temperaturediv.innerHTML = Math.floor(temperaturecurr) + '<sup class="degree">°</sup>';
            var humiditydiv = document.querySelector('#weatherContainer1 #humidity');
            humidData.innerHTML = 'Humidity ' + humiditycurr + '%';
            var weatherdescription = document.querySelector('#weatherContainer1 #weatherDescriptionHeader');
            // weatherdescription.innerHTML = cloudstatus.charAt(0).toUpperCase() + cloudstatus.slice(1) +  cloudstatus.charAt(7).toUpperCase() + cloudstatus.slice(1);

            weatherdescription.innerHTML = cloudstatus;

            // var weathercurr = document.getElementById('documentIconImg');
            var windspeeddiv = document.querySelector('#weatherContainer1 #windSpeed');
            windData.innerHTML = 'Wind ' + Math.floor(windspeed) + 'm/s';
            let weatherIcon = document.querySelector('#weatherContainer1 #documentIconImg');

            weatherIcon.src = 'http://openweathermap.org/img/w/' + data.getElementsByTagName("weather")[0].getAttribute("icon") + '.png';

            init(weathercurr);
            searchWeatherHourly1(searchTerm);
        }
    };
    request.open("GET", url, true);
    request.send();
}

function searchWeatherHourly1(searchTerm1) {

    var request1 = new XMLHttpRequest();
    var url1 = "http://api.openweathermap.org/data/2.5/forecast?q=" + searchTerm1 + "&APPID=" + appId + "&mode=xml&units=" + units;



    request1.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data1 = request1.responseXML;
            console.log(data1);

            var locationname = data1.getElementsByTagName("location")[0];
            var names = locationname.getElementsByTagName("name")[0].textContent;
            console.log(names);
            var forecast = data1.getElementsByTagName("forecast")[0];
            var days = forecast.getElementsByTagName("time");
            // console.log(time1);
            var times = [];
            var daysArray = [];
            for (let i = 0; i < days.length; i++) {
                times[i] = days[i].getAttribute("from");
                // console.log(times[i]);
                var getdate = new Date(times[i]);
                daysArray[i] = getdate.getDate();
                console.log(getdate.getDate());
            }
            var dayNames = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
                "Friday", "Saturday");
            var daysI = [];
            var daysII = [];
            var daysIII = [];
            var daysIV = [];
            var daysV = [];
            var daysVI = [];
            var singledays = Array.from(new Set(daysArray));


            var tomIcon = [];

            console.log(singledays);
            for (let j = 0; j < days.length; j++) {
                if (new Date(times[j]).getDate() == singledays[0]) {
                    var temperature = days[j].getElementsByTagName("temperature")[0];
                    daysI.push(temperature.getAttribute("value"));
                    console.log(daysI[j]);

                    let weathercurrIcon = document.querySelector('#weatherContainer1 #weatherIconImg');
                    var symbolIcon = days[j].getElementsByTagName("symbol")[0].getAttribute("var") + ".png";
                    weathercurrIcon.src = 'http://openweathermap.org/img/w/' + symbolIcon;
                    console.log(symbolIcon);
                    var allDay = new Date(times[j]).getDay();
                    document.querySelector('#weatherContainer1 #wthree-day').innerHTML = dayNames[allDay];
                }
                if (new Date(times[j]).getDate() == singledays[1]) {
                    var temperature = days[j].getElementsByTagName("temperature")[0];
                    daysII.push(temperature.getAttribute("value"));

                    let weathercurrIcon1 = document.querySelector('#weatherContainer1 #weatherIconImg1');
                    var symbolIcon1 = days[j].getElementsByTagName("symbol")[0].getAttribute("var") + ".png";
                    weathercurrIcon1.src = 'http://openweathermap.org/img/w/' + symbolIcon1;
                    console.log(symbolIcon1);

                    var allDay = new Date(times[j]).getDay();
                    document.querySelector('#weatherContainer1 #wthree-day1').innerHTML = dayNames[allDay];

                    tomIcon.push(days[j].getElementsByTagName("symbol")[0].getAttribute("var") + ".png");


                }
                if (new Date(times[j]).getDate() == singledays[2]) {
                    var temperature = days[j].getElementsByTagName("temperature")[0];
                    daysIII.push(temperature.getAttribute("value"));

                    let weathercurrIcon2 = document.querySelector('#weatherContainer1 #weatherIconImg2');
                    var symbolIcon2 = days[j].getElementsByTagName("symbol")[0].getAttribute("var") + ".png";
                    weathercurrIcon2.src = 'http://openweathermap.org/img/w/' + symbolIcon2;
                    console.log(symbolIcon2);

                    var allDay = new Date(times[j]).getDay();
                    document.querySelector('#weatherContainer1 #wthree-day2').innerHTML = dayNames[allDay];
                }
                if (new Date(times[j]).getDate() == singledays[3]) {
                    var temperature = days[j].getElementsByTagName("temperature")[0];
                    daysIV.push(temperature.getAttribute("value"));

                    let weathercurrIcon3 = document.querySelector('#weatherContainer1 #weatherIconImg3');
                    var symbolIcon3 = days[j].getElementsByTagName("symbol")[0].getAttribute("var") + ".png";
                    weathercurrIcon3.src = 'http://openweathermap.org/img/w/' + symbolIcon3;
                    console.log(symbolIcon3);

                    var allDay = new Date(times[j]).getDay();
                    document.querySelector('#weatherContainer1 #wthree-day3').innerHTML = dayNames[allDay];

                }
                if (new Date(times[j]).getDate() == singledays[4]) {
                    var temperature = days[j].getElementsByTagName("temperature")[0];
                    daysV.push(temperature.getAttribute("value"));

                    let weathercurrIcon4 = document.querySelector('#weatherContainer1 #weatherIconImg4');
                    var symbolIcon4 = days[j].getElementsByTagName("symbol")[0].getAttribute("var") + ".png";
                    weathercurrIcon4.src = 'http://openweathermap.org/img/w/' + symbolIcon4;
                    console.log(symbolIcon4);

                    var allDay = new Date(times[j]).getDay();
                    document.querySelector('#weatherContainer1 #wthree-day4').innerHTML = dayNames[allDay];

                }
                if (new Date(times[j]).getDate() == singledays[5]) {
                    var temperature = days[j].getElementsByTagName("temperature")[0];
                    daysVI.push(temperature.getAttribute("value"));

                    let weathercurrIcon5 = document.querySelector('#weatherContainer1 #weatherIconImg5');
                    var symbolIcon5 = days[j].getElementsByTagName("symbol")[0].getAttribute("var") + ".png";
                    weathercurrIcon5.src = 'http://openweathermap.org/img/w/' + symbolIcon5;
                    console.log(symbolIcon);

                    var allDay = new Date(times[j]).getDay();
                    document.querySelector('#weatherContainer1 #wthree-day5').innerHTML = dayNames[allDay];
                }
            }
            console.log(daysI);
            console.log(daysII);
            console.log(daysIII);
            console.log(daysIV);
            console.log(daysV);
            console.log(daysVI);

            document.querySelector('#weatherContainer1 #min-temp').innerHTML = Math.floor(Math.min.apply(null, daysI)) + '<sup class="degree">°</sup>';
            document.querySelector('#weatherContainer1 #max-temp').innerHTML = Math.floor(Math.max.apply(null, daysI)) + '<sup class="degree">°</sup>';
            document.querySelector('#weatherContainer1 #min-temp1').innerHTML = Math.floor(Math.min.apply(null, daysII)) + '<sup class="degree">°</sup>';
            document.querySelector('#weatherContainer1 #max-temp1').innerHTML = Math.floor(Math.max.apply(null, daysII)) + '<sup class="degree">°</sup>';
            document.querySelector('#weatherContainer1 #min-temp2').innerHTML = Math.floor(Math.min.apply(null, daysIII)) + '<sup class="degree">°</sup>';
            document.querySelector('#weatherContainer1 #max-temp2').innerHTML = Math.floor(Math.max.apply(null, daysIII)) + '<sup class="degree">°</sup>';
            document.querySelector('#weatherContainer1 #min-temp3').innerHTML = Math.floor(Math.min.apply(null, daysIV)) + '<sup class="degree">°</sup>';
            document.querySelector('#weatherContainer1 #max-temp3').innerHTML = Math.floor(Math.max.apply(null, daysIV)) + '<sup class="degree">°</sup>';
            document.querySelector('#weatherContainer1 #min-temp4').innerHTML = Math.floor(Math.min.apply(null, daysV)) + '<sup class="degree">°</sup>';
            document.querySelector('#weatherContainer1 #max-temp4').innerHTML = Math.floor(Math.max.apply(null, daysV)) + '<sup class="degree">°</sup>';
            document.querySelector('#weatherContainer1 #min-temp5').innerHTML = Math.floor(Math.min.apply(null, daysVI)) + '<sup class="degree">°</sup>';
            document.querySelector('#weatherContainer1 #max-temp5').innerHTML = Math.floor(Math.max.apply(null, daysVI)) + '<sup class="degree">°</sup>';

            console.log(tomIcon);
            for (let i = 1; i <= 8; i++) {
                var el = "#weatherContainer1 #weatherHourly" + i;
                document.querySelector(el + " > #iconDiv > #forecastIcon"   ).src = "http://openweathermap.org/img/w/" + tomIcon[i - 1];
                document.querySelector(el + " > #temperaturecurr").innerHTML = Math.floor(daysII[i - 1]) + '<sup class="degree">°</sup>';
            }
        }
    };
    request1.open("GET", url1, true);
    request1.send();

}

document.getElementById('searchBtn').addEventListener('click', () => {
    searchTerm = document.getElementById('searchInput1').value;
    if (searchTerm)
        searchWeather2(searchTerm);
    searchWeatherHourly1(searchTerm);
});

function showHideDiv1() {
    if (counter == 0) {
        document.querySelector("#weatherContainer2 #searchForecast").style.display = "none";
        document.querySelector("#weatherContainer2 #weatherMiddle").style.display = "none";
        counter = 1;
    } else if (counter == 1) {
        document.querySelector("#weatherContainer2 #searchForecast").style.display = "block";
        document.querySelector("#weatherContainer2 #weatherMiddle").style.display = "block";
        counter = 0;
    }

}



window.onload = function () {
    searchWeather1();
    searchWeather2();
    // startTime();
    // searchWeatherHourly();
}