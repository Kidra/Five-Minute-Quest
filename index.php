<?php

ini_set('display_errors', '1');
ini_set('xdebug.var_display_max_depth', '10');
error_reporting(E_ALL);

require 'tileEngine/tileset.php';
require 'tileEngine/tile.php';
require 'tileEngine/level.php';

//$tileset = new Tileset("json/maps/level1.json");

$level = new level();
$level->add_tileset(new Tileset("json/maps/level1.json"));

header('content-type: image/png');

$level->render_level();