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