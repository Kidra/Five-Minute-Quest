DOWN  = 0;
UP    = (1 * size);
LEFT  = (2 * size);
RIGHT = (3 * size);

hero.x = canvas.width / 2;
hero.y = canvas.height / 2;
monster.x = 32 + (Math.random() * (canvas.width - 64));
monster.y = 32 + (Math.random() * (canvas.height - 64));

monster = {
	id: "mike",
	size: 32,
	x : 0,
	y : 0
};

level =
{
	name: "Test Level 1"
};

collision = {};

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
	dialogImage: 'images/dialog/dialog-window.png',
	clockImage: 'images/ui/time-window.png',
	heroImage: 'images/sprites/hero1.png',
	monsterImage: 'images/monster.png',
	colBgImage: collisionBgMap,
	bgImage: returnedBgImage
}

GameManager.AddToFieldStack(level);
GameManager.AddToFieldStack(collision);
GameManager.AddToFieldStack(monster);
GameManager.AddToFieldStack(hero);
GameManager.Content = GameManager.ImageLoader(sources);

GameTime.then = Date.now();
setInterval(main, 1);