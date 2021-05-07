const request = require("request");
const url = `https://api.ipify.org?format=json`;


const fetchMyIP = function(callback) {
  request(url, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    return callback(null,ip);
  });

};


const fetchCoordsByIP = function(ip,callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const Latitude = JSON.parse(body).latitude;
    const Longitude = JSON.parse(body).longitude;
    const data = {Latitude, Longitude};
    return callback(null,data);
  });
};




module.exports = { fetchMyIP,
  fetchCoordsByIP
};
