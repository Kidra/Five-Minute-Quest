<?php

function __autoload($class_name)
{
	require_once str_replace('\\', '/', $class_name).'.php';
}

ini_set('display_errors', '1');
ini_set('xdebug.var_display_max_depth', '10');
error_reporting(E_ALL|E_STRICT);

$url = getcwd();

$scenario = new FMQ\Scenario\Scenario();
$scenario->get_level()->set_name('Test Level');
$scenario->get_level()->add_tileset(new FMQ\TileEngine\Tileset($url."/json/maps/level1.json"));
$scenario->get_actor_manager()->add_actor(new FMQ\Actors\Player($url."/json/characters/hero.json"));

$hero          = $scenario->get_actor_manager()->get_actors();
$conversations = $scenario->get_conversation_manager()->load_conversation($url."/json/conversations/mike1.json");
$background    = $scenario->get_level()->render_level();
$collision_map = $scenario->get_level()->render_collision_map();
$width         = $scenario->get_level()->get_width();
$height        = $scenario->get_level()->get_height();
$hero          = json_encode($hero[0]->render_json());
