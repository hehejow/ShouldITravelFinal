# ArticleReader

## Overview
This is an  web app that uses a Web API to analyze the Text of user provided URLs to dynamically display the text and additional info to the website UI. 


## Instructions

Go to https://www.meaningcloud.com/developer/login and create an account or log in if you already have one.
After logging in, navigate to the API Keys section to generate a new API key.
Copy the generated API key.
Locate the .envTEMPLATE file in your project directory.
Open the .envTEMPLATE file and find the line that says API_KEY=.
Paste your API key directly after the = sign, without any spaces or quotation marks.
Save the changes to the .envTEMPLATE file.
Rename the .envTEMPLATE file to .env.

From the root folder /evaluate-news-nlp install the dependencies with `npm i`.
After that build the app by using `npm run build-prod`.
Finally, serve the app with `npm start`.
The ArticleReader is now served on http://localhost:8040/.

To use the ArticleReader, copy the URL of a website article, blog, etc.
Using the API the text will be analyzed and displayed on the App.


## Additional Functionality

Build the app in development mode by using `npm run build-dev`. This will open a new Browser Tab and serve the ArticleReader in dev mode to http://localhost:8080.
Run `npm run test` to initiate jest testing of client side .js files.
