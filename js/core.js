// Loads blank system instance without any requirements
Core =
{
	/**
	 * Size of engine square tile
	 */
	Size: 32,
	/**
	 * loads the various canvas layers into the DOM
	 */
	generateCanvasLayers: function()
	{
		// main visible canvas
		canvas = document.createElement("canvas");
		canvas.setAttribute("id", "gameCanvas");
		ctx = canvas.getContext("2d");
		
		// collision detection canvas
		collision_canvas = document.createElement("canvas");
		collision_canvas.setAttribute("id", "collisionCanvas");
		cltx = collision_canvas.getContext("2d");
		
		// canvas properties
		canvas.width  = 800;
		canvas.height = 576;
		collision_canvas.width  = 800;
		collision_canvas.height = 576;
		
		document.body.appendChild(canvas);
		document.body.appendChild(collision_canvas);
	},
	CoreImages: function()
	{
		var sources = {
			preloaderImage: 'images/ui/preloader.png',
			dialogImage: 'images/dialog/dialog-window.png',
			clockImage: 'images/ui/time-window.png'
		};

		GameManager.Content = GameManager.ImageLoader(sources);
	},
	Preloader:
	{
		render: function()
		{
			if(GameManager.Content.preloaderImage)
			{
				ctx.drawImage(GameManager.Content.preloaderImage, 0, 0);
			}
		}
	},
	Main: function()
	{
		GameTime.now = Date.now();
		GameTime.delta = GameTime.now - GameTime.then;
		
		this.Preloader.render();
		
		//FMQ.update( GameTime.delta / 1000 );
		//FMQ.render( GameTime.delta );
		
		GameTime.then = GameTime.now;
	}
};

GameTime.then = Date.now();
Core.generateCanvasLayers();
Core.CoreImages();
setInterval("Core.Main()", 1);