// create the canvas
document.body.appendChild(canvas);
document.body.appendChild(collision_canvas);

DOWN  = 0;
UP    = (1 * size);
LEFT  = (2 * size);
RIGHT = (3 * size);


// what it says on the tin
function imageLoader(sources, callback) {
	var images = [];
	var loadedImages = 0;
	var numImages = 0;
	for (var src in sources) {
        numImages++;
    }
	for (var src in sources) {
		images[src] = new Image();
		images[src].onload = function() {
			if(++loadedImages >= numImages) {
				//callback(images);
			}
		};
		images[src].src = sources[src];
	}
	return images;
};


// Game objects
//var hero = {
//	id: "hero",
//	speed : 256,
//	direction : DOWN,
//	moveable: true,
//	conversable: false,
//	in_conversation: false,
//	size: 32,
//	tl: [0, 0],
//	tr: [0, 0],
//	bl: [0, 0],
//	br: [0, 0],
//	x : 0,
//	y : 0
//};

var monster = {
	id: "mike",
	size: 32,
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
	
	if(88 in keysDown && hero.conversable) { // pressed x in conversation mode
		hero.in_conversation = true;
		hero.moveable = false;
	}
	
	if(90 in keysDown && hero.in_conversation) {
		hero.in_conversation = false;
		hero.moveable = true;
	}
	
	if(hero.moveable)
	{
		var collide = false;
		var momentum = Math.round(hero.speed * modifier);
		
		hero.tl = [hero.x, hero.y];
		hero.tr = [hero.x + hero.size, hero.y];
		hero.bl = [hero.x, hero.y + hero.size];
		hero.br = [hero.x + hero.size, hero.y + hero.size];
	
		if (38 in keysDown) { // player holding up
			hero.direction = UP;
			if ( ! detect_collision(
					[ hero.tl[0], hero.tl[1] - 1 ],
					[ hero.tr[0], hero.tr[1] - 1 ]
				)) {
				hero.y -= momentum;
				hero.conversable = false;
			}
			if(hero.y <= size) {
				ctx.translate(0, 0);
			}
		}
		if (40 in keysDown) { // player holding down
			hero.direction = DOWN;
			if ( ! detect_collision(
					[ hero.bl[0], hero.bl[1] + 1 ],
					[ hero.br[0], hero.br[1] + 1 ]
				)) {
				hero.y += momentum;
				hero.conversable = false;
			}
		}
		if (37 in keysDown) { // player holding left
			hero.direction = LEFT;
			if ( ! detect_collision(
					[ hero.tl[0] - 1, hero.tl[1] ],
					[ hero.bl[0] - 1, hero.bl[1] ]
				)) {
				hero.x -= momentum;
				hero.conversable = false;
			}
		}
		if (39 in keysDown) { // player holding right
			hero.direction = RIGHT;
			if ( ! detect_collision(
					[ hero.tr[0] + 1, hero.tr[1] ],
					[ hero.br[0] + 1, hero.br[1] ]
				)) {
				hero.x += momentum;
				hero.conversable = false;
			}
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
		if(pix[i] == 255 && pix[i+1] == 0 && pix[i+2] == 0)
		{
			hero.conversable = true;
			return true;
		}
		if(pix[i] == 0 && pix[i+1] == 0 && pix[i+2] == 0)
		{
			return true;
		}
	}
	return false;
}

// Draw everything
var render = function(delta) {
	if (Content.bgImage) {
		ctx.drawImage(Content.bgImage, 0, 0);
	}
	if(Content.colBgImage) {
		cltx.drawImage(Content.colBgImage, 0, 0);
	}
	if (Content.heroImage) {
		ctx.drawImage(Content.heroImage, 0, hero.direction, 32, 32, hero.x, hero.y, 32, 32);
		cltx.drawImage(Content.heroImage, 0, hero.direction, 32, 32, hero.x, hero.y, 32, 32);
	}
	if (Content.monsterImage) {
		ctx.drawImage(Content.monsterImage, monster.x, monster.y);
		cltx.fillStyle = "rgb(255, 0, 0)";
		cltx.fillRect(monster.x, monster.y, monster.size, monster.size);
	}

	// score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "12px Arial";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	if(hero.in_conversation)
	{
		ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.fillRect(0, 288, 384, 96);
		ctx.fillStyle = "rgb(10, 10, 10)";
		ctx.font = "18px Arial";
		ctx.fillText("Hello, I am Mike the troll.", 10, 298);
		ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.font = "12px Arial";
	}
	ctx.fillText("Press X to converse, Z to cancel!", 32, 32);
	ctx.fillText("canvas location: " + Content.heroImage.offsetLeft + " " + canvas.offsetTop, 32, 44);
//	
//	cltx.fillStyle = "rgba(255, 0, 0, 0.2)";
//	cltx.fillRect(camera.x, camera.y, camera.width, camera.height);
}

var camera = {
	x: 0,
	y: 0,
	width: 320,
	height: 320
};

var main = function() {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render(delta);

	then = now;
}

reset();

var sources = {
	heroImage: 'images/sprites/hero1.png',
	monsterImage: 'images/monster.png',
	colBgImage: collisionBgMap,
	bgImage: returnedBgImage
}

Content = imageLoader(sources);

var then = Date.now();
setInterval(main, 1);