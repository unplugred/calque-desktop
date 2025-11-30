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
	sqrt: math.typed('sqrt', { 'Array': function(a) { return math.map(a, math.sqrt); } }),
	square: math.typed('square', { 'Array': function(a) { return math.map(a, math.square); } }),

	random: math.typed('random', {
		'number, number, number': function(min, max, n) {
			return Array.from({length: n}, () => (math.random(min,max)));
		}
	}),
	randomInt: math.typed('randomInt', {
		'number, number, number': function(min, max, n) {
			return Array.from({length: n}, () => (math.randomInt(min,max)));
		}
	}),

	acos: math.typed('acos', { 'Array': function(a) { return math.map(a, math.acos); } }),
	acosh: math.typed('acosh', { 'Array': function(a) { return math.map(a, math.acosh); } }),
	acot: math.typed('acot', { 'Array': function(a) { return math.map(a, math.acot); } }),
	acoth: math.typed('acoth', { 'Array': function(a) { return math.map(a, math.acoth); } }),
	acsc: math.typed('acsc', { 'Array': function(a) { return math.map(a, math.acsc); } }),
	acsch: math.typed('acsch', { 'Array': function(a) { return math.map(a, math.acsch); } }),
	asec: math.typed('asec', { 'Array': function(a) { return math.map(a, math.asec); } }),
	asech: math.typed('asech', { 'Array': function(a) { return math.map(a, math.asech); } }),
	asin: math.typed('asin', { 'Array': function(a) { return math.map(a, math.asin); } }),
	asinh: math.typed('asinh', { 'Array': function(a) { return math.map(a, math.asinh); } }),
	atan: math.typed('atan', { 'Array': function(a) { return math.map(a, math.atan); } }),
	atanh: math.typed('atanh', { 'Array': function(a) { return math.map(a, math.atanh); } }),
	cos: math.typed('cos', { 'Array': function(a) { return math.map(a, math.cos); } }),
	cosh: math.typed('cosh', { 'Array': function(a) { return math.map(a, math.cosh); } }),
	cot: math.typed('cot', { 'Array': function(a) { return math.map(a, math.cot); } }),
	coth: math.typed('coth', { 'Array': function(a) { return math.map(a, math.coth); } }),
	csc: math.typed('csc', { 'Array': function(a) { return math.map(a, math.csc); } }),
	csch: math.typed('csch', { 'Array': function(a) { return math.map(a, math.csch); } }),
	sec: math.typed('sec', { 'Array': function(a) { return math.map(a, math.sec); } }),
	sech: math.typed('sech', { 'Array': function(a) { return math.map(a, math.sech); } }),
	sin: math.typed('sin', { 'Array': function(a) { return math.map(a, math.sin); } }),
	sinh: math.typed('sinh', { 'Array': function(a) { return math.map(a, math.sinh); } }),
	tan: math.typed('tan', { 'Array': function(a) { return math.map(a, math.tan); } }),
	tanh: math.typed('tanh', { 'Array': function(a) { return math.map(a, math.tanh); } })
});
math.import({
	multiply: math.dotMultiply,
	divide: math.dotDivide,
	pow: math.dotPow,
	min: math.typed(name, {
		'Array': function(a) {
			min = undefined;
			for(let n = 0; n < a.length; ++n) {
				if(isNaN(a[n]))
					throw new Error('Invalid value '+a[n].toString());
				if(min === undefined || Number(a[n]) < min)
					min = Number(a[n]);
			}
			if(min === undefined)
				throw new Error('Cannot calculate min of an empty array');
			return min;
		},

		'...': function(args) {
			let min = undefined;
			for(let i = 0; i < args.length; ++i) {
				let b = args[i];
				if(typeof b === 'object' && b._data !== undefined)
					b = b._data;
				if(Array.isArray(b)) {
					if(min === undefined) {
						for(let n = 0; n < b.length; ++n) {
							if(isNaN(b[n]))
								throw new Error('Invalid value '+b[n].toString());
						}
						min = Array(b.length);
						for(let n = 0; n < b.length; ++n) {
							min[n] = b[n];
						}
					} else if(Array.isArray(min)) {
						for(let n = 0; n < b.length; ++n) {
							if(isNaN(b[n]))
								throw new Error('Invalid value '+b[n].toString());
							if(n >= min.length)
								min.push(b[n])
							else
								min[n] = Math.min(min[n],b[n]);
						}
					} else {
						let a = min;
						min = Array(b.length);
						for(let n = 0; n < b.length; ++n) {
							if(isNaN(b[n]))
								throw new Error('Invalid value '+b[n].toString());
							min[n] = Math.min(a,b[n]);
						}
					}
				} else {
					if(isNaN(b))
						throw new Error('Invalid value '+b.toString());
					b = Number(b)
					if(min === undefined) {
						min = b;
					} else if(Array.isArray(min)) {
						for(let n = 0; n < min.length; ++n)
							min[n] = Math.min(min[n],b);
					} else {
						min = Math.min(min,b);
					}
				}
			}
			return min;
		}
	}),
	max: math.typed(name, {
		'Array': function(a) {
			max = undefined;
			for(let n = 0; n < a.length; ++n) {
				if(isNaN(a[n]))
					throw new Error('Invalid value '+a[n].toString());
				if(max === undefined || Number(a[n]) < max)
					max = Number(a[n]);
			}
			if(max === undefined)
				throw new Error('Cannot calculate max of an empty array');
			return max;
		},

		'...': function(args) {
			let max = undefined;
			for(let i = 0; i < args.length; ++i) {
				let b = args[i];
				if(typeof b === 'object' && b._data !== undefined)
					b = b._data;
				if(Array.isArray(b)) {
					if(max === undefined) {
						for(let n = 0; n < b.length; ++n) {
							if(isNaN(b[n]))
								throw new Error('Invalid value '+b[n].toString());
						}
						max = Array(b.length);
						for(let n = 0; n < b.length; ++n) {
							max[n] = b[n];
						}
					} else if(Array.isArray(max)) {
						for(let n = 0; n < b.length; ++n) {
							if(isNaN(b[n]))
								throw new Error('Invalid value '+b[n].toString());
							if(n >= max.length)
								max.push(b[n])
							else
								max[n] = Math.max(max[n],b[n]);
						}
					} else {
						let a = max;
						max = Array(b.length);
						for(let n = 0; n < b.length; ++n) {
							if(isNaN(b[n]))
								throw new Error('Invalid value '+b[n].toString());
							max[n] = Math.max(a,b[n]);
						}
					}
				} else {
					if(isNaN(b))
						throw new Error('Invalid value '+b.toString());
					b = Number(b)
					if(max === undefined) {
						max = b;
					} else if(Array.isArray(max)) {
						for(let n = 0; n < max.length; ++n)
							max[n] = Math.max(max[n],b);
					} else {
						max = Math.max(max,b);
					}
				}
			}
			return max;
		}
	})
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
