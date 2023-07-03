
const Main = imports.ui.main;
const St = imports.gi.St;
const Clutter = imports.gi.Clutter;
const Glib = imports.gi.GLib;

function blood_shape(x, y, width, height, opacity=58) {
		let shape = new Clutter.Actor();
		shape.set_size(width, height);
		shape.set_position(x, y);
		// set color to be white
		shape.set_background_color(
		new Clutter.Color({red: 255,green: 255,blue: 255,alpha: 255}));
		shape.set_opacity(opacity);
		return shape;
}

function draw_blood_left(x, y) {
		let blood_left_container = new Clutter.Actor({
			name: 'blood_left_container',
			x: x,
			y: y,
		    width: 20, 
		    height: 30,
		});
		blood_left_container.add_child(blood_shape(0, 0, 20, 5));
		blood_left_container.add_child(blood_shape(0, 25, 20, 5));
		blood_left_container.add_child(blood_shape(10, 5, 10, 20));

		return blood_left_container;
}

function draw_blood_frame(x, y) {
		let blood_body = new Clutter.Actor({
			name: 'blood_body',
			x: x,
			y: y,
		    width: 300, 
		    height: 30,
		});
		let opacity = 58;
		for (let i = 0; i < 180; i++) {
			blood_body.add_child(blood_shape(i, 0, 1, 30, opacity));
			opacity -= 0.16;
		}
		for (let i = 0; i < 120; i++) {
			blood_body.add_child(blood_shape(180 + i, 0, 1, 20, opacity));
			opacity -= 0.16;
		}
		
		return blood_body;
}

function draw_blood_bar_left(x, y) {
		let blood_bar_left_container = new Clutter.Actor({
			name: 'blood_bar_left_container',
			x: x,
			y: y,
		    width: 125,
		    height: 15,
		});
		
		let blood_bar_left_white = new St.Widget({
			name: 'blood_bar_left_white',
		    style_class: 'blood_bar_left_white',
		});
		blood_bar_left_white.set_position(0, 0);
		blood_bar_left_container.add_child(blood_bar_left_white);
		let blood_bar_black = new St.Widget({
			name: 'blood_bar_black',
		    style_class: 'blood_bar_left_black',
		});
		blood_bar_black.set_position(2, 2);
		blood_bar_left_container.add_child(blood_bar_black);
		let blood_bar_green = new St.Widget({
			name: 'blood_bar_green',
		    style_class: 'blood_bar_left_green',
		});
		blood_bar_green.set_position(4, 4);
		blood_bar_left_container.add_child(blood_bar_green);

		return blood_bar_left_container;
}

function draw_blood_bar_right(x, y) {
		let blood_bar_right_container = new Clutter.Actor({
			name: 'blood_bar_right_container',
			x: x,
			y: y,
		    width: 120,
		    height: 9,
		});
		let blood_bar_right_white = new St.Widget({
			name: 'blood_bar_right_white',
		    style_class: 'blood_bar_right_white',
		});
		blood_bar_right_white.set_position(0, 0);
		blood_bar_right_container.add_child(blood_bar_right_white);
		let blood_bar_black = new St.Widget({
			name: 'blood_bar_black',
		    style_class: 'blood_bar_right_black',
		});
		blood_bar_black.set_position(0, 2);
		blood_bar_right_container.add_child(blood_bar_black);
		let blood_bar_green = new St.Widget({
			name: 'blood_bar_green',
		    style_class: 'blood_bar_right_green',
		});
		blood_bar_green.set_position(0, 4);
		blood_bar_right_container.add_child(blood_bar_green);
		return blood_bar_right_container;
}

function draw_blood_body(x, y) {
		let blood_body = draw_blood_frame(x, y);
		let name = new St.Label({
				text: 'Kirito', 
				style_class: 'player_name',
		});
		name.set_position(0, 5);
		blood_body.add_child(name);
		blood_body.add_child(draw_blood_bar_left(50, 5));
		blood_body.add_child(draw_blood_bar_right(175, 5));
		let blood_bar_close = new Clutter.Actor({
			name: 'blood_bar_close',
			x: 175,
			y: 16,
		    width: 1,
		    height: 5,
		});
		blood_bar_close.set_background_color(new Clutter.Color({red: 255, green: 255, blue: 255, alpha: 255}));
		blood_bar_close.set_opacity(255);
		blood_body.add_child(blood_bar_close);
		let blood_bar_gray_close = new Clutter.Actor({
			name: 'blood_bar_gray_close',
			x: 173,
			y: 14,
		    width: 2,
		    height: 5,
		});
		blood_bar_gray_close.set_background_color(new Clutter.Color({red: 84, green: 84, blue: 86, alpha: 255}));
		blood_bar_gray_close.set_opacity(255);
		blood_body.add_child(blood_bar_gray_close);
		let blood_bar_green_close = new Clutter.Actor({
			name: 'blood_bar_green_close',
			x: 173,
			y: 9,
		    width: 2,
		    height: 5,
		});
		blood_bar_green_close.set_background_color(new Clutter.Color({red: 124, green: 194, blue: 27, alpha: 255}));
		blood_bar_green_close.set_opacity(255);
		blood_body.add_child(blood_bar_green_close);

		return blood_body;
}

function draw_blood(x, y) {
		let blood_bar = new Clutter.Actor({
			name: 'blood_bar',
			x: x,
			y: y,
		    width: 323, 
		    height: 30,
		});
		blood_bar.add_child(draw_blood_left(0, 0));
		blood_bar.add_child(draw_blood_body(23, 0));

		return blood_bar;
}


function init () {
  // init
}

function enable () {
  // draw the blood bar's left part
	Main.uiGroup.add_actor(draw_blood(5, Main.panel.height + 5));
}

function disable () {
  Main.uiGroup.remove_actor(blood_bar_left_container);
  Main.uiGroup.remove_actor(blood_bar_body);
}
