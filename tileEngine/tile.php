<?php

class Tile
{
    protected $sprite;
    protected $height;
    protected $flag;


    public function getSprite()
    {
        return $this->sprite;
    }

    public function getHeight()
    {
        return $this->height;
    }

    public function getFlag()
    {
        return $this->flag;
    }

    public function setSprite($sprite)
    {
        $this->sprite = $sprite;
    }

    public function setHeight($height)
    {
        $this->height = $height;
    }

    public function setFlag($flag)
    {
        $this->flag = $flag;
    }

}
