// Input Handler
var keysDown = {};

addEventListener("keydown", function(e) {
  keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e){
  delete keysDown[e.keyCode];
}, false);