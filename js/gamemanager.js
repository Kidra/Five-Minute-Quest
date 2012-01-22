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
	UpdateField: function(modifier)
	{
		for(var i = 0; i < this.FieldStack.length; ++i)
		{
			if(typeof this.FieldStack[i].update === 'function')
			{
				this.FieldStack[i].update(modifier);
			}
		}
	},
	RenderField: function()
	{
		for(var i = 0; i < this.FieldStack.length; ++i)
		{
			if(typeof this.FieldStack[i].render === 'function')
			{
				this.FieldStack[i].render();
			}
		}
	},
	UpdateConversation: function()
	{
		for(var i = 0; i < this.ConversationStack.length; ++i)
		{
			this.ConversationStack[i].update();
		}
	},
	RenderConversation: function()
	{
		for(var i = 0; i < this.ConversationStack.length; ++i)
		{
			this.ConversationStack[i].render();
		}
	}
};