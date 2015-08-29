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
var center = 0.1;
var rectangles = [];
var blue = 0;
var red = 0;
var green = 0;
var windowHeight = two.height;
var windowWidth = two.width;
console.log(two.width)

function makeRect(center, red, green, blue) {

	var rectangle = two.makeRectangle(213, 20, 100, 100);

	rectangle.fill = 'rgb(' + red.toString() + ',' + green.toString() + ',' + blue.toString() +')';
	rectangle.stroke = 'rgb(' + green.toString() + ',' + red.toString() + ',' + blue.toString() +')';
	rectangle.center(center, 0);
	rectangle.translation.set(two.width / 2, two.height /2);
	rectangle.rotation = Math.PI / 10;
	rectangle.scale = 0.5;
	rectangles.push(rectangle);

}

two.bind('update', function(frameCount) {
	console.log(rectangles.length);
	$.each(rectangles, function(index, value) {
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
		value.scale += t / 30;
		value.rotation += t * .1 * Math.PI;
	});
}).play();
window.setInterval(function() {
	if (rectangles.length > 50) {
		$("path").first().remove();
		rectangles.shift();
	}
	makeRect(center, red, green, blue, windowWidth, windowHeight)}, 500);
two.update();