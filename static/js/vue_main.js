
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
        x: null,
        y: null,
        keys_and_functions: {
            Space: `console.log('this')`,
            KeyA: console.log('Im a function inside a value, inside an object, inside the data object, isnide the VUE shell!!!!'),
            KeyA: `test`,
        },
        example_array: [],
        example_string: "",
        example_integer: 1,
        example_boolean: false,
    },
    methods: {
        logKey: function(KeyboardEvent) {
            // NOTES:
            // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
            // KeyboardEvent.code is the PHYSICAL key pressed (regardless of modifier OR keyboard layout) 
            // while KeyboardEvent.key is the 'sent' key...
            // while KeyboardEvent.keyCode is the numerical code...

            // basic right-side keyboard logs:
            console.log(`logKey: function(KeyboardEvent) running with KeyboardEvent.code: ${KeyboardEvent.code} and KeyboardEvent.key : ${KeyboardEvent.key}.`)
            keyboard_logs.textContent += ` ${KeyboardEvent.code}`
            last_keypress.textContent = KeyboardEvent.code

            console.log('here follows keys_and_functions test : this.keys_and_functions.key_lookup')
            let key_lookup = KeyboardEvent.code // change this to experiment
            console.log(this.keys_and_functions[key_lookup])
        
            // Working keypresses:
            if (KeyboardEvent.code === 'KeyC') {
                this.draw_face(50)
            }
            if (KeyboardEvent.keyCode == 91) { // 91 is the ⊞ WINDOWS key
                // event.preventDefault(); // won't work
                console.log("Win Key was clicked.")
                this.draw_gradient()
            }
            if (KeyboardEvent.code === 'Alt') {
                console.log("Alt Key was clicked.")
            }
            if (KeyboardEvent.code === 'KeyA' ) {
                // generate_random_x_y(window.innerWidth, window.innerHeight)
                console.log(`Window size: ${window.innerWidth} * ${window.innerHeight}.`)
                this.draw_circle_random(window.innerWidth, window.innerHeight)
            }

            // Section 2:
            // Here I'm attempting to make any digit (which are inconveniently 'string' of 'Digit3' or 'Numpad3'...) draw the same thing...
                // console.log(typeof(KeyboardEvent.code)) // string
        },
        log_this: function(e) {
            // unused
            this.x = e.offsetX
            this.y = e.offsetY
        },
        draw_circle_random: function(input_x, input_y) {
            let canvas = this.vueCanvas
            console.log('draw_circle_random() function.')

            var random_number = Math.random()
            let random_x = Math.floor(random_number * Math.floor(input_x))
            var random_number = Math.random()
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
        draw_gradient: function() {
            // / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /          testing:
            var gradient = this.vueCanvas.createLinearGradient(0, 0, 200, 0)
            gradient.addColorStop(0, "red")
            gradient.addColorStop(1, "white")

            // Fill with gradient
            this.vueCanvas.fillStyle = gradient
            this.vueCanvas.fillRect(10, 10, 150, 80);
        },
        draw_line: function(x1, y1, x2, y2) {
            let canvas = this.vueCanvas
            canvas.beginPath()
            canvas.strokeStyle = 'black'
            canvas.lineWidth = 3
            canvas.moveTo(x1, y1)
            canvas.lineTo(x2, y2)
            canvas.stroke()
            canvas.closePath()
        },
        draw: function(e) { // thanks to: https://dev.to/reiallenramos/drawing-in-vue-using-mousemove-event-34cg
            // this.x = e.offsetX // don't confuse with clientX 
            // this.y = e.offsetY // and clientY, which are absolute
            if(this.is_drawing) {
            this.draw_line(this.x, this.y, e.offsetX, e.offsetY)
            this.x = e.offsetX 
            this.y = e.offsetY
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
        // const width = 800
        // const height = 800

        document.addEventListener('keypress', this.logKey) // huge difference between keyup and keydown!
    },
})
// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / 
// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / 
// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / 
