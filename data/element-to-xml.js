function elementToXML(timestamp, browser, element, type, clickable, isVisible){
  var reStr = "<element";
  var rect = element.getBoundingClientRect();

  var width = rect.width;
  var height = rect.height;
  var viewpointX = rect.left;
  var viewpointY = rect.top;
  var browserX = (viewpointX <= 0) ? 0 : viewpointX;
  var browserY = (viewpointY <= 0) ? 0 : viewpointY;
  var documentX = viewpointX + browser.scrollX;
  var documentY = viewpointY + browser.scrollY;

  var elementID = type + 
                  Math.floor(documentX) + Math.floor(documentY) + 
                  Math.floor(width) + Math.floor(height);

  if (viewpointX <= 0) {
    width = width + viewpointX;
    browserX = 0;
  } 
  if (viewpointY <= 0){
    height = height + viewpointY;
    browserY = 0;
  }
  if ((width + viewpointX) >= (browser.scrollX + browser.innerWidth)){
    width = width + viewpointX - browser.scrollX - browser.innerWidth;
  }
  if ((height + viewpointY) >= (browser.scrollY + browser.innerHeight)){
    height = height + viewpointY - browser.scrollY - browser.innerHeight;
  }

  var screenX = browserX + browser.borderLeft + browser.outerX;
  var screenY = browserY + browser.borderTop + browser.outerY;

  reStr += "\tid=\"" + elementID + "\"";
  reStr += "\ttype=\"" + type + "\"";
  reStr += "\tclickable=\"" + clickable + "\"";
  reStr += "\tvisible=\"" + isVisible + "\"";

  reStr +=  "\twidth=\"" + Math.floor(width) + "\"" + 
            "\theight=\"" + Math.floor(height) + "\"" +
            "\tdocumentX=\"" + Math.floor(documentX) + "\"" + 
            "\tdocumentY=\"" + Math.floor(documentY) + "\"" +
            "\tbrowserX=\"" + Math.floor(browserX) + "\"" +
            "\tbrowserY=\"" + Math.floor(browserY) + "\"" +
            "\tscreenX=\"" + Math.floor(screenX) + "\"" +
            "\tscreenY=\"" + Math.floor(screenY) + "\"" ;
  
  reStr += "></element>\n";

  return reStr ;
}
