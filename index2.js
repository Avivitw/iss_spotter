const { nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then((response) => {
    for (let i = 0; i < response.length; i++) {
      let date = new Date(0);
      date.setUTCSeconds(response[i].risetime);
      console.log(`Next pass at ${date} for ${response[i].duration} seconds!`);
    }
  })

  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });