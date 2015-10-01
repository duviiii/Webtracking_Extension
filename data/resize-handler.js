var delayedResize = debounce(resizeHandler, 250);
window.onresize = delayedResize;

function resizeHandler(){
  console.log("Resizing...");
  onUpdateInfo();
}
