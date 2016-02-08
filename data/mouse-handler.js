function addEvent(obj, evt, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(evt, fn, false);
    }
    else if (obj.attachEvent) {
        obj.attachEvent("on" + evt, fn);
    }
}

addEvent(document, "mouseout", function(e) {
    e = e ? e : window.event;
    var from = e.relatedTarget || e.toElement;
    if (!from || from.nodeName == "HTML") {
        // stop your drag event here
        // for now we can just use an alert
        mouseInside = false;
    } else {
      mouseInside = true;
    }
});

window.onmousemove = function(e){
  cursorX = e.clientX;
  cursorY = e.clientY;
};

var interval = setInterval(mouse_handler,200);

function mouse_handler(){
  if (mouseInside && isTrackingMouse){
    //location corresponding to the browser inner window
    var time = getTime();
    if (typeof(windowSize)=="undefined"){
        windowSize = getWindowSize();
    }
    var screenX = cursorX + windowSize.borderLeft + windowSize.outerX;
    var screenY = cursorY + windowSize.borderTop + windowSize.outerY;

    var msg = time + "\t" + screenX + "\t" + screenY + "\n";
    self.port.emit("mouseTracking",msg);
  }
}

