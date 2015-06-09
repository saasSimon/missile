ThunderConnector = require('thunder-connector');

var speed = 200

var keypress = require('keypress')
  , tty = require('tty');

var irobot = require('irobot');

var robot = new irobot.Robot('/dev/ttyO0');
robot.on('ready', function () {
  console.log('READY');
});
// make `process.stdin` begin emitting "keypress" events

ThunderConnector.connect();

function up(degrees){
        stopTime = Math.floor(degrees * 22.3);
        setTimeout(function(){ThunderConnector.command('up');},0);
        setTimeout(function(){ThunderConnector.command('stop');},stopTime);
}

function down(degrees){
        stopTime = Math.floor(degrees * 22.3);
        setTimeout(function(){ThunderConnector.command('down');},0);
        setTimeout(function(){ThunderConnector.command('stop');},stopTime);
}

function turnRightDegrees(degrees){
        stopTime = Math.floor(degrees * 22.3)
        setTimeout(function(){ThunderConnector.command('right');},0);
        setTimeout(function(){ThunderConnector.command('stop');},stopTime);
}

function turnLeftDegrees(degrees){
        stopTime = Math.floor(degrees * 22.3)
        setTimeout(function(){ThunderConnector.command('left');},0);
        setTimeout(function(){ThunderConnector.command('stop');},stopTime);
}

function fire(){
        setTimeout(function(){ThunderConnector.command('fire');},0);
}

function bigFireNum(num){
  for (i = 0; i < num + 1; i++) { 
  setTimeout(function(){robot.digital_outputs(1);},0);
  setTimeout(function(){robot.digital_outputs(0);},500);
  }
}

keypress(process.stdin);

// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
  console.log('got "keypress"', key);

  if (key.name == 'w'){
        console.log("move forward");
        data = {left: speed, right: speed};
        robot.drive(data);
  } else if (key.name == 'up'){
        console.log("accel");
        speed = speed * 1 + 20;
        console.log(speed);
        robot.drive(data);
  } else if (key.name == 'down'){
        speed = speed * 1 - 20;
  } else if (key.name == 's'){
        console.log("move reverse");
        data = {left: -speed, right: -speed};
        robot.drive(data);
  } else if (key.name == 'd'){
        console.log("moved right");
        data = {left: -speed, right: speed};
        robot.drive(data);
  } else if (key.name == 'a'){
        console.log("moved left");
        data = {left: speed, right: -speed};
        robot.drive(data);
  } else if ( key && key.name == 'a' && key.name == 'w'){
        console.log("moved left and forward");
        data = {left: speed * 1.25, right: speed};
        robot.drive(data);
  } else if (key.name == 'f'){
    console.log("fire burst");
    setTimeout(function(){robot.digital_outputs(1);},0);
    setTimeout(function(){robot.digital_outputs(0);},2000);
    //robot.digital_outputs(1);
  } else if (key.name == 'g'){
    console.log("fire one");
    bigFireNum(1);
  } else if (key.name == 'space'){
        console.log("stop");
        data = {left: 0, right: 0};
    robot.drive(data);
        //fire();
  }


  if (key && key.ctrl && key.name == 'c') {
    console.log('control c');
    process.exit(0);
   // process.stdin.pause();
  }
});

if (typeof process.stdin.setRawMode == 'function') {
  process.stdin.setRawMode(true);
} else {
  tty.setRawMode(true);
}
process.stdin.resume();
