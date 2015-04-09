var http = require('http');
var url = require('url');

function checkLocation (loc) {
  // 43.083849, -77.679825
  var center = {
    x : 43.083849,
    y : -77.679825
  };
  var radius = 0.001;
  var is_in = Math.pow(loc[0] - center.x, 2) + Math.pow(loc[1] - center.y, 2) < Math.pow(radius, 2);
 return is_in;
}


http.createServer(function (req, res) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  if (query.location) {
    var user = query.username;
    var location = query.location.split(';');
    if (checkLocation(location)) {
      console.log("Wave Pls");
      console.log(user, location);
    } else {
      console.log("Too Far");
    }
  }

  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end();
}).listen(8000);
