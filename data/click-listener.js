document.addEventListener('click', function(e){
  //location corresponding to the browser inner window
  var element = e.target;
  var screenX = cursorX + windowSize.borderLeft + windowSize.outerX;
  var screenY = cursorY + windowSize.borderTop + windowSize.outerY;
  var time = getTime();
  
  if(isButton(element)|| containLink(element)){
    var rect = element.getBoundingClientRect();
    var msg1 = "\nClick location: X: " + screenX + "-- Y: " + screenY + "\n";
    console.log(msg1);
    var clickSide = "";
    switch(e.which){
      case 1:
        clickSide = "Left";
        break;
      case 2:
        clickSide = "Middle";
        break;
      case 3:
        clickSide = "Right";
        break;
      default:
        clickSide = "Alien mouse";
        break;
    }

    var clickInfo = {x: screenX, y: screenY, side: clickSide};

    onUpdateInfo(true, clickInfo, time);
  }
});