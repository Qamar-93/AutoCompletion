const http = require('http');
const fs = require('fs');
const path = require('path');
const pros = require('./uniProcessor.js')
var contentTypes = {
  css:'text/css',
  js:'application/javascript',
  html:'text/html',
  jpg:'image/jpg'
}

function homeHandler(req, res){
  fs.readFile(path.join(__dirname, '../public/index.html'), 'utf8', (err, file) => {
      /* istanbul ignore if */
      if (err) {
        res.writeHead(500, {'content-type': 'text/plain'});
        res.end('server error');
      } else {
        res.writeHead(200, {'content-type': 'text/html'});
        res.end(file);
      }
    });

}

function publicHandler(req, res){
  var url = req.url;
  var parts = url.split(".");
  var fileExtention = parts[parts.length - 1];
  fs.readFile(__dirname+ '/..' + url, (err, file) => {
      /* istanbul ignore if */
      if (err) {
        console.log(err)
        res.writeHead(500, {'content-type': 'text/plain'});
        res.end('server error');
      } else {
        res.writeHead(200, {'content-type': contentTypes[fileExtention]});
        res.end(file);
      }
    });
}

function notFoundHandler(req, res){
  res.writeHead(404, {'content-type': 'text/plain'});
  res.end('404 server error');
}

function jsonHandler(req, res){
  var url = req.url;
  var parts = url.split('/');
  var jsonExtention = parts[parts.length - 1];
  res.writeHead(200, {'content-type': 'application/json'});
  res.end(JSON.stringify(repos.jsonExtention));
  
}


function serveApi(req,res){
  var url=req.url;
  var parts = req.url.split("=");
  var query = parts[parts.length - 1];
  
  if(url.startsWith('/api/country/?q=')){


  pros.matchedCountry(query, (err, result)=>{
        if (err) {
        res.writeHead(500, {'content-type': 'text/plain'});
        res.end('server error');
      } else {
        res.writeHead(200, {'content-type': 'application/json'});
        res.end(JSON.stringify(result));
      }
  });
  }else if(url.startsWith('/api/uni/?q=')) {
    ///api/uni/?q=a&c=United+States
    var part=url.split("=");
    pros.matchUni(part[parts.length - 2].split("&")[0].replace( /\+/g, ' '),part[parts.length - 1].replace( /\+/g, ' ') , (err, result)=>{
        if (err) {
        res.writeHead(500, {'content-type': 'text/plain'});
        res.end('server error');
      } else {
        res.writeHead(200, {'content-type': 'application/json'});
        res.end(JSON.stringify(result));
      }
  });
  }
  else if(url.startsWith('/api/getUni/?q=')){

    pros.findUni(query.replace( /\+/g, ' '),(err , result)=>{
      if(err){
        res.writeHead(500, {'content-type': 'text/plain'});
        res.end('server error');
      }else{
        res.writeHead(200, {'content-type': 'application/json'});
        res.end(JSON.stringify(result));
      }
    })

  }

}
module.exports = {
  homeHandler:homeHandler,
  publicHandler:publicHandler,
  serveApi:serveApi,
  // notFoundHandler:notFoundHandler,
  // jsonHandler:jsonHandler
};
