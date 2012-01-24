hero.update = function(modifier)
{
	switch(FMQ.state)
	{
	case "conversation":
		if(88 in keysDown)  // advancing conversation
		{
			lockKey(88);
			ConversationManager.advance();
		}
		break;
	case "field_screen":
		if(88 in keysDown && hero.conversable) {
			FMQ.state = "conversation";
			ConversationManager.flush();
			
			var conversation =
			{
				"name" : "mike1",
				"dialog_list" : [
					{
						"character_left" : "images/dialog/hero1_left.png",
						"character_right" : "images/dialog/hero2_right.png",
						"speaker_name" : "Hero",
						"text" : "So, you come around here often?"
					},
					{
						"character_left" : "images/dialog/hero1_left.png",
						"character_right" : "images/dialog/hero2_right.png",
						"speaker_name" : "Mike",
						"text" : "Nope, first time."
					}
				]
			};
			
			ConversationManager.load(conversation);
			lockKey(88);
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
				hero.direction = Core.Direction.UP;
				if ( ! detect_collision(
						[ hero.tl[0], hero.tl[1] - momentum ],
						[ hero.tr[0], hero.tr[1] - momentum ]
					)) {
					hero.y -= momentum;
					hero.conversable = false;
				}
			}
			if (40 in keysDown) { // player holding down
				hero.direction = Core.Direction.DOWN;
				if ( ! detect_collision(
						[ hero.bl[0], hero.bl[1] + momentum ],
						[ hero.br[0], hero.br[1] + momentum ]
					)) {
					hero.y += momentum;
					hero.conversable = false;
				}
			}
			if (37 in keysDown) { // player holding left
				hero.direction = Core.Direction.LEFT;
				if ( ! detect_collision(
						[ hero.tl[0] - momentum, hero.tl[1] ],
						[ hero.bl[0] - momentum, hero.bl[1] ]
					)) {
					hero.x -= momentum;
					hero.conversable = false;
				}
			}
			if (39 in keysDown) { // player holding right
				hero.direction = Core.Direction.RIGHT;
				if ( ! detect_collision(
						[ hero.tr[0] + momentum, hero.tr[1] ],
						[ hero.br[0] + momentum, hero.br[1] ]
					)) {
					hero.x += momentum;
					hero.conversable = false;
				}
			}
		}
		break;
	}
};

hero.render = function()
{
	if (GameManager.Content.heroImage) {
		ctx.drawImage(GameManager.Content.heroImage, 0, hero.direction, 32, 32, hero.x, hero.y, 32, 32);
		cltx.drawImage(GameManager.Content.heroImage, 0, hero.direction, 32, 32, hero.x, hero.y, 32, 32);
	}
	if(FMQ.state == "conversation")
	{
		ConversationManager.showDialog();
	}
};