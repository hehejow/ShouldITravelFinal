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
  
  export function updateUI(data) {
    document.querySelector('#city').innerHTML = 'Your trip to ' + data.city + ' in ' + data.remainingDays + ' Days:<br>';
    document.querySelector('#picture').innerHTML = '<img src="' + data.imageURL + '" alt="City Picture">';
  
    const forecastIndex = data.remainingDays;
    const selectedForecast = data.forecast[forecastIndex];
  
    document.querySelector('#weather').innerHTML = 'Weather: ' + '<br>' + selectedForecast.weather + '<br>';
    document.querySelector('#temp').innerHTML = 'Temperature: ' + Math.round(selectedForecast.temperature) + ' °C';
  }