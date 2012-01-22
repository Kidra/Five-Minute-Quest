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
	Call: function(text)
	{
		ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.fillRect(0, 416, 800, 160);
		ctx.fillStyle = "rgb(10, 10, 10)";
		ctx.font = "18px Arial";
		ctx.fillText(text, 10, 428);
	}
};