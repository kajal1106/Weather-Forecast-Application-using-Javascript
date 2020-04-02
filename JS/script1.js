let appId = '5fbaef6a709ed9ca0793476ef2f4f7be';
let units;
let searchMethod;
var searchTerm;
var counter = 0;

function searchWeather() {
    searchTerm = document.getElementById('searchInput').value;
    if (document.getElementById('switchToggle').checked == true) {
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
            let sunriseIcon = document.querySelector('#weatherContainer #sunriseIcon');
            let sunsetElement = document.getElementById('sunset');
            let sunsetIcon = document.getElementById('sunsetIcon')
            let sunriseData = document.getElementById('sunriseData');
            let sunsetData = document.getElementById('sunsetData');
            let windIcon = document.getElementById('windIcon');
            let windElement = document.getElementById('wind');
            let windData = document.getElementById('windData');
            let humidIcon = document.getElementById('humidIcon');
            let humidElement = document.getElementById('humidity');
            let humidData = document.getElementById('humidData');



            var wicon = document.getElementById('sunriseIcon');
            console.log(wicon);
            wicon.setAttribute("src", "sunrise.png");

            var wicon1 = document.getElementById('sunsetIcon');
            console.log(wicon1);
            wicon1.setAttribute("src", "sunset.png");

            var wicon2 = document.getElementById('humidIcon');
            console.log(wicon2);
            wicon2.setAttribute("src", "humidity.png");

            var wicon3 = document.getElementById('windIcon');
            console.log(wicon3);
            wicon3.setAttribute("src", "wind.png");


            setPositionForWeatherInfo();

            var divdesc = document.getElementById("cityHeader");
            divdesc.innerHTML = names + ",<span style='font-size:27px;'>" + country + "</span>";
            var sunrisediv = document.getElementById("sunriseData");
            var sunriseT = new Date(sunrise);
            sunrisediv.innerHTML = 'Sunrise  ' + sunriseT.getHours() + ":" + sunriseT.getMinutes() + ' am';
            var sunsetdiv = document.getElementById("sunsetData");
            var sunsetT = new Date(sunset);
            sunsetdiv.innerHTML = 'Sunset  ' + sunsetT.getHours() + ":" + sunsetT.getMinutes() + ' pm';
            var temperaturediv = document.getElementById("temperature");
            temperaturediv.innerHTML = Math.floor(temperaturecurr) + '<sup class="degree">°</sup>';
            var humiditydiv = document.getElementById("humidity");
            humidData.innerHTML = 'Humidity ' + humiditycurr + '%';
            var weatherdescription = document.getElementById("weatherDescriptionHeader");
            weatherdescription.innerHTML = cloudstatus;
            var windspeeddiv = document.getElementById("windSpeed");
            windData.innerHTML = 'Wind ' + Math.floor(windspeed) + 'm/s';
            let weatherIcon = document.getElementById('documentIconImg');

            weatherIcon.src = 'http://openweathermap.org/img/w/' + data.getElementsByTagName("weather")[0].getAttribute("icon") + '.png';

            init(weathercurr);
            searchWeatherHourly(searchTerm);
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
            document.body.style.backgroundImage = 'url("clear.jpg")';
            break;
        case '02d':
        case '02n':
        case '03d':
        case '03n':
        case '04d':
        case '04n':
            document.body.style.backgroundImage = 'url("cloudy.jpg")';
            break;
        case '10d':
        case '09d':
        case '50d':
        case '10n':
        case '09n':
        case '50n':
            document.body.style.backgroundImage = 'url("rain.jpg")';
            break;
        case '11d':
        case '11n':
            document.body.style.backgroundImage = 'url("storm.jpg")';
            break;
        case '13d':
        case '13n':
            document.body.style.backgroundImage = 'url("snow.jpg")';
            break;
        default:
            break;
    }
}

function setPositionForWeatherInfo() {
    let weatherContainer = document.getElementById('weatherContainer');
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidht = weatherContainer.clientWidth;
    weatherContainer.style.visibility = 'visible';

}

function searchWeatherHourly(searchTerm1) {

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

                    let weathercurrIcon = document.getElementById('weatherIconImg');
                    var symbolIcon = days[j].getElementsByTagName("symbol")[0].getAttribute("var") + ".png";
                    weathercurrIcon.src = 'http://openweathermap.org/img/w/' + symbolIcon;
                    console.log(symbolIcon);
                    var allDay = new Date(times[j]).getDay();
                    document.getElementById('wthree-day').innerHTML = dayNames[allDay];
                }
                if (new Date(times[j]).getDate() == singledays[1]) {
                    var temperature = days[j].getElementsByTagName("temperature")[0];
                    daysII.push(temperature.getAttribute("value"));

                    let weathercurrIcon1 = document.getElementById('weatherIconImg1');
                    var symbolIcon1 = days[j].getElementsByTagName("symbol")[0].getAttribute("var") + ".png";
                    weathercurrIcon1.src = 'http://openweathermap.org/img/w/' + symbolIcon1;
                    console.log(symbolIcon1);

                    var allDay = new Date(times[j]).getDay();
                    document.getElementById('wthree-day1').innerHTML = dayNames[allDay];

                    tomIcon.push(days[j].getElementsByTagName("symbol")[0].getAttribute("var") + ".png");


                }
                if (new Date(times[j]).getDate() == singledays[2]) {
                    var temperature = days[j].getElementsByTagName("temperature")[0];
                    daysIII.push(temperature.getAttribute("value"));

                    let weathercurrIcon2 = document.getElementById('weatherIconImg2');
                    var symbolIcon2 = days[j].getElementsByTagName("symbol")[0].getAttribute("var") + ".png";
                    weathercurrIcon2.src = 'http://openweathermap.org/img/w/' + symbolIcon2;
                    console.log(symbolIcon2);

                    var allDay = new Date(times[j]).getDay();
                    document.getElementById('wthree-day2').innerHTML = dayNames[allDay];
                }
                if (new Date(times[j]).getDate() == singledays[3]) {
                    var temperature = days[j].getElementsByTagName("temperature")[0];
                    daysIV.push(temperature.getAttribute("value"));

                    let weathercurrIcon3 = document.getElementById('weatherIconImg3');
                    var symbolIcon3 = days[j].getElementsByTagName("symbol")[0].getAttribute("var") + ".png";
                    weathercurrIcon3.src = 'http://openweathermap.org/img/w/' + symbolIcon3;
                    console.log(symbolIcon3);

                    var allDay = new Date(times[j]).getDay();
                    document.getElementById('wthree-day3').innerHTML = dayNames[allDay];

                }
                if (new Date(times[j]).getDate() == singledays[4]) {
                    var temperature = days[j].getElementsByTagName("temperature")[0];
                    daysV.push(temperature.getAttribute("value"));

                    let weathercurrIcon4 = document.getElementById('weatherIconImg4');
                    var symbolIcon4 = days[j].getElementsByTagName("symbol")[0].getAttribute("var") + ".png";
                    weathercurrIcon4.src = 'http://openweathermap.org/img/w/' + symbolIcon4;
                    console.log(symbolIcon4);

                    var allDay = new Date(times[j]).getDay();
                    document.getElementById('wthree-day4').innerHTML = dayNames[allDay];

                }
                if (new Date(times[j]).getDate() == singledays[5]) {
                    var temperature = days[j].getElementsByTagName("temperature")[0];
                    daysVI.push(temperature.getAttribute("value"));

                    let weathercurrIcon5 = document.getElementById('weatherIconImg5');
                    var symbolIcon5 = days[j].getElementsByTagName("symbol")[0].getAttribute("var") + ".png";
                    weathercurrIcon5.src = 'http://openweathermap.org/img/w/' + symbolIcon5;
                    console.log(symbolIcon);

                    var allDay = new Date(times[j]).getDay();
                    document.getElementById('wthree-day5').innerHTML = dayNames[allDay];
                }
            }
            console.log(daysI);
            console.log(daysII);
            console.log(daysIII);
            console.log(daysIV);
            console.log(daysV);
            console.log(daysVI);

            document.getElementById('min-temp').innerHTML = Math.floor(Math.min.apply(null, daysI)) + '<sup class="degree">°</sup>';
            document.getElementById('max-temp').innerHTML = Math.floor(Math.max.apply(null, daysI)) + '<sup class="degree">°</sup>';
            document.getElementById('min-temp1').innerHTML = Math.floor(Math.min.apply(null, daysII)) + '<sup class="degree">°</sup>';
            document.getElementById('max-temp1').innerHTML = Math.floor(Math.max.apply(null, daysII)) + '<sup class="degree">°</sup>';
            document.getElementById('min-temp2').innerHTML = Math.floor(Math.min.apply(null, daysIII)) + '<sup class="degree">°</sup>';
            document.getElementById('max-temp2').innerHTML = Math.floor(Math.max.apply(null, daysIII)) + '<sup class="degree">°</sup>';
            document.getElementById('min-temp3').innerHTML = Math.floor(Math.min.apply(null, daysIV)) + '<sup class="degree">°</sup>';
            document.getElementById('max-temp3').innerHTML = Math.floor(Math.max.apply(null, daysIV)) + '<sup class="degree">°</sup>';
            document.getElementById('min-temp4').innerHTML = Math.floor(Math.min.apply(null, daysV)) + '<sup class="degree">°</sup>';
            document.getElementById('max-temp4').innerHTML = Math.floor(Math.max.apply(null, daysV)) + '<sup class="degree">°</sup>';
            document.getElementById('min-temp5').innerHTML = Math.floor(Math.min.apply(null, daysVI)) + '<sup class="degree">°</sup>';
            document.getElementById('max-temp5').innerHTML = Math.floor(Math.max.apply(null, daysVI)) + '<sup class="degree">°</sup>';

            console.log(tomIcon);
            for (let i = 1; i <= 8; i++) {
                var el = "#weatherContainer #weatherHourly" + i;

                document.querySelector(el + " > #iconDiv > #forecastIcon").src = "http://openweathermap.org/img/w/" + tomIcon[i - 1];
                document.querySelector(el + " > #temperaturecurr").innerHTML = Math.floor(daysII[i - 1]) + '<sup class="degree">°</sup>';
            }

            google.charts.load('current', {
                packages: ['corechart', 'bar']
            });
            google.charts.load('current', {
                'packages': ['line']
            });
    google.charts.setOnLoadCallback(drawBasic1);
            function drawBasic1() {
                var data = new google.visualization.DataTable();
                data.addColumn('datetime', 'Time');
                data.addColumn('number', 'Temperature');
                var popopo = [];
                for (let k = 0; k < 8; k++) {
                    console.log(times[k]);
                    var year = new Date(times[k]).getFullYear();
                    var monthval = new Date(times[k]).getMonth();
                    var dayval = new Date(times[k]).getDate();
                    var hourval = new Date(times[k]).getHours();
                    var minuteval = new Date(times[k]).getMinutes();
                    var x1 = new Date(year, monthval, dayval, hourval);
                    console.log(x1);
                    var lol1 = days[k].getElementsByTagName("temperature")[0];
                    var x2 = parseFloat(lol1.getAttribute("value"));
                    popopo.push([x1, x2]);
                }
                console.log(popopo);
                data.addRows(popopo);
            var options = {
                       hAxis: {
                        title: 'Time',
                        format: 'HH:mm',
                        textStyle: {
                            color: 'white'
                        },
                        baselineColor: 'transparent',
                        titleTextStyle: {
                            color: 'white',
                            fontName: "Palatino Linotype",
                            fontSize: 18,
                            bold: true,
                            italic: false
                        },
                        gridlines: {
                            color: 'transparent'
                        },

                    },
                    title: 'Temperature vs Time',
                    titleTextStyle: {
                        color: '#C68E17',
                        fontName: "Palatino Linotype",
                        fontSize: 22,
                        bold: true,
                        italic: false
                    },

                    vAxis: {
                        title: 'Temperature',
                        textStyle: {
                            color: 'white'
                        },
                        titleTextStyle: {
                            color: 'white',
                            fontName: "Palatino Linotype",
                            fontSize: 18,
                            bold: true,
                            italic: false
                        },

                        gridlines: {
                            color: 'transparent'
                        },
                        baselineColor: 'transparent'
                    },
                    'width': 580,
                    'height': 450,

                    backgroundColor: {
                        fill: 'transparent'
                    },
                    legend: 'none',
                    colors: ['white']
                };

                var leftchart1 = new google.visualization.AreaChart(document.getElementById('chart1'));

                leftchart1.draw(data, options);
            }


            google.charts.setOnLoadCallback(drawChart2);

            function drawChart2() {
                var data = new google.visualization.DataTable();
                data.addColumn('datetime', 'Time');
                data.addColumn('number', 'Humidity');
                var bargrapharr = [];
                for (let k = 0; k < 8; k++) {
                    var year = new Date(times[k]).getFullYear();
                    var monthval = new Date(times[k]).getMonth();
                    var dayval = new Date(times[k]).getDate();
                    var hourval = new Date(times[k]).getHours();
                    var minuteval = new Date(times[k]).getMinutes();
                    var y1 = new Date(year, monthval, dayval, hourval, minuteval);
                    var lol2 = days[k].getElementsByTagName("humidity")[0];
                    var y2 = parseFloat(lol2.getAttribute("value"));
                    bargrapharr.push([y1, y2]);
                }
                data.addRows(bargrapharr);
                var options = {
                    title: "Humidity : 24 Hours (%)",
                    titleTextStyle: {
                        color: '#C68E17',
                        fontName: "Palatino Linotype",
                        fontSize: 22,
                        bold: true,
                        italic: false
                    },
                    backgroundColor: {
                        fill: 'transparent'
                    },
                    'width': 580,
                    'height': 450,
                    colors: ['White', 'green'],
                    is3D: true,
                    hAxis: {
                        format: 'HH:mm',
                        title: 'Time',
                        textStyle: {
                            color: 'white'
                        },
                        titleTextStyle: {
                            color: 'white',
                            fontName: "Palatino Linotype",
                            fontSize: 18,
                            bold: true,
                            italic: false
                        },

                        gridlines: {
                            color: 'transparent'
                        },
                    },
                    vAxis: {
                        title: 'Humidity(%)',
                        textStyle: {
                            color: 'white'
                        },
                        titleTextStyle: {
                            color: 'white',
                            fontName: "Palatino Linotype",
                            fontSize: 18,
                            bold: true,
                            italic: false
                        },
                        gridlines: {
                            color: 'transparent'
                        },
                    },

                    bar: {
                        groupWidth: "55%"
                    },
                    legend: {
                        position: "none"
                    },
                };
                var barchart1 = new google.visualization.ColumnChart(document.getElementById("chart2"));
                barchart1.draw(data, options);
            }

        }
    };
    request1.open("GET", url1, true);
    request1.send();

}

document.getElementById('searchBtn').addEventListener('click', () => {
    searchTerm = document.getElementById('searchInput').value;
    if (searchTerm)
        searchWeather(searchTerm);
    searchWeatherHourly(searchTerm);
});

function showHideDiv() {
    if (counter == 0) {
        document.getElementById("searchForecast").style.display = "none";
        document.getElementById("weatherMiddle").style.display = "none";
        counter = 1;
    } else if (counter == 1) {
        document.getElementById("searchForecast").style.display = "block";
        document.getElementById("weatherMiddle").style.display = "block";
        counter = 0;
    }

}

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.querySelector('#weatherContainer #txt').innerHTML =
        h + ":" + m + ":" + s;
    document.querySelector('#weatherContainer1 #txt').innerHTML =
        h + ":" + m + ":" + s;
    document.querySelector('#weatherContainer2 #txt').innerHTML =
        h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    };
    return i;
}
window.onload = function () {
    searchWeather();
    startTime();
    // searchWeatherHourly();
}