// Create web server
// Usage: node comments.js
var http = require("http");
var fs = require("fs");
var url = require("url");
var qs = require("querystring");

var server = http.createServer(function(req, res){
  var urlParsed = url.parse(req.url, true);
  console.log(urlParsed);

  if(urlParsed.pathname == "/echo" && urlParsed.query.message){
    res.setHeader("Cache-control", "no-cache");
    res.end(urlParsed.query.message);
    return;
  }

  if(urlParsed.pathname == "/comments" && req.method == "POST"){
    var body = "";

    req.on("readable", function(){
      var data = req.read();
      if(data != null) body += data;
    });

    req.on("end", function(){
      var params = qs.parse(body);

      res.setHeader("Cache-control", "no-cache");
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.end("Спасибо за комментарий: " + params.text);
    });
  } else {
    res.statusCode = 404;
    res.end("Page not found");
  }
});

server.listen(3000, "