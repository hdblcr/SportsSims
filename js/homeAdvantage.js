function randomIterations(numInGroup, percentage, numTrials) {
  var trialOutcomes = [];
  var groupOutcome = 0;
  for (let i = 0; i < numTrials; i++){
    groupOutcome = 0;
    for (j = 0; j < numInGroup; j++){
      if (Math.random() > percentage){
        groupOutcome += 1;
      } 
    }
    trialOutcomes.push(groupOutcome);
  }
  return trialOutcomes;
}

function main() {

  // read data from form
  var numInGroup = document.forms['histoform']["numPerGroup"].value;
  var numGroups = document.forms['histoform']["numGroups"].value;
  var percentage = document.forms['histoform']["percent"].value;
  var threshold = document.forms['histoform']["threshold"].value;

  var count = 0;

  // run simulation
  var simData = randomIterations(numInGroup, percentage, numGroups);

  // plot simulation
  var trace = {
    x: simData,
    type: 'histogram',
  };
  var data = [trace];
  Plotly.newPlot('plot', data);

  // count above threshold
  for (let winsInSeason of simData){
    if (winsInSeason >= threshold) {
      count++;
    }
  }

  // print count above threshold
  document.getElementById("thresholdNum").innerHTML = "<h2>By chance alone, " + count + " seasons (" + ((count / numGroups) * 100).toPrecision(3) +"%) had more wins than observed.</h2>";

  // print rawdata
  //document.getElementById("rawdata").innerHTML = "<p>" + simData + "</p>";

  // return false to prevent refresh
  return false;
}