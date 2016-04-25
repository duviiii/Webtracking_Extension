function addZero(x,n) {
    while (x.toString().length < n) {
        x = "0" + x;
    }
    return x;
}

function getTime(){
  var d = new Date();
  var mon = addZero(d.getMonth()+1,2);
  console.log(m);
  var date = addZero(d.getDate(),2);
  var h = addZero(d.getHours(), 2);
  var m = addZero(d.getMinutes(), 2);
  var s = addZero(d.getSeconds(), 2);
  var ms = addZero(d.getMilliseconds(), 3);
  var str = d.getFullYear() + "-" + mon + "-" + date + " " + 
            h + ":" + m + ":" + s + "." + ms;
  return str;
}