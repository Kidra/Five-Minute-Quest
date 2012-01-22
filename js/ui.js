UI =
{
	FieldClock: function()
	{
		var currentTime = new Date();
		var hours = currentTime.getHours();
		var minutes = currentTime.getMinutes();
		if (minutes < 10)
		{
			minutes = "0" + minutes;
		};
		ctx.drawImage(GameManager.Content.clockImage, 670, 0);
		ctx.fillStyle = "rgb(10, 10, 10)";
		ctx.font = "bold 14px Arial";
		ctx.fillText(hours + " : " + minutes, 675, 5);
	}
};