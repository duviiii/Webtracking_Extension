document.getElementById("data").addEventListener("click", dataClick);
document.getElementById("mouse").addEventListener("click", mouseClick);
document.getElementById("info").addEventListener("click", infoClick);

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

function infoClick(){
  window.open("http://ducnq301.wix.com/web-tracking");
  self.port.emit("infoClick");
}
