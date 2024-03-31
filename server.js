const express = require('express')
const app = express()
const path = require("path");
const axios = require('axios')
const NodeCache = require('node-cache');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/assets',express.static('assets'));
app.use(express.urlencoded({ extended: true }));

let api_key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImNvb2xtb250ZWVlQGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc2lkIjoiMTM3NDUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3ZlcnNpb24iOiIyMDAiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL2xpbWl0IjoiOTk5OTk5OTk5IiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9tZW1iZXJzaGlwIjoiUHJlbWl1bSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGFuZ3VhZ2UiOiJlbi1nYiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvZXhwaXJhdGlvbiI6IjIwOTktMTItMzEiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXBzdGFydCI6IjIwMjQtMDMtMjkiLCJpc3MiOiJodHRwczovL3NhbmRib3gtYXV0aHNlcnZpY2UucHJpYWlkLmNoIiwiYXVkIjoiaHR0cHM6Ly9oZWFsdGhzZXJ2aWNlLnByaWFpZC5jaCIsImV4cCI6MTcxMTkyNjQ5MCwibmJmIjoxNzExOTE5MjkwfQ.wk1W0Yd-VkbQqwyhxXPE22zWFuppQOeUZBn9RpJQjjQ"
let BASE_URL = "https://sandbox-healthservice.priaid.ch"
let format = "&format=json"
let language = "&language=en-gb"
let formData = {};
let symptomsList = [];
let illnessList = [];
const myCache = new NodeCache();

app.get("/", (req, res) => {
    res.render('index', { step: 1, formData });
})


app.post('/next', async (req, res) => {
    const { step, action, ...data } = req.body;
    Object.assign(formData, data);
    let nextStep = parseInt(step);
    

    if(nextStep === 2) {
        if (formData.symptoms){
            try {
                const response = await axios.get(BASE_URL + "/symptoms?token=" + api_key + format + language);
                // Passing fetched data to EJS template
                symptomsList = response.data
              } catch (error) {
                console.error('API call error: ', error);
                res.send('Error fetching data');
              }
        } else if(formData.illness) {
            try {
                const response = await axios.get(BASE_URL + "/issues?token=" + api_key + format + language);
                // Passing fetched data to EJS template
                illnessList = response.data
              } catch (error) {
                console.error('API call error: ', error);
                res.send('Error fetching data');
              }
        }
    }

    if (action === 'next') {
        nextStep += 1;
    } else if (action === 'back') {
        nextStep -= 1;
    } else if (action === 'submit') {

        //setting formData in the cache
        myCache.set('patientData', formData, 2700)
        return res.redirect('/diagnosis')
        
    }

    if(symptomsList.length != 0)
     res.render('index', { step: nextStep, formData, data: symptomsList });
    else if(illnessList != 0)
    res.render('index', { step: nextStep, formData, data: illnessList });
    else
    res.render('index', { step: nextStep, formData});

    
   
});

app.get('/diagnosis', async (req, res) => {
    let symptomsID = [10];
    let diagnosisList = [];

try {
    const response = await axios.get(BASE_URL + "/diagnosis", {
        params: {
            symptoms: JSON.stringify([10]),
            gender: "Male",
            year_of_birth: JSON.stringify(1997),
            token : api_key,
            format: "json",
            language: "en-gb"
        }
    });
    // Passing fetched data to EJS template
    const totalIssues = response.data.length;
    const totalSpecialisations = response.data.reduce((total, item) => total + item.Specialisation.length, 0);
    diagnosisList = response.data;

    console.log(diagnosisList)

    console.log("Total Issues:" +  totalIssues);
    console.log("Total Specialisation:" +  totalSpecialisations);

    res.render('diagnosis', {totalIssues, totalSpecialisations, formData, diagnosisList})

  } catch (error) {
    console.error('API call error: ', error);
    res.send('Error fetching data');
  }

  
})

const port = 3001
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})