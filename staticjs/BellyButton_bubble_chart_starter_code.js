// Bar and Bubble charts
// Create the buildCharts function.
function buildCharts(sample) {
  // Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
        // 3. Create a variable that holds the samples array. 
        var samples = data.samples;
        // 4. Create a variable that filters the samples for the object with the desired sample number.
        var resultsArray = samples.filter(sampleObj => sampleObj.id == sample);
        //  5. Create a variable that holds the first sample in the array.
        var results = resultsArray[0];
    
        // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
        var ids = results.otu_ids;
        var labels = results.otu_lables;
        var values = results.sample_values;

    // Deliverable 1 Step 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot(); 

    // 1. Create the trace for the bubble chart.
    var bubbleData = [
      {
        x: ids,
        y: values,
        text: labels,
        mode: "markers",
        marker: {
          size: sample_values,
          color: ids,
          colorscale: "Earth"
        }
      }
    ];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      hovermode: "closest",
      xaxis: { title: "OTU ID" },
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout); 
  });
}
