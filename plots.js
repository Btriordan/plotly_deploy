// default graph
function init() {
    // select the drop down menu in the html.  Assign to selector
    var selector = d3.select("#selDataset");
  
    // read the Json
    d3.json("samples.json").then((data) => {
      console.log(data);
      // find all the names (ID numbers) of all participants 
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        // for every line, add that name to the #selDataset box
        selector.append("option")
        // Turn the number to txt, each option is the ID
        .text(sample)
        // the value property is assigned the ID  
        .property("value", sample);
      });
    
    // INformation Box
    
    // Only looking at metadata
    var metadata = data.metadata;
    // Filter for an object in the array whose id matches the one chosen
    var resultArray = metadata.filter(sampleObj => sampleObj.id == 940);
    // First item in the array is selected and assigned the variable
    var result = resultArray[0];
    // get the object and Keys for this person

    // Assign PANEL to the id for the Demographic info
    var PANEL = d3.select("#sample-metadata");
    // Makes sure the data in the panel are empty
    PANEL.html("");
    // print the location of the volunteer to the panel
    let resultList = Object.entries(result).forEach(([key, value]) =>
    {PANEL.append("h6").text(key + ': ' + value)});
    

    // Chart Info

    let sampleData = data.samples;
     
    // Filter for an object in the array whose id matches the chosen one
    let resultSampleArray = sampleData.filter(sampleOTU => sampleOTU.id == 940);

    // create arrays for each list of info
    resultSampleArray.forEach(function(value) {
        otuIDs = value.otu_ids
    })

    resultSampleArray.forEach(function(value) {
      labels = value.otu_labels
    })
  
    resultSampleArray.forEach(function(value) {
      sampValues = value.sample_values
    })
  
    // set the IDs as ticks for your bar graph - makes it a string instead of integer
    var yticks = otuIDs.slice(0, 10).map(otuID => 'OTU ' + otuID)

     

    // Make the Trace
    var trace = {
       x: sampValues.slice(0, 10).reverse(),
       y: yticks.reverse(),
       text: labels.slice(0, 10).reverse(),
       type: 'bar',
       orientation: "h"
    };

    // Put the Trace into brackets
    data = [trace]

    // Set the layout
    var layout = {
       title: "Bacteria in Belly Button",
       xaxis: {title: "Bacteria Count"},
       yaxis: {title: "Bacteria ID"}
    }

    // Make the chart under the ID - "bar"
    Plotly.newPlot("bar", data, layout);

    var trace1 = {
       x: otuIDs,
       y: sampValues,
       text: labels,
       mode: 'markers',
       marker: {
        color: otuIDs,
        size: sampValues
        }
    };

    var data1 = [trace1]

    var layout1 = {
       title: "Marker Size",
       showlegend: false,
    }

    Plotly.newPlot('bubble', data1, layout1)



    });
  }



// This won't be called in this sheet because it is being called in the HTML in "onchange"
// newSample is refering to the value of the selected menu option because of the "this"
//function optionChanged(newSample) {
//    console.log(newSample);
//  }

function optionChanged(newSample) {
    // These set up other functions
    buildMetadata(newSample);
    buildCharts(newSample);
  };

  // takes in smaple of and ID number as its argument
function buildMetadata(sample) {
    // Grab dataset as "data"
    d3.json("samples.json").then((data) => {
      // Only looking at metadata
        var metadata = data.metadata;
        // Filter for an object in the array whose id matches the one chosen
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        // First item in the array is selected and assigned the variable
        var result = resultArray[0];
        // get the object and Keys for this person

        // Assign PANEL to the id for the Demographic info
        var PANEL = d3.select("#sample-metadata");
    // Makes sure the data in the panel are empty
    PANEL.html("");
    // print the location of the volunteer to the panel

    let resultList = Object.entries(result).forEach(([key, value]) =>
    {PANEL.append("h6").text(key + ': ' + value)});
    ;

  });
}

//let sampVal = this.sample_values.sort((a,b) => a-b)
 // Make teh build Charts function which will run on the change function
 function buildCharts(sample) {
   // Grab the dataset data
   d3.json("samples.json").then((data) => {
     // Looking at Samples
    let sampleData = data.samples;
     
    // Filter for an object in the array whose id matches the chosen one
    let resultSampleArray = sampleData.filter(sampleOTU => sampleOTU.id == sample);


    resultSampleArray.forEach(function(value) {
        otuIDs = value.otu_ids
    })

    resultSampleArray.forEach(function(value) {
      labels = value.otu_labels
    })
  
    resultSampleArray.forEach(function(value) {
      sampValues = value.sample_values
    })
  
    // set the IDs as ticks for your bar graph - makes it a string instead of integer
    var yticks = otuIDs.slice(0, 10).map(otuID => 'OTU ' + otuID)

     

      // Make the Trace
     var trace = {
       x: sampValues.slice(0, 10).reverse(),
       y: yticks.reverse(),
       text: labels.slice(0, 10).reverse(),
       type: 'bar',
       orientation: "h"
     };

     // Put the Trace into brackets
     data = [trace]

    // Set the layout
     var layout = {
       title: "Bacteria in Belly Button",
       xaxis: {title: "Bacteria Count"},
       yaxis: {title: "Bacteria ID"}
     }

     // Make the chart under the ID - "bar"
     Plotly.newPlot("bar", data, layout);

     var trace1 = {
       x: otuIDs,
       y: sampValues,
       text: labels,
       mode: 'markers',
       marker: {
        color: otuIDs,
        size: sampValues
       }
     };

     var data1 = [trace1]

     var layout1 = {
       title: "Marker Size",
       showlegend: false,
     }

     Plotly.newPlot('bubble', data1, layout1)

   });}

  init();

