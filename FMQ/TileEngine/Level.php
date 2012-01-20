<?php

namespace FMQ\TileEngine;

class Level
{
	protected $tilesets        = array();
	protected $collision_layer = array();
	protected $name;
	protected $width;
	protected $height;
	
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
	
	public function set_width($width)
	{
		$this->width = $width;
	}
	
	public function get_width()
	{
		return $this->width;
	}
	
	public function set_height($height)
	{
		$this->height = $height;
	}
	
	public function get_height()
	{
		return $this->height;
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
	
	public function set_collision_layer($layer)
	{
		$this->collision_layer = $layer;
	}
	
	public function render_level()
	{
		$tilesets  = $this->get_tilesets();
		$size = $tilesets[0]->get_size();
		$total_height = ($tilesets[0]->number_of_rows() * $size);
		$total_width = ($tilesets[0]->number_of_columns() * $size);
		
		$this->set_height($total_height);
		$this->set_width($total_width);
		
		if(is_file(getcwd().$this->get_hashed_name()))
		{
			return '/FMQ/cached/'.$this->get_hashed_name().'.png';
		}
		
		$image = imagecreate($total_width, $total_height);
		
		foreach($tilesets as $tileset)
		{
			$this->set_collision_layer($tileset->get_collision());
			$tile = $tileset->generate_image();
			imagecopy($image, $tile, 0, 0, 0, 0, $total_width, $total_height);
		}
		
		imagepng($image, getcwd().'\\cached\\'.$this->get_hashed_name().'.png');
		
		return '/FMQ/cached/'.$this->get_hashed_name().'.png';
	}
}