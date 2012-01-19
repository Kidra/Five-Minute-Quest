<?php

ini_set('display_errors', '1');
error_reporting(E_ALL);

require 'tileEngine/tileset.php';
require 'tileEngine/tile.php';

$tileset = new Tileset("json/maps/level1.json");


header('content-type: image/png');

echo $tileset->generate_image();