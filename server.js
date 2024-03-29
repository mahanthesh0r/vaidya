const express = require('express')
const app = express()
const path = require("path");
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/assets',express.static('assets'));
app.use(express.urlencoded({ extended: true }));

let formData = {};

app.get("/", (req, res) => {
    res.render('index', { step: 1, formData });
})


app.post('/next', (req, res) => {
    const { step, action, ...data } = req.body;
    Object.assign(formData, data);
    let nextStep = parseInt(step);

    if (action === 'next') {
        nextStep += 1;
    } else if (action === 'back') {
        nextStep -= 1;
    } else if (action === 'submit') {
        return res.send('Form Submitted'); 
    }
    res.render('index', { step: nextStep, formData });
});


const port = 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})