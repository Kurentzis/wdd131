function calculateWindChill(temperature, windSpeed) {
    if(temperature > 10 && windSpeed <= 4.8)  {
        return "N/A"
    }

    return (13.12 + 0.6215 * temperature - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temperature * Math.pow(windSpeed, 0.16)).toFixed(2) + ' °C';

}

const temperature = 8
const windSpeed = 6

let windChill = calculateWindChill(temperature, windSpeed)

const windChillElement = document.querySelector(".wind_chill")

windChillElement.innerText = windChill