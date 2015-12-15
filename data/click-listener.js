document.addEventListener('click', function(e){
  //location corresponding to the browser inner window
  var cursorX = e.clientX;
  var cursorY = e.clientY;
  var element = e.target;
  if(isButton(element)|| containLink(element)){
    var rect = element.getBoundingClientRect();
    var msg1 = "\nClick location: X: " + cursorY + "-- Y: " + cursorY + "\n";
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

    var clickInfo = {x: cursorX, y: cursorY, side: clickSide};

    onUpdateInfo(true, clickInfo);
  }
});