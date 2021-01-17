/* Time to Biden widget */
/* Adapted from Simon Willison’s script here: https://observablehq.com/@simonw/seconds-to-biden */

async function createWidget() {

  let biden_starts = 1611162000000;
  let seconds_size = 32;
  let text_size = 14;

  if (config.widgetFamily == "medium") {
    seconds_size = 54;
    text_size = 40;
  }

  if (config.widgetFamily == "large") {
    seconds_size = 60;
    text_size = 40;
  }

  let w = new ListWidget();
  w.setPadding(5,5,5,5);

  let gradient = new LinearGradient()
  gradient.locations = [0, 1]
  gradient.colors = [
    new Color("#1119"),
    new Color("#111f"),
  ]

  w.backgroundColor = new Color("#fff");
  w.backgroundGradient = gradient;


  w.addSpacer();

  let timer = w.addDate(new Date(biden_starts));//w.addText((Math.max(0, Math.ceil((biden_starts - Date.now()) / 1000))).toString());
  timer.applyTimerStyle();
  timer.font = Font.ultraLightMonospacedSystemFont(seconds_size);
  timer.textColor = Color.white();
  timer.centerAlignText();

  let toBiden = w.addText("Until Biden");
  toBiden.font = Font.boldSystemFont(text_size);
  toBiden.textColor = Color.white();
  toBiden.centerAlignText();

  w.addSpacer();

  return w;
}

let widget = await createWidget();
// Check if the script is running in
// a widget. If not, show a preview of
// the widget to easier debug it.
if (!config.runsInWidget) {
  config.widgetFamily = "small";
  await widget.presentSmall()
  config.widgetFamily = "medium";
  await widget.presentMedium()
  config.widgetFamily = "large";
  await widget.presentLarge()
}
// Tell the system to show the widget.
Script.setWidget(widget)
Script.complete()