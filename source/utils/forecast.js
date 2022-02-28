const request = require('request')

const forecast = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=8c8b361ebc5ce5a544db502ed0bf1b2e&query='+ latitude +','+ longitude +'&units=f'

    request({url, json: true}, (error, {body}={})=>{
        if(error){
            callback('Unable to connect to weather service.', undefined)
        }else if(body.error){
            callback('Unable to find location.', undefined)
        } else{
            callback(undefined, body.current.weather_descriptions[0] + ", It is currently " + body.current.temperature + " degrees. It feels like " + body.current.feelslike + ". There is a " + body.current.precip + "% chance of rain.")
        }
    })
}
module.exports = forecast