// pete's tutorial: https://github.com/pjz987/guides/blob/master/docs/canvas-tutorial.md
// also see night sky generator: https://codepen.io/pjz987/pen/zYrwRMx

const canvas = document.getElementById('canvas_js');
const ctx = canvas.getContext('2d');
// const ctx = canvas.getContext('2d');
const width = 500;
const height = 500;

// // rect x: 250, y: 200, w: 250, h: 350 lineWidth: 2
// context.rect(250, 200, 250, 350);
// context.lineWidth = 20;
// context.stroke();
// context.fillStyle = 'green';
// context.fill();

// // tri (175, 525), (375, 225), (575, 525)
// context.beginPath(); // remember this!
// context.moveTo(175, 525); // picking up a pencil and setting it down, good way to not combine shapes
// context.lineTo(375, 225);
// context.lineTo(575, 525);
// context.closePath(); // quick shortcut
// context.fillStyle = 'yellow';
// context.fill();
// context.stroke();

function draw_face(yChange) {
// function draw_face(x, y) {

    context.clearRect(0, 0 + yChange, width, height);

    // circle x: 375, y: 375, r: 300, start: 0, end: 2π
    context.beginPath();
    context.arc(375, 375 + yChange, 300, 0, 2*Math.PI, true); // arc takes the center of the circle
    context.fillStyle = 'yellow';
    context.fill();
    context.lineWidth = 15;
    context.stroke();
    context.closePath();
    
    // ellipse x: 375, y; 450, xr: 225, yr: 85, start: 0, end: 2π
    context.beginPath();
    context.ellipse(375, 450 + yChange, 225, 85, 0, 0, 2*Math.PI);
    context.fillStyle = 'red';
    context.lineWidth = 5;
    context.fill();
    context.stroke();
    
    // eyes x: [275, 475], y: 250, r: 50, start: 0, end: π
    // pupils x: [275, 475], y: 250, r: 25, start: 0, end: π
    
    function drawEyes(x) {
        //outer eye
        context.beginPath();
        context.arc(x, 250 + yChange, 50, 0, Math.PI);
        context.closePath();
        context.fillStyle = 'white';
        context.fill();
        context.stroke();
    
        // pupil
        context.beginPath();
        context.arc(x, 250 + yChange, 25, 0, Math.PI);
        context.closePath();
        context.fillStyle = 'blue';
        context.fill();
        context.stroke();
    };
    
    drawEyes(275);
    drawEyes(475);
    yChange--
    // x++;
    // y++;
    // window.requestAnimationFrame(() => draw_face(x, y));
    
    window.requestAnimationFrame(() => draw_face(yChange));
}

// draw_face(375, 375)
draw_face(50)