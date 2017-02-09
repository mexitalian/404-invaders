'use strict';

let Invaders = function(opt = {bgColor: 'rgba(255,255,255,0.5)'}) {

	let SPACE = 32
		, defaults = {
			bgColor: 'grey',
			enemyColor: 55
		}
		, settings = Object.assign(defaults, opt)
	  , ship
		, laser
	  , enemies
		, isMobile = false
		, mobileLoop = function() {}; // empty until we know user is on mobile

	this.score = 0;


	window.setup = function() {
	  createCanvas(600, 400);
	  rectMode(CENTER);
	  ellipseMode(CENTER);
		imageMode(CENTER);
		textAlign(CENTER);
		textSize(18);
		textFont('Courier New');
		textStyle(BOLD);
	  // frameRate(20);
	  fill(settings.enemyColor);
		noStroke();
	  ship = new Ship();
	  enemies = new PixelController(formation, 12);
		laser = new LaserController();
	  // noLoop();
	}

	window.draw = function() {
	  background(settings.bgColor);
	  ship.update().show();
		laser.update().show();
		enemies.collision(laser);
		enemies.update().show();

		text(game.score, 20, 20);

		if (ship.hits(enemies)) {
			game.reset();
		}

		mobileLoop();
	}

	// deviceMoved is only fired once
	// so we can use it to attach mobile only events when needed
	window.deviceMoved = function() {
		if (!isMobile) {
			window.touchStarted = function(e) {
				e.preventDefault();
				laser.add(new Laser(ship.pos));
			}

			mobileLoop = function() {
				if (rotationZ > 95) {
					ship.dir = -1
				}
				else if (rotationZ < 85) {
					ship.dir = 1
				}
			}
		}
		isMobile = !isMobile;
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

	this.reset = function() {
		ship = new Ship();
	  enemies = new PixelController(formation, 12);
		laser = new LaserController();
		game.score = 0;
	}

}


let game = new Invaders();
