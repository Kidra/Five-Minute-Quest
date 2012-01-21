<?php

namespace FMQ\TileEngine;

class Tileset
{
	private $columns = array();
	private $collision = array();
	private $size;
	private $name;
	
	public function __construct($path)
	{
		$this->load_tileset($path);
	}
	
	public function get_collision()
	{
		return $this->collision;
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
    			$tile->setSprite($tiles->Sprites[$tile_info->Sprite]);
    			$tile->setFlag($tile_info->Flag);
    			$tile->setHeight($tile_info->Height);
    			$this->set_tile($tile, $row, $col);
    			
    			// if impassable terrain
    			if($tile_info->Flag == 0)
    			{
        			$this->collision[] = array(
    					($col * $this->get_size()),
    					($row * $this->get_size())
        			);
    			}
			}
		}
	}
	
	private function load_tileset_data($path)
	{
		if( ! $path)
			throw new InvalidArgumentException("load_tileset: path not specified.");
		
		return json_decode(file_get_contents($path));
	}
	
	public function set_tile(Tile $tile, $row, $col)
	{
		$this->columns[$col][$row] = $tile;
	}
	
	public function get_columns()
	{
		return $this->columns;
	}
	
	public function number_of_rows()
	{
		return count($this->columns[0]);
	}
	
	public function number_of_columns()
	{
		return count($this->columns);
	}
	
	public function generate_image()
	{
		$columns = $this->get_columns();
		
    	$image = imagecreate($this->get_size() * $this->number_of_columns(), $this->get_size() * $this->number_of_rows());
    
        foreach($columns as $column => $rows)
        {
        	foreach($rows as $row => $tile_info)
        	{
        		$tile = imagecreatefrompng($tile_info->getSprite());
        		imagecopy($image, $tile, $column * $this->get_size(), $row * $this->get_size(), 0, 0, $this->get_size(), $this->get_size());
        	}
        }
        
        return $image;
	}
	
	public function get_size()
	{
		return $this->size;
	}
}