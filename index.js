var {Cc, Ci} = require("chrome");
var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var self = require("sdk/self");
var pageWorker = require("sdk/page-worker");
//Initializing worker
var worker = tabs.activeTab.attach({
              contentScript:  "self.port.on('initialization', function(){" +
                              " console.log('initialization')" +
                              "});"
            });
var { ToggleButton } = require("sdk/ui/button/toggle");
var panels = require("sdk/panel");

var inXML = true;
var isTrackingData = true;
var isTrackingMouse = true;
// Returns 
// "WINNT" on Windows 
// "Linux" on GNU/Linux 
// "Darwin" on Mac OS X.  
const osString = Cc['@mozilla.org/xre/app-info;1'].getService(Ci.nsIXULRuntime).OS;
var dataDir = "";
// TODO: Not tested on Linux and MacOS
if (osString == "Darwin"){
  dataDir = "~\\Eye Tracking\\Record data";
} else if (osString == "Linux") {
  dataDir = "~\\Eye Tracking\\Record data";
} else {
  dataDir = "C:\\Eye Tracking\\Record data";
}

// Initialize option button
var button = ToggleButton({
  id: "option-button",
  label: "option",
  icon:"./eye-tracking.ico",
  onChange: handleToggle
});

// Initialize option menu panel
var panel = panels.Panel({
  contentURL: self.data.url("panel.html"),
  contentScriptFile: self.data.url("panel.js"),
  onHide: handleHide
});

// NOTE: currently not available
panel.port.emit("updateDirectory", dataDir);

// change data recording setting
panel.port.on("dataRecord",function(){
  isTrackingData = !isTrackingData;
  worker.port.emit("dataRecord");
});

// change mouse recording setting
panel.port.on("mouseRecord",function(){
  isTrackingMouse = !isTrackingMouse;
  worker.port.emit("mouseRecord");
});

// NOTE: currently not available
panel.port.on("changeFormat", function(){
  inXML = !inXML;
  worker.port.emit("changeFormat");
});

panel.port.on("infoClick",function(){
  button.state('window', {checked: false});
});


function handleToggle(state){
  if(state.checked){
    panel.show({
      position: button
    });
  }
}

function handleHide(){
  button.state('window', {checked: false});
}

/*
var button = buttons.ActionButton({
  id: "style-tab",
  label: "Style Tab",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: function(){
    worker.port.emit("updateInfo");
  }
});
*/

tabs.on('ready', runScript);
tabs.on('select', function(){
  worker.port.emit("reloadContent");
  tabs.activeTab.attach({
    contentScript:  "window.scrollBy(0,1);window.scrollBy(0,-1);"
  });
  worker.port.emit("updateSetting", isTrackingData+""+isTrackingMouse);
  worker.port.emit("updateFormatSetting", inXML+"");
});

tabs.on('deactivate', function(){
  worker = tabs.activeTab.attach({
    contentScript:  "window.scrollBy(0,1);window.scrollBy(0,-1);"
  });
});

function runScript(tab){
  worker = tab.attach({
            contentScriptFile: [
              self.data.url("common.js"),
              self.data.url("debounce.js"),
              self.data.url("check-duplicate.js"),
              self.data.url("update-info.js"),
              self.data.url("scroll-handler.js"),
              self.data.url("resize-handler.js"),
              self.data.url("move-handler.js"),
              self.data.url("click-listener.js"),
              self.data.url("element-to-string.js"),
              self.data.url("element-to-xml.js"),
              self.data.url("get-time.js"),
              self.data.url("mouse-handler.js")
              ]
  });
  
  tabs.activeTab.attach({
              contentScript:  "window.scrollBy(0,1);window.scrollBy(0,-1);"
            });
  
  worker.port.emit("updateSetting", isTrackingData+""+isTrackingMouse);
  worker.port.emit("updateFormatSetting", inXML+"");
  worker.port.emit("reloadContent");
  worker.port.on("dataRecorded", printWebpageData);
  worker.port.on("mouseTracking", printMouseData);
}

function printWebpageData(screenData){
  if(!isTrackingData) return;
  if(inXML){
    var file_path = dataDir + "\\record_data.xml";
    var file_path2 = dataDir + "\\record_data_extended.xml";
  } else {
    var file_path = dataDir + "\\record_data.txt";
    var file_path2 = dataDir + "\\record_data_extended.txt";
  }

  var file = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
  var file2 = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);

  file.initWithPath(file_path);
  file2.initWithPath(file_path2);

  if (file.exists() == false)
  {
    file.create(Ci.nsIFile.NORMAL_FILE_TYPE, 420);
  }

  if (file2.exists() == false)
  {
    file2.create(Ci.nsIFile.NORMAL_FILE_TYPE, 420);
  }

  var foStream = Cc["@mozilla.org/network/file-output-stream;1"].createInstance(Ci.nsIFileOutputStream);
  var foStream2 = Cc["@mozilla.org/network/file-output-stream;1"].createInstance(Ci.nsIFileOutputStream);

  // 0x02 | 0x10  to open file for appending
  // 0x02 | 0x08 | 0x20 to rewrite file
  //foStream.init(file, 0x02 | 0x10, 0666, 0);
  foStream.init(file, 0x02 | 0x08 | 0x20, 0666, 0);
  foStream2.init(file2, 0x02 | 0x10, 0666, 0);
  
  var l = screenData.length;

  for (var i=0; i<l; i++){
    foStream.write(screenData[i], screenData[i].length);
    foStream2.write(screenData[i], screenData[i].length);
  }

  foStream.close();
  foStream2.close();
}

function printMouseData(msg){
  if(!isTrackingMouse) return;
  var file_path = dataDir + "\\mouse_data.txt";
  var file = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
  file.initWithPath(file_path);

  if (file.exists() == false)
  {
    file.create(Ci.nsIFile.NORMAL_FILE_TYPE, 420);
  }

  var foStream = Cc["@mozilla.org/network/file-output-stream;1"].createInstance(Ci.nsIFileOutputStream);
  // 0x02 | 0x10  to open file for appending
  // 0x02 | 0x08 | 0x20 to rewrite file
  //foStream.init(file, 0x02 | 0x10, 0666, 0);
  foStream.init(file, 0x02 | 0x10, 0666, 0);
  foStream.write(msg, msg.length);

  foStream.close();
}