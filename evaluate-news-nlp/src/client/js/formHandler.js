function handleSubmit(event) {
    event.preventDefault();

    // Get the URL entered by the user
    let formText = document.getElementById('name').value;

    // Make a fetch request to your server-side API
    fetch(`/api/analyze?url=${encodeURIComponent(formText)}`)
        .then(res => res.json())
        .then(function(response) {
            console.log(response)
            // Display the API response in the results element
            document.getElementById('results').innerHTML = `
                Polarity: ${response.polarity}<br>
                Subjectivity: ${response.subjectivity}<br>
                Text: ${response.text}
            `;
        })
        .catch(function(error) {
            console.error(error);
            document.getElementById('results').innerHTML = 'Error occurred while fetching data.';
        });
}
export { handleSubmit };