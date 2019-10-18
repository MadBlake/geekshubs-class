#!/usr/bin/env node
const argv = require('yargs')
            .usage('Usage: $0 -port [num] -hostname [IP/Domain]')
            //.demandOption(['port','hostname'])
            .argv

var http = require("http");
var fs   = require("fs");
var path = require("path");
console.log(argv.port)
var port = argv.port || '3000';
var hostname = argv.hostname || '127.0.0.1';
console.log(port)


var server = http.createServer(function(req, res) {

  console.log(`${req.method} request for ${req.url}`);

  if (req.url === "/") {
    fs.readFile("./public/index.html", "UTF-8", function(err, html) {
      res.writeHead(200, {"Content-Type": "text/html"});
      res.end(html);
    });
  } else if (req.url === "/spotify") {
    fs.readFile("./public/spotify.html", "UTF-8", function(err, html) {
      res.writeHead(200, {"Content-Type": "text/html"});
      res.end(html);
    });
  } else if (req.url.match(/.css$/)) {
    var cssPath = path.join(__dirname, 'public', req.url);
    var fileStream = fs.createReadStream(cssPath, "UTF-8");
    res.writeHead(200, {"Content-Type": "text/css"});
    fileStream.pipe(res);
  } else if (req.url.match(/.js$/)) {
    var cssPath = path.join(__dirname, 'public', req.url);
    var fileStream = fs.createReadStream(cssPath, "UTF-8");
    res.writeHead(200, {"Content-Type": "text/css"});
    fileStream.pipe(res);
  } else {
    res.writeHead(404, {"Content-Type": "text/plain"});
    res.end("404 Archivo no encontrado");
  }

});
server.listen( port, hostname, 34, function(){
  console.log( "Server listening on port:%s", port );
});

