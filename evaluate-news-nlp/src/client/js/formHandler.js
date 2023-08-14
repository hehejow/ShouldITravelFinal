function handleSubmit(event) {
    return new Promise((resolve, reject) => {
      event.preventDefault();
      // Get the URL entered by the user
      let formText = document.getElementById('name').value;
      // Make a fetch request to your server-side API
      fetch(`/api/analyze?url=${encodeURIComponent(formText)}`)
        .then(res => res.json())
        .then(function (response) {
          console.log(response);
          // Check if sentence_list exists before iterating over it
          let sentenceText = '';
          if (response.sentence_list) {
            for (let i = 0; i < response.sentence_list.length; i++) {
              sentenceText += response.sentence_list[i].text + '<br>';
            }
          }
          // Display the API response in the results element
          document.getElementById('results').innerHTML = `
            Agreement: ${response.agreement}<br>
            Subjectivity: ${response.subjectivity}<br><br><br>
            Text: <br><br>${sentenceText}
          `;
          resolve(response); // Resolve the Promise with the response
        })
        .catch(function (error) {
          console.error(error);
          document.getElementById('results').innerHTML = 'Error occurred while fetching data.';
          reject(error); // Reject the Promise with the error
        });
    });
  }
  
  export { handleSubmit };