
// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / 
// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / 
// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / 

// tutorials used: 
    // https://dev.to/reiallenramos/drawing-in-vue-using-mousemove-event-34cg

new Vue({
    el: '#vue_app',
    data: {
        vueCanvas: null,
        is_drawing: false,
        key_lookups: {            
        },
        example_array: [],
        example_string: "",
        example_integer: 1,
        example_boolean: false,
    },
    methods: {
        log_this: function() {
            console.log(`logging log_this`)            
        },        
        draw_circle_random: function(input_x, input_y) {    
            let canvas = this.vueCanvas
            console.log('draw_circle_random() function.')

            var random_number = Math.random()
            let random_x = Math.floor(random_number * Math.floor(input_x))
            let random_y = Math.floor(random_number * Math.floor(input_y))

            console.log(`draw_circle_random() function with random_x : ${random_x} & random_y : ${random_y}.`)

            canvas.beginPath()
            canvas.arc(random_x, random_y, 50, 0, 2*Math.PI)
            // https://www.w3schools.com/tags/canvas_arc.asp
            // context.arc() syntax:    context.arc(     x,     y,     r,     sAngle,     eAngle,     counterclockwise);
            canvas.fillStyle = 'blue'
            canvas.fill()
            canvas.stroke()
            canvas.closePath()
        },
        draw_face: function(yChange) {

            let canvas = this.vueCanvas

            // context.clearRect(0, 0 + yChange, width, height)
        
            // circle x: 375, y: 375, r: 300, start: 0, end: 2π
            canvas.beginPath()
            canvas.arc(375, 375 + yChange, 300, 0, 2*Math.PI, true) // arc takes the center of the circle
            canvas.fillStyle = 'yellow'
            canvas.fill()
            canvas.lineWidth = 15
            canvas.stroke()
            canvas.closePath()
            
            // ellipse x: 375, y; 450, xr: 225, yr: 85, start: 0, end: 2π
            canvas.beginPath()
            canvas.ellipse(375, 450 + yChange, 225, 85, 0, 0, 2*Math.PI)
            canvas.fillStyle = 'red'
            canvas.lineWidth = 5
            canvas.fill()
            canvas.stroke()
            
            // eyes x: [275, 475], y: 250, r: 50, start: 0, end: π
            // pupils x: [275, 475], y: 250, r: 25, start: 0, end: π
            
            function drawEyes(x) {
                //outer eye
                canvas.beginPath()
                canvas.arc(x, 250 + yChange, 50, 0, Math.PI)
                canvas.closePath()
                canvas.fillStyle = 'white'
                canvas.fill()
                canvas.stroke()
            
                // pupil
                canvas.beginPath()
                canvas.arc(x, 250 + yChange, 25, 0, Math.PI)
                canvas.closePath()
                canvas.fillStyle = 'blue'
                canvas.fill()
                canvas.stroke()
            }

            drawEyes(275) // no need this.drawEyes() prefix. because it's within draw_face
            drawEyes(475)
            yChange--
            // x++;
            // y++;
            // window.requestAnimationFrame(() => draw_face(x, y));
            
            window.requestAnimationFrame(() => this.draw_face(yChange))
        },
        logKey: function(event) {

            //basic right-side keyboard logs:
            console.log(`event.code: ${event.code}.`)
            keyboard_logs.textContent += ` ${event.key} ` 

            // / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /          testing:
            var gradient = this.vueCanvas.createLinearGradient(0, 0, 200, 0)
            gradient.addColorStop(0, "red")
            gradient.addColorStop(1, "white")
            // Fill with gradient
            this.vueCanvas.fillStyle = gradient
            this.vueCanvas.fillRect(10, 10, 150, 80);
        
            // / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / Working keypresses:
            if (event.code === 'KeyC') {
                console.log("KeyC was clicked.")
                this.draw_face(50)
            }
            if (event.keyCode == 91) { // 91 is the ⊞ WINDOWS key
                // event.preventDefault(); // won't work
                console.log("Win Key was clicked.")
            }
            if (event.code === 'Alt') {
                // event.preventDefault()
                console.log("Alt Key was clicked.")
            }
            if (event.code === 'KeyA' ) {
                // generate_random_x_y(window.innerWidth, window.innerHeight)
                console.log(`Window size: ${window.innerWidth} * ${window.innerHeight}.`)
                this.draw_circle_random(window.innerWidth, window.innerHeight)
            }

            // Section 2:
            // Here I'm attempting to make any digit (which are inconveniently 'string' of 'Digit3' or 'Numpad3'...) draw the same thing...
                // console.log(typeof(event.code))
        },
        draw_line: function(x1, y1, x2, y2) {
            let canvas = this.vueCanvas
            canvas.beginPath()
            canvas.strokeStyle = 'black'
            canvas.lineWidth = 1
            canvas.moveTo(x1, y1)
            canvas.lineTo(x2, y2)
            canvas.stroke()
            canvas.closePath()
        },
        draw: function(e) {
            if(this.is_drawing) {
            this.draw_line(this.x, this.y, e.offsetX, e.offsetY)
            this.x = e.offsetX // don't confuse with clientX 
            this.y = e.offsetY // and clientY, which are absolute
            }
        },
        start_drawing: function(e) {
            this.x = e.offsetX
            this.y = e.offsetY
            this.is_drawing = true
        },        
        stop_drawing: function(e) {
            if (this.is_drawing) {
                this.draw_line(this.x, this.y, e.offsetX, e.offsetY)
                this.x = 0
                this.y = 0
                this.is_drawing = false
            }
        },
    },
    mounted:function() {
        console.log('mounted:function()')
        var canvas = document.getElementById('canvas')
        this.vueCanvas = canvas.getContext('2d')

        document.addEventListener('keypress', this.logKey) // huge difference between keyup and keydown!
    },
})
// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / 
// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / 
// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / 
