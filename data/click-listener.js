document.addEventListener('click', function(e){
  //location corresponding to the browser inner window
  var cursorX = e.clientX;
  var cursorY = e.clientY;
  var element = e.target;
  if(isButton(element)|| containLink(element)){
    var rect = element.getBoundingClientRect();
    var msg1 = "\nClick location: X: " + cursorY + "-- Y: " + cursorY + "\n";
    console.log(msg1)
    onUpdateInfo();
  }
});