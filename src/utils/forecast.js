const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/13b4a0fdcd79afe253956a52348f5067/' + latitude + ',' + longitude

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service!')
        }
        else if (body.error){
            callback('Unable to find location')
        }
        else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees outside. Today\'s High is ' + body.daily.data[0].temperatureHigh + ' degrees. Today\'s Low is ' + + body.daily.data[0].temperatureLow + ' degrees. There is ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast