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
  var player = document.forms['histoform']["player"].value;
  var surface = document.forms['histoform']["surface"].value;
  var numOutcome1 = parseInt(document.forms['histoform']["numOutcome1"].value);
  var numOutcome2 = parseInt(document.forms['histoform']["numOutcome2"].value);
  var numPile1 = parseInt(document.forms['histoform']["numPile1"].value);
  var threshold = parseFloat(document.forms['histoform']["threshold"].value);
  var simulations = parseInt(document.forms['histoform']["simulations"].value);
  var count = 0;
  
  // build deck
  var outcome1List = new Array(numOutcome1).fill(1),
    cat2List = new Array(numOutcome2).fill(0),
    deck = [];
  deck = outcome1List.concat(cat2List);

  // run simulation
  var simData = randomIterations(deck, numPile1, simulations);

  // count above threshold
  for (let sim of simData){
    if (sim >= threshold) {
      count++;
    }
  }

  // Create chart title
  var mytitle = "Simulation of " + player + " on " + surface + " shows " + count + " (" + count/simulations * 100 + "%) above threshold <i>by chance alone</i>.";

  // plot simulation
  var trace = {
    x: simData,
    type: 'histogram',
    marker: {
      line: {
        width: 5,
        color: '#FFFFFF',
      }
    }
  };
  var layout = {
    title: mytitle,
    font: {
      family: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      size: 12
    },
  };
  var data = [trace];
  Plotly.newPlot('plot', data, layout);

  // return false to prevent refresh
  return false;
}