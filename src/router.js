var fs = require('fs');
var handlers = require('./handler.js');

function router(req, res){
  var url = req.url;
  if (url === '/') {
    handlers.homeHandler(req, res);
  }else if(url.startsWith('/public')){
  	handlers.publicHandler(req,res);
  }else if(url.startsWith('/api/uni/?q=')){
  	handlers.serveApi(req ,res);}
  	else if (url.startsWith('/api/country/?q=')){
  	handlers.serveApi(req ,res);}
    else if (url.startsWith('/api/getUni/?q=')){
    handlers.serveApi(req ,res);}
    else
     	 handlers.homeHandler(req, res);
  }
module.exports = router;
