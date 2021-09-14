// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 
    var samples = data.samples;

    // Create a variable that filters the samples for the object with the desired sample number.
    var resultsArray = samples.filter(sampleObj => sampleObj.id == sample);


    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadataArray = sampleArray.filter(sampleObj => sampleObj.id == sampleArray);
    // Create a variable that holds the first sample in the array.
    var sampresults = sampleArray[0]

    // 2. Create a variable that holds the first sample in the metadata array.
    var metaresults = metadataArray[0]

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    var ids = results.otu_ids;
    var labels = results.otu_lables;
    var values = results.sample_values;

    // 3. Create a variable that holds the washing frequency.
    var sampleArray = sample.filter(sampleObj => sampleObj.wfreq == sample);
    // Create the yticks for the bar chart.
    var yticks = wfreq.slice(0,10).map(wfreq => wfreq);
    // Use Plotly to plot the bar data and layout.
    Plotly.newPlot();
    
    // Use Plotly to plot the bubble data and layout.
    Plotly.newPlot();
   
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [
      {
      domain: { x: [0, 1], y: [0, 1] },
      value: 270,
      title: { text: "Speed" },
      type: "indicator",
      mode: "gauge+number"
      }
    ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      width: 600, height: 500, margin: { t: 0, b: 0 } 
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("guage", gaugeData, gaugeLayout);
  });
}
