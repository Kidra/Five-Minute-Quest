<?php

class Tileset
{
	private $rows = array();
	private $collision = array();
	private $size;
	private $name;
	
	public function __construct($path)
	{
		$this->load_tileset($path);
		$this->load_collision();
	}
	
	private function load_collision()
	{
		foreach($this->get_rows() as $row => $columns)
		{
			foreach($columns as $col => $tile)
			{
				$this->collision[$row][$col] = $tile->getFlag();
			}
		}
	}
	
	public function load_tileset($path = false)
	{
		$tiles = $this->load_tileset_data($path);
		
		$this->size = $tiles->Size;
		$this->name = $tiles->Name;
		$this->base_tile = $tiles->Base_Tile;
		
		foreach($tiles->Rows as $row => $column)
		{
			foreach($column->Tiles as $col => $tile_info)
			{
    			$tile = new Tile();
    			$tile->setSprite($tile_info->Sprite);
    			$tile->setFlag($tile_info->Flag);
    			$tile->setHeight($tile_info->Height);
    			$this->set_tile($tile, $row, $col);
			}
		}
	}
	
	private function load_tileset_data($path)
	{
		if( ! $path)
			throw new Exception("load_tileset: path not specified.");
		
		return json_decode(file_get_contents($path));
	}
	
	public function set_tile(Tile $tile, $row, $col)
	{
		$this->rows[$row][$col] = $tile;
	}
	
	public function get_rows()
	{
		return $this->rows;
	}
	
	public function number_of_rows()
	{
		return count($this->get_rows());
	}
	
	public function number_of_columns()
	{
		return count($this->rows[0]);
	}
	
	public function generate_image()
	{
		$rows = $this->get_rows();
		
    	$image = imagecreate($this->get_size() * $this->number_of_rows(), $this->get_size() * $this->number_of_rows());
    
        foreach($rows as $row => $columns)
        {
        	foreach($columns as $col => $tile_info)
        	{
        		$tile = imagecreatefrompng($tile_info->getSprite());
        		imagecopy($image, $tile, $row * $this->get_size(), $col * $this->get_size(), 0, 0, $this->get_size(), $this->get_size());
        	}
        }
        
        return $image;
	}
	
	public function get_size()
	{
		return $this->size;
	}
}