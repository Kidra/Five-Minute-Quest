// Loads blank system instance without any requirements
Core =
{
	/**
	 * if scenario not loaded, always run core
	 */
	BypassCore: false,
	/**
	 * Size of engine square tile
	 */
	Size: 32,
	/**
	 * Sprite direction co-ords
	 */
	Direction: {
		DOWN  : 0,
		UP    : 32,
		LEFT  : 64,
		RIGHT : 96
	},
	KeyboardState: null,
	lastKeyboardState: null,
	/**
	 * loads the various canvas layers into the DOM
	 */
	generateCanvasLayers: function()
	{
		// main visible canvas
		canvas = document.createElement("canvas");
		canvas.setAttribute("id", "gameCanvas");
		ctx = canvas.getContext("2d");
		
		overlay_canvas = document.createElement("canvas");
		overlay_canvas.setAttribute("id", "overlayCanvas");
		cotx = canvas.getContext("2d");
		
		// collision detection canvas
		collision_canvas = document.createElement("canvas");
		collision_canvas.setAttribute("id", "collisionCanvas");
		cltx = collision_canvas.getContext("2d");
		
		// canvas properties
		canvas.width  = 800;
		canvas.height = 576;
		overlay_canvas.width = 800;
		overlay_canvas.height = 576;
		collision_canvas.width  = 800;
		collision_canvas.height = 576;
		
		document.getElementById("wrapper").appendChild(canvas);
		document.getElementById("wrapper").appendChild(overlay_canvas);
		document.getElementById("wrapper").appendChild(collision_canvas);
	},
	/**
	 * Loads basic global images
	 */
	CoreImages: function()
	{
		var sources = {
			preloaderImage: 'images/ui/preloader.png',
			dialogImage: 'images/dialog/dialog-window.png',
			clockImage: 'images/ui/time-window.png'
		};

		GameManager.Content = GameManager.ImageLoader(sources);
	},
	/**
	 * runs if no scenario loaded
	 */
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
	/**
	 * main game loop
	 */
	Main: function()
	{
		this.BypassCore = this.Scenario.loaded;
		GameTime.now = Date.now();
		GameTime.delta = GameTime.now - GameTime.then;
		this.KeyboardState = keysDown;
		
		if(this.BypassCore)
		{
			this.Scenario.scenario.update(GameTime.delta / 1000);
			this.Scenario.scenario.render();
		}
		else
		{
			this.Preloader.render();
		}
		
		GameTime.then = GameTime.now;
		this.lastKeyboardState = this.KeyboardState;
	},
	Scenario: {
		loaded: false,
		scenario: null,
		load: function(obj)
		{
			this.scenario = obj;
			this.scenario.initialize();
			this.loaded = true;
		},
		unload: function()
		{
			this.scenario = null;
			this.loaded = false;
		},
		getState: function()
		{
			return this.scenario.state;
		}
	}
};

GameTime.then = Date.now();
Core.generateCanvasLayers();
Core.CoreImages();
// loads scenario on pageload
Core.Scenario.load(FMQ);
setInterval("Core.Main()", 1);