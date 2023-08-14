/**
 * @jest-environment jest-environment-jsdom
 */

import { addResultsEventHandler } from "../src/client/js/errorHandler";

describe("Testing the addResultsEventHandler function", () => {
  test("Testing the event listener", () => {
    // Create a mock resultsDiv element
    const resultsDiv = document.createElement("div");
    resultsDiv.id = "results";

    // Append the resultsDiv to the document body
    document.body.appendChild(resultsDiv);

    // Create a mock event
    const event = new Event("DOMSubtreeModified");

    // Set the initial innerHTML of the resultsDiv
    resultsDiv.innerHTML = "Error occurred while fetching data.";

    // Mock the alert function
    global.alert = jest.fn();

    // Call the addResultsEventHandler function
    addResultsEventHandler();

    // Trigger the event listener
    resultsDiv.dispatchEvent(event);

    // Check if the alert function was called
    expect(global.alert).toHaveBeenCalledWith(
      "Not a valid URL! Please enter a valid URL."
    );
  });
});