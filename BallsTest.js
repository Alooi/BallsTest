var canvas = document.querySelector('canvas');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var c = canvas.getContext('2d');

var mouse = {
  x: undefined,
  y: undefined
}

var numOfCircles = 500;
var maxRad = 40;
var rad = 5;
var circles = [];

window.addEventListener('mousemove', 
function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
  //console.log(mouse.x);
})

var colors = [
  '#FF5733',
  //'#ffffff',
  '#B13636',
  '#E1A72A',
  '#E12A2A',
  '#000000'
];

function Circle(x, y, xv, yv, rad){
  this.x = x;
  this.y = y;
  this.xv = xv;
  this.yv = yv;
  this.rad = rad;
  this.minRad = (Math.random() * 7) + 1;
  this.color = colors[Math.floor(Math.random() * colors.length)];

  this.draw = function(){
    c.beginPath();
    c.arc(this.x,this.y,this.rad,0,Math.PI*2,false);
    c.fillStyle = this.color;
    c.fill();
    //c.stroke();
  }


  this.update = function(){
    if (this.x + this.rad > innerWidth || this.x - this.rad < 0)
    {
      this.xv = -this.xv;
    }
    if (this.y + this.rad > innerHeight || this.y - this.rad < 0)
    {
      this.yv = -this.yv;
    }


    this.x += this.xv;
    this.y += this.yv;

    if (mouse.x - this.x < 50 && mouse.x - this.x > -50
      && mouse.y - this.y < 50 && mouse.y - this.y > -50)
    {
      if (this.rad < maxRad)
      {this.rad += 1;}  
      //console.log(mouse.x);
    }
    else if (this.rad >= this.minRad)
      {this.rad -= 1;}  
    

    this.draw();
  }

}




// var counter = 0;
// var a = 1.3;
// var max = 30.3;
// var flag = false;

for (var i = 0; i < numOfCircles; i++)
{
  var xv = Math.random() * 2;
  var yv = Math.random() * 2;
  var x = Math.random() * (innerWidth - 2*rad) + rad;
  var y = Math.random() * (innerHeight - 2*rad) + rad;
  circles.push(new Circle(x,y,xv,yv,rad));
}

function animate(){
  requestAnimationFrame(animate)
  c.clearRect(0,0,innerWidth, innerHeight);
  for (var i = 0; i < circles.length; i++)
  {
    circles[i].update();
  }
  }

animate();
