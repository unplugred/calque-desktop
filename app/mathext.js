var plot = [];
var hastime = false;

math.import({
	pingpong: math.typed('pingpong', {
		'number': function(a) {
			return math.abs(math.mod((a-1)/2,1)*2-1);
		},
		'number, number': function(a, b) {
			if(b == 0) return 0;
			return math.abs(math.mod((a-b)/(b*2),1)*b*2-b);
		},
		'Array': function(a) {
			return math.map(a, n => math.abs(math.mod((n-1)/2,1)*2-1));
		},
		'Array, number': function(a, b) {
			return math.map(a, n => math.abs(math.mod((n-b)/(b*2),1)*b*2-b));
		}
	}),
	time: function() {
		hastime = true;
		return performance.now()/1000;
	},
	x: math.evaluate("range(-1,1,.01)"),
	plot: math.typed('plot', {
		'Array': function(a) {
			plot.push({ min: -1, max: 1, data: a });
			return a;
		},
		'Array, number, number': function(a, min, max) {
			plot.push({ min: min, max: max, data: a });
			return a;
		},
		'number': function(a) {
			plot.push({ min: -1, max: 1, data: [a] });
			return a;
		},
		'number, number, number': function(a, min, max) {
			plot.push({ min: min, max: max, data: [a] });
			return a;
		}
	}),
	cube: math.typed('cube', { 'Array': function(a) { return math.map(a, math.cube); } }),
	exp: math.typed('exp', { 'Array': function(a) { return math.map(a, math.exp); } }),
	expm1: math.typed('expm1', { 'Array': function(a) { return math.map(a, math.expm1); } }),
	sin: math.typed('sin', { 'Array': function(a) { return math.map(a, math.sin); } }),
	sqrt: math.typed('sqrt', { 'Array': function(a) { return math.map(a, math.sqrt); } }),
	square: math.typed('square', { 'Array': function(a) { return math.map(a, math.square); } })
});
math.import({
	multiply: math.dotMultiply,
	divide: math.dotDivide,
	pow: math.dotPow
},{override:true});

function update(timestamp) {
	if(hastime) {
		calque.recalc();
		calque.readSelection();
		calque.repaint();
		requestAnimationFrame(update);
	} else {
		setTimeout(update,500);
	}
}
requestAnimationFrame(update);

var canvas = document.getElementById("canvas");
var interf = document.getElementsByClassName("interface")[0];
var ctx = canvas.getContext("2d");
function drawplot() {
	if(canvas.width != interf.offsetWidth) canvas.width = interf.offsetWidth;
	if(canvas.height != interf.offsetHeight) canvas.height = interf.offsetHeight;
	ctx.clearRect(0,0,canvas.width,canvas.height);
	for(let p = 0; p < plot.length; ++p) {
		let unit = canvas.width/(plot[p].data.length-1);
		ctx.beginPath();
		ctx.strokeStyle = linecolor;
		ctx.moveTo(0,(1-(plot[p].data[0]-plot[p].min)/(plot[p].max-plot[p].min))*canvas.height);
		if(plot[p].data.length == 1)
			ctx.lineTo(canvas.width,(1-(plot[p].data[0]-plot[p].min)/(plot[p].max-plot[p].min))*canvas.height);
		else for(let x = 1; x < plot[p].data.length; ++x)
			ctx.lineTo(x*unit,(1-(plot[p].data[x]-plot[p].min)/(plot[p].max-plot[p].min))*canvas.height);
		ctx.stroke();
	}
}

window.onresize = drawplot;
