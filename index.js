ThunderConnector = require('thunder-connector');
ThunderConnector.connect();

exports.turnLeftDegrees = function turnLeftDegrees(degrees){
	degrees = degrees || 10;
	stopTime = Math.floor(degrees * 22.3);
	//console.log(stopTime);
	setTimeout(function(){ThunderConnector.command('left');},0);
	setTimeout(function(){ThunderConnector.command('stop');},stopTime);
}

exports.turnRightDegrees = function turnRightDegrees(degrees){
	degrees = degrees || 10;
	stopTime = Math.floor(degrees * 22.3);
	//console.log(stopTime);
	setTimeout(function(){ThunderConnector.command('Right');},0);
	setTimeout(function(){ThunderConnector.command('stop');},stopTime);
}

exports.center = function center(){
	setTimeout(function(){ThunderConnector.command('right');},0);
	setTimeout(function(){ThunderConnector.command('down');},6500);
	setTimeout(function(){ThunderConnector.command('left');},8000);
	setTimeout(function(){ThunderConnector.command('up');},11050);
	setTimeout(function(){ThunderConnector.command('stop');},11850);
}

exports.downDegrees = function down(degrees){
	degrees = degrees || 10;
	stopTime = Math.floor(degrees * 50)
	setTimeout(function(){ThunderConnector.command('down');},0);
	setTimeout(function(){ThunderConnector.command('stop');},stopTime);
}

exports.upDegrees = function upDegrees(degrees){
	degrees = degrees || 10;
	stopTime = Math.floor(degrees * 50)
	setTimeout(function(){ThunderConnector.command('up');},0);
	setTimeout(function(){ThunderConnector.command('stop');},stopTime);
}

exports.fire = function fireloop(num){
	num = num || 1;
	for (i = 0; i < num; i++) { 
	    setTimeout(function(){ThunderConnector.command('fire');},1 * 4000 * i);
	}
}