var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
http.createServer(function (req, res) {

  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  var extName = path.extname(q.pathname);
  
  if(q.pathname.length==1){
      filename = 'index.html';
  }
  var contentType = 'text/html';
  switch (extName) {
    case '.css':
        contentType = 'text/css';
        break;
    case '.js':
        contentType = 'text/javascript';
        break;
    case '.json':
        contentType = 'application/json';
        break;
    case '.png':
        contentType = 'image/png';
        break;
    case '.jpg':
        contentType = 'image/jpg';
        break;
    case '.mp4':
        contentType = 'video/mp4';
        break;
}
  fs.readFile(filename, function(err, data) {
    try {
        if (err) {throw err;}
        res.writeHead(200, {'Content-Type': contentType});
        res.write(data);
        return res.end();
    } catch(e) {
        fs.readFile('error.html', function(err, data) {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/html'});
              return res.end("404 Not Found");
            } 
            res.writeHead(200, {'Content-Type': contentType});    
            res.write(data);
            return res.end("404 Not Found");
          }); 
    }
  }); 
 

}).listen(3000); 