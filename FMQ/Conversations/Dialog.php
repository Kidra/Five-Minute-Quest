<?php

namespace FMQ\Conversations;

class Dialog
{
    protected $character_left;
    protected $character_right;
    protected $speaker_name;
    protected $text;

    public function get_character_left()
    {
        return $this->character_left;
    }

    public function set_character_left($character_left)
    {
        $this->character_left = $character_left;
    }

    public function get_character_right()
    {
        return $this->character_right;
    }

    public function set_character_right($character_right)
    {
        $this->character_right = $character_right;
    }

    public function get_text()
    {
        return $this->text;
    }

    public function set_text($text)
    {
        $this->text = $text;
    }
    
    public function set_speaker_name($name)
    {
    	$this->speaker_name = $name;
    }
    
    public function get_speaker_name()
    {
    	return $this->speaker_name;
    }

}
