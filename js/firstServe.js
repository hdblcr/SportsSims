function sum(ary){
  var sum = 0;
  for (let i = 0; i < ary.length; i++){
    sum += ary[i];
  }
  return sum;
}

function singleSim(deck, numPile1){
  // remove pile 2 cards from pile 1
  while (deck.length > numPile1){
    var i = Math.floor(Math.random() * deck.length);
    deck.splice(i, 1);
  }  

  // return number of wins in pile 1
  return sum(deck);
}
function randomIterations(deck, numPile1, numSimulations) {
  // create an array to put simulation results in
  var simRes = [];

  // run a number of simulations
  for(i=0; i < numSimulations; i++){
    // use a new copy of winLossList each time to prevent overwriting the original
    var tmpDeck = deck.slice(0);

    // add each simulation result to list
    simRes.push(singleSim(tmpDeck, numPile1));
  }

  // return the results
  return simRes;
}

function main() {

  // read data from form
  var numWins = parseInt(document.forms['histoform']["numWins"].value);
  var numLosses = parseInt(document.forms['histoform']["numLosses"].value);
  var numPile1 = parseInt(document.forms['histoform']["numPile1"].value);
  var threshold = parseFloat(document.forms['histoform']["threshold"].value);
  var simulations = parseInt(document.forms['histoform']["simulations"].value);
  var count = 0;
  
  // build deck
  var winList = new Array(numWins).fill(1),
    lossList = new Array(numLosses).fill(0),
    deck = [];
  deck = winList.concat(lossList);

  // run simulation
  var simData = randomIterations(deck, numPile1, simulations);

  // count above threshold
  for (let ptsInSeason of simData){
    if (ptsInSeason >= threshold) {
      count++;
    }
  }

  // Create chart title
  var mytitle = "Simulation shows " + count + " (" + count/simulations * 100 + "%) above threshold <i>by chance alone</i>.";

  // plot simulation
  var trace = {
    x: simData,
    type: 'histogram',
  };/*
  var trace1 = {
    x: simData[1],
    type: 'histogram',
    opacity: 0.5,
    marker: {
      color: 'yellow',
    }
  };*/
  var layout = {
    title: mytitle,
    font: {
      family: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      size: 12
    },
  };
  var data = [trace];//0, trace1];
  Plotly.newPlot('plot', data, layout);


  // print count above threshold
  //document.getElementById("thresholdNum").innerHTML = "<h2>By chance alone, " + count + " simulations (" + ((count / numGroups) * 100).toPrecision(3) +"%) won more games on that surface than observed.</h2>";
  //document.getElementById("thresholdNum").innerHTML += "<p>Sum: " + sum + "</p><p>Average points per game: " + sum / (numGroups * numInGroup) + "</p>";

  // print rawdata
  //document.getElementById("rawdata").innerHTML = "<p>" + simData + "</p>";

  // return false to prevent refresh
  return false;
}