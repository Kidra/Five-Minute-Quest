<?php

abstract class Actor
{
	protected $id;
	protected $name;
	protected $direction;
	protected $coords;
	
	protected function getId() {
		return $this->id;
	}

	protected function getName() {
		return $this->name;
	}

	protected function getSpeed() {
		return $this->speed;
	}

	protected function getDirection() {
		return $this->direction;
	}

	protected function getCoords() {
		return $this->coords;
	}

	protected function setId($id) {
		$this->id = $id;
	}

	protected function setName($name) {
		$this->name = $name;
	}

	protected function setDirection($direction) {
		$this->direction = $direction;
	}

	protected function setCoords($coords) {
		$this->coords = $coords;
	}

	
	
}