const request = require("request");

const forecast = ({ longitude, latitude }, callback) => {
  const url = `http://api.weatherstack.com/forecast?access_key=2c05ea0c82fcb89949526a293cbccc42&query=${longitude},${latitude}`;
  // console.log(url);
  request.get({ url: url, json: true }, (err, resp) => {
    if (err) {
      callback("Unable to connect to weather services!", undefined);
    } else if (resp.body.error) {
      callback(resp.body.error, undefined);
    } else {
      callback(undefined, {
        forecast: `${resp.body.current.weather_descriptions}. It is currently ${resp.body.current.temperature} degrees. There is a ${resp.body.current.precip}% chance of rain.`,
        location: resp.body.location.name,
        icon: resp.body.current.weather_icons,
      });
    }
  });
};

module.exports = forecast;
