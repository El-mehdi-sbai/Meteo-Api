let url = "https://api.openweathermap.org/data/2.5/weather?";
let city = "lunel";
let language = "fr";
const API_KEY = "185629bdb375797b96eb37a6c3d2824e";
let units = "metric";
let currentYear= new Date().getFullYear();
$('#currentYear').html(currentYear);
init();


$("#inputField").on('submit', function (event) {
    city = $("#searchCity").val();
    event.preventDefault();
    init();
});

function init() {
    AjaxGet(url);
}

function AjaxGet(url) {
    let request = new XMLHttpRequest();
    request.open("GET", url+"q="+city+"&lang="+language+"&units="+units+"&appid="+API_KEY, true);
    request.addEventListener("load", function () {
        let response = JSON.parse(request.responseText);
        if(response.cod == "200") {
            console.log(response);

            city = response.name;
            city = city.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            $('#city').html(city);

            let weather_desc = response.weather[0].description;
            $('#weatherDesc').html(weather_desc);


            let temp = response.main.temp;
            temp = Math.round(temp) +"°C";
            $('#temp').html(temp);

            let icon = response.weather[0].icon;
            icon = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
            $("#icon_url").attr("src",icon);
            $("#icon_url").attr("alt","icone météo");

            let lat = response.coord.lat;
            $('#lat').html(lat);

            let lon = response.coord.lon;
            $('#lon').html(lon);

            let feels_like = response.main.feels_like;
            feels_like = Math.round(feels_like) + "°C";
            $('#feels_like').html(feels_like);

            let humidity = response.main.humidity+" %"; 
            $('#humidity').html(humidity);


            let pressure = response.main.pressure+" hPa";
            $('#pressure').html(pressure);


            let temp_max = response.main.temp_max;
            temp_max = Math.round(temp_max)+"°C";
            $('#temp_max').html(temp_max);

            let temp_min = response.main.temp_min;
            temp_min = Math.round(temp_min)+"°C";
            $('#temp_min').html(temp_min);

            let wind_speed = response.wind.speed+"m/s";
            $('#wind_speed').html(wind_speed);


            let wind_deg = response.wind.deg+"°";
            $('#wind_deg').html(wind_deg);

            let sunrise = response.sys.sunrise;
            sunrise = new Date(sunrise*1000);
            sunrise = sunrise.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
            $('#sunrise').html(sunrise);

            let sunset = response.sys.sunset;
            sunset = new Date(sunset*1000);
            sunset = sunset.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
            $('#sunset').html(sunset);
            
    
            
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Ville introuvable...',
                text: 'Veuillez rechercher une ville existante',
                customClass: "swal",
                background: "#eee",
                backdrop: "linear-gradient(to top, #010914, #081c27, #012d37, #003f44, #00514b)"
              }).then(function () {
                window.location.reload();
              })
        }
        
    });
    
    request.send(null);
}