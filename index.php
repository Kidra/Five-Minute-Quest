<?php

ini_set('display_errors', '1');
ini_set('xdebug.var_display_max_depth', '10');
error_reporting(E_ALL);

require 'tileEngine/tileset.php';
require 'tileEngine/tile.php';
require 'tileEngine/level.php';

$url = getcwd();

$level = new level();
$level->set_name('Test Level');
$level->add_tileset(new Tileset($url."\\json\\maps\\level1.json"));

//header('content-type: image/png');

$test = $level->render_level();