NpcManager =
{
	npc_list: [],
	update: function(modifier)
	{
		for(var i = 0; i < this.npc_list.length; i++)
		{
			this.npc_list[i].update(modifier);
		}
	},
	render: function()
	{
		for(var i = 0; i < this.npc_list.length; i++)
		{
			this.npc_list[i].render();
		}
	},
	load: function(list)
	{
		this.npc_list = list;
	},
	flush: function()
	{
		this.npc_list.length = 0;
	}
};