const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define Paths for Express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(path.join(__dirname, '../public')))
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Braeton'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Braeton E.'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help',
        message: 'lorem ipsum dolar solati el contruo ad epoch de waltas efd ',
        name: 'braeton'
    })
})

app.get('/weather', (req, res)=>{

    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData)=>{
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

// app.get('/products', (req, res)=>{
//
//     if(!req.query.search){
//         return res.send({
//             error:'You must provide a search term'
//         })
//     }
//
//
//     res.send({
//         products:[]
//     })
// })

app.get('/help/*', (req, res)=>{
    res.render('404',{
        title: 'Error',
        name: 'Braeton',
        errorMessage: 'This help article cannot be found. Please try again!'
    })
})

app.get('*', (req, res)=>{
    res.render('404',{
        title: 'Error',
        name: 'Braeton',
        errorMessage: 'This page cannot be found. Please try again!'
    })
})

app.listen(3000, ()=>{
    console.log('Surfs up! @ 3000')
})