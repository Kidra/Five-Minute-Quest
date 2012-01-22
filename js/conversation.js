ConversationManager =
{
	dialog_list: [],
	load: function(conversation)
	{
		this.dialog_list = conversation;
	},
	flush: function()
	{
		this.dialog_list.length = 0;
	}
};