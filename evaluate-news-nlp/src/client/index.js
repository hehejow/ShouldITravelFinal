import './styles/resets.scss'
import './styles/base.scss'
// import { handleSubmit } from './js/formHandler';

"use strict";
document.querySelector("#generate").addEventListener("click", function () {
  const zipCode = document.querySelector("#zip").value;
  const tripDateInput = document.getElementById("trip-date"); // Declare and initialize the tripDateInput variable
  const tripDate = new Date(tripDateInput.value); // Access the value of tripDateInput and assign it to tripDate

  // Calculate the remaining days
  const currentDate = new Date();
  const timeDifference = tripDate.getTime() - currentDate.getTime();
  const remainingDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

  // Display the remaining days to the user
  console.log('Remaining days:', remainingDays);

  fetch("/weather", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      zipCode: zipCode,
      tripDate: tripDate,
      remainingDays: remainingDays
    })
  })
    .then(response => response.json())
    .then(data => {
      // Call function to update UI with data from server
      updateUI(data);
    })
    .catch(error => {
      console.log("Error:", error);
    });
});

// Function to update UI
function updateUI(data) {
  document.querySelector('#temp').innerHTML = 'Temperature: ' + Math.round(data.temperature) + ' °F';
  document.querySelector('#date').innerHTML = 'Date: ' + data.date;
  document.querySelector('#content').innerHTML = 'Mood: ' + data.userResponse;
}