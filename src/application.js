import { Application } from "@hotwired/stimulus";
import HelloController from "./controllers/hello_controller";
import CustomizeController from "./controllers/customize_controller";
import InputNumberController from "./controllers/input_number_controller";
import DoorController from "./controllers/door_controller";

window.Stimulus = Application.start();

Stimulus.register("hello", HelloController);
Stimulus.register("customize", CustomizeController);
Stimulus.register("input-number", InputNumberController);
Stimulus.register("door", DoorController);
