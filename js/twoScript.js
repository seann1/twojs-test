var elem = document.getElementById('anim');
var params = {width: $('#anim').width(), height: $('#anim').height()};
var two = new Two(params).appendTo(elem);

function colorCheck(color) {
	if (color > 254) {
		color = 0;
	} else {
		color += 20;
	}
}
var rectName = 1;
var curveName = 1;
var center = 0.1;
var rectangles = [];
var curves = [];
var blue = 0;
var red = 0;
var green = 0;
var windowHeight = two.height;
var windowWidth = two.width;

function makeShapes(center, red, green, blue, windowWidth, windowHeight, rotationNum) {

	var curve = two.makeCurve(110, 100, 120, 50, 140, (center * 2), 160, (center * 3), 180, (center * 4), 190, 100, true);
	curve.linewidth = Math.sin(center) * 30;
	curve.stroke = 'rgb(' + green.toString() + ',' + blue.toString() + ',' + red.toString() +')';
	curve.center(center, 0);
	curve.rotation = Math.PI / rotationNum;
	curve.translation.set(two.width / 2, two.height /2);
	curve.scale = 0.5;
	curve.noFill();
	curves.push(curve);

	var rectangle = two.makeCurve(110, (center * 2), (center * 1.5), (center * 2), 160, (center * 3), 180, (center * 2.5), 190, (center * 2), true);
	rectangle.noFill();
	rectangle.stroke = 'rgb(' + green.toString() + ',' + red.toString() + ',' + blue.toString() +')';
	rectangle.center(center, 0);
	rectangle.translation.set(two.width / 2, two.height /2);
	rectangle.rotation = Math.PI / rotationNum;
	rectangle.scale = 0.5;
	rectangles.push(rectangle);

}
var rotationNum = 1;
var rotationAnim = .01;
var scaleAnim = 100;

window.setInterval(function() {
	if (rotationNum === 1) {
		rotationNum = 5;
		rotationAnim = .1;
		scaleAnim = -40;
	} else {
		rotationNum = 1;
		rotationAnim = .03;
		scaleAnim = 3;
	}
	console.log(rotationNum);
}, 3000);

two.bind('update', function(frameCount) {
	$.each(rectangles, function(index, value) {
		console.log(value.scale);
		if (value.scale > 2) {
			windowWidth += 20;
			windowHeight += 20;
			if (blue > 254) {
				blue = 0;
			} else {
				blue += 20;
			}

			if (red > 254) {
				red = 0;
			} else {
				red += 17;
			}

			if (green > 254) {
				green = 0;
			} else {
				green += 5;
			}
			value.scale = 0.5;
			value.rotation = 2;
			center += 0.4;
		}
		var t = (value.scale) * 1.0001 / 20;
		value.scale += t / scaleAnim;
		value.rotation += t * rotationAnim * Math.PI;
	});

	$.each(curves, function(index, value) {
		if (value.scale > 2) {
			windowWidth += 20;
			windowHeight += 20;
			if (blue > 254) {
				blue = 0;
			} else {
				blue += 20;
			}

			if (red > 254) {
				red = 0;
			} else {
				red += 17;
			}

			if (green > 254) {
				green = 0;
			} else {
				green += 5;
			}
			value.scale = 0.5;
			value.rotation = 2;
			center += 0.4;
		}
		var t = (value.scale) * 1.0001 / 20;
		value.scale += t / scaleAnim;
		value.rotation += t * rotationAnim * Math.PI;
	});
}).play();
window.setInterval(function() {
	if (rectangles.length > 50) {
		$("path").first().remove();
		rectangles.shift();
	}

	if (curves.length > 50) {
		$("path").first().remove();
		curves.shift();
	}
	makeShapes(center, red, green, blue, windowWidth, windowHeight, (center * 2), rotationNum);
	center += 1;
}, 500);
two.update();