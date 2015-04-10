var express = require('express');
var app = express();

app.set('port', process.env.PORT || 8000);
var server = app.listen(app.get('port'));

var io = require('socket.io')(server);

var sockets = [];

io.on('connection', function(socket){
  sockets.push(socket);
  console.log('client connected');
  socket.on('disconnect', function() {
    sockets.splice(sockets.indexOf(socket), 1);
  });
});

var state = {
  currentUsers: [],
  allowed: true,
  currentlyChecking: false
}



function handleSending() {
  if(state.currentUsers.length > 1) {
    console.log("WE'RE READY!!!");
    sockets.forEach(function(socket) {
      socket.emit('tour');
    });
    state.allowed = false;
    setTimeout(function(){
      state.allowed = true;
    }, 30000);
  } else {
    console.log('failure');
  }
  state.currentlyChecking = false;
  state.currentUsers = [];
}

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
  var user = req.query.username;
  console.log(req.query);
  if(req.query.location && state.currentUsers.indexOf(user) === -1 && state.allowed){
    var location = req.query.location.split(';');
    console.log(checkLocation(location));
    if (checkLocation(location)) {
      console.log('added user', user);
      state.currentUsers.push(user);
      if(!state.currentlyChecking) {
        state.currentlyChecking = true;
        setTimeout(handleSending, 6*1000);
      }
    }
  }
  res.send();
});
