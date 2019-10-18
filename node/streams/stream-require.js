
var csv = require('./streams.js');

csv.writeCsv('listings.csv', 'price', 50, (msg) => {console.log(msg)});