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
			if(88 in keysDown && ConversationManager.next) { // pressed x in conversation mode
				FMQ.state = "field_screen";
				ConversationManager.next = false;
				hero.conversable = false;
				setTimeout("hero.conversable = true", 500);
			}
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
		case "loading":
			
			break;
		case "field_screen":
		case "conversation":
			GameManager.RenderField();

			// score
			ctx.fillStyle = "rgb(250, 250, 250)";
			ctx.font = "12px Arial";
			ctx.textAlign = "left";
			ctx.textBaseline = "top";
			if(this.state == "conversation")
			{
				Dialog.Call("Hi, I'm Mike the troll!!");
				ctx.fillStyle = "rgb(250, 250, 250)";
				ctx.font = "12px Arial";
			}
			ctx.fillText("Press X to converse, Z to cancel!", 32, 32);
			ctx.fillText("gamestate:" + FMQ.state, 32, 44);
			break;
		}
	}
};