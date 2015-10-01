self.port.on("updateInfo", onUpdateInfo);

function onUpdateInfo(){
  var data = document.getElementsByTagName('*');
  var size = getCurrentWindowSize();
  var buttons = getButtons(data);
  var links = getLinks(data);
  console.log("Browser window size: " + size.width + "x" + size.height);
  console.log("number of buttons: " + buttons.length);
  console.log("number of links: " + links.length);
}

function getCurrentWindowSize(){
  var viewportWidth;
  var viewportHeight;

  if (typeof window.innerWidth != "undefined"){
    viewportWidth = window.innerWidth,
    viewportHeight = window.innerHeight
  } else if (typeof document.documentElement != "undefined"
          && typeof document.documentElement.clientWidth != "undefined"
          && typeof document.documentElement.clientWidth != 0){
    viewportWidth = document.documentElement.clientWidth,
    viewportHeight = document.documentElement.clientHeight
  } else {
    viewportWidth = document.getElementsByTagName('body')[0].clientWidth,
    viewportHeight = document.getElementsByTagName('body')[0].clientHeight
  }

  var currentSize = {width: viewportWidth, height: viewportHeight};
  return currentSize;
}

function getButtons(data){
  var reVal = [];
  var regex = new RegExp("^.*[Bb][Uu][Tt][Tt][Oo][Nn].*$");
  for (var i=0; i<data.length; i++){
    if(regex.test(data[i].tagName)){
      reVal.push(data[i]);
    }
  }
  return reVal;
}

function getLinks(data){
  var reVal = [];
  var data = document.getElementsByTagName('*');
  for (var i=0; i<data.length; i++){
    if(data[i].hasAttribute('href')){
      reVal.push(data[i]);
    }
  }
  return reVal;
}