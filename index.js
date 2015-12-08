var {Cc, Ci} = require("chrome");
var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var self = require("sdk/self");
var pageWorker = require("sdk/page-worker");
var worker = tabs.activeTab.attach({
              contentScript:  "self.port.on('initialization', function(){" +
                              " console.log('initialization')" +
                              "});"
            });


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

tabs.on('ready', runScript);
tabs.on('activate', function(){
  if(worker){
    worker.port.emit("updateInfo");
  }
});

function runScript(tab){
  worker = tabs.activeTab.attach({
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
              self.data.url("get-time.js")
              ]
  });

  worker.port.emit("updateInfo");
  worker.port.on("dataRecorded", printData); 
  worker.port.on("userAction", function(msg){
    foStream.write(msg, msg.length);
  });
}

function printData(screenData){
  var file_path = "E:\\Record data\\record_data.txt";
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
  foStream.init(file, 0x02 | 0x08 | 0x20, 0666, 0);
  
  for (var i=0; i<screenData.length; i++){
    foStream.write(screenData[i], screenData[i].length);
  }

  foStream.close();
}