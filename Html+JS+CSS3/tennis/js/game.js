var game = {
	canvas: null,
	context: null,
	ball: {x: 0, y: 0, SIZE: 8, SPEED_X: 20, SPEED_Y: 12},
	paddle: { BORDER: 5, WIDTH: 10, HEIGHT: 50 },
	user: { x: 5, y: 0 },
	mouse: { x: 0, y: 0 },
	computer: { x: 0, y: 0, SPEED_X: 5, SPEED_Y: 5 },
	begin: function (name) {
		this.canvas = document.getElementById(name);
		this.context = this.canvas.getContext("2d");
		//MouseEvent
		this.canvas.addEventListener('mousemove', function (evt) {
			// console.log(evt);
			this.mouse = game.getPositionMouse(evt);
			game.user.y = this.mouse.y - (game.paddle.HEIGHT/2);
		});
		//Iniciar ball
		this.resetPositionBall();
		//Position User
		this.user.y = (this.canvas.height/2)-20;
		//Position Computer
		this.computer.x = this.canvas.width-(this.paddle.BORDER+this.paddle.WIDTH);
		this.computer.y = (this.canvas.height/2)-(this.paddle.HEIGHT)/2;
		// console.log(this.computer.x);
	},
	drawEveryThing: function () {
		//Table
		this.createUser(0, 0, this.canvas.width, this.canvas.height, 'black');
		//User
		this.createUser(this.paddle.BORDER, this.user.y, this.paddle.WIDTH, this.paddle.HEIGHT, 'white');
		//Computer
		this.createUser(this.computer.x, this.computer.y, this.paddle.WIDTH, this.paddle.HEIGHT, 'white');
		//Ball
		this.createBall();
		//Movement of the ball
		this.movementBall();
	},
	createBall: function () {
		this.context.fillStyle = 'red';
		this.context.beginPath();
		this.context.arc(this.ball.x, this.ball.y, this.ball.SIZE, 0, Math.PI*2, true);
		this.context.fill();
	},
	//Movement of the ball
	movementBall: function () {
		this.computerMovement();
		this.ball.x = this.ball.x + this.ball.SPEED_X;
		this.ball.y = this.ball.y + this.ball.SPEED_Y;
		if(this.ball.x < 25) {
			if(this.ball.y > (this.user.y-25) && this.ball.y < (this.user.y + this.paddle.HEIGHT)) {
				this.ball.SPEED_X = -this.ball.SPEED_X;
				var deltaY = this.ball.y - (this.user.y + (this.paddle.HEIGHT/2));
				this.ball.SPEED_Y = deltaY * 0.35;
			} else {
				this.resetPositionBall();
			}
		}
		if(this.ball.x > (this.canvas.width - 25)) {
			if(this.ball.y > this.computer.y && this.ball.y < (this.computer.y + this.paddle.HEIGHT + 25)) {
				this.ball.SPEED_X = -this.ball.SPEED_X;
				var deltaY = this.ball.y - (this.computer.y + (this.paddle.HEIGHT/2));
				this.ball.SPEED_Y = deltaY * 0.35;
			} else {
				this.resetPositionBall();
			}
		}
		if((this.ball.y < 0) || this.ball.y > this.canvas.height) {
			this.ball.SPEED_Y = -this.ball.SPEED_Y;
		}
	},
	computerMovement: function () {
		var computerCenter = this.computer.y + (this.paddle.HEIGHT/2);
		if(computerCenter > (this.ball.y - 10)) {
			this.computer.y -= this.computer.SPEED_Y;
		} else if (computerCenter < (this.ball.y + 10)) {
			this.computer.y += this.computer.SPEED_Y;
		}
	},
	//Create pallete
	createUser: function (px, py, width, height, color) {
		this.context.fillStyle = color;
		this.context.fillRect(px, py, width, height);
	},
	//Get position of the mouse
	getPositionMouse: function(evt) {
		var rect = this.canvas.getBoundingClientRect();
		var root = document.documentElement;
		var mouseX = evt.clientX - rect.left - root.scrollLeft;
		var mouseY = evt.clientY - rect.top - root.scrollTop;
		// console.log('x: '+mouseX+', y: '+mouseY);
		return {
			x: mouseX,
			y: mouseY
		};
	},
	//ball reset
	resetPositionBall: function () {
		this.ball.x = this.canvas.width/2;
		this.ball.y = this.canvas.height/2;
		this.ball.SPEED_X = 10;
		this.ball.SPEED_Y = 5;
		this.ball.SPEED_Y = -this.ball.SPEED_Y;
	},
	//Finish the game
	finish: function () {
		alert("Win!!");
	}
};
window.onload = function () {
	//StartGame
	game.begin("game");
	//Gamming
	setInterval(function () {
		game.drawEveryThing();
	}, 100);
};