var cursorX = 0;
var cursorY = 0;
var mouseInside = false;

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
        console.log("mouse out");
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
    var size = getWindowSize();
    var screenX = cursorX + size.borderLeft + size.outerX;
    var screenY = cursorY + size.borderTop + size.outerY;

    var msg = time + "\t" + screenX + "\t" + screenY + "\n";
    self.port.emit("mouseTracking",msg);
  }
}

