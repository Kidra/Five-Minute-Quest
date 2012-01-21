<?php 

    include 'index.php';

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
  <title>Game</title>
  <style type="text/css">
body {background: #111;}
#gameCanvas {margin:10px auto; border:1px solid #555; display:block;}
#collisionCanvas {margin:10px auto; border:1px solid #555; display:none;}
</style>
  <script type="text/javascript" src="js/input-handler.js"></script>
</head>
<body>
  
</body>
<script type="text/javascript">
var canvas = document.createElement("canvas");
canvas.setAttribute("id", "gameCanvas");
var ctx    = canvas.getContext("2d");

var collision_canvas = document.createElement("canvas");
collision_canvas.setAttribute("id", "collisionCanvas");
var cltx = collision_canvas.getContext("2d");

canvas.width  = 800;
canvas.height = 576;
collision_canvas.width  = 800;
collision_canvas.height = 576;

var size = 32;


var returnedBgImage = "<?php echo $background?>";
var collisionBgMap = "<?php echo $collision_map?>";

var hero = <?php echo $hero?>;
</script>

<script type="text/javascript" src="game.js"></script>
</html>