// variables to hold data from JSON file
var names = []
var metadata = []
var samples = []
d3.json('static/data/samples.json').then(function(data) {

    //retrieviewing the data into respective variables
    names = data.names;
    metadata = data.metadata;
    samples = data.samples;

    //populate Test Subject ID No. dropdown
    var dropDown = d3.select("#selDataset");

    names.forEach(name => {
        dropDown.append('option').property('value', name).text(name);
    });

    var dropDownValue = dropDown.property('value');

    displayDemograpicInfo(dropDownValue);
    displayBarPlot(dropDownValue);
    displayGuagePlot(dropDownValue);
    displayBubblePlot(dropDownValue);

});

function optionChanged(value) {

    //display demographic info
    displayDemograpicInfo(value);

    //display bar plot for user selected dropdown value
    displayBarPlot(value);

    //display guage plot for user selected dropdown value
    displayGuagePlot(value);

    //display bubble plot for user selected dropdown value
    displayBubblePlot(value);
};

function displayDemograpicInfo(dropDownValue) {

    var demographicDivTag = d3.select('#sample-metadata');

    //clear out the div tag
    demographicDivTag.html("");

    var tableTag = demographicDivTag.append("table").classed("table table-striped", true);

    var filteredMetaData = metadata.filter(row => parseInt(row.id) === parseInt(dropDownValue))[0];

    Object.entries(filteredMetaData).forEach(([key, value]) => {
        var tableRow = tableTag.append('tr');
        tableRow.append('td').text(key + ': ');
        tableRow.append('td').text(value).style('word-break', 'break-word');
    });
}

function displayBarPlot(dropDownValue) {

    //filter the data based on user selected drop down value
    var filteredSample = samples.filter(row => parseInt(row.id) === parseInt(dropDownValue))[0];

    //fetch the top 10 values
    var sample = filteredSample.sample_values.slice(0, 10);
    var otuLabel = filteredSample.otu_labels.slice(0, 10);
    var otuId = filteredSample.otu_ids.slice(0, 10);

    var reversedSample = sample.reverse();
    var reversedOtuLabel = otuLabel.reverse();
    var reversedOtuId = otuId.reverse().map(id => 'OTU ' + id);

    var barTrace = {
        x: reversedSample,
        y: reversedOtuId,
        text: reversedOtuLabel,
        type: 'bar',
        orientation: 'h'
    };

    var barData = [barTrace];

    var barLayout = {
        showlegend: false,
        xaxis: {
            title: "No. of Samples"
        },
        yaxis: {
            title: "OTU Ids"
        },
        title: "Top 10 OTUs for " + dropDownValue,
    }

    Plotly.newPlot('bar', barData, barLayout);
}

// Function to calc gauge needle points
function gaugePointer(value) {

    var degrees = 180 - value;
    var radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);