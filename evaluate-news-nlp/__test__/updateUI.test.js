/*eslint-env jest-environment-jsdom*/

import { updateUI } from '../src/client/js/app';

describe('updateUI function', () => {
  test('should update the UI with the provided data', () => {
    // Mock the DOM elements
    document.body.innerHTML = `
      <div id="city"></div>
      <div id="picture"></div>
      <div id="weather"></div>
      <div id="temp"></div>
    `;

    // Define the data to be passed to the updateUI function
    const data = {
      city: 'New York',
      remainingDays: 5,
      imageURL: 'https://example.com/image.jpg',
      forecast: [
        { weather: 'Sunny', temperature: 25 },
        { weather: 'Cloudy', temperature: 20 },
        { weather: 'Rainy', temperature: 15 },
        { weather: 'Snowy', temperature: 0 },
        { weather: 'Windy', temperature: 10 }
      ]
    };

    // Call the updateUI function
    updateUI(data);

    // Assert that the DOM elements have been updated correctly
    expect(document.querySelector('#city').innerHTML).toBe('Your trip to New York in 5 Days:<br>');
    expect(document.querySelector('#picture').innerHTML).toBe('<img src="https://example.com/image.jpg" alt="City Picture">');
    expect(document.querySelector('#weather').innerHTML).toBe('Weather: <br>Windy<br>');
    expect(document.querySelector('#temp').innerHTML).toBe('Temperature: 10 °C');
  });
});