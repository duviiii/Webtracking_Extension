var textArea = document.getElementById("edit-box");

textArea.addEventListener('keyup', function onkeyup(event){
  if(event.keyCode == 13){
    text = textArea.value.replace(/(\r\n|\n|\r)/gm,"");
    self.port.emit("text-entered",text);
    textArea.value = '';
  }
});

self.port.on("show", function onShow(){
  textArea.focus();
});