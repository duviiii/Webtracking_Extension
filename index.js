var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var self = require("sdk/self");
var pageWorker = require("sdk/page-worker");
var worker = null;

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
  worker.port.emit("updateInfo");
});

function runScript(tab){
  worker = tab.attach({
            contentScriptFile: [
              self.data.url("debounce.js"),
              self.data.url("update-info.js"),
              self.data.url("scroll-handler.js"),
              self.data.url("resize-handler.js")
              ]
  })
  worker.port.emit("updateInfo");
}

/*var { ToggleButton } = require("sdk/ui/button/toggle");
var self = require("sdk/self");
var data = self.data;
//var pageMod = require("sdk/page-mod");

//pageMod.PageMod({
//  include: "*.com",
//  contentScriptFile: data.url("page-load.js")
//});

var text_entry = require("sdk/panel").Panel({
  contentURL: data.url("text-entry.html"),
  contentScriptFile: data.url("get-text.js")
});

var button = ToggleButton({
  id: "my-button",
  label: "My button",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: function(){
    console.log("ok.");
    var worker = tabs.activeTab.attach({
      contentScriptFile: self.data.url("page-load.js")
    });
    worker.port.emit("drawBorder", "red");
  },
  badge: 0,
  badgeColor: "#00AAAA"
});

tabs.on("ready",runScript);

function runScript(tab){
  tab.attach({
    contentScriptFile: data.url("page-load.js")
  });
}

function handleChange(state){
  button.badge = state.badge + 1;
  button.checked = state.checked;
  if(state.checked){
    button.badgeColor = "#AA00AA";
  } else {
    button.badgeColor = "#00AAAA";
  }
  //text_entry.show();
}

function handleClick(state) {
  tabs.open("http://www.google.com/");
}

text_entry.on("show", function(){
  text_entry.port.emit("show");
});

text_entry.port.on('text-entered', function(text){
  console.log(text);
  text_entry.hide();
});
*/