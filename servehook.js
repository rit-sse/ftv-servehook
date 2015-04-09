var express = require('express');
var app = express();
function checkLocation (loc) {
  // 43.083849, -77.679825
  var center = {
    x : 43.083849,
    y : -77.679825
  };
  var radius = 0.001;
  return Math.pow(loc[0] - center.x, 2) + Math.pow(loc[1] - center.y, 2) < Math.pow(radius, 2);
}
app.get('/', function(req, res, next) {
  if(req.query.location){
    var user = req.query.username;
    var location = req.query.location.split(';');
    if (checkLocation(location)) {
      console.log("Wave Pls");
      console.log(user, location);
    } else {
      console.log("Too Far");
    }
  }
  res.send();
});
app.set('port', process.env.PORT || 8000);
app.listen(app.get('port'));
