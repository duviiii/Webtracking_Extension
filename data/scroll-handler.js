var delayedScroll = debounce(scrollHandler, 250);
window.onscroll = delayedScroll;

function scrollHandler(){
  console.log("Scrolling...");
  onUpdateInfo();
}
