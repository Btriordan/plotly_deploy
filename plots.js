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
  })};
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

  init();

   //resultAllInfo = Object.entries(result).forEach(([key, value]) =>
            //{key + ': ' + value;});