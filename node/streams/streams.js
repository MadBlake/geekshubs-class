const fastcsv = require("fast-csv");
const csv = require("csv-parser");
const fs = require("fs");
const ws = fs.createWriteStream("out.csv");
const stream = fastcsv.format();
const perf = require("execution-time")();

perf.start('streamProcess');
stream.pipe(ws);

module.exports.writeCsv = (file, colum, valueExpected, callback) => {
    var results = [];
    fs.createReadStream(file) //'listings.csv'
        .pipe(csv())
        .on('data', (row) => {
            //console.log('Processing', row['price'])
            if ( row[colum] > valueExpected) {
                //console.log(typeof row);
                //results.push(row);
                // TODO
                stream
                    .write(row)
                    
            }
        })
        .on('end', () => {
            stream.end();
            console.log('CSV file successfully processed');
            console.log('Finish write process');
            let time = perf.stop('streamProcess');
            console.log('Inside streams: ', time.time);
            callback('finish');
            /*fastcsv
                .write(results, {headers: true})
                .pipe(ws)
                .on('finish', () => {
                    console.log('Finish write process');
                    let time = perf.stop('streamProcess');
                    console.log('Inside streams: ', time.time);
                    callback('finish');
                });*/

        });
}
//let time = perf.stop('streamProcess');
//console.log('Out streams: ', time.time);
