// create the canvas
document.body.appendChild(canvas);
document.body.appendChild(collision_canvas);

DOWN  = 0;
UP    = (1 * size);
LEFT  = (2 * size);
RIGHT = (3 * size);

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
	tl: [0, 0],
	tr: [0, 0],
	bl: [0, 0],
	br: [0, 0],
	x : 0,
	y : 0
};

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
	
	hero.tl = [hero.x, hero.y];
	hero.tr = [hero.x + hero.size, hero.y];
	hero.bl = [hero.x, hero.y + hero.size];
	hero.br = [hero.x + hero.size, hero.y + hero.size];

	if (38 in keysDown) { // player holding up
		if ( ! detect_collision(
				[ hero.tl[0], hero.tl[1] - 1 ],
				[ hero.tr[0], hero.tr[1] - 1 ]
			)) {
			hero.y -= momentum;
			hero.direction = UP;
		}
	}
	if (40 in keysDown) { // player holding down
		if ( ! detect_collision(
				[ hero.bl[0], hero.bl[1] + 1 ],
				[ hero.br[0], hero.br[1] + 1 ]
			)) {
			hero.y += momentum;
			hero.direction = DOWN;
		}
	}
	if (37 in keysDown) { // player holding left
		if ( ! detect_collision(
				[ hero.tl[0] - 1, hero.tl[1] ],
				[ hero.bl[0] - 1, hero.bl[1] ]
			)) {
			hero.x -= momentum;
			hero.direction = LEFT;
		}
	}
	if (39 in keysDown) { // player holding right
		if ( ! detect_collision(
				[ hero.tr[0] + 1, hero.tr[1] ],
				[ hero.br[0] + 1, hero.br[1] ]
			)) {
			hero.x += momentum;
			hero.direction = RIGHT;
		}
	}
}

function detect_collision(point1, point2)
{
	var difference_x = point2[0] - point1[0];
	var difference_y = point2[1] - point1[1];
	
	if(difference_x == 0) { difference_x = 1; }
	if(difference_y == 0) { difference_y = 1; }
	
	var pix = cltx.getImageData(point1[0], point1[1], difference_x, difference_y).data;
	for(var i = 0; i < pix.length; i += 4)
	{
		if(pix[i] == 0 && pix[i+1] == 0 && pix[i+2] == 0)
		{
			return true;
		}
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