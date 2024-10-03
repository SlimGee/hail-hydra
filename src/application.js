import { Application } from "@hotwired/stimulus";
import HelloController from "./controllers/hello_controller";
import CustomizeController from "./controllers/customize_controller";

window.Stimulus = Application.start();

Stimulus.register("hello", HelloController);
Stimulus.register("customize", CustomizeController);
