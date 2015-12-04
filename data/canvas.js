//TODO: fix canvas drawing
var can = document.createElement('canvas');
can.setAttribute('id', 'myCanvas');
can.setAttribute('style', 'border:1px solid #d3d3d3;');
can.style.width = '100%';
can.style.height = '100%';
can.width = window.innerWidth;
can.height = window.innerHeight;
//document.body.appendChild(can);
document.body.insertBefore(can,document.body.firstChild);