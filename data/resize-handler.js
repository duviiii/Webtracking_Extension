var delayedResize = debounce(resizeHandler, 500);
window.onresize = delayedResize;

function resizeHandler(){
  var time = getTime();
  // Update browser window information
  windowSize = getWindowSize();
  console.log("Resizing...");
  onUpdateInfo(time);
}
