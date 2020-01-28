const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve, used for all routes since '/' is the path by default and all URLs match the path
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Balaji'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Balaji'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Some useful helptext',
        title: 'Help Page',
        name: 'Balaji'
    })
})

// app.get('/weather', (req, res) => {
//     res.send({
//         location: 'San Jose',
//         forecase: 'Its sunny in San Jose!',        
//         name: 'Balaji'
//     })
// })

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'You must enter an address'
        })
    }
    console.log(req.query.address)

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,  
                location,
                address: req.query.address 
            })
        })
    })
})

app.get('/products', (req, res) => {

    if(!req.query.search){
        return res.send({
            error: 'You must add a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help Article not found',
        name: 'Balaji'
    })})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found',
        errormsg: 'Sorry this page does not exist',
        name: 'Balaji'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})