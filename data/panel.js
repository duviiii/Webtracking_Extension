document.getElementById("overall").addEventListener("click", overallClick);
document.getElementById("data").addEventListener("click", dataClick);
document.getElementById("mouse").addEventListener("click", mouseClick);
//document.getElementById("format").addEventListener("click", formatClick);
document.getElementById("info").addEventListener("click", infoClick);

self.port.on("updateDirectory", function(dir){
  document.getElementById("dataDir").innerHTML = dir;
});

function dataClick(){
  var e = document.getElementById("data");
  var tmp = e.innerHTML;
  if(tmp == "Data Recording: on"){
    e.innerHTML = "Data Recording: off";
  } else {
    e.innerHTML = "Data Recording: on";
  }
  self.port.emit("dataRecord");
}

function mouseClick(){
  var e = document.getElementById("mouse");
  var tmp = e.innerHTML;
  if(tmp == "Mouse Recording: on"){
    e.innerHTML = "Mouse Recording: off";
  } else {
    e.innerHTML = "Mouse Recording: on";
  }
  self.port.emit("mouseRecord");
}
/*
function formatClick(){
  var e = document.getElementById("format");
  var tmp = e.innerHTML;
  if(tmp == "File format: xml"){
    e.innerHTML = "File format: txt";
  } else {
    e.innerHTML = "File format: xml";
  }
  self.port.emit("changeFormat");
}
*/

function overallClick(){
  var e = document.getElementById("overall");
  var tmp = e.innerHTML;
  if(tmp == "Turn off"){
    e.innerHTML = "Turn on";
    if(document.getElementById("data").innerHTML == "Data Recording: on"){
      dataClick();
    }
    if(document.getElementById("mouse").innerHTML == "Mouse Recording: on"){
      mouseClick();
    }
  } else {
    e.innerHTML = "Turn off";
    if(document.getElementById("data").innerHTML == "Data Recording: off"){
      dataClick();
    }
    if(document.getElementById("mouse").innerHTML == "Mouse Recording: off"){
      mouseClick();
    }
  }
}

function infoClick(){
  window.open("http://ducnq301.wix.com/web-tracking");
  self.port.emit("infoClick");
}
