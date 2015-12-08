var oldX = window.screenX;
var oldY = window.screenY;

var interval = setInterval(moveHandler,250);

function moveHandler(){
  if (oldX != window.screenX || oldY != window.screenY){
    console.log("Moving......");
    onUpdateInfo();
  }
}