import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["template", "destination"];

  handle({ target }) {
    if (target.value == "custom") {
      this.destinationTarget.innerHTML = this.templateTarget.innerHTML;
    } else {
      this.destinationTarget.innerHTML = "";
    }
  }
}
