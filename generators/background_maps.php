<?php

include '../tileEngine/tileset.php';
include '../tileEngine/tile.php';
include '../tileEngine/level.php';

class Background_Maps_Generator
{
	public static function factory()
	{
	    $level = new level();
	    $level->add_tileset(new Tileset("../json/maps/level1.json"));
	    header('content-type: image/png');
	    $level->render_level();
	}
}

echo Background_Maps_Generator::factory();