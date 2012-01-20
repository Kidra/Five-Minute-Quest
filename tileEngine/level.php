<?php

class Level
{
	protected $tilesets        = array();
	protected $collision_layer = array();
	protected $name;
	
	public function __construct()
	{
		
	}
	
	public function set_name($name)
	{
		$this->name = $name;
	}
	
	public function get_name()
	{
		return $this->name;
	}
	
	public function get_hashed_name()
	{
		return substr(md5($this->get_name()), 0, 8);
	}
	
	public function get_tilesets()
	{
		return $this->tilesets;
	}
	
	public function add_tileset(Tileset $tileset)
	{
		$this->tilesets[] = $tileset;
	}
	
	public function get_collision_layer()
	{
		return $this->collision_layer;
	}
	
	public function add_collision_layer($layer)
	{
		$this->collision_layer[] = $layer;
	}
	
	public function render_level()
	{
		if(is_file(getcwd().$this->get_hashed_name()))
		{
			return '/FMQ/cached/'.$this->get_hashed_name().'.png';
		}
		
		$tilesets  = $this->get_tilesets();
		$size = $tilesets[0]->get_size();
		$total_height = ($tilesets[0]->number_of_rows() * $size);
		$total_width = ($tilesets[0]->number_of_columns() * $size);
		
		$image = imagecreate($total_width, $total_height);
		
		foreach($tilesets as $tileset)
		{
			$tile = $tileset->generate_image();
			imagecopy($image, $tile, 0, 0, 0, 0, $total_width, $total_height);
		}
		
		imagepng($image, getcwd().'\\cached\\'.$this->get_hashed_name().'.png');
		
		return '/FMQ/cached/'.$this->get_hashed_name().'.png';
	}
}