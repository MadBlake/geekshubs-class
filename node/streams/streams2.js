const csv = require('fast-csv');
const fs = require("fs");
const ws = fs.createWriteStream("out2.csv");
const stream = csv.format();
stream.pipe(ws);

stream.write([ 'a', 'b' ]);
stream.write([ 'a1', 'b1' ]);
stream.write([ 'a2', 'b2' ]);
stream.end();