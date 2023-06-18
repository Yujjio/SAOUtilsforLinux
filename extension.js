
const Main = imports.ui.main;
const St = imports.gi.St;
const Clutter = imports.gi.Clutter;
const Glib = imports.gi.GLib;

function left_shape(x, y, width, height) {
  let shape = new Clutter.Actor();
  shape.set_size(width, height);
  shape.set_position(x, y);
  // set color to be white
  shape.set_background_color(
    new Clutter.Color({red: 255,green: 255,blue: 255,alpha: 255}));
  shape.set_opacity(78);
  return shape;
}

function draw_blood_left(x, y) {
  let blood_bar_left_container = new Clutter.Actor({
    name: 'blood_bar_left_container',
    width: 20,
    height: 30,
    x: x,
    y: y,
  });
  let blood_bar_left_shape1 = left_shape(0, 0, 10, 5);
  let blood_bar_left_shape2 = left_shape(0, 25, 10, 5);
  let blood_bar_left_shape3 = left_shape(10, 0, 10, 30);
  blood_bar_left_container.add_child(blood_bar_left_shape1);
  blood_bar_left_container.add_child(blood_bar_left_shape2);
  blood_bar_left_container.add_child(blood_bar_left_shape3);
  return blood_bar_left_container;
}

function draw_blood_body(x, y) {
  let blood_bar_body = new Clutter.Actor({
    name: 'blood_bar_body',
    width: 174,
    height: 30,
    x: x,
    y: y,
  });
  let blood_bar_body_left = new Clutter.Actor({
    name: 'blood_bar_body_left',
    width: 96,
    height: 30,
    x: 0,
    y: 0,
  });
  blood_bar_body_left.set_background_color(
    new Clutter.Color({red: 255, green: 255, blue: 255, alpha: 255}));
  blood_bar_body_left.set_opacity(78);
  blood_bar_body.add_child(blood_bar_body_left);
  for(let i = 78; i > 0; i--) {
    let blood_bar_body_part = new Clutter.Actor({
      name: 'blood_bar_body_part' + (78 - i),
      width: 1,
      height: 30,
      x: 96 + 78 - i,
      y: 0,
    });
    blood_bar_body_part.set_background_color(
      new Clutter.Color({red: 255, green: 255, blue: 255, alpha: 255}));
    blood_bar_body_part.set_opacity(i);
    blood_bar_body.add_child(blood_bar_body_part);
  }
  return blood_bar_body;
}

function draw_blood(x, y) {
  let battery_status = Glib.spawn_command_line_sync(
    'upower -i /org/freedesktop/UPower/devices/battery_BAT1').toString();
  // find the percentage
  let percentage = battery_status.match(/percentage:\s+(\d+)%/)[1];
  // change the percentage to integer
  percentage = parseInt(percentage);
  return show_percentage_container;
}


// blood bar's left part
let blood_bar_left_container = draw_blood_left(5, Main.panel.height + 5);
// x = 5 + 15 + 2
let blood_bar_body = draw_blood_body(27, Main.panel.height + 5);


function init () {
  // init
}

function enable () {
  // draw the blood bar's left part
  // Main.uiGroup.add_actor(blood_bar_left_container);
  // Main.uiGroup.add_actor(blood_bar_body);
  Main.uiGroup.add_actor(draw_blood(27, Main.panel.height + 5));
}

function disable () {
  Main.uiGroup.remove_actor(blood_bar_left_container);
  Main.uiGroup.remove_actor(blood_bar_body);
}