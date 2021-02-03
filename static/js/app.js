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