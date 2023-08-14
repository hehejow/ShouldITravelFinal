function addResultsEventHandler() {
    const resultsDiv = document.getElementById('results');
    
    resultsDiv.addEventListener('DOMSubtreeModified', function() {
      if (resultsDiv.innerHTML === 'Error occurred while fetching data.') {
        alert('Not a valid URL! Please enter a valid URL.');
      }
    });
  }
export { addResultsEventHandler }