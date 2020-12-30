const div_clock = document.getElementById('clock');

let clock_as_p = document.createElement('p');

div_clock.appendChild(clock_as_p);
current_time = new Date();
clock_as_p.innerText = current_time;

let interval = setInterval(function() {
    current_time = new Date();
    console.log(`updating time: ${current_time}`);
    clock_as_p.innerText = current_time;
}, 10000);
//

// ##############################################################################
// # John Fial, PDX Code Guild, 2020-2021, www,johnfial.com
// 
// ##############################################################################
