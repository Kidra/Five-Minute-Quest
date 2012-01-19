<?php

class Level
{
	protected $tilesets        = array();
	protected $collision_layer = array();
	
	public function __construct()
	{
		
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
		
		return imagepng($image);
	}
	
	public function load_collision()
	{
		
	}
}