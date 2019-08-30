var request = require('request');

var geocode = (address, callback) => {
    var geoCodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoicmFrZXNoYXRqaXJhbCIsImEiOiJjanp2bjYyZmwwc3NoM2xtamozb2Q4Y3FrIn0.c5Sp6kuwmUKl2Epfe2OvEA";

    request({ url: geoCodeUrl, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location service!');
        }
        else if (body.features.length==0 || body.features[0].length == 0) {
            callback('Unable to find location! Please try again.');
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1]
            });
        }
    })
}

module.exports = geocode;