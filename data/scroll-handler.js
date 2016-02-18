var delayedScroll = debounce(scrollHandler, 500);
window.onscroll = delayedScroll;

function scrollHandler(){
  var time = getTime();
  console.log("Scrolling...");
  onUpdateInfo(time);
}
