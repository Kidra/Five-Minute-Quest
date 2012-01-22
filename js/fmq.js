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
		case "start_screen":
			if(13 in keysDown) { // pressed enter
				
			}
			break;
		case "conversation":
			GameManager.UpdateField(modifier);
			break;
		case "field_screen":
			GameManager.UpdateField(modifier);
			break;
		}
	},
	
	render: function(GameTime)
	{
		switch(this.state)
		{
		case "start_screen":
			Core.Preloader.render();
			break;
		case "loading":
			
			break;
		case "field_screen":
		case "conversation":
			GameManager.RenderField();
			UI.FieldClock();

			// score
			ctx.fillStyle = "rgb(250, 250, 250)";
			ctx.font = "12px Arial";
			ctx.textAlign = "left";
			ctx.textBaseline = "top";
			ctx.fillText("Press X to converse, Z to cancel!", 32, 32);
			ctx.fillText("gamestate:" + FMQ.state, 32, 44);
			break;
		}
	},
	initialize: function()
	{
		monster = {
			id: "mike",
			size: 32,
			x : 0,
			y : 0
		};

		level =
		{
			name: "Test Level 1",
			npc_list:
			[
			 	{
			 		id: "mike",
			 		size: 32,
			 		x: 64,
			 		y: 64,
			 		render: function()
			 		{
			 			if(GameManager.Content.monsterImage)
			 			{
			 				ctx.drawImage(GameManager.Content.monsterImage, this.x, this.y);
			 				cltx.fillStyle = "rgb(255, 0, 0)";
							cltx.fillRect(this.x, this.y, this.size, this.size);
			 			}
			 		},
			 		update: function()
			 		{
			 			
			 		}
			 	}
			]
		};

		collision = {};

//		monster.render = function()
//		{
//			if (GameManager.Content.monsterImage) {
//				ctx.drawImage(GameManager.Content.monsterImage, monster.x, monster.y);
//				cltx.fillStyle = "rgb(255, 0, 0)";
//				cltx.fillRect(monster.x, monster.y, monster.size, monster.size);
//			}
//		};

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
		
		hero.x = canvas.width / 2;
		hero.y = canvas.height / 2;
		
		var sources = {
			heroImage: 'images/sprites/hero1.png',
			monsterImage: 'images/monster.png',
			colBgImage: collisionBgMap,
			bgImage: returnedBgImage
		};
		
		
		NpcManager.load(level.npc_list);

		GameManager.AddToFieldStack(level);
		GameManager.AddToFieldStack(collision);
		GameManager.AddToFieldStack(NpcManager);
		GameManager.AddToFieldStack(hero);
		
		// load scenario resources into GameManager.Content
		var NewContent = GameManager.ImageLoader(sources);	
		for(var attrname in NewContent)
		{
			GameManager.Content[attrname] = NewContent[attrname];
		}
	}
};