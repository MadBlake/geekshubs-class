    const http = require('http');

    const port = 3000;
    const hostname = '10.100.1.185';

    const params = process.argv.slice(2);
    let newPort = (params.length === 1) ? params[0]:port;
    /*if (params.length >0 && params.length < 2) {
        newPort = params[0];
    } else {
        newPort = port;
    }*/

    http.createServer(function (request, response) {
      response.writeHead(200, {'Content-Type': 'text/plain'});
      response.end('Hello World');
    }).listen(newPort, hostname, () => {console.log('Server running at http://'+hostname+':'+port+'/');});
    
    