var delayedScroll = debounce(scrollHandler, 500);
// Use document.onscroll to fix an error with Facebook
document.onscroll = delayedScroll;

function scrollHandler(){
  var time = getTime();
  console.log("Scrolling...");
  onUpdateInfo(time);
}
