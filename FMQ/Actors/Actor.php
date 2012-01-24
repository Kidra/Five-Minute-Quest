<?php

namespace FMQ\Actors;

abstract class Actor
{
    protected $id;
    protected $name;
    protected $direction;
    protected $x;
    protected $y;
    protected $size;

    protected $tl = array();
    protected $tr = array();
    protected $bl = array();
    protected $br = array();

    protected $conversable;
    
    protected $dialog_faces = array(
        'default' => '',
    	'happy'   => '',
    	'sad'     => '',
    	'angry'   => ''		
    );

    protected function get_id()
    {
        return $this->id;
    }

    protected function get_name()
    {
        return $this->name;
    }
    
    protected function get_dialog_faces()
    {
    	return $this->dialog_faces;
    }
    
    protected function set_dialog_faces(array $faces)
    {
    	$this->dialog_faces = $faces;
    }

    protected function get_speed()
    {
        return $this->speed;
    }

    protected function get_direction()
    {
        return $this->direction;
    }

    protected function set_id($id)
    {
        $this->id = $id;
    }

    protected function set_name($name)
    {
        $this->name = $name;
    }

    protected function set_direction($direction)
    {
        $this->direction = $direction;
    }

    protected function load_data($path)
    {
        if (!$path)
            throw new InvalidArgumentException("load_data: path not specified.");

        return json_decode(file_get_contents($path));
    }

    protected function get_tl()
    {
        return $this->tl;
    }

    protected function get_tr()
    {
        return $this->tr;
    }

    protected function get_bl()
    {
        return $this->bl;
    }

    protected function get_br()
    {
        return $this->br;
    }

    protected function set_tl($tl)
    {
        $this->tl = $tl;
    }

    protected function set_tr($tr)
    {
        $this->tr = $tr;
    }

    protected function set_bl($bl)
    {
        $this->bl = $bl;
    }

    protected function set_br($br)
    {
        $this->br = $br;
    }

    protected function set_size($size)
    {
        $this->size = $size;
    }

    protected function get_size()
    {
        return $this->size;
    }

    protected function set_x($x)
    {
        $this->x = $x;
    }

    protected function set_y($y)
    {
        $this->y = $y;
    }

    protected function get_x()
    {
        return $this->x;
    }

    protected function get_y()
    {
        return $this->y;
    }

    protected function get_conversable()
    {
        return $this->conversable;
    }

    protected function set_conversable($conversable)
    {
        $this->conversable = $conversable;
    }
    
    public function render_json()
    {
    	return get_object_vars($this);
    }

}
