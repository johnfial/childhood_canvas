// John Fial, 2020-2021 PDX Code Guild, 
// Capstone Project 
// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / 

// import fabric from 'fabric'
// // Object.defineProperty(Vue.prototype, '$fabric', { value : fabric });
// Vue.use(fabric) // https://vuejs.org/v2/guide/plugins.html#ad

let vue_app = new Vue({
    el: '#vue_app',
    data: {
        fullscreen: false,

        vueCanvas: null, // unused
        vueCanvas_tree: null,
        Konva_canvas_Stage: null,

        is_drawing: false,
        x: null,
        y: null,
        keys_and_functions: {}, // we can't have the arrow () => functions here, so this is blank and they'll load on mounted()
                
        random_css_color_list: [ // thanks to https://gist.github.com/bobspace/2712980 for the color list! :
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

        canvas_width: 1300, // unused
        canvas_height: 1100, // unused
        
        // Konva Stuff here:
        configKonva: {
            width: 1300,
            height: 1100,
          },
        configCircle: {
            x: 100,
            y: 100,
            radius: 70,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 4
        },
    },
    methods: {

        draw_test_smiley: function() {   // unused          
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

        // non-draw or helper functions: 
        keypress_listener: function(KeyboardEvent) {
            // NOTES:
            // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
            // KeyboardEvent.code is the PHYSICAL key pressed (regardless of modifier OR keyboard layout) 
            // while KeyboardEvent.key is the 'sent' key...
            // while KeyboardEvent.keyCode is the numerical code...

            // Right-side keyboard logs:
            console.log(`logKey: function(KeyboardEvent) running with KeyboardEvent.code: ${KeyboardEvent.code} and KeyboardEvent.key : ${KeyboardEvent.key}.`)
            keyboard_logs.textContent += `${KeyboardEvent.code}, `
            last_keypress.textContent = `Keyboard: ${KeyboardEvent.code}`

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
        pick_random_color: function() {
            // console.log(`pick_random_color: function() start`)

            random_color_seed = Math.random()
            random_color_integer = Math.floor(random_color_seed * Math.floor(this.random_css_color_list.length))
            color = this.random_css_color_list[random_color_integer]

            console.log(`pick_random_color: function() picking color with ${color}`)
            return color
        },
        fullscreen_toggle: function() {
            console.log('fullscreen_toggle() START')
            // thanks https://www.w3schools.com/howto/howto_js_fullscreen.asp
            var document_main = document.documentElement

            /* View in fullscreen */
            function openFullscreen() {
                if (document_main.requestFullscreen) {
                document_main.requestFullscreen();
                } else if (document_main.webkitRequestFullscreen) { /* Safari */
                document_main.webkitRequestFullscreen();
                } else if (document_main.msRequestFullscreen) { /* IE11 */
                document_main.msRequestFullscreen();
                }
            }
            
            /* Close fullscreen */
            function closeFullscreen() {
                if (document.exitFullscreen) {
                document.exitFullscreen();
                } else if (document.webkitExitFullscreen) { /* Safari */
                document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) { /* IE11 */
                document.msExitFullscreen();
                }
            }

            if (this.fullscreen === false) {
                openFullscreen()
                this.fullscreen = true
            }
            else {
                closeFullscreen()
                this.fullscreen = false
            }


        },
        fullscreen_f11_toggle_data_only: function() {
            console.log('fullscreen_f11_toggle_data_only() START')

            if (this.fullscreen === false) {
                openFullscreen()
                this.fullscreen = true
            }
            else {
                closeFullscreen()
                this.fullscreen = false
            }
        },
        canvas_save_image: function() {
            console.log('canvas_save_image() START')
            window.alert(`Sorry! Still under development... For now, you'll have to take a screenshot.
                ---
                For Mac: ⇧⌘5 , or see: https://setapp.com/how-to/snipping-tool-for-mac
                ---
                For Windows: Start > Type 'Snipping' or see: https://support.microsoft.com/en-us/windows/use-snipping-tool-to-capture-screenshots-00246869-1843-655f-f220-97299b865f6b
            `)

        },

        // shapes:
        draw_random_circle: function(color='random', input_x=this.canvas_width, input_y=this.canvas_height) {

            console.log('draw_random_circle() function.')

            // Random position:
            var random_number = Math.random()
            let random_x = Math.floor(random_number * Math.floor(input_x))
            var random_number = Math.random()
            let random_y = Math.floor(random_number * Math.floor(input_y))

            // Random color from list in data{}
            if (color === 'random') {
                color = this.pick_random_color()
            }

            // layer = this.Konva_canvas_layer1

            var circle = new Konva.Circle({
                x: random_x,
                y: random_y,
                radius: 40,
                fill: color,
                stroke: 'white',
                strokeWidth: 4,
            })
            this.Konva_canvas_layer1.add(circle)
            this.Konva_canvas_layer1.draw()
            
        },
        draw_random_square: function(color='random', input_x=this.canvas_width, input_y=this.canvas_height) {
            
            console.log('draw_random_square: function()')
            
            // Random position:
            var random_number = Math.random()
            let random_x = Math.floor(random_number * Math.floor(input_x))
            var random_number = Math.random()
            let random_y = Math.floor(random_number * Math.floor(input_y))

            // Random color from list in data{}
            if (color === 'random') {
                color = this.pick_random_color()
            }

            // layer = this.Konva_canvas_layer1

            var rect1 = new Konva.Rect({
                x: random_x,
                y: random_y,
                width: 75,
                height: 75,
                fill: color,
                stroke: 'black',
                strokeWidth: 10,
            })
            this.Konva_canvas_layer1.add(rect1)
            this.Konva_canvas_layer1.draw()

        },
        draw_triangle: function() { // unused
        },
        draw_gradient: function() { // unused
            var gradient = this.vueCanvas.createLinearGradient(0, 0, 200, 0)
            gradient.addColorStop(0, "red")
            gradient.addColorStop(1, "white")

            this.vueCanvas.fillStyle = gradient
            this.vueCanvas.fillRect(100, 100, 150, 80);
        },
        
        // drawing PEN methods:
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

        // Tree canvas:
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

        clear_canvas: function() {
            console.log('clear_canvas function()')

            // Destroy the layer, make a new one, add it to the Stage
            this.Konva_canvas_layer1.destroy()
            this.Konva_canvas_layer1 = new Konva.Layer()
            this.Konva_canvas_Stage.add(this.Konva_canvas_layer1)
            // this.Konva_canvas_Stage.clear()

            // Clear the text logs:
            keyboard_logs.textContent = ''

        },
        page_reload: function() {
            console.log('page_reload() START')
        },
        konva_image_elephant: function(input_x=this.canvas_width, input_y=this.canvas_height) {
            
            console.log('konva_image_elephant()')
            
            // Random position:
            var random_number = Math.random()
            let random_x = Math.floor(random_number * Math.floor(input_x))
            var random_number = Math.random()
            let random_y = Math.floor(random_number * Math.floor(input_y))

            Konva.Image.fromURL('static/media/Pixabay_Clker-Free-Vector-Images_elephant-24732.svg', (elephant) => {
                elephant.setAttrs({
                    x: random_x,
                    y: random_y,
                    scaleX: 2.0,
                    scaleY: 2.0,
                })
                this.Konva_canvas_layer1.add(elephant)
                this.Konva_canvas_layer1.draw()
            })

        },
        konva_image_smiley_face_svg: function(input_x=this.canvas_width, input_y=this.canvas_height) {
            
            console.log('konva_image_smiley_face_svg()')
            
            // Random position:
            var random_number = Math.random()
            let random_x = Math.floor(random_number * Math.floor(input_x))
            var random_number = Math.random()
            let random_y = Math.floor(random_number * Math.floor(input_y))

            Konva.Image.fromURL('static/media/pixabay_OpenClipart-Vectors_face-1298202.svg', (smiley) => {
                smiley.setAttrs({
                    x: random_x,
                    y: random_y,
                    scaleX: 2.0,
                    scaleY: 2.0,
                })
                this.Konva_canvas_layer1.add(smiley)
                this.Konva_canvas_layer1.draw()
            })

        },
        konva_image_dolphin: function(input_x=this.canvas_width, input_y=this.canvas_height) {
            
            console.log('konva_image_dolphin()')
            
            // Random position:
            var random_number = Math.random()
            let random_x = Math.floor(random_number * Math.floor(input_x))
            var random_number = Math.random()
            let random_y = Math.floor(random_number * Math.floor(input_y))

            Konva.Image.fromURL('static/media/pixabay_Clker-Free-Vector-Images_dolphin-41436.svg', (dolphin) => {
                dolphin.setAttrs({
                    x: random_x,
                    y: random_y,
                    scaleX: 2.0,
                    scaleY: 2.0,
                })
                this.Konva_canvas_layer1.add(dolphin)
                this.Konva_canvas_layer1.draw()
            })

        },
        konva_image_cement_mixer_truck: function(input_x=this.canvas_width, input_y=this.canvas_height) {
            
            console.log('konva_image_cement_mixer_truck()')
            
            // Random position:
            var random_number = Math.random()
            let random_x = Math.floor(random_number * Math.floor(input_x))
            var random_number = Math.random()
            let random_y = Math.floor(random_number * Math.floor(input_y))

            Konva.Image.fromURL('static/media/pixabay_Grafikingenieur_concrete-mixer-5630778.svg', (cement) => {
                cement.setAttrs({
                    x: random_x,
                    y: random_y,
                    scaleX: 5,
                    scaleY: 5,
                })
                this.Konva_canvas_layer1.add(cement)
                this.Konva_canvas_layer1.draw()
            })

        },
        konva_image_butterfly: function(input_x=this.canvas_width, input_y=this.canvas_height, scale=1) {
            
            console.log('konva_image_elephant()')
            
            // Random position:
            var random_number = Math.random()
            let random_x = Math.floor(random_number * Math.floor(input_x))
            var random_number = Math.random()
            let random_y = Math.floor(random_number * Math.floor(input_y))

            Konva.Image.fromURL('static/media/pixabay_gdj_gordon_johnson_butterfly-5883438.svg', (butterfly) => {
                butterfly.setAttrs({
                    x: input_x,
                    y: input_y,
                    scaleX: scale,
                    scaleY: scale,
                })
                this.Konva_canvas_layer1.add(butterfly)
                this.Konva_canvas_layer1.draw()
            })

        },
        konva_canvas_initialize: function() {
            console.log('konva_canvas_initialize() START')


            var circle = new Konva.Circle({
                x: 630, // stage.width() / 2,
                y: 900,  // stage.height() / 2, 
                radius: 70, 
                fill: 'red',
                stroke: 'white',
                strokeWidth: 4,
            })

            var welcome_text = new Konva.Text({
                x: 400,
                y: 50,
                text: `Welcome to Childhood Canvas, \nPlease go grab some tea of 'anise. \nNow you're on campus! \n\nMake your browser fullscreen, \nClick the keyboard's buttons, find some beans, \nAnd remember: share this page as a meme!`,
                fontSize: 30,
                fontFamily: `Advent Pro`,
                fill: 'black',
                width: 700,
                margin: 100,
                // padding: '10',
                align: 'left',
            })

            this.konva_image_butterfly(200, 300, 4)
            this.Konva_canvas_layer1.add(circle, welcome_text)
            this.Konva_canvas_layer1.draw()

            // / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / 
            // Here's the old stuff...
            
            // canvas.fillStyle = 'rgb(0, 0, 0)'
            // canvas.font = '75px serif'
            // // canvas.fillText('                       童年帆布 ', 100, 400)
            // canvas.font = '35px serif'
            // canvas.fillText('Welcome to Childhood Canvas! Make your browser fullscreen,', 100, 500)
            // //  Meant for toddlers
            // canvas.fillText('then try random keyboard keys or draw on me !', 100, 545)

            // console.log('this.draw_load_page function() END')
            // / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / 
            console.log('konva_draw_test() END')
        },
        konva_test_video: function() {
            console.log('konva_test_video() START')

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
            video.src = 'https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c4/Physicsworks.ogv/Physicsworks.ogv.240p.vp9.webm';
    
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
            
            // END COPY 
        },
    },
    mounted:function() {
        console.log(`mounted() START, with window size: ${window.innerWidth} * ${window.innerHeight}.`)
        
        // Keypress listener:
        document.addEventListener('keypress', this.keypress_listener) // huge difference between 'keyup', 'keydown', and 'keypress'! 
        
        // // CANVAS INITIALIZE (Still need to use it in each method/function...)
            // var canvas = document.getElementById('canvas_main')
            // this.vueCanvas = canvas.getContext('2d')
            // this.draw_load_page()

        // REPLACE above if using Konva...
        this.Konva_canvas_Stage = new Konva.Stage({
            container: 'div_konva_canvas', // this is the div name
            width: 1300,
            height: 1100,
            // color: white,
        })        
        this.Konva_canvas_layer1 = new Konva.Layer()
        this.Konva_canvas_Stage.add(this.Konva_canvas_layer1)
        this.konva_canvas_initialize()
        // this.konva_test_video()

        // Below is the separate 300x300 canvas for the 'tree' in the top right
        // ENABLE FOR PRODUCTION!                                                                                                           ENABLE FOR PRODUCTION! 
        var canvas_tree = document.getElementById('canvas_tree')
        this.vueCanvas_tree = canvas_tree.getContext('2d')       
        this.draw_tree_animated_from_NicoleEyO()

        // BIG LIST of keypress / draw function lookups:
        this.keys_and_functions = {             
            // NOTE: The reason this can't be in the data raw 'data' is because it would start executing the functions. So we replace the blank data object here on 'mounted()'
            // Thanks Pete! This makes an easy lookup with a lookup on the left and a function on the right WITH arguments!
            // Space: () => console.log('I am a console.log() function, inside a key/value pair inside an object, inside the mounted function, inside the Vue shell!!!!'),
            
            default: () => this.draw_random_circle(),

            F11: () => this.fullscreen_f11_toggle_data_only(),

            Space: () => this.clear_canvas(),
            
            KeyQ: () => this.draw_random_square('white'),
            KeyW: 1,
            KeyE: () => this.konva_image_elephant(),
            KeyR: 1,
            KeyT: 1,
            KeyY: 1,
            KeyU: 1,
            KeyI: 1, 
            KeyO: 1, 
            KeyP: 1,

            //  konva_image_smiley_face_svg konva_image_cement_mixer_truck
            KeyA: () => this.draw_random_circle('red', 500, 500),
            KeyS: 1, 
            KeyD: () => this.konva_image_dolphin(),
            KeyF: 1, 
            KeyG: 1, 
            KeyH: 1, 
            KeyJ: 1, 
            KeyK: 1, 
            KeyL: 1,

            KeyZ: 1,
            KeyX: () => this.konva_image_smiley_face_svg(),
            // KeyC: () => this.draw_face(),
            KeyC: () => this.konva_image_cement_mixer_truck(),
            KeyV: 1, 
            KeyB: () => this.konva_image_butterfly(), 
            KeyN: 1, 
            KeyM: 1,

            // Open some of his videos :
            // https://www.w3schools.com/jsref/met_win_open.asp :
            Numpad0: 1,
            Numpad1: () => window.open('https://www.youtube.com/watch?v=zRxX63txOXk'), // Pupu Hinuhinu
            Numpad2: () => window.open('https://www.youtube.com/watch?v=ssHkMWcGat4&feature=emb_title'), // Arecibo Observatory collapse from 1 Dec 2020
            // local video.src = 'C:\\-=Cloud=-\\Sync\\~SORT FOLDER~\\joao\\AreciboObservatoryMediaB-Rollwithcollapse.mkv';
            Numpad3: () => window.open('https://www.youtube.com/watch?v=FezVApPddqU'), // Mele Kalikimaka psych version
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
        console.log(`mounted() END`)
        // END MOUNTED
    },
    created: function() { // created()  >>  mounted()
        console.log('created() START')
    },
});

// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / 