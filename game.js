// create the canvas
document.body.appendChild(canvas);
document.body.appendChild(collision_canvas);

DOWN  = 0;
UP    = 32;
LEFT  = 64;
RIGHT = 96; 

// Background image
var bgReady = false;
var bgImage = new Image();

bgImage.onload = function() {
	bgReady = true;
}
bgImage.src = returnedBgImage;

//Background image
var colBgReady = false;
var colBgImage = new Image();

colBgImage.onload = function() {
	colBgReady = true;
}
colBgImage.src = collisionBgMap;

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function() {
	heroReady = true;
}
heroImage.src = "images/sprites/hero1.png";

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
	direction : DOWN,
	size: 32,
	l: [0, 0],
	r: [0, 0],
	t: [0, 0],
	b: [0, 0],
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

// Update game objects
var update = function(modifier) {

	var collide = false;
	var momentum = Math.round(hero.speed * modifier);
	
	hero.l = [hero.x - 1, hero.y + (hero.size / 2)];
	hero.r = [hero.x + hero.size + 1, hero.y + (hero.size / 2)];
	hero.t = [hero.x + (hero.size / 2), hero.y - 1];
	hero.b = [hero.x + (hero.size / 2), hero.y + hero.size + 1];

	if (38 in keysDown) { // player holding up
		if (hero.y > 0 && ! detect_collision(hero.t)) {
			hero.y -= momentum;
			hero.direction = UP;
		}
	}
	if (40 in keysDown) { // player holding down
		if (hero.y < (canvas.height - 32)  && ! detect_collision(hero.b)) {
			hero.y += momentum;
			hero.direction = DOWN;
		}
	}
	if (37 in keysDown) { // player holding left
		if (hero.x > 0 && ! detect_collision(hero.l)) {
			hero.x -= momentum;
			hero.direction = LEFT;
		}
	}
	if (39 in keysDown) { // player holding right
		if (hero.x < (canvas.width - 32)  && ! detect_collision(hero.r)) {
			hero.x += momentum;
			hero.direction = RIGHT;
		}
	}
}

function detect_collision(points)
{
	var pix = cltx.getImageData(points[0], points[1], 1, 1).data;
	if(pix[0] == 0 && pix[1] == 0 && pix[2] == 0)
	{
		return true;
	}
	return false;
}

// Draw everything
var render = function(delta) {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}
	if(colBgReady) {
		cltx.drawImage(colBgImage, 0, 0);
	}
	if (heroReady) {
		ctx.drawImage(heroImage, 0, hero.direction, 32, 32, hero.x, hero.y, 32, 32);
		cltx.drawImage(heroImage, 0, hero.direction, 32, 32, hero.x, hero.y, 32, 32);
	}
	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	// score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "12px Arial";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Hero bb: " + hero.l + " " + hero.r + " " + hero.t + " " + hero.b
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