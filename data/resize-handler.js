var delayedResize = debounce(resizeHandler, 500);
window.onresize = delayedResize;

function resizeHandler(){
  console.log("Resizing...");
  onUpdateInfo();
}
