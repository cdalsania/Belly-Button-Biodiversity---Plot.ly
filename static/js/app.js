// variables to hold data from JSON file
var names = []
var metadata = []
var samples = []
d3.json('static/data/samples.json').then(function(data) {