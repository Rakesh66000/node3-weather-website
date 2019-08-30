const path = require('path');
const express = require('express');
const hbs = require('hbs');
var geocode = require('./utils/geocode')
var forecast = require('./utils/forecast')


// Initialixe Server
const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialviewsPath = path.join(__dirname, '../templates/partials');

// Setup handlerbar engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);

// Register Partial Views
hbs.registerPartials(partialviewsPath);

// Use static files from public directory
app.use(express.static(publicDirectoryPath))

// Setup routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Rakesh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Rakesh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is a Sample Message',
        name: 'Rakesh'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide a address"
        });
    }
    geocode(req.query.address, (error, { latitude, longitude }={}) => {
        if (error) {
            res.send({ error })
        }
        else {
            forecast(latitude, longitude, (error, { Location, Temperature, Summary }) => {
                if (error) {
                    res.send({ error })
                }
                else {
                    res.send({
                        Location: Location,
                        Temperature: Temperature + " degree celcius",
                        Summary: Summary,
                        address: req.query.address
                    });
                }
            })
        }
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        });
    }
    console.log(req.query.search);
    res.send({
        products: []
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Rakesh',
        error: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Rakesh',
        error: 'Page not Found!'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000')
})