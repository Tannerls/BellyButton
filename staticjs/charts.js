function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("data/samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
    

  
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);

  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("data/samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("data/samples.json").then((data) => {
    // 3. Create a variable that holds the samples array.
    var wfreq = data.metadata.filter(sampleObj => sampleObj.id.toString() == sample)[0];
    wfreq = wfreq.wfreq; 
    var samples = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultsArray = samples.filter(sampleObj => sampleObj.id == sample);
    //  5. Create a variable that holds the first sample in the array.
    var results = resultsArray[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var ids = results.otu_ids;
    var labels = results.otu_lables;
    var values = results.sample_values;

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var yticks = ids.slice(0,10).map(ids => `OTU ${ids}`).reverse();

    // 8. Create the trace for the bar chart. 
    var barData = [
      {
        y: yticks,
        x: values.slice(0, 10).reverse(),
        text: labels,
        mode: "markers",
        marker: {
          line: {
            width: 1,
          },
        },
        type: "bar",
        orientation: "h",
      }
    ];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: { t: 30, l: 150 }
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);
  
    // 1. Create the trace for the bubble chart.
    var bubbleData = [
      {
        x: ids,
        y: values,
        text: labels,
        mode: "markers",
        marker: {
          size: values,
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
    }

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout); 
               
    // The guage chart
          var data_g = [
            {
            domain: { x: [0, 1], y: [0, 1]},
            value: wfreq,
            title: {text: `Belly Button Washing Frequency`},
            type: "indicator",
            
            mode: "gauge+number",
            gauge: { axis: { range: [null, 9] },
                     steps: [
                      {range: [0, 1], color: "red"},
                      {range: [1, 2], color: "red"},
                      {range: [2, 3], color: "orange"},
                      {range: [3, 4], color: "orange"},
                      {range: [4, 5], color: "yellow"},
                      {range: [5, 6], color: "yellow"},
                      {range: [6, 7], color: "lightgreen"},
                      {range: [7, 8], color: "lightgreen"},
                      {range: [8, 10], color: "green"}
                    ]}
                
            }
          ];
          var layout_g = { 
              width: 700, 
              height: 600, 
              margin: { t: 20, b: 40, l:100, r:100 } 
            };
          Plotly.newPlot("gauge", data_g, layout_g);
        });
    }  
  

 