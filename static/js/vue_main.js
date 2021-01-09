
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
        keys_and_functions: {},
        example_array: [],
        example_string: "",
        example_integer: 1,
        example_boolean: false,
        // thanks to https://gist.github.com/bobspace/2712980 for the color list! :
        random_css_color_list: [
            'white', 'black', 'red', 'orange', 'yellow', 'green',
            "AliceBlue",
            "AntiqueWhite",
            "Aqua",
            "Aquamarine",
            "Azure",
            "Beige",
            "Bisque",
            "Black",
            "BlanchedAlmond",
            "Blue",
            "BlueViolet",
            "Brown",
            "BurlyWood",
            "CadetBlue",
            "Chartreuse",
            "Chocolate",
            "Coral",
            "CornflowerBlue",
            "Cornsilk",
            "Crimson",
            "Cyan",
            "DarkBlue",
            "DarkCyan",
            "DarkGoldenRod",
            "DarkGray",
            "DarkGrey",
            "DarkGreen",
            "DarkKhaki",
            "DarkMagenta",
            "DarkOliveGreen",
            "DarkOrange",
            "DarkOrchid",
            "DarkRed",
            "DarkSalmon",
            "DarkSeaGreen",
            "DarkSlateBlue",
            "DarkSlateGray",
            "DarkSlateGrey",
            "DarkTurquoise",
            "DarkViolet",
            "DeepPink",
            "DeepSkyBlue",
            "DimGray",
            "DimGrey",
            "DodgerBlue",
            "FireBrick",
            "FloralWhite",
            "ForestGreen",
            "Fuchsia",
            "Gainsboro",
            "GhostWhite",
            "Gold",
            "GoldenRod",
            "Gray",
            "Grey",
            "Green",
            "GreenYellow",
            "HoneyDew",
            "HotPink",
            "IndianRed",
            "Indigo",
            "Ivory",
            "Khaki",
            "Lavender",
            "LavenderBlush",
            "LawnGreen",
            "LemonChiffon",
            "LightBlue",
            "LightCoral",
            "LightCyan",
            "LightGoldenRodYellow",
            "LightGray",
            "LightGrey",
            "LightGreen",
            "LightPink",
            "LightSalmon",
            "LightSeaGreen",
            "LightSkyBlue",
            "LightSlateGray",
            "LightSlateGrey",
            "LightSteelBlue",
            "LightYellow",
            "Lime",
            "LimeGreen",
            "Linen",
            "Magenta",
            "Maroon",
            "MediumAquaMarine",
            "MediumBlue",
            "MediumOrchid",
            "MediumPurple",
            "MediumSeaGreen",
            "MediumSlateBlue",
            "MediumSpringGreen",
            "MediumTurquoise",
            "MediumVioletRed",
            "MidnightBlue",
            "MintCream",
            "MistyRose",
            "Moccasin",
            "NavajoWhite",
            "Navy",
            "OldLace",
            "Olive",
            "OliveDrab",
            "Orange",
            "OrangeRed",
            "Orchid",
            "PaleGoldenRod",
            "PaleGreen",
            "PaleTurquoise",
            "PaleVioletRed",
            "PapayaWhip",
            "PeachPuff",
            "Peru",
            "Pink",
            "Plum",
            "PowderBlue",
            "Purple",
            "RebeccaPurple",
            "Red",
            "RosyBrown",
            "RoyalBlue",
            "SaddleBrown",
            "Salmon",
            "SandyBrown",
            "SeaGreen",
            "SeaShell",
            "Sienna",
            "Silver",
            "SkyBlue",
            "SlateBlue",
            "SlateGray",
            "SlateGrey",
            "Snow",
            "SpringGreen",
            "SteelBlue",
            "Tan",
            "Teal",
            "Thistle",
            "Tomato",
            "Turquoise",
            "Violet",
            "Wheat",
            "White",
            "WhiteSmoke",
            "Yellow",
        ],
        canvas_width: 1300,
        canvas_height: 1000,
    },
    methods: {
        keypress_listener: function(KeyboardEvent) {
            // NOTES:
            // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
            // KeyboardEvent.code is the PHYSICAL key pressed (regardless of modifier OR keyboard layout) 
            // while KeyboardEvent.key is the 'sent' key...
            // while KeyboardEvent.keyCode is the numerical code...

            // Right-side keyboard logs:
            console.log(`logKey: function(KeyboardEvent) running with KeyboardEvent.code: ${KeyboardEvent.code} and KeyboardEvent.key : ${KeyboardEvent.key}.`)
            keyboard_logs.textContent += `${KeyboardEvent.code}, `
            last_keypress.textContent = KeyboardEvent.code

            // Left-side Draw function lookup, 
            let key_lookup = KeyboardEvent.code // 
                // TEMPORARY DEFAULT VALUE WHILE I CREATE LIST:
            if ( this.keys_and_functions[key_lookup] == 1) {
                this.keys_and_functions[`default`]()
            }
            else if ( this.keys_and_functions[key_lookup] ) {
                this.keys_and_functions[key_lookup]() // execute it!
            }
            else {
                console.log('LOOKUP NOT FOUND, PERFORMING DEFAULT VALUE:')
                this.keys_and_functions[`default`]() // perform some default draw value...
                keyboard_logs.textContent += `(not found) `
            }
        },
        log_this: function(e) {
            // unused
            this.x = e.offsetX
            this.y = e.offsetY
        },
        draw_circle_random: function(input_x=this.canvas_width, input_y=this.canvas_height, color='white') {
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
            // canvas.fillStyle = color
            
            // random color section:
            random_color_seed = Math.random()
            console.log(`random_color_seed: ${random_color_seed}`)
            random_color_integer = Math.floor(random_color_seed * Math.floor(this.random_css_color_list.length))
            console.log(`Math.floor(this.random_css_color_list.length) : ${Math.floor(this.random_css_color_list.length)}`)
            console.log(`random_color_integer: ${random_color_integer}`)
            canvas.fillStyle = this.random_css_color_list[random_color_integer]
            
            canvas.fill()
            canvas.stroke()
            canvas.closePath()
        },
        draw_face: function(yChange=50) {

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
            var gradient = this.vueCanvas.createLinearGradient(0, 0, 200, 0)
            gradient.addColorStop(0, "red")
            gradient.addColorStop(1, "white")

            this.vueCanvas.fillStyle = gradient
            this.vueCanvas.fillRect(100, 100, 150, 80);
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
        draw_rectangle: function() {
            let offset = 0
            let canvas = this.vueCanvas
            function draw() {
                // console.log('draw_rectangle() function...')
                canvas.clearRect(0, 0, 200, 200)
                canvas.clearRect(0, 0, this.canvas_width, this.canvas_height)
                canvas.setLineDash([4, 2])
                canvas.lineDashOffset = -offset
                canvas.strokeRect(50, 50, 300, 300)
            }
            function march() {
                offset++
                if (offset > 16 ) {
                    offset = 0
                }
                draw()
                setTimeout(march, 20)
            }
            march()
        },
        clear_canvas: function() {
            console.log('clear_canvas function()')
            let canvas = this.vueCanvas
            canvas.clearRect(0, 0, this.canvas_width, this.canvas_height)    

            // RESET THE STROKE TO BLACK, SOLID, DEFAULTS...
            // DOESN'T REMOVE THE MARCHING ANTS RECTANGLE...        
        },
    },
    created: function() { // created() before >> mounted()
        console.log('created() function')
    },
    mounted:function() {
        console.log(`mounted:function(), window size: ${window.innerWidth} * ${window.innerHeight}.`)

        var canvas = document.getElementById('canvas')
        this.vueCanvas = canvas.getContext('2d')

        document.addEventListener('keypress', this.keypress_listener) // huge difference between keyup, keydown, and keypress!
        // BIG LIST of key / draw function lookups...
        this.keys_and_functions = { // Thanks Pete! Can have an easy lookup with a lookup on the left and a function on the right WITH arguments!
            // Space: () => console.log('I am a console.log() function, inside a key/value pair inside an object, inside the mounted function, inside the Vue shell!!!!'),
            
            default: () => this.draw_circle_random(),

            Space: 1,
            
            KeyQ: 1,
            KeyW: 1,
            KeyE: 1,
            KeyR: 1,
            KeyT: 1,
            KeyY: 1,
            KeyU: 1, 
            KeyI: 1, 
            KeyO: 1, 
            KeyP: 1,

            KeyA: () => this.draw_circle_random(500, 500, 'red'),
            KeyS: 1,
            KeyD: () => this.draw_rectangle(), 
            KeyF: 1, 
            KeyG: 1, 
            KeyH: 1, 
            KeyJ: 1, 
            KeyK: 1, 
            KeyL: 1,

            KeyZ: 1,
            KeyX: 1,
            KeyC: () => this.draw_face(),
            KeyV: 1, 
            KeyB: 1, 
            KeyN: 1, 
            KeyM: 1,

            Numpad0: 1,
            Numpad1: 1,
            Numpad2: 1,
            Numpad3: 1,
            Numpad4: 1,
            Numpad5: 1,
            Numpad6: 1,
            Numpad7: 1,
            Numpad8: 1,
            Numpad9: 1,
        
            // if (KeyboardEvent.keyCode == 91) { // 91 is the ⊞ WINDOWS key
            //     // event.preventDefault(); // won't work
            //     console.log("Win Key was clicked.")
            // }
        }
    },
})
// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / 
// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / 
// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / 