import axios from "axios";

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

window.axios = axios;

import { Application } from "@hotwired/stimulus";
import HelloController from "./controllers/hello_controller";
import CustomizeController from "./controllers/customize_controller";
import InputNumberController from "./controllers/input_number_controller";
import DoorController from "./controllers/door_controller";
import TippyController from "./controllers/tippy_controller";
import FrameStyleController from "./controllers/frame_style_controller";
import stripe_number_controller from "./controllers/stripe_number_controller";
import track_style_controller from "./controllers/track_style_controller";
import frame_color_controller from "./controllers/frame_color_controller";

window.Stimulus = Application.start();

Stimulus.register("hello", HelloController);
Stimulus.register("customize", CustomizeController);
Stimulus.register("input-number", InputNumberController);
Stimulus.register("door", DoorController);
Stimulus.register("tippy", TippyController);
Stimulus.register("frame-style", FrameStyleController);
Stimulus.register("stripe-number", stripe_number_controller);
Stimulus.register("track-style", track_style_controller);
Stimulus.register("frame-color", frame_color_controller);
