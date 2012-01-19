<?php

class Level
{
	protected $tilesets = array();
	
	public function get_tilesets()
	{
		return $this->tilesets;
	}
	
	public function add_tileset($tileset)
	{
		$this->tilesets[] = $tileset;
	}
	
	public function render_level()
	{
		
	}
}