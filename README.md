# Introduction

This codebase contains a web app created with VueJS CDN. The project is a test for a junior web developer position. The task of this test is to create a web app that provides an interface for job search.

# Requirements

* Fetch job data from a mock API, using the JSON provided
* Use VueJS to implement the front-end functionality
* Use Tailwind CSS, Bootstrap, or a framework that you are comfortable with to make the web page mobile responsive.
* Implement a search bar that allows the user to search for jobs by title. The search results should update dynamically as the user types.
* Implement a dropdown for the Sort By field, with options to filter by highest salary and latest date. The search results should dynamically change on selection.
* Implement checkboxes that allow the user to filter the search results by category. The categories should be fetched dynamically from the API data. The search results should dynamically change on selection.

# Bonus

* Implement pagination for the job results, with 10 results per page.
* Implement the Job Details page, linked to the View button on the Job Results page.

# Evaluation Criteria

* Code quality: Use best practices and write clean and readable code.
* Functionality: The search and filter functions should work as described.
* User interface: The web page should follow the designs provided with this document.

# Live working app

https://srawal.online/pertemps-web-app/

# How to run the code

## Method 1

* Simply download the code 
* Unzip the package
* Go to the folder and open index.html

## Method 2 (VS Code)

* If you don't have VS Code then download and install it
* Go to Extensions and type in Live Server
* Install the most popular one
* Now open the folder with your code
* Click on the file index.html
* Right-click anywhere in the workspace
* Click open with live server

## Method 3 (Node)

* Navigate to your project directory
* Open terminal or command prompt and enter <code>npm init</code> to initialise a new Node.js project and create a package.json file
* Follow the prompts to set up your project details
* Install the 'express' package <code>npm install express</code>
* Create a new file called 'index.js' in your project directory and add the following code:

```
// Import essential libraries 
const express = require('express'); 
const app = express(); 
const path = require('path'); 
const router = express.Router(); 

router.get('/', function(req, res) { 
    res.sendFile(path.join(__dirname + '/index.html')); 
    //__dirname : It will resolve to your project folder. 
}); 

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
```

* Run the server by executing <code>node index.js</code>
* Open a web browser and go to 'http://localhost:3000'. You should see the project open.


### Thank you very much for reading through this. 

