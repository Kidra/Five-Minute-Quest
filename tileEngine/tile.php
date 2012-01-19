<?php

class Tile
{
    protected $size;
    protected $sprite;
    protected $z_index;
    protected $flag;

    public function getSize()
    {
        return $this->size;
    }

    public function getSprite()
    {
        return $this->sprite;
    }

    public function getZ_index()
    {
        return $this->z_index;
    }

    public function getFlag()
    {
        return $this->flag;
    }

    public function setSize($size)
    {
        $this->size = $size;
    }

    public function setSprite($sprite)
    {
        $this->sprite = $sprite;
    }

    public function setZ_index($z_index)
    {
        $this->z_index = $z_index;
    }

    public function setFlag($flag)
    {
        $this->flag = $flag;
    }

}
