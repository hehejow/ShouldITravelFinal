/**
 * @jest-environment jest-environment-jsdom
 */

import { handleSubmit } from "../src/client/js/formHandler";

describe("Testing the submit functionality", () => {
  test("Testing the handleSubmit() function", () => {
    // Create a mock event object with a preventDefault function
    const event = {
      preventDefault: jest.fn(),
    };

    // Mock the getElementById function to return a dummy value
    document.getElementById = jest.fn().mockReturnValue({
      value: "https://www.bbc.com/news/world-asia-66494200",
    });

    // Define the expected output for the API call
    const expectedOutput = {
      agreement: {
        DISAGREEMENT: "Disagreement value",
        AGREEMENT: "Agreement value",
      },
      subjectivity: {
        SUBJECTIVE: "Subjective value",
        OBJECTIVE: "Objective value",
      },
    };

    // Mock the fetch function to return a Promise with the expected output
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(expectedOutput),
      })
    );

    // Call the handleSubmit function and expect it to resolve with the expected output
    expect(handleSubmit(event)).resolves.toEqual(expectedOutput);

    // Check if the preventDefault function was called
    expect(event.preventDefault).toHaveBeenCalled();
  });
});