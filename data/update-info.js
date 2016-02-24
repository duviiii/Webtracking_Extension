var isTrackingData = true;
var isTrackingMouse = true;
var inXML = true;
var cursorX = 0;
var cursorY = 0;
var mouseInside = false;
var windowSize = getWindowSize();
var raw_buttons = null;
var raw_links = null;
var raw_images = null;
var raw_texts = null;

self.port.on("reloadContent", onReloadContent);
self.port.on("updateInfo",function() {
  var time = getTime();
  onUpdateInfo(time);
});

self.port.on("dataRecord",function(){
  isTrackingData = !isTrackingData;
});

self.port.on("mouseRecord",function(){
  isTrackingMouse = !isTrackingMouse;
});

self.port.on("changeFormat",function(){
  inXML = !inXML;
});

self.port.on("updateSetting",function(msg){
  if(msg == "truetrue"){
    isTrackingData = true;
    isTrackingMouse = true;
  } else if(msg == "truefalse") {
    isTrackingData = true;
    isTrackingMouse = false;
  } else if(msg == "falsetrue") {
    isTrackingData = false;
    isTrackingMouse = true;
  } else if(msg == "falsefalse"){
    isTrackingData = false;
    isTrackingMouse = false;
  }
});

self.port.on("updateFormatSetting",function(msg){
  if(msg=="true"){
    inXML = true;
  } else {
    inXML = false;
  }
});

function onReloadContent(){
  console.log("reload content eh?")
  // Load all webpage element
  var data = document.getElementsByTagName('*');
  raw_buttons = getButtons(data);
  raw_links = getLinks(data);
  raw_images = getImages(data);
  raw_texts = getTexts(data);
}

function onUpdateInfo(time, isClickEvent = false, clickInfo = null){
  // Update setting
  self.port.emit("getSetting");

  // Check is tracking data
  if(!isTrackingData) return;

  //Update oldX and oldY for browser moving check
  oldX = window.screenX;
  oldY = window.screenY;

  var displayed_buttons = [];
  var displayed_links = [];
  var displayed_images = [];
  var displayed_texts = [];

  if (raw_buttons != null && raw_buttons.length > 0){
    var buttons = removeDuplicate(raw_buttons);
    displayed_buttons = getDisplayedElements(raw_buttons, windowSize);
  } else { var buttons = raw_buttons;}

  if (raw_links != null && raw_links.length > 0) {
    var links = removeDuplicate(raw_links);
    displayed_links = getDisplayedElements(raw_links, windowSize);
  } else { var links = raw_links;}

  if (raw_images != null && raw_images.length > 0) {
    var images = removeDuplicate(raw_images);
    displayed_images = getDisplayedElements(raw_images, windowSize);
  } else { var images = raw_images;}

  if (raw_images != null && raw_texts.length > 0){
    var texts = removeDuplicate(raw_texts);
    displayed_texts = getDisplayedElements(raw_texts, windowSize);
  } else { var texts = raw_texts;}
  //var buttons = getButtons(data);
  //var links = getLinks(data);

  console.log("------------------------------------------------------");
  console.log("Current Url domain: " + window.location.origin);
  console.log("Browser scrolling location: " + windowSize.scrollX + "x" + windowSize.scrollY);
  console.log("Inner browser window size: " + windowSize.innerWidth + "x" + windowSize.innerHeight);
  console.log("Window location on screen: " + windowSize.outerX + "x" + windowSize.outerY);
  console.log("Browser border: left: " + windowSize.borderLeft + " & top: " + windowSize.borderTop);
  console.log("Window is being maximized: " + windowSize.isMaximized);
  

  //var tmp = buttons[0].getBoundingClientRect();
  //console.log("test: " + isDuplicatedElements(buttons[0],buttons[0]));

  var screenData = [];

  if(inXML){
    screenData.push("<recordData\tid=\"" + time + "\">\n");

    if(isClickEvent){
      screenData.push("<event\t" + "time=\""+time + "\"" + "\t" +
        "side=\"" + clickInfo.side + "\"" + "\t" + 
        "type=\"click\"" + "\t" + 
        "x=\"" + clickInfo.x + "\"" + "\t" + 
        "y=\"" + clickInfo.y + "\"" + "></event>\n");
    }
    var dl = displayed_buttons.length;
    for (var i=0; i<dl; i++){
      screenData.push(elementToXML(time, windowSize, displayed_buttons[i], "button", true, true));
    }
    dl = displayed_links.length;
    for (var j=0; j<dl; j++){
      screenData.push(elementToXML(time, windowSize, displayed_links[j], "link", true, isVisibleLink(displayed_links[j])));
    }
    dl = displayed_images.length;
    for (var k=0; k<dl; k++){
      screenData.push(elementToXML(time, windowSize, displayed_images[k], "image", isClickableImage(displayed_images[k]), true));
    }
    dl = displayed_texts.length;
    for (var l=0; l<dl; l++){
      screenData.push(elementToXML(time, windowSize, displayed_texts[l], "text", false, true));
    }

    screenData.push("</recordData>\n");
  } else {
    if(isClickEvent){
      screenData.push(time + "\t" + clickInfo.side + 
        "\tclick\t\t\t\t\t\t\t\t\t" + clickInfo.x + 
        "\t" + clickInfo.y + "\n");
    }
    var dl = displayed_buttons.length;
    for (var i=0; i<dl; i++){
      screenData.push(elementToString(time, windowSize, displayed_buttons[i], "button", true, true));
    }
    dl = displayed_links.length;
    for (var j=0; j<dl; j++){
      screenData.push(elementToString(time, windowSize, displayed_links[j], "link", true, isVisibleLink(displayed_links[j])));
    }
    dl = displayed_images.length;
    for (var k=0; k<dl; k++){
      screenData.push(elementToString(time, windowSize, displayed_images[k], "image", isClickableImage(displayed_images[k]), true));
    }
    dl = displayed_texts.length;
    for (var l=0; l<dl; l++){
      screenData.push(elementToString(time, windowSize, displayed_texts[l], "text", false, true));
    }
  }

  self.port.emit("dataRecorded", screenData);
}

function getDisplayedElements(elements, displayArea){
  var reVal = [];
  var l = elements.length;
  for (var i=0; i<l; i++){
    var rect = elements[i].getBoundingClientRect();
    if(rect.width == 0 || rect.height == 0) {
      continue;
    }
    if( rect.top > displayArea.innerHeight 
        || rect.left > displayArea.innerWidth
        || rect.bottom < 0 - rect.height
        || rect.right < 0 - rect.width){
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
  var l = data.length;
  for (var i=0; i<l; i++){
    if(isButton(data[i])){
      reVal.push(data[i]);
    }
  }
  return reVal;
}

function getLinks(data){
  var reVal = [];
  var l = data.length;
  for (var i=0; i<l; i++){
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
  var l = data.length;
  for (var i=0; i<l; i++){
    if(isText(data[i])) {
      reVal.push(data[i]);
    }
  }
  return reVal;
}