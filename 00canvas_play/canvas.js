// NOTES ON SCREEN SIZES: 
// 360 x 640 very common, too small
// 1366 x 768 #2 most common or #1 most common another site
// 1920 x 1080 (ours) is the 2nd-3rd most common

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const width = 800;
const height = 800;



// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /
// / / / / / / / / / / / / / / DRAW :  / / / / / / / / / / / / / / / / / / /
// function draw_face(x, y) {
function draw_face(yChange) {

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
};
// draw_face(375, 375)
// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /



// / / / / / / / / / / FULLSCREEN : / / / / / / / / / / / / / / / / / / / / /
/* Get the documentElement (<html>) to display the page in fullscreen */
var elem = document.documentElement;
// https://www.w3schools.com/howto/howto_js_fullscreen.asp

// openFullscreen()

// https://www.w3schools.com/js/js_window.asp
console.log(window.screen)
// console.log(window.screen.width)
console.log(`Window size: ${window.innerWidth} * ${window.innerHeight}`)

// talkerscode.com/webtricks/disable-click-cut-copy-paste-using-jquery.php
//http://talkerscode.com/webtricks/enable-and-disable-keyboard-keys-using-javascript.php (demo at bottom)
// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /



// / / / / / / / / / / / / / KEYPRESS NOTES :  / / / / / / / / / / / / / / / / /
// REMEMBER: JS SEES THE *PHYSICAL* KEY, not the OS' keyboard layout pressed...
// from https://developer.mozilla.org/en-US/docs/Web/API/Document/keydown_event :
// disable windows key (locally) : https://silicophilic.com/disable-windows-key/

    // ESCAPE KEYS I NEED TO 'ESCAPE' TO LOCK:
        // 'MetaLeft' :     Windows Key (not possible)
        // 'ContextMenu' :  Right Menu Key (between RAlt and RControl)
        // 'F11' :          Fullsceen (exit)
        // 'F12' :          Brings up console
    // Annoying system shortcut keys to escape/disable, if possible:
        // Shortcut button - Media Shortcut
        // Shortcut button - File Explorer
        // Shortcut button - PrintScreen
        // Shortcut button - Calculator Shortcut (system)
    // KEYS THAT DON'T LOG:
        // 
        // 
// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /

function draw_circle(yChange) {    
    context.beginPath();
    context.arc(x, 250 + yChange, 25, 0, Math.PI);
    context.closePath();
    context.fillStyle = 'blue';
    context.fill();
    context.stroke();
};

document.addEventListener('keyup', logKey);
function logKey(event) {
    console.log(event.code);
    keyboard_logs.textContent += ` ${event.key}`;
    if (event.code === 'KeyC') {
        draw_face(50);
    };
    if (event.keyCode == 91) { // 91 is the ⊞ WINDOWS key
        // event.preventDefault(); // won't work
        console.log("Win Key was clicked");
    }
    if (event.code === 'Alt') {
        event.preventDefault();
        console.log("Alt Key was clicked");
    }
    // Here I'm attempting to make any digit (which are inconveniently 'string' of 'Digit3' or 'Numpad3'...) draw the same thing...
    // console.log(typeof(event.code))
    if (event.code === 'KeyA' ) {
        draw_circle(275);
    };
};
 

// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /
// / / / / / / / / / / / / / /  NOTES :  / / / / / / / / / / / / / / / / / /

// sketch sites:
// https://www.sketchize.com/
// https://app.diagrams.net/
// ask before leaving page: https://stackoverflow.com/questions/13566364/prompt-confirm-before-leaving-edited-html-form

// pete's tutorial: https://github.com/pjz987/guides/blob/master/docs/canvas-tutorial.md
// also see night sky generator: https://codepen.io/pjz987/pen/zYrwRMx

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

