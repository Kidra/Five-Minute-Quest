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
pre {color: #EEE; }
</style>
  <script type="text/javascript" src="js/input-handler.js"></script>
</head>
<body>
  
</body>
<script type="text/javascript">

var returnedBgImage = "<?php echo $background?>";
var collisionBgMap = "<?php echo $collision_map?>";

var hero = <?php echo $hero?>;
</script>
    <!--<script type="text/javascript" src="js/ui.js"></script>-->
    <!--<script type="text/javascript" src="js/hero.js"></script>-->
    <script type="text/javascript" src="js/gamemanager.js"></script>
    <!-- <script type="text/javascript" src="js/conversation.js"></script>--> 
    <!--<script type="text/javascript" src="js/detect_collision.js"></script>-->
    <script type="text/javascript" src="js/gametime.js"></script>
    <!--<script type="text/javascript" src="js/fmq.js"></script>-->
    <script type="text/javascript" src="js/core.js"></script>
    <!--<script type="text/javascript" src="js/initialiser.js"></script>-->
</html>
