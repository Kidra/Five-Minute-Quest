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
		images[src].onload = function() {
			if(++loadedImages >= numImages) {
				//callback(images);
			}
		};
		images[src].src = sources[src];
	}
	return images;
};

hero.x = canvas.width / 2;
hero.y = canvas.height / 2;
monster.x = 32 + (Math.random() * (canvas.width - 64));
monster.y = 32 + (Math.random() * (canvas.height - 64));

sources = {
	heroImage: 'images/sprites/hero1.png',
	monsterImage: 'images/monster.png',
	colBgImage: collisionBgMap,
	bgImage: returnedBgImage
}

Content = imageLoader(sources);

GameTime.then = Date.now();
setInterval(main, 1);