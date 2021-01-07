
var ctx = document.getElementById('canvas').getContext('2d');
var offset = 0;

function draw() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.setLineDash([10, 20]);
  ctx.setLineDash([100, 200])
  ctx.lineDashOffset = -offset;
  ctx.strokeRect(10, 10, 400, 400);
}

function march() {
  offset++;
  if (offset > 160) {
    offset = 0;
  }
  draw();
  setTimeout(march, 1);
}

march();