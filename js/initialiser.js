// create the canvas
document.body.appendChild(canvas);
document.body.appendChild(collision_canvas);

DOWN  = 0;
UP    = (1 * size);
LEFT  = (2 * size);
RIGHT = (3 * size);

monster = {
	id: "mike",
	size: 32,
	x : 0,
	y : 0
};


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
		images[src].src = sources[src];
	}
	return images;
};

hero.x = canvas.width / 2;
hero.y = canvas.height / 2;
monster.x = 32 + (Math.random() * (canvas.width - 64));
monster.y = 32 + (Math.random() * (canvas.height - 64));

level =
{
	name: "Test Level 1"
};

collision = {};

hero.render = function()
{
	if (GameManager.Content.heroImage) {
		ctx.drawImage(GameManager.Content.heroImage, 0, hero.direction, 32, 32, hero.x, hero.y, 32, 32);
		cltx.drawImage(GameManager.Content.heroImage, 0, hero.direction, 32, 32, hero.x, hero.y, 32, 32);
	}
};

monster.render = function()
{
	if (GameManager.Content.monsterImage) {
		ctx.drawImage(GameManager.Content.monsterImage, monster.x, monster.y);
		cltx.fillStyle = "rgb(255, 0, 0)";
		cltx.fillRect(monster.x, monster.y, monster.size, monster.size);
	}
};

level.render = function()
{
	if (GameManager.Content.bgImage) {
		ctx.drawImage(GameManager.Content.bgImage, 0, 0);
	}
};

collision.render = function()
{
	if(GameManager.Content.colBgImage) {
		cltx.drawImage(GameManager.Content.colBgImage, 0, 0);
	}
};

sources = {
	heroImage: 'images/sprites/hero1.png',
	monsterImage: 'images/monster.png',
	colBgImage: collisionBgMap,
	bgImage: returnedBgImage
}

GameManager.AddToFieldStack(level);
GameManager.AddToFieldStack(collision);
GameManager.AddToFieldStack(monster);
GameManager.AddToFieldStack(hero);
GameManager.Content = imageLoader(sources);

GameTime.then = Date.now();
setInterval(main, 1);