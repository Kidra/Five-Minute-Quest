<?php

class Tileset
{
	private $tiles = array();
	
	public function __construct($path)
	{
		$this->load_tileset($path);
	}
	
	public function load_tileset($path = false)
	{
		$this->tiles = $this->load_tileset_data($path);
	}
	
	private function load_tileset_data($path)
	{
		if( ! $path)
			throw new Exception("load_tileset: path not specified.");
		
		return json_decode(file_get_contents($path));
	}
	
	public function get_tiles()
	{
		return $this->tiles;
	}
	
	public function generate_image()
	{
		$tiles = $this->get_tiles();
		
    	$image = imagecreate($tiles->Size * (count($tiles->Rows)), $tiles->Size * (count($tiles->Rows)));
    
        foreach($tiles->Rows as $row => $columns)
        {
        	foreach($columns->Tiles as $col => $tile_info)
        	{
        		$tile = imagecreatefrompng($tile_info->Sprite);
        		imagecopy($image, $tile, $row * $tiles->Size, $col * $tiles->Size, 0, 0, $tiles->Size, $tiles->Size);
        	}
        }
        
        return imagepng($image);
	}
}