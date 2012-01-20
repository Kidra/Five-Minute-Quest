// create the canvas
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();

bgImage.onload = function() {
	bgReady = true;
}
bgImage.src = returnedBgImage;

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function() {
	heroReady = true;
}
heroImage.src = "images/hero.png";

// monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function() {
	monsterReady = true;
}
monsterImage.src = "images/monster.png";

// Game objects
var hero = {
	speed : 256,
	direction : "down",
	x : 0,
	y : 0
}

var monster = {
	x : 0,
	y : 0
}

var monstersCaught = 0;

// Reset the game when the player catches a monster
var reset = function() {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
}

console.log(collision[0][0]);
console.log(collision[0][1]);
console.log(collision[1][1]);

// Update game objects
var update = function(modifier) {

	var collide = false;
	var momentum = Math.round(hero.speed * modifier);

	if (38 in keysDown) { // player holding up
		if (hero.y >= 0) {
			hero.y -= momentum;
			hero.direction = "up";
		}
	}
	if (40 in keysDown) { // player holding down
		if (hero.y <= (canvas.height - 32)) {
			hero.y += momentum;
			hero.direction = "down";
		}
	}
	if (37 in keysDown) { // player holding left
		if (hero.x >= 0) {
			hero.x -= momentum;
			hero.direction = "left";
		}
	}
	if (39 in keysDown) { // player holding right
		if (hero.x <= (canvas.width - 32)) {
			hero.x += momentum;
			hero.direction = "right";
		}
	}
}

// Draw everything
var render = function(delta) {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}
	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}
	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	// score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "12px Arial";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Hero position: " + hero.x + " " + hero.y + " "
			+ hero.direction, 32, 32);
	ctx.fillText((1000 / delta) + " fps", 32, 44);
}

var main = function() {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render(delta);

	then = now;
}

reset();
var then = Date.now();
setInterval(main, 1);