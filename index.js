const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  
  for (let i = 0; i < passTimes.length; i++) {
    let date = new Date(0);
    date.setUTCSeconds(passTimes[i].risetime);
    console.log(`Next pass at ${date} for ${passTimes[i].duration} seconds!`);
    
  }
});

