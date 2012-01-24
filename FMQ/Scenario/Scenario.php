<?php

namespace FMQ\Scenario;

use FMQ\Conversations\Conversation_Manager;
use FMQ\Actors\Actor_Manager;
use FMQ\TileEngine\Level;

class Scenario
{
	private $level;
	private $actor_manager;
	private $conversation_manager;
	
	public function __construct()
	{
		$this->level = new Level();
		$this->actor_manager = new Actor_Manager();
		$this->conversation_manager = new Conversation_Manager();
	}
	
	public function set_level(Level $level)
	{
		$this->level = $level;
	}
	
	public function get_level()
	{
		return $this->level;
	}
	
	public function get_actor_manager()
	{
		return $this->actor_manager;
	}
	
	public function get_conversation_manager()
	{
		return $this->conversation_manager;
	}
}