const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

var samples;
var metadata;

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);

  samples = data.samples;
  metadata = data.metadata;
 
  let dropdownMenu = d3.select("#selDataset");
  data.names.forEach(function(id) {
    dropdownMenu.append("option").text(id).property("value", id);
  });

  init();

  });

function init() {
  barChart(samples[0]);
  bubbleChart(samples[0]);
  demographicInfo(metadata[0]);
}


function optionChanged(value) {
  let selectedData = samples.find(sample => sample.id === value);
  let demoInfo = metadata.find(sample => sample.id === value);

  barChart(selectedData);
  bubbleChart(selectedData);
  demographicInfo(demoInfo);

};

function barChart(selectedData) {
  chartData = {
    x: selectedData.sample_values.slice(0, 10).reverse(),
    y: selectedData.otu_ids.slice(0, 10).reverse().map(i => `OTU ${i}`),
    text: selectedData.otu_labels.slice(0, 10).reverse(),
    type: "bar",
    orientation: "h"
  };

  let chart = [chartData];

  Plotly.newPlot("bar", chart);
};

function bubbleChart(selectedData) {
  chartData = {
    x: selectedData.otu_ids,
    y: selectedData.sample_values,
    mode: "markers",
    marker: {
      size: selectedData.sample_values,
      color: selectedData.otu_ids
    },
    text: selectedData.otu_labels

  };

  let chart = [chartData];

  Plotly.newPlot("bubble", chart);
};

function demographicInfo(demoInfo) {
  let metaData = d3.select("#sample-metadata");
  metaData.html(
    `id: ${demoInfo.id} <br> 
    ethnicity: ${demoInfo.ethnicity} <br>
    gender: ${demoInfo.gender} <br>
    age: ${demoInfo.age} <br>
    location: ${demoInfo.location} <br>
    bbtype: ${demoInfo.bbtype} <br>
    wfreq: ${demoInfo.wfreq}`
  );
};