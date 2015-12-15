var delayedScroll = debounce(scrollHandler, 500);
window.onscroll = delayedScroll;

function scrollHandler(){
  console.log("Scrolling...");
  onUpdateInfo();
}
