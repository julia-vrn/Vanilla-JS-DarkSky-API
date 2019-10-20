window.addEventListener('load', () => {
    let long;
    let lat;
    
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".degree-section");
    let temperatureSectionSpan = document.querySelector(".degree-section span");


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition( position=> {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api =  `${proxy}https://api.darksky.net/forecast/15252bec15e9e540c5d51fa6b0e90a66/${lat},${long}`;
            console.log(api);
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const {temperature, summary, icon} = data.currently;
                //set DOM Elements from the API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                //Formula for Celsius
                let celsius = (temperature - 32) * (5/9);

                //Set icon
                setIcons(icon, document.querySelector(".icon"));
                //Change temperature from F to C
                temperatureSection.addEventListener('click', () => {
                    if(temperatureSectionSpan.textContent === "F") {
                        temperatureSectionSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);

                    } else {
                        temperatureSectionSpan.textContent = "F";
                        temperatureDegree.textContent = temperature;
                    }
                })
                
            });
        });
    } 

function setIcons(icon, iconID) {
    const skycons = new Skycons({color: "white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
}

});