document.addEventListener('click', function(e){
  //location corresponding to the browser inner window
  var cursorX = e.clientX;
  var cursorY = e.clientY;
  var element = e.target;
  if(isButton(element)|| containLink(element)){
    var rect = element.getBoundingClientRect();
    var msg1 = "Click location: X: " + cursorY + "-- Y: " + cursorY + "\n";
    var msg2 = "Clicked element rectangle: left: " + rect.left + " top: " + rect.top 
                + " width: " + rect.width + " height: " + rect.height + "\n";
    self.port.emit("userAction", msg1 + msg2);
    onUpdateInfo();
  }
});