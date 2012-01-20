<?php

namespace FMQ\Actors;

class Actor_Manager
{
	private $actors = array();
	
	public function add_actor(Actor $actor)
	{
		$this->actors[] = $actor;
	}
	
	public function get_actors()
	{
		return $this->actors;
	}
}