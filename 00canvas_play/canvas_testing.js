
// var ctx = document.getElementById('canvas').getContext('2d');
// var offset = 0;

// function draw() {
// //   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   ctx.setLineDash([10, 20]);
//   ctx.setLineDash([100, 200])
//   ctx.lineDashOffset = -offset;
//   ctx.strokeRect(10, 10, 400, 400);
// }

// function march() {
//   offset++;
//   if (offset > 160) {
//     offset = 0;
//   }
//   draw();
//   setTimeout(march, 1);
// }

// march();


console.log('draw_image_test() START');

let canvas_main = document.getElementById('canvas_main');
let canvas = canvas_main.getContext('2d');

var img3 = new Image();
img3.src = 'test.svg';
// img3.width = '100';
// img3.height = '100';
img3.addEventListener('load', function() {
        canvas.drawImage(img3,0,0);
    }, false);
  // also try:
  // image.onload = function(){
  //     ctx.drawImage(this, 0,0);
  // }
  // img.x = "100"
  // img.y = "100"
console.log('draw_image_test() END');