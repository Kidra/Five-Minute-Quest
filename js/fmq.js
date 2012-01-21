// update and render to screen functions
FMQ =
{
	state: "field_screen",
	
	update: function(modifier)
	{
		switch(this.state)
		{
		case "loading":
			
			break;
		case "conversation":
			if(88 in keysDown) { // pressed x in conversation mode
				FMQ.state = "field_screen";
			}
			break;
		case "field_screen":
			if(88 in keysDown && hero.conversable) {
				FMQ.state = "conversation";
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
			break;
		}
	},
	
	render: function(GameTime)
	{
		switch(this.state)
		{
		case "loading":
			
			break;
		case "field_screen":
		case "conversation":
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
				ctx.fillRect(0, 416, 800, 160);
				ctx.fillStyle = "rgb(10, 10, 10)";
				ctx.font = "18px Arial";
				ctx.fillText("Hello, I am Mike the troll.", 10, 428);
				ctx.fillStyle = "rgb(250, 250, 250)";
				ctx.font = "12px Arial";
			}
			ctx.fillText("Press X to converse, Z to cancel!", 32, 32);
			ctx.fillText("gamestate:" + FMQ.state, 32, 44);
			break;
		}
	}
};