window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimeZone = document.querySelector(".location-timezone");
  let currentIconSet = document.querySelector(".icon");
  let degreeSection = document.querySelector(".temperature");
  const temperatureSpan = document.querySelector(".temperature span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=24a7f50459caa7188895d9a49ee45df0&units=metric`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const { name } = data;
          const description = data.weather[0].description;
          const {icon} = data.weather[0];
          const { temp } = data.main;
          //setting DOM elements from API
        currentIconSet.innerHTML = `<img src="animated/${icon}.svg"></img>`
          temperatureDegree.textContent = temp;
          temperatureDescription.textContent = description.charAt(0).toUpperCase() + description.slice(1) ;
          locationTimeZone.textContent = name;

        // formula for converting cels 

        let cels = (temp + 32) * (9/5);

        // change temp on click
        degreeSection.addEventListener('click', () => {
            if(temperatureSpan.textContent === 'C'){
                temperatureSpan.textContent = 'F';
                temperatureDegree.textContent = Math.floor(cels);
            }else {
                temperatureSpan.textContent = 'C';
                temperatureDegree.textContent = temp
            }
        })


        });
    });
  } else {
    h1.textContent = "Please enable your location!";
  }
});
