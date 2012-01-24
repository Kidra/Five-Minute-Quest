<?php

$character_one = isset($_POST['character_1']) ? $_POST['character_1'] : false;
$character_two = isset($_POST['character_2']) ? $_POST['character_2'] : false;

$conversation_manager = new FMQ\Conversations\Conversation_Manager();

header("Content-type: application/x-javascript");

?>
{
	"name" : "mike1",
	"dialog_list" : [
		{
			"character_left" : "images/dialog/hero1_left.png",
			"character_right" : "images/dialog/hero2_right.png",
			"speaker_name" : "Hero",
			"text" : "So, you come around here often?"
		},
		{
			"character_left" : "images/dialog/hero1_left.png",
			"character_right" : "images/dialog/hero2_right.png",
			"speaker_name" : "Mike",
			"text" : "Nope, first time."
		}
	]
}