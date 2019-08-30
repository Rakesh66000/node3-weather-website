var request = require('request');

var forecast = (latitude, longitude, callback) => {
    var weatherUrl = "https://api.darksky.net/forecast/8afe4dc6c89ce26e1039f5e865ce285e/" + latitude + "," + longitude+"?units=si";

    request({ url: weatherUrl, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location service!');
        }
        else if (body.error) {
            callback('Unable to find location! Please try again.');

        } else {
            callback(undefined, {
                'Location': body.timezone,
                'Temperature': body.currently.temperature,
                'Summary': body.currently.summary
            })
        }
    })

}

module.exports = forecast;