// John Fial, 2020-2021 PDX Code Guild, 
// Capstone Project 
// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / 

// import fabric from 'fabric'
// // Object.defineProperty(Vue.prototype, '$fabric', { value : fabric });
// Vue.use(fabric) // https://vuejs.org/v2/guide/plugins.html#ad

new Vue({
    el: '#vue_app',
    data: {
        vueCanvas: null,
        vueCanvas_tree: null,

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
            'white', 'black',
            'white', 'black',
            'white', 'black',
            'white', 'black',
            'white', 'black',
            'white', 'black',
            'white', 'black',
            'white', 'black',
            'white', 'black',
            'white', 'black', 
            'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet',
            'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet',
            'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet',
            'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet',
            'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet',
            'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet',
            'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet',
            'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet',
            'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet',
            'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet',
            'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet',
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
        draw_random_circle: function(color='random', input_x=this.canvas_width, input_y=this.canvas_height) {

            console.log('draw_random_circle() function.')

            let canvas = this.vueCanvas

            // Random position:
            var random_number = Math.random()
            let random_x = Math.floor(random_number * Math.floor(input_x))
            var random_number = Math.random()
            let random_y = Math.floor(random_number * Math.floor(input_y))

            // Random color from list in data{}
            if (color === 'random') {
                color = this.pick_random_color()
                canvas.fillStyle = color
            }
            else {
                canvas.fillStyle = color
            }
            
            canvas.beginPath()
                // https://www.w3schools.com/tags/canvas_arc.asp
                // context.arc() syntax:    context.arc(     x,     y,     r,     sAngle,     eAngle,     counterclockwise);
            canvas.arc(random_x, random_y, 50, 0, 2*Math.PI)

            canvas.fill()
            canvas.stroke()
            canvas.closePath()
        },
        draw_random_square: function(color='random', input_x=this.canvas_width, input_y=this.canvas_height) {
            
            console.log('draw_random_square: function()')
            
            let canvas = this.vueCanvas

            // Random position:
            var random_number = Math.random()
            let random_x = Math.floor(random_number * Math.floor(input_x))
            var random_number = Math.random()
            let random_y = Math.floor(random_number * Math.floor(input_y))

            // Random color from list in data{}
            if (color === 'random') {
                color = this.pick_random_color()
                canvas.fillStyle = color
            }
            else {
                canvas.fillStyle = color
            }

            canvas.fillRect(random_x, random_y, 100, 100)

        },
        pick_random_color: function() {
            console.log(`pick_random_color: function() start`)

            random_color_seed = Math.random()
            random_color_integer = Math.floor(random_color_seed * Math.floor(this.random_css_color_list.length))
            color = this.random_css_color_list[random_color_integer]

            console.log(`pick_random_color: function() picking color with ${color}`)
            return color
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
        draw_gradient: function() { // unused
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
                // canvas.clearRect(0, 0, this.canvas_width, this.canvas_height)
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
                setTimeout(march, 2)
            }
            // disabling this until i understand it better
            // march()

            canvas.setLineDash([10, 3])
            canvas.strokeRect(450, 450, 300, 300)

        },
        clear_canvas: function() {
            console.log('clear_canvas function()')

            let canvas = this.vueCanvas

            canvas.clearRect(0, 0, this.canvas_width, this.canvas_height)
            
            // RESET THE STROKE TO BLACK, SOLID, DEFAULTS...
            canvas.fillStyle = 'rgb(0, 0, 0, 0)'    
            
            // DOESN'T REMOVE THE MARCHING ANTS RECTANGLE...        

        },
        draw_load_page: function() {

            console.log('draw_image_test() START')

            var img = new Image();   // Create new img element
            img.addEventListener('load', function() {
                    // execute drawImage statements here
                    canvas.drawImage(img,600,600)
                }, false)
            // also try:
            // image.onload = function(){
            //     ctx.drawImage(this, 0,0);
            // }
            img.src = 'static/media/test.svg'
            img.x = "100"
            img.y = "100"
            img.width = "100"
            img.height = "100"
            console.log('draw_image_test() END')
            // / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / 
            console.log('this.draw_load_page function()')
            
            let canvas = this.vueCanvas
            canvas.clearRect(0, 0, this.canvas_width, this.canvas_width)
            
            canvas.fillStyle = 'rgb(200, 100, 100)'      
            canvas.fillRect(25, 25, 250, 250)
            canvas.fillStyle = 'rgb(255, 50, 50, 0.5)'
            canvas.fillRect(45, 45, 250, 250)

            canvas.fillStyle = 'rgb(0, 0, 0)'
            canvas.font = '75px serif'
            // canvas.fillText('                       童年帆布 ', 100, 400)
            canvas.font = '35px serif'
            canvas.fillText('Welcome to Childhood Canvas! Make your browser fullscreen,', 100, 500)
            //  Meant for toddlers
            canvas.fillText('then try random keyboard keys or draw on me !', 100, 545)

            canvas.save()

            // / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / 


        },
        drawing_notes: function() { // unused

            // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes
            // First, you create the path.
            // Then you use drawing commands to draw into the path.
            // Once the path has been created, you can stroke or fill the path to render it.

            // you will almost always want to specifically set your starting position after resetting a path.
        },
        draw_triangle: function() {
            var canvas = this.vueCanvas

            canvas.beginPath()
            canvas.moveTo(750,500)
            canvas.lineTo(1000,750)
            canvas.lineTo(1000,250)
            canvas.fill()


        },
        draw_test_smiley: function() {
            var canvas = this.vueCanvas
            canvas.restore()

            canvas.beginPath();
            canvas.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
            canvas.moveTo(110, 75);
            canvas.arc(75, 75, 35, 0, Math.PI, false);  // Mouth (clockwise)
            canvas.moveTo(65, 65);
            canvas.arc(60, 65, 5, 0, Math.PI * 2, true);  // Left eye
            canvas.moveTo(95, 65);
            canvas.arc(90, 65, 5, 0, Math.PI * 2, true);  // Right eye
            canvas.stroke();
            
        },
        draw_tree_animated_from_NicoleEyO: function() { // code/tree modified from https://codepen.io/ntaylor09/pen/vKGePr :            
                
            var ctx = this.vueCanvas_tree
            
            //Some variables
            var length, divergence, reduction, line_width, start_points = [];
            var W = 300 // window.innerWidth;
            var H = 300 // window.innerHeight;

            function init() {
                
                //filling the canvas
                ctx.fillStyle = "black";
                ctx.fillRect(0, 0, W, H);
                
                //length of the trunk - 100-150
                length = 30 + Math.round(Math.random()*50);
                
                //angle at which branches will diverge - 10-60
                divergence = 15 + Math.round(Math.random()*50);
                
                //Every branch will be 0.75times of the previous one - 0.5-0.75
                //with 2 decimal points
                reduction = Math.round(50 + Math.random()*20)/100;
                
                //width of the branch/trunk
                line_width = 15;
                
                //This is the end point of the trunk, from where branches will diverge
                var trunk = {x: W/2, y: length+30, angle: 90};
                //It becomes the start point for branches
                start_points = []; //empty the start points on every init();
                start_points.push(trunk);
                
                //Y coordinates go positive downwards, hence they are inverted by deducting it
                //from the canvas height = H
                ctx.beginPath();
                ctx.moveTo(trunk.x, H-5);
                ctx.lineTo(trunk.x, H-trunk.y);
                ctx.strokeStyle = "brown";
                ctx.lineWidth = line_width;
                ctx.stroke();
                
                branches();
            }            
            
            //Lets draw the branches now
            function branches()
            {
                //reducing line_width and length
                length = length * reduction;
                line_width = line_width * reduction;
                ctx.lineWidth = line_width;
                
                var new_start_points = [];
                ctx.beginPath();
                for(var i = 0; i < start_points.length; i++)
                {
                    var sp = start_points[i];
                    //2 branches will come out of every start point. Hence there will be
                    //2 end points. There is a difference in the divergence.
                    var ep1 = get_endpoint(sp.x, sp.y, sp.angle+divergence, length);
                    var ep2 = get_endpoint(sp.x, sp.y, sp.angle-divergence, length);
                    
                    //drawing the branches now
                    ctx.moveTo(sp.x, H-sp.y);
                    ctx.lineTo(ep1.x, H-ep1.y);
                    ctx.moveTo(sp.x, H-sp.y);
                    ctx.lineTo(ep2.x, H-ep2.y);
                    
                    //Time to make this function recursive to draw more branches
                    ep1.angle = sp.angle+divergence;
                    ep2.angle = sp.angle-divergence;
                    
                    new_start_points.push(ep1);
                    new_start_points.push(ep2);
                }
                //Lets add some more color
                if(length < 10) ctx.strokeStyle = "green";
                else ctx.strokeStyle = "brown";
                ctx.stroke();
                start_points = new_start_points;
                //recursive call - only if length is more than 2.
                //Else it will fall in an long loop
                if(length > 2) setTimeout(branches, 100);

                // Time in miliseconds, so 1,000 = 1s or 5,000 = 5s, etc.
                else setTimeout(init, 2500);
            }
            
            function get_endpoint(x, y, a, length)
            {
                //This function will calculate the end points based on simple vectors
                //http://physics.about.com/od/mathematics/a/VectorMath.htm
                //You can read about basic vectors from this link
                var epx = x + length * Math.cos(a*Math.PI/180);
                var epy = y + length * Math.sin(a*Math.PI/180);
                return {x: epx, y: epy};
            }

            init();
        },
        draw_image_test: function() {
        },
        fabric_draw_circle: function() {
            console.log('fabric_draw_circle()')

            let canvas = this.vueCanvas

            fabric.circle({
                radius: 20, fill: 'green', left: 100, top: 100
            })
            
            canvas.add(circle)
            
            // let canvas = this.vueCanvas

            // var circle = new fabric.Circle({
            //     radius: 20, fill: 'green', left: 100, top: 100
            //     })
            //   var triangle = new fabric.Triangle({
            //     width: 20, height: 30, fill: 'blue', left: 50, top: 50
            //   })

            //   canvas.add(circle, triangle)
        },
    },
    created: function() { // created()  >>  mounted()
        console.log('created() function')
    },
    mounted:function() {
        console.log(`mounted:function(), window size: ${window.innerWidth} * ${window.innerHeight}.`)

        var canvas = document.getElementById('canvas_main')
        this.vueCanvas = canvas.getContext('2d')

        var canvas_tree = document.getElementById('canvas_tree')
        this.vueCanvas_tree = canvas_tree.getContext('2d')        
        
        let ctx = this.vueCanvas // just in case I forget that anywhere else!
        
        // Keypress listener:
        document.addEventListener('keypress', this.keypress_listener) // huge difference between 'keyup', 'keydown', and 'keypress'!
        this.draw_load_page()
        
        this.draw_tree_animated_from_NicoleEyO()

        this.fabric_draw_circle()



        // BIG LIST of key / draw function lookups...
        // Try moving this to the 'data' normally to see if it remains executable...
        this.keys_and_functions = { // Thanks Pete! Can have an easy lookup with a lookup on the left and a function on the right WITH arguments!
            // Space: () => console.log('I am a console.log() function, inside a key/value pair inside an object, inside the mounted function, inside the Vue shell!!!!'),
            
            default: () => this.draw_random_square(),

            Space: () => this.clear_canvas(),
            
            KeyQ: () => this.draw_random_square('white', 700, 700),
            KeyW: () => this.draw_tree_animated_from_NicoleEyO(),
            KeyE: () => this.draw_random_square(),
            KeyR: () => this.draw_random_square(),
            KeyT: () => this.draw_random_square(),
            KeyY: () => this.draw_random_square(),
            KeyU: () => this.draw_random_square(), 
            KeyI: () => this.draw_random_square(), 
            KeyO: () => this.draw_random_square(), 
            KeyP: () => this.draw_random_square(),

            KeyA: () => this.draw_random_circle('red', 500, 500),
            KeyS: 1,
            // KeyD: () => this.draw_rectangle(),
            KeyD: 1,
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
});

// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / 