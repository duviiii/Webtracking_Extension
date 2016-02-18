var oldX = window.screenX;
var oldY = window.screenY;

var interval = setInterval(moveHandler,500);

function moveHandler(){
  var time = getTime();
  // Update browser window information
  windowSize = getWindowSize();
  if (oldX != window.screenX || oldY != window.screenY){
    console.log("Moving......");
    onUpdateInfo(time);
  }
  oldX = window.screenX;
  oldY = window.screenY;
}