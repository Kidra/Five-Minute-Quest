GameManager =
{
	FieldStack: [],
	ConversationStack: [],
	Content: {},
	AddToFieldStack: function(obj)
	{
		this.FieldStack.push(obj);
	},
	AddToConversationStack: function(obj)
	{
		this.ConversationStack.push(obj);
	},
	Draw: function()
	{
		for(obj in this.FieldStack)
		{
			obj.draw();
		}
	},
	Render: function()
	{
		for(var i = 0; i < this.FieldStack.length; ++i)
		{
			this.FieldStack[i].render();
		}
	}
};