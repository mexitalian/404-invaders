'use strict';

let Invaders = function(opt = {}) {

	let SPACE = 32
		, defaults = {
			bgColor: 'white',
			enemyColor: 55
		}
		, settings = Object.assign(defaults, opt)
	  , ship
		, laser
	  , enemies;

	window.setup = function() {
	  createCanvas(800, 400);
	  rectMode(CENTER);
	  ellipseMode(CENTER);
	  // frameRate(20);
	  fill(settings.enemyColor);
		noStroke();
	  ship = new Ship();
	  enemies = new PixelController(text, 13);
		laser = new LaserController();
	  // noLoop();
	}

	window.draw = function() {
	  background(settings.bgColor);
	  ship.update().show();
		laser.update().show();
		enemies.collision(laser);
		enemies.update().show();

		if (ship.hits(enemies)) {
			reset();
		}
	}


	window.keyPressed = function() {
	  switch (keyCode) {

	    case SPACE:
	        laser.add(new Laser(ship.pos));
	        break;

	    case RIGHT_ARROW: ship.dir = 1; break;
	    case LEFT_ARROW: ship.dir = -1; break;
			case ESCAPE: reset(); 					break;
	  }
	}

	window.keyReleased = function() {
	  switch (keyCode) {
	    case SPACE:
	      break;
	    case RIGHT_ARROW:
	    case LEFT_ARROW:
	      ship.dir = 0;
	      break;
	  }
	}

	let reset = function() {
		ship = new Ship();
	  enemies = new PixelController(text);
		laser = new LaserController();
	}

}


let game = new Invaders();
