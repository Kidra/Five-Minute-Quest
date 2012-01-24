<?php

namespace FMQ\TileEngine;

class Level
{
	protected $tilesets        = array();
	protected $collision_layer = array();
	protected $sources;
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
	
	public function add_source($source)
	{
		$this->sources[] = $source;
	}
	
	public function get_sources()
	{
		return $this->sources;
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
	
	public function get_collision_layers()
	{
		return $this->collision_layers;
	}
	
	public function set_collision_layers($layer)
	{
		$this->collision_layers = $layer;
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
			return 'cached/'.$this->get_hashed_name().'.png';
		}
		
		$image = imagecreate($total_width, $total_height);
		
		foreach($tilesets as $tileset)
		{
			$this->set_collision_layers($tileset->get_collision());
			$tile = $tileset->generate_image();
			imagecopy($image, $tile, 0, 0, 0, 0, $total_width, $total_height);
		}
		
		imagepng($image, getcwd().'/cached/'.$this->get_hashed_name().'.png');
		
		return 'cached/'.$this->get_hashed_name().'.png';
	}
	
	public function render_collision_map()
	{
		$collision_layers = $this->get_collision_layers();
		$total_height = $this->get_height();
		$total_width = $this->get_width();
		
		$image = imagecreatetruecolor($total_width, $total_height);
		$white = imagecolorallocate($image, 255, 255, 255);
		imagefill($image, 0, 0, $white);
		
		foreach($collision_layers as $collision_layer)
		{
			$x = $collision_layer[0];
			$y = $collision_layer[1];
			
			$tile = imagecreatetruecolor(32, 32);
			$black = imagecolorallocate($tile, 0, 0, 0);
			imagefill($tile, 0, 0, $black);
			imagecopy($image, $tile, $x, $y, 0, 0, 32, 32);
		}
		
		imagepng($image, 'cached/'.$this->get_hashed_name().'_col.png');
		
		return 'cached/'.$this->get_hashed_name().'_col.png';
	}
}