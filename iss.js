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

    const lat = JSON.parse(body).latitude;
    const lon = JSON.parse(body).longitude;
    const data = {lat, lon};
    return callback(null,data);
  });
};



const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss/v1/?lat=${coords.lat}&lon=${coords.lon}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISSFlyOverTimes. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body);
    const flyOverTime = data.response;
    return callback(null,flyOverTime);
  });
};



const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error,null);
    }
    // console.log('It worked! Returned IP:' , ip);
    
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error,null);
      }
      
      // console.log('It worked! Returned coordinates:' , coords);
        
      fetchISSFlyOverTimes(coords, (error, flyOverTime) => {
        if (error) {
          return callback(error,null);
        }
        
        // console.log('It worked! Returned flyOverTime times:' , flyOverTime);
        callback(null, flyOverTime);
      });
      
    });
    
  });
    


};


module.exports = {
  nextISSTimesForMyLocation
};
