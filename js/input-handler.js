// Input Handler
var keysDown = {};
var lockedKeys = {};

addEventListener("keydown", function(e) {
  if(lockedKeys[e.keyCode] == true)
  {
	  console.log(e.keyCode + ' is locked.');
  }
  else
  {
	  keysDown[e.keyCode] = true;
  }
}, false);

addEventListener("keyup", function(e){
  delete keysDown[e.keyCode];
}, false);

function lockKey(e) {
	delete keysDown[e];
	lockedKeys[e] = true;
	setTimeout("unlockKey("+e+")", 500);
}

function unlockKey(e) {
	delete lockedKeys[e];
}