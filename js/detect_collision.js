function detect_collision(point1, point2)
{
	var difference_x = point2[0] - point1[0];
	var difference_y = point2[1] - point1[1];
	var mid_x = point1[0] + (difference_x / 2);
	var mid_y = point1[1] + (difference_y / 2);
	
	if(difference_x == 0) { difference_x = 1; }
	if(difference_y == 0) { difference_y = 1; }
	
	var pix = cltx.getImageData(point1[0], point1[1], difference_x, difference_y).data;
	for(var i = 0; i < pix.length; i += 4)
	{
		if(pix[i] == 255 && pix[i+1] == 0 && pix[i+2] == 0)
		{
			hero.conversable = true;
			for(var i = 0; i < NpcManager.npc_list.length; i++)
			{
				var npc = NpcManager.npc_list[i];
				if
				(
					mid_x >= npc.x
					&& mid_x <= (npc.x + npc.width)
				    && mid_y >= npc.y
				    && mid_y <= (npc.y + npc.height)
				)
				{
					ConversationManager.setTarget(npc.id);
					break;
				}
			}
			return true;
		}
		if(pix[i] == 0 && pix[i+1] == 0 && pix[i+2] == 0)
		{
			return true;
		}
	}
	return false;
}