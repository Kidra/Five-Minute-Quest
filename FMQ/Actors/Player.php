<?php

namespace FMQ\Actors;

class Player extends Actor
{
	private $speed;
	private $moveable;
	private $in_conversation;
	
	public function __construct($path)
	{
		$this->load_player($path);
	}
	
	public function get_speed() {
		return $this->speed;
	}

	public function set_speed($speed) {
		$this->speed = $speed;
	}
	
	public function get_moveable() {
		return $this->moveable;
	}

	public function get_in_conversation() {
		return $this->in_conversation;
	}

	public function set_moveable($moveable) {
		$this->moveable = $moveable;
	}

	public function set_in_conversation($in_conversation) {
		$this->in_conversation = $in_conversation;
	}

    public function load_player($path)
    {
        $player = $this->load_data($path);
        
        $this->set_id($player->id);
        $this->set_name($player->name);
        $this->set_speed($player->speed);
        $this->set_direction($player->direction);
        $this->set_moveable($player->moveable);
        $this->set_in_conversation($player->in_conversation);
        $this->set_conversable($player->conversable);
        $this->set_x($player->x);
        $this->set_y($player->y);
        $this->set_size($player->size);
        $this->set_tl($player->tl);
        $this->set_tr($player->tr);
        $this->set_bl($player->bl);
        $this->set_br($player->br);
    }
    
    public function render_json()
    {
    	return get_object_vars($this);
    }
}