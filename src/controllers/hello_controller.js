import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["leftFrame", "rightFrame", "topFrame", "bottomFrame"];

  connect() {
    console.log("Hello, Stimulus! Customized! ddh dhdh dhd");
  }

  highlight({ target, params }) {
    console.log("Highlighting", target, "with", params);
  }
}
