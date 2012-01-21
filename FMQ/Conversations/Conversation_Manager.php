<?php

namespace FMQ\Conversations;

class Conversation_Manager
{
	private $dialog_list = array();
	private $name;
	
	public function get_name()
	{
		return $this->name;
	}
	
	public function set_name($name)
	{
		$this->name = $name;
	}
	
	public function get_dialog_list()
	{
		return $this->dialog_list;
	}
	
	public function add_dialog(Dialog $dialog)
	{
		$this->dialog_list[] = $dialog;
	}
	
	public function load_conversation($path)
	{
		if (!$path)
			throw new InvalidArgumentException("load_data: path not specified.");
		
		return json_decode(file_get_contents($path));
	}
	
	public function save_conversation($path)
	{
		file_put_contents($path, get_object_vars($this));
	}
}