// Childhood Canvas, browser app (Vue 2 + Konva 7).
// John Fial, PDX Code Guild, 2020-2021; see https://github.com/johnfial/childhood_canvas
// Class presentation, Jan 2021: https://www.youtube.com/watch?v=laxBGSLbT28&t=2260s
//
// How it works:
//   Every key release (keyup) looks up KeyboardEvent.code in `key_actions`. Letter keys add a picture
//   from PICTURES at a random spot on a Konva stage, any other key draws a random circle, Space clears,
//   Numpad0-9 open a YouTube video in a modal and Escape closes it. The mouse (or a finger) either
//   drags pictures around ("move" mode) or draws with the pen ("draw" mode).
//   The stage uses a fixed "design" coordinate space of DESIGN_WIDTH x DESIGN_HEIGHT, the size of the
//   original canvas, and fit_stage_to_window() scales the whole stage to the available screen height.
//   That way picture sizes and positions mean the same thing on every monitor.
// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /

const DESIGN_WIDTH = 1300
const DESIGN_HEIGHT = 1100
const MIN_STAGE_SCALE = 0.35
const MAX_STAGE_SCALE = 2.5
const CANVAS_BACKGROUND = 'rgb(0, 112, 6)' // keep in sync with --canvas-bg in main.css

// Letter key -> picture. `scale` multiplies the image's natural size.
// Most pictures are from Pixabay; the author is part of each file name. See the credits in the side panel.
const MEDIA_PATH = 'static/media/'
const PICTURES = {
    KeyA: { name: 'ambulance',    file: 'A_pixabay_Clker-Free-Vector-Images_ambulance-24405.svg',  scale: 1 },
    KeyB: { name: 'banana ape',   file: 'B_pixabay_Clker-Free-Vector-Images_banana_ape-44564.svg', scale: 2 },
    KeyC: { name: 'cement mixer', file: 'C_cement-mixer_pixabay_Grafikingenieur-5630778.svg',      scale: 5 },
    KeyD: { name: 'dolphin',      file: 'D_dolphin_pixabay_Clker-Free-Vector-Images-41436.svg',    scale: 2 },
    KeyE: { name: 'elephant',     file: 'E_elephant_Pixabay_Clker-Free-Vector-Images-24732.svg',   scale: 1 },
    KeyF: { name: 'flower',       file: 'F_pixabay_roark_rose-398576.svg',                         scale: 2 },
    KeyG: { name: 'gorilla',      file: 'G_gorilla_mohamed_hassan-4309441.svg',                    scale: 0.6 },
    KeyH: { name: 'hospital',     file: 'H_stockio-com_hospital.svg',                              scale: 1 },
    KeyI: { name: 'insect',       file: 'I_insect_beetle_OpenClipart-Vectors_155017.svg',          scale: 1 },
    KeyJ: { name: 'jug (jarra)',  file: 'J_pixabay_OpenClipart-Vectors_jug-158910.svg',            scale: 1.5 },
    KeyK: { name: 'kiwi',         file: 'K_kiwi_Clker-Free-Vector-Image-42895.svg',                scale: 1 },
    KeyL: { name: 'lion',         file: 'L_lion_OpenClipart-Vectors_africa-1300564.svg',           scale: 1.5 },
    KeyM: { name: 'mango',        file: 'M_OpenClipart-Vectors_mango-1295471.svg',                 scale: 0.1 },
    KeyN: { name: 'nine',         file: 'N_9_Clker-Free-Vector-Images_nine-38583.svg',             scale: 0.8 },
    KeyO: { name: 'opera house',  file: 'O_opera_sydney_OpenClipart-Vectors-148858.svg',           scale: 1 },
    KeyP: { name: 'pineapple',    file: 'P_stux_pineapple-300038.svg',                             scale: 1 },
    KeyQ: { name: 'quesadilla',   file: 'Q_OpenClipart-Vectors_quesadilla-575610.svg',             scale: 0.8 },
    KeyR: { name: 'radio',        file: 'R_radio_pixabay_OpenClipart-Vectors_146124.svg',          scale: 1.5 },
    KeyS: { name: 'snake',        file: 'S_rattlesnake_pixabay_OpenClipart-Vectors-159135.svg',    scale: 1 },
    KeyT: { name: 'taxi',         file: 'T_taxi_freepngimg-com_33090-6-taxi-driver-clipart.png',   scale: 0.7 },
    KeyU: { name: 'unicorn',      file: 'U_pixabay_Lohrelei_unicorn-1237449.svg',                  scale: 2 },
    KeyV: { name: 'violin',       file: 'V_pixabay_Clker-Free-Vector-Images_violin-33610.svg',     scale: 2 },
    KeyW: { name: 'whiskey',      file: 'W_whiskey_pixabay_juhele-4397841.svg',                    scale: 0.2 },
    KeyX: { name: 'xylophone',    file: 'X_xylophone_pixabay_Clker-Free-Vector-308024.svg',        scale: 1 },
    KeyY: { name: 'yogurt',       file: 'Y_yogurt_mohamed_hassan-4379616.svg',                     scale: 1 },
    KeyZ: { name: 'zigzag',       file: 'Z_zigzag_chevron_Clker-Free-Vector-Images_26403.svg',     scale: 1 },
}

// Numpad0-9 -> YouTube videos (the "parents can program shortcuts to their toddler's favorite videos" idea).
const VIDEOS = [
    'https://www.youtube.com/embed/sYwRV7WHzm8?autoplay=1', // 0 Silent Night
    'https://www.youtube.com/embed/zRxX63txOXk?autoplay=1', // 1 Pupu Hinuhinu
    'https://www.youtube.com/embed/ssHkMWcGat4?autoplay=1', // 2 Arecibo Observatory collapse, 1 Dec 2020
    'https://www.youtube.com/embed/FezVApPddqU?autoplay=1', // 3 Mele Kalikimaka, psych version (was noted as not working in 2021)
    'https://www.youtube.com/embed/mjcuxw_HJtw?autoplay=1', // 4 Humuhumunukunukuapua'a (Hawai'i state fish)
    'https://www.youtube.com/embed/1h2BqSS5R3U?autoplay=1', // 5 Alicia Keys, at-home spin on "My House"
    'https://www.youtube.com/embed/XqZsoesa55w?autoplay=1', // 6 Baby Shark Dance (was noted as not working in 2021)
    'https://www.youtube.com/embed/wCrtk-pyP0I?autoplay=1', // 7 How Microwaving Grapes Makes Plasma
    'https://www.youtube.com/embed/wCrtk-pyP0I?autoplay=1', // 8 (same)
    'https://www.youtube.com/embed/wCrtk-pyP0I?autoplay=1', // 9 (same)
]

// Pen tool choices shown in the side panel.
const PEN_COLORS = ['white', 'black', 'red', 'orange', 'yellow', 'lime', 'deepskyblue', 'violet', 'hotpink']
const PEN_SIZES = [
    { label: 'thin',   width: 4 },
    { label: 'medium', width: 12 },
    { label: 'thick',  width: 28 },
]

// Colors for the random circles drawn by unmapped keys. Weighted on purpose: lots of white, black and
// rainbow colors, then every CSS color name once. Thanks to https://gist.github.com/bobspace/2712980
const RANDOM_CIRCLE_COLORS = [
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
]

// The original welcome screen (removed Nov 2026 so the canvas starts empty) showed this text, a blue
// circle and a 4x butterfly, all left over from the very first Konva drag-and-drop test:
//   "Welcome to Childhood Canvas, / Please go grab a tea of 'anise. / Now you're on campus! /
//    Make your browser fullscreen (F11), / Click the keyboard's buttons, find some beans, /
//    Remember: share this page as a meme! / (Numpad opens preset videos, too!)"

let vue_app = new Vue({
    el: '#vue_app',
    data: {
        fullscreen: false,
        last_key: '',
        key_log: '',
        stage_scale: 1,
        // Mouse / touch tool:
        tool_mode: 'move',          // 'move' drags pictures around, 'draw' uses the pen
        pen_colors: PEN_COLORS,
        pen_sizes: PEN_SIZES,
        pen_color: 'white',
        pen_width: 12,
        save_status: '',
        // Video modal (Numpad0-9):
        show_video_modal_show_boolean: false,
        video_modal_selected_URL: '',
    },
    created: function() {
        // Konva objects are kept OUT of data() on purpose: Vue 2 would otherwise try to make every
        // Konva node reactive, which is slow and can interfere with Konva's own internals.
        this.konva = { stage: null, layer: null, background_layer: null, background_rect: null }
        this.pen = { drawing: false, line: null }
        this.key_actions = {}
        this.tree_context = null
        this.fit_pending = false
        this.save_status_timer = null
    },
    methods: {
        // ---------------------------------------------------------------- keyboard
        keypress_listener: function(event) {
            // KeyboardEvent.code is the PHYSICAL key (same for every keyboard layout); KeyboardEvent.key is the character.
            // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
            const code = event.code
            this.last_key = code
            this.key_log += `${code}, `
            if (this.key_log.length > 1500) this.key_log = this.key_log.slice(-1500)
            const action = this.key_actions[code]
            if (action) {
                action()
            } else {
                this.key_actions.default()   // any key without its own picture draws a random circle
            }
        },
        unfocus: function(event) {
            // After a mouse click on a panel button, drop keyboard focus so that the child's next
            // Space or Enter press does not "click" that same button again.
            if (event && event.currentTarget && event.currentTarget.blur) event.currentTarget.blur()
        },

        // ---------------------------------------------------------------- stage size
        fit_stage_to_window: function() {
            const stage = this.konva.stage
            if (!stage) return
            const box = stage.container().getBoundingClientRect()
            const width = Math.max(1, Math.floor(box.width))
            const height = Math.max(1, Math.floor(box.height))
            // Fit by height: the design height always fills the canvas area, the width follows the monitor.
            const scale = Math.min(MAX_STAGE_SCALE, Math.max(MIN_STAGE_SCALE, height / DESIGN_HEIGHT))
            this.stage_scale = scale
            stage.size({ width: width, height: height })
            stage.scale({ x: scale, y: scale })
            this.konva.background_rect.size({ width: width / scale, height: height / scale })
            stage.batchDraw()
        },
        schedule_fit: function() {
            if (this.fit_pending) return
            this.fit_pending = true
            window.requestAnimationFrame(() => {
                this.fit_pending = false
                this.fit_stage_to_window()
            })
        },
        design_size: function() {
            // The visible canvas in design units (see the note at the top of the file).
            const stage = this.konva.stage
            return { width: stage.width() / this.stage_scale, height: stage.height() / this.stage_scale }
        },
        random_position: function() {
            const size = this.design_size()
            return { x: Math.floor(Math.random() * size.width), y: Math.floor(Math.random() * size.height) }
        },

        // ---------------------------------------------------------------- pictures and shapes
        add_picture: function(key) {
            const picture = PICTURES[key]
            const position = this.random_position()
            Konva.Image.fromURL(MEDIA_PATH + picture.file, (image) => {
                image.setAttrs({
                    x: position.x,
                    y: position.y,
                    scaleX: picture.scale,
                    scaleY: picture.scale,
                    draggable: this.tool_mode === 'move',
                    name: 'picture',
                })
                this.add_grab_cursor(image)
                this.konva.layer.add(image)
                this.konva.layer.batchDraw()
            })
        },
        draw_random_circle: function() {
            const position = this.random_position()
            const circle = new Konva.Circle({
                x: position.x,
                y: position.y,
                radius: 40,
                fill: this.pick_random_color(),
                stroke: 'white',
                strokeWidth: 4,
                draggable: this.tool_mode === 'move',
                name: 'circle',
            })
            this.add_grab_cursor(circle)
            this.konva.layer.add(circle)
            this.konva.layer.batchDraw()
        },
        pick_random_color: function() {
            return RANDOM_CIRCLE_COLORS[Math.floor(Math.random() * RANDOM_CIRCLE_COLORS.length)]
        },
        add_grab_cursor: function(node) {
            // In move mode show a hand over things that can be dragged. In draw mode the whole canvas
            // shows the pen crosshair instead (see set_tool_mode).
            node.on('mouseover', () => { if (this.tool_mode === 'move') this.konva.stage.container().style.cursor = 'grab' })
            node.on('mouseout', () => { if (this.tool_mode === 'move') this.konva.stage.container().style.cursor = 'default' })
        },
        clear_canvas: function(event) {
            this.unfocus(event)
            // Destroy the drawing layer and start a fresh one. The green background layer stays.
            this.konva.layer.destroy()
            this.konva.layer = new Konva.Layer()
            this.konva.stage.add(this.konva.layer)
            this.key_log = ''
        },

        // ---------------------------------------------------------------- mouse / touch tools
        set_tool_mode: function(mode, event) {
            this.unfocus(event)
            this.tool_mode = mode
            const draggable = mode === 'move'
            this.konva.stage.find('Image, Circle').each((node) => node.draggable(draggable))
            this.konva.stage.container().style.cursor = draggable ? 'default' : 'crosshair'
        },
        set_pen_color: function(color, event) {
            this.pen_color = color
            this.set_tool_mode('draw', event)
        },
        set_pen_width: function(width, event) {
            this.pen_width = width
            this.set_tool_mode('draw', event)
        },
        pointer_position: function() {
            // Pointer position in design units (the stage is scaled, see fit_stage_to_window).
            const p = this.konva.stage.getPointerPosition()
            return p ? { x: p.x / this.stage_scale, y: p.y / this.stage_scale } : null
        },
        pen_down: function(e) {
            if (this.tool_mode !== 'draw') return
            const p = this.pointer_position()
            if (!p) return
            if (e && e.evt && e.evt.type === 'mousedown') e.evt.preventDefault() // no text selection while drawing
            this.pen.drawing = true
            this.pen.line = new Konva.Line({
                points: [p.x, p.y, p.x, p.y],
                stroke: this.pen_color,
                strokeWidth: this.pen_width,
                lineCap: 'round',
                lineJoin: 'round',
                listening: false,   // strokes never block clicks or get dragged
                name: 'pen-stroke',
            })
            this.konva.layer.add(this.pen.line)
            this.konva.layer.batchDraw()
        },
        pen_move: function() {
            if (!this.pen.drawing || !this.pen.line) return
            const p = this.pointer_position()
            if (!p) return
            this.pen.line.points(this.pen.line.points().concat([p.x, p.y]))
            this.konva.layer.batchDraw()
        },
        pen_up: function() {
            this.pen.drawing = false
            this.pen.line = null
        },

        // ---------------------------------------------------------------- save
        canvas_save_image: function(event) {
            this.unfocus(event)
            let data_url
            try {
                // pixelRatio 2 gives a crisp file; the background layer makes it green instead of transparent.
                data_url = this.konva.stage.toDataURL({ mimeType: 'image/png', pixelRatio: 2 })
            } catch (error) {
                console.error('canvas_save_image() failed:', error)
                window.alert(`Sorry, the browser would not let the page save the picture (${error.message}).
                    Please take a screenshot instead:
                    Mac: Shift+Cmd+5. Windows: Start > type 'Snipping'. Linux: PrtSc.`)
                return
            }
            const link = document.createElement('a')
            link.href = data_url
            link.download = `childhood-canvas-${this.timestamp_for_filename()}.png`
            document.body.appendChild(link)
            link.click()
            link.remove()
            this.save_status = `Saved ${link.download} to your Downloads folder.`
            clearTimeout(this.save_status_timer)
            this.save_status_timer = setTimeout(() => { this.save_status = '' }, 8000)
        },
        timestamp_for_filename: function() {
            const d = new Date()
            const pad = (n) => String(n).padStart(2, '0')
            return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}_${pad(d.getHours())}-${pad(d.getMinutes())}-${pad(d.getSeconds())}`
        },

        // ---------------------------------------------------------------- fullscreen, reload, videos
        fullscreen_toggle: function(event) {
            this.unfocus(event)
            // https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
            const root = document.documentElement
            if (!document.fullscreenElement && !document.webkitFullscreenElement) {
                const request = root.requestFullscreen || root.webkitRequestFullscreen
                if (request) {
                    const result = request.call(root)
                    if (result && result.catch) result.catch((error) => console.warn('fullscreen refused:', error))
                }
            } else {
                const exit = document.exitFullscreen || document.webkitExitFullscreen
                if (exit) exit.call(document)
            }
        },
        on_fullscreen_change: function() {
            // Fired for our button AND for the browser's own F11, so the flag stays correct either way.
            this.fullscreen = !!(document.fullscreenElement || document.webkitFullscreenElement)
            this.schedule_fit()
        },
        page_reload: function() {
            window.location.reload()
        },
        open_video: function(n) {
            this.video_modal_selected_URL = VIDEOS[n]
            this.show_video_modal_show_boolean = true
        },
        close_video: function() {
            this.show_video_modal_show_boolean = false
        },

        // ---------------------------------------------------------------- the little tree, top right
        // Modified from, credits to: https://codepen.io/ntaylor09/pen/vKGePr (Nicole Eyo)
        draw_tree_animated_from_NicoleEyO: function() {
            var ctx = this.tree_context
            var timeout = 500 // pause in ms before the next tree
            var length, divergence, reduction, line_width, start_points = []
            var W = 300
            var H = 300

            function init() {
                ctx.fillStyle = "black"
                ctx.fillRect(0, 0, W, H)
                length = 30 + Math.round(Math.random() * 50)        // trunk length
                divergence = 15 + Math.round(Math.random() * 50)    // angle between branches
                reduction = Math.round(50 + Math.random() * 20) / 100 // each branch is this fraction of the previous
                line_width = 15
                var trunk = { x: W / 2, y: length + 30, angle: 90 }
                start_points = []
                start_points.push(trunk)
                // y grows upwards here, hence H - y below
                ctx.beginPath()
                ctx.moveTo(trunk.x, H - 5)
                ctx.lineTo(trunk.x, H - trunk.y)
                ctx.strokeStyle = "green"
                ctx.lineWidth = line_width
                ctx.stroke()
                branches()
            }
            function branches() {
                length = length * reduction
                line_width = line_width * reduction
                ctx.lineWidth = line_width
                var new_start_points = []
                ctx.beginPath()
                for (var i = 0; i < start_points.length; i++) {
                    var sp = start_points[i]
                    // two branches leave every start point
                    var ep1 = get_endpoint(sp.x, sp.y, sp.angle + divergence, length)
                    var ep2 = get_endpoint(sp.x, sp.y, sp.angle - divergence, length)
                    ctx.moveTo(sp.x, H - sp.y)
                    ctx.lineTo(ep1.x, H - ep1.y)
                    ctx.moveTo(sp.x, H - sp.y)
                    ctx.lineTo(ep2.x, H - ep2.y)
                    ep1.angle = sp.angle + divergence
                    ep2.angle = sp.angle - divergence
                    new_start_points.push(ep1)
                    new_start_points.push(ep2)
                }
                ctx.strokeStyle = length < 10 ? "red" : "green"
                ctx.stroke()
                start_points = new_start_points
                if (length > 2) setTimeout(branches, 100)
                else setTimeout(init, timeout)
            }
            function get_endpoint(x, y, a, length) {
                return { x: x + length * Math.cos(a * Math.PI / 180), y: y + length * Math.sin(a * Math.PI / 180) }
            }
            init()
        },
    },
    mounted: function() {
        console.log(`Childhood Canvas: mounted with window size ${window.innerWidth} x ${window.innerHeight}.`)

        document.addEventListener('keyup', this.keypress_listener) // keyup, not keydown: no auto-repeat floods
        document.addEventListener('fullscreenchange', this.on_fullscreen_change)
        document.addEventListener('webkitfullscreenchange', this.on_fullscreen_change)
        window.addEventListener('resize', this.schedule_fit)

        // Konva stage, see https://konvajs.org/api/Konva.Stage.html
        const stage = new Konva.Stage({ container: 'div_konva_canvas', width: DESIGN_WIDTH, height: DESIGN_HEIGHT })
        this.konva.stage = stage
        // Background layer: a green rectangle, so saved PNGs are not transparent. It survives "clear".
        this.konva.background_layer = new Konva.Layer({ listening: false })
        this.konva.background_rect = new Konva.Rect({ x: 0, y: 0, width: DESIGN_WIDTH, height: DESIGN_HEIGHT, fill: CANVAS_BACKGROUND, name: 'background' })
        this.konva.background_layer.add(this.konva.background_rect)
        stage.add(this.konva.background_layer)
        // Drawing layer: pictures, circles and pen strokes.
        this.konva.layer = new Konva.Layer()
        stage.add(this.konva.layer)
        this.fit_stage_to_window()

        // Pen tool, mouse and touch:
        stage.on('mousedown touchstart', this.pen_down)
        stage.on('mousemove touchmove', this.pen_move)
        stage.on('mouseup touchend', this.pen_up)
        window.addEventListener('mouseup', this.pen_up) // button released outside the canvas

        // The small animated tree:
        this.tree_context = document.getElementById('canvas_tree').getContext('2d')
        this.draw_tree_animated_from_NicoleEyO()

        // Key -> action lookup (KeyboardEvent.code values):
        const actions = {
            default: () => this.draw_random_circle(),
            Space: () => this.clear_canvas(),
            F11: () => {},   // the browser toggles fullscreen itself; on_fullscreen_change keeps our flag in sync
            Escape: () => this.close_video(),
        }
        for (const key of Object.keys(PICTURES)) actions[key] = () => this.add_picture(key)
        for (let n = 0; n <= 9; n++) actions['Numpad' + n] = () => this.open_video(n)
        this.key_actions = actions
    },
})

// YouTube video modal, opened by the numpad keys. Based on https://vuejs.org/v2/examples/modal.html
Vue.component("modal", {
    props: {
        source_url: String,
        show_modal: Boolean,
    },
    template: `
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        <span class="close" @click="$emit('close')">&times;</span>
                        <slot name="header"></slot>
                    </div>
                    <div class="modal-body" v-focus>
                        <slot name="body"></slot>
                        <iframe
                        v-focus
                        width="560"
                        height="315"
                        :src=source_url
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                        ></iframe>
                    </div>
                    <div class="modal-footer">
                        <slot name="footer">
                            <button class="modal-default-button" @click="$emit('close')">Close</button>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
    `,
})

// "v-focus" on an element focuses it when inserted, see https://stackoverflow.com/questions/34941829
Vue.directive('focus', {
    inserted: function(el) {
        el.focus()
    },
})
