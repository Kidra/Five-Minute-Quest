<?php

class Level
{
	protected $tilesets = array();
	
	public function get_tilesets()
	{
		return $this->tilesets;
	}
	
	public function add_tileset(Tileset $tileset)
	{
		$this->tilesets[] = $tileset;
	}
	
	public function render_level()
	{
		$tilesets  = $this->get_tilesets();
		$size = $tilesets[0]->get_tiles()->Size;
		
		$image = imagecreate($size, $size);
		
		foreach($tilesets as $tileset)
		{
			$tile = $tileset->generate_image();
			imagecopy($image, $tile, 0, 0, 0, 0, $size, $size);
		}
		
		return imagepng($image);
	}
}