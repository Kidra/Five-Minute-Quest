<?php

function __autoload($class_name)
{
	require_once str_replace('\\', '/', $class_name).'.php';
}

ini_set('display_errors', '1');
ini_set('xdebug.var_display_max_depth', '10');
error_reporting(E_ALL);

$url = getcwd();

$level = new FMQ\TileEngine\Level();
$level->set_name('Test Level');
$level->add_tileset(new FMQ\TileEngine\Tileset($url."/json/maps/level1.json"));

$actor_manager = new FMQ\Actors\Actor_Manager();
$actor_manager->add_actor(new FMQ\Actors\Player($url."/json/characters/hero.json"));
$hero = $actor_manager->get_actors();

$conversation_manager = new FMQ\Conversations\Conversation_Manager();
$conversations = $conversation_manager->load_conversation($url."/json/conversations/mike1.json");

// var_dump($conversations);

$background = $level->render_level();
$collision_map = $level->render_collision_map();
$width  = $level->get_width();
$height = $level->get_height();

$hero = json_encode($hero[0]->render_json());