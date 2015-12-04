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

  reStr +=  "\t" + Math.round(width) + 
            "\t" + Math.round(height) +
            "\t" + Math.round(documentX) + 
            "\t" + Math.round(documentY) +
            "\t" + Math.round(browserX) +
            "\t" + Math.round(browserY) +
            "\t" + Math.round(screenX) +
            "\t" + Math.round(screenY);
  reStr += "\n";

  return reStr ;
}
