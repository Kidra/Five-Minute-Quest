<?php

class Player extends Actor
{
	private $speed;
	
	public function getSpeed() {
		return $this->speed;
	}

	public function setSpeed($speed) {
		$this->speed = $speed;
	}
}