function drawRect(canvas, x, y, width, height){
  canvas.rect(x, y, width, height);
}

function isImage(element){
  return (element.tagName == 'img');
}

function isText(element){
  return isText2(element);
}

function isText1(element){
  var reVal = false;
  if( !isButton(element) && 
      !containLink(element)){
    reVal = true;
  } else {
    reVal = false;
  }
  return reVal;
}

function isText2(element){
  var reVal = false;
  if (!hasDivChild(element)){
    var textContent = element.textContent;
    if(textContent.length != 0){
      var regex = new RegExp("^.*[.,:;'\"!?].*$");
      if(regex.test(textContent)){
        reVal = true;
      }
    }
  }
  return reVal;
}

function hasDivChild(element) {
  var reVal = false;
  if (element.hasChildNodes()){
    var childNodes = element.childNodes;
    var l = childNodes.length;
    for (var i=0; i<l; i++) {
      if(childNodes[i].nodeType == 1 &&
        childNodes[i].tagName.toLowerCase() == "div") {
        reVal = true;
        break;
      }
    }
  }
  return reVal;
}

function isButton(element){
  return isButton1(element);
}

function isButton1(element) {
  var reVal = false;
  if(element.tagName == 'button'){
    reVal = true;
  } else if(element.getAttribute('role') != null 
            && element.getAttribute('role') == 'button') {
    reVal = true;
  } else if(element.getAttribute('type') != null
            && element.getAttribute('type') == 'button') {
    reVal = true;
//  } else if(element.onclick != null) {
//    reVal = true;
  } else if(element.getAttribute('onclick') != null) {
    reVal = true;
  }
  return reVal;
}

function isButton2(element) {
  var reVal = false;
  var regex = new RegExp("^.*[Bb][Uu][Tt][Tt][Oo][Nn].*$");
  if(regex.test(element.tagName)){
      reVal = true;
  }
  return reVal;
}

function containLink(element) {
  return element.hasAttribute('href');
}

function isClickableImage(image) {
  var reVal = false;
  var parentNode = image.parentNode;
  if(containLink(parentNode)){
    reVal = true;
  }
  return reVal;
}

function isVisibleLink(link){
  var reVal = true;
  if(isEmpty(link.textContent) || hasInvisibleParent(link)){
    reVal = false;
  }
  return reVal;
}

function isEmpty(str) {
  return (!str || 0 === str.length);
}

function hasInvisibleParent(element){
  var reVal = false;
  while(element.parentNode){
    element = element.parentNode;
    if (!element.hasAttribute) {
      break;
    }
    if (
        (element.hasAttribute("style") && element.style.display == "none") ||
        (element.hasAttribute("style") && element.style.visibility == "hidden")){
      reVal = true;
      break;
    }
  }
  return reVal;
}