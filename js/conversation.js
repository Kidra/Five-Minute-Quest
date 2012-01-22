ConversationManager =
{
	dialog_list: [],
	name: null,
	next: false,
	counter: 0,
	load: function(conversation)
	{
		this.dialog_list = conversation.dialog_list;
		this.name = conversation.name;
		this.next = true;
	},
	flush: function()
	{
		this.dialog_list.length = 0;
		this.counter = 0;
	},
	lock: function()
	{
		this.next = false;
		setTimeout("ConversationManager.next = true", 500);
	},
	advance: function()
	{
		this.counter++;
	},
	showDialog: function()
	{
		if(this.counter >= this.dialog_list.length)
		{
			FMQ.state = "field_screen";
			lockKey(88);
			this.flush();
		}
		else
		{
			var current_dialog = this.dialog_list[this.counter];
			Dialog.Call(
				current_dialog.speaker_name,
				current_dialog.text,
				current_dialog.character_left,
				current_dialog.character_right
			);
		}
	}
};

Dialog =
{
	Call: function(name, text, spriteleft, spriteright)
	{
		if(GameManager.Content.dialogImage)
		{
			ctx.drawImage(GameManager.Content.dialogImage, 32, 370);
			ctx.fillStyle = "rgb(10, 10, 10)";
			ctx.font = "bold 20px Arial";
			ctx.fillText(name, 50, 385);
			ctx.fillStyle = "rgb(250, 250, 250)";
			ctx.font = "bold 16px Arial";
			ctx.fillText(text, 50, 430);
		}
	}
};