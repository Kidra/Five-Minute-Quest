// main game loop that executes as fast as possible
main = function()
{
	GameTime.now = Date.now();
	GameTime.delta = GameTime.now - GameTime.then;
	
	Core.Preloader.render();
	
	//FMQ.update( GameTime.delta / 1000 );
	//FMQ.render( GameTime.delta );
	
	GameTime.then = GameTime.now;
}