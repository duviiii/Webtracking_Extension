self.port.on("updateInfo", onUpdateInfo);

function onUpdateInfo(isClickEvent = false, clickInfo = null){
  var data = null;
  data = document.getElementsByTagName('*');
  var size = getWindowSize();
  //Update oldX and oldY for browser moving check
  oldX = size.outerX;
  oldY = size.outerY;
  
  var raw_buttons = getButtons(data);
  var raw_links = getLinks(data);
  var raw_images = getImages(data);
  var raw_texts = getTexts(data);

  var displayed_buttons = [];
  var displayed_links = [];
  var displayed_images = [];
  var displayed_texts = [];

  if (raw_buttons.length > 0){
    var buttons = removeDuplicate(raw_buttons);
    displayed_buttons = getDisplayedElements(raw_buttons, size);
  } else { var buttons = raw_buttons;}

  if (raw_links.length > 0) {
    var links = removeDuplicate(raw_links);
    displayed_links = getDisplayedElements(raw_links, size);
  } else { var links = raw_links;}

  if (raw_images.length > 0) {
    var images = removeDuplicate(raw_images);
    displayed_images = getDisplayedElements(raw_images, size);
  } else { var images = raw_images;}

  if (raw_texts.length > 0){
    var texts = removeDuplicate(raw_texts);
    displayed_texts = getDisplayedElements(raw_texts, size);
  } else { var texts = raw_texts;}
  //var buttons = getButtons(data);
  //var links = getLinks(data);

  console.log("------------------------------------------------------");
  console.log("Current Url domain: " + window.location.origin);
  console.log("Browser scrolling location: " + size.scrollX + "x" + size.scrollY);
  console.log("Inner browser window size: " + size.innerWidth + "x" + size.innerHeight);
  console.log("Window resolution: " + screen.width + "x" + screen.height);
  console.log("Window available area resolution: " + screen.availWidth + "x" + screen.availHeight);
  console.log("Try out: " + document.body.clientWidth + "x" + document.body.clientHeight);
  console.log("Window inner coordination: " + size.innerX + "x" + size.innerY);
  console.log("Window location on screen: " + size.outerX + "x" + size.outerY);
  console.log("Browser border: left: " + size.borderLeft + " & top: " + size.borderTop);
  console.log("Window is being maximized: " + size.isMaximized);

  //var tmp = buttons[0].getBoundingClientRect();
  //console.log("test: " + isDuplicatedElements(buttons[0],buttons[0]));

  //Send data back to local extention
  var time = getTime();
  var screenData = [];
  if(isClickEvent){
    var tmpMsg = time + "\t" + clickInfo.side + "\tclick\t\t\t\t\t\t\t\t\t" + clickInfo.x + "\t" + clickInfo.y + "\n";
    screenData.push(tmpMsg);
  }
  for (var i=0; i<displayed_buttons.length; i++){
    screenData.push(elementToString(time, size, displayed_buttons[i], "button", true, true));
  }
  for (var j=0; j<displayed_links.length; j++){
    screenData.push(elementToString(time, size, displayed_links[j], "link", true, isVisibleLink(displayed_links[j])));
  }
  for (var k=0; k<displayed_images.length; k++){
    screenData.push(elementToString(time, size, displayed_images[k], "image", isClickableImage(displayed_images[k]), true));
  }
  for (var l=0; l<displayed_texts.length; l++){
    screenData.push(elementToString(time, size, displayed_texts[l], "text", false, true));
  }

  self.port.emit("dataRecorded", screenData);
}

function getDisplayedElements(elements, displayArea){
  var reVal = [];
  for (var i=0; i<elements.length; i++){
    var rect = elements[i].getBoundingClientRect();
    if(rect.width == 0 || rect.height == 0) {
      continue;
    }
    if( rect.top > displayArea.scrollY + displayArea.innerHeight 
        || rect.left > displayArea.scrollX + displayArea.innerWidth
        || rect.bottom < displayArea.scrollX
        || rect.right < displayArea.scrollY){
      continue;
    }
    reVal.push(elements[i]);
  }
  return reVal;
}

function getWindowSize(){
  var currentSize = { innerX: 0, innerY: 0,
                      innerWidth: 0, innerHeight: 0,
                      outerX: 0, outerY: 0,
                      outerWidth: 0, outerHeight: 0,
                      scrollX: 0, scrollY: 0,
                      borderTop: 0, borderBottom: 0, borderLeft: 0, borderRight: 0,
                      isMaximized: false};
  
  if (typeof window.innerWidth != "undefined"){
    currentSize.innerWidth = window.innerWidth,
    currentSize.innerHeight = window.innerHeight
  }
  
  currentSize.outerWidth = window.outerWidth;
  currentSize.outerHeight = window.outerHeight;
  currentSize.scrollX = window.pageXOffset;
  currentSize.scrollY = window.pageYOffset;
  currentSize.outerX = window.screenX;
  currentSize.outerY = window.screenY;
  
  //TODO: Fix zooming error
  var screenAvailHeight = window.screen.availHeight;
  var screenAvailWidth = window.screen.availWidth;

  if( currentSize.outerWidth >= screenAvailWidth &&
      currentSize.outerHeight >= screenAvailHeight){
    currentSize.isMaximized = true;
    currentSize.borderBottom = 0;
    currentSize.borderLeft = 0;
    currentSize.borderRight = 0;
    currentSize.borderTop = screenAvailHeight - currentSize.innerHeight;
    currentSize.outerX = 0;
    currentSize.outerY = 0;
  } else {
    currentSize.isMaximized = false;
    currentSize.borderBottom = 5;
    currentSize.borderLeft = 5;
    currentSize.borderRight = 5;
    currentSize.borderTop = currentSize.outerHeight - currentSize.innerHeight - currentSize.borderBottom;
  }

  currentSize.innerX = currentSize.outerX + currentSize.borderLeft;
  currentSize.innerY = currentSize.outerY + currentSize.borderTop;

  return currentSize;
}

function getButtons(data){
  var reVal = [];
  for (var i=0; i<data.length; i++){
    if(isButton(data[i])){
      reVal.push(data[i]);
    }
  }
  return reVal;
}

function getLinks(data){
  var reVal = [];
  for (var i=0; i<data.length; i++){
    if(containLink(data[i])){
      reVal.push(data[i]);
    }
  }
  return reVal;
}

function getImages(data){
  return document.getElementsByTagName("img");
}

function getTexts(data){
  var reVal = [];
  for (var i=0; i<data.length; i++){
    if(isText(data[i])) {
      reVal.push(data[i]);
    }
  }
  return reVal;
}