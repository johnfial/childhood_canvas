
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




// COPIED from https://konvajs.org/docs/sandbox/Video_On_Canvas.html :
var width = window.innerWidth;
var height = window.innerHeight;

var stage = new Konva.Stage({
    container: 'konva_test',
    width: width,
    height: height,
});

var layer = new Konva.Layer();
stage.add(layer);

var video = document.createElement('video');
// video.src = 'https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c4/Physicsworks.ogv/Physicsworks.ogv.240p.vp9.webm';
video.src = 'C:\\-=Cloud=-\\Sync\\~SORT FOLDER~\\joao\\AreciboObservatoryMediaB-Rollwithcollapse.mkv';


var image = new Konva.Image({
    image: video,
    draggable: true,
    x: 50,
    y: 20,
});
layer.add(image);

var text = new Konva.Text({
    text: 'Loading video...',
    width: stage.width(),
    height: stage.height(),
    align: 'center',
    verticalAlign: 'middle',
});
layer.add(text);

layer.draw();

var anim = new Konva.Animation(function () {
    // do nothing, animation just need to update the layer
}, layer);

// update Konva.Image size when meta is loaded
video.addEventListener('loadedmetadata', function (e) {
    text.text('Press PLAY...');
    image.width(video.videoWidth);
    image.height(video.videoHeight);
    layer.draw();
});

document.getElementById('play').addEventListener('click', function () {
    text.destroy();
    video.play();
    anim.start();
});
document.getElementById('pause').addEventListener('click', function () {
    video.pause();
    anim.stop();
});