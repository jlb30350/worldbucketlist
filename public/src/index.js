import { initMap } from "./map";
import { buildAllDreams } from "./dream";

function init() {
  initMap();
  buildAllDreams();
}
window.initMap = init;
