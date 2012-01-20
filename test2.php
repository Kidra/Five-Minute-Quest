<?php 

    include 'index.php';

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
  <title>Game</title>
  <style type="text/css">body {background: #111;}</style>
  <script type="text/javascript" src="js/input-handler.js"></script>
</head>
<body>
  
</body>
<script type="text/javascript">
var canvas = document.createElement("canvas");
var ctx    = canvas.getContext("2d");

var collision_canvas = document.createElement("canvas");
var cltx = collision_canvas.getContext("2d");

canvas.width  = <?php echo $width?>;
canvas.height = <?php echo $height?>;
collision_canvas.width  = <?php echo $width?>;
collision_canvas.height = <?php echo $height?>;

var size = 32;


var returnedBgImage = "<?php echo $background?>";
var collisionBgMap = "<?php echo $collision_map?>";

var collision = <?php echo $collision?>;
</script>

<script type="text/javascript" src="game.js"></script>
</html>