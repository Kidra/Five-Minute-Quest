ConversationManager =
{
	dialog_list: [],
	next: false,
	load: function(conversation)
	{
		this.dialog_list = conversation;
	},
	flush: function()
	{
		this.dialog_list.length = 0;
	}
};

Dialog =
{
	Call: function(name, text)
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