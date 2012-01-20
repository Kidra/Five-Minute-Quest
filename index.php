<?php

function __autoload($class_name)
{
	require_once $class_name.'.php';
}

ini_set('display_errors', '1');
ini_set('xdebug.var_display_max_depth', '10');
error_reporting(E_ALL);

$url = getcwd();

$level = new FMQ\TileEngine\Level();
$level->set_name('Test Level');
$level->add_tileset(new FMQ\TileEngine\Tileset($url."\\json\\maps\\level1.json"));

$background = $level->render_level();
$width  = $level->get_width();
$height = $level->get_height();
$collision = json_encode($level->get_collision_layer());