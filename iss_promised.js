const request = require('request-promise-native');

const fetchMyIP = () => {
  return request(`https://api.ipify.org?format=json`);
};

const fetchCoordsByIP = function(body) {
  ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`);
};

const fetchISSFlyOverTimes = function(body) {
  const latitude = JSON.parse(body).latitude;
  const longitude = JSON.parse(body).longitude;
  const data = {latitude, longitude};

  const url = `http://api.open-notify.org/iss/v1/?lat=${latitude}&lon=${longitude}`;
  return request(url);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((data) => {
    const {response} = JSON.parse(data);
    return response;
  });
};

module.exports = {
  nextISSTimesForMyLocation
};
