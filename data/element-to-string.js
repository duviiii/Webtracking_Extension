function elementToString(timestamp, browser, element, type, clickable){
  var reStr = "";
  var rect = element.getBoundingClientRect();

  var width = rect.width;
  var height = rect.height;
  var viewpointX = rect.left;
  var viewpointY = rect.top;
  var browserX = (viewpointX <= 0) ? 0 : viewpointX;
  var browserY = (viewpointY <= 0) ? 0 : viewpointY;
  var documentX = viewpointX + browser.scrollX;
  var documentY = viewpointY + browser.scrollY;
  var isVisible = true;
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

  var screenX = browserX + browser.borderLeft + browser.outerX;
  var screenY = browserY + browser.borderTop + browser.outerY;

  if (typeof(timestamp) !== 'undefined') {
    reStr = timestamp;
  } else {
    reStr = "N\\A";
  }

  reStr += "\t" + elementID;

  if (typeof(type) !== 'undefined') {
    reStr += "\t" + type;
  } else {
    reStr += "\tN\\A";
  }

  if (typeof(clickable) !== 'undefined') {
    reStr += "\t" + clickable;
  } else {
    reStr += "\t0";
  }


  //TODO add check visible
  reStr += "\t" + isVisible;

  reStr +=  "\t" + Math.floor(width) + 
            "\t" + Math.floor(height) +
            "\t" + Math.floor(documentX) + 
            "\t" + Math.floor(documentY) +
            "\t" + Math.floor(browserX) +
            "\t" + Math.floor(browserY) +
            "\t" + Math.floor(screenX) +
            "\t" + Math.floor(screenY);
  reStr += "\n";

  return reStr ;
}
