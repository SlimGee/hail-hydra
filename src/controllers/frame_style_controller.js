import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["template", "destination"];

  handle({ target }) {
    console.log(target.value);
    if (target.value === "dividing-stripes") {
      this.destinationTarget.innerHTML = this.templateTarget.innerHTML;
    }
  }
}
