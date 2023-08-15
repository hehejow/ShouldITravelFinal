export function handleSubmit() {
    const city = document.querySelector("#zip").value;
    const tripDateInput = document.getElementById("trip-date");
    const tripDate = new Date(tripDateInput.value);
    const currentDate = new Date();
    const timeDifference = tripDate.getTime() - currentDate.getTime();
    const remainingDays = Math.ceil(timeDifference / (1000  *3600*  24));
  
    console.log('Remaining days:', remainingDays);
  
    fetch("/weather", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        city: city,
        tripDate: tripDate,
        remainingDays: remainingDays
      })
    })
      .then(response => response.json())
      .then(data => {
        updateUI(data);
      })
      .catch(error => {
        console.log("Error:", error);
      });
  }
  
  function updateUI(data, forecastIndex) {
    const selectedForecast = data.forecast[forecastIndex];
  
    if (selectedForecast && selectedForecast.hasOwnProperty('weather')) {
      document.querySelector('#weather').innerHTML = 'Weather: ' + '<br>' + selectedForecast.weather + '<br>';
    } else {
      document.querySelector('#weather').innerHTML = 'Weather information not available';
    }
  
    document.querySelector('#temp').innerHTML = 'Temperature: ' + Math.round(selectedForecast.temperature) + ' °C';
  }
  const listeningClient = function(statuscode) {
    console.log(`Running on localhost: 5000`);
    return statuscode
  }

module.exports = { listeningClient };