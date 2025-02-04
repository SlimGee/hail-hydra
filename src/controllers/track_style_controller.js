import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["styleParams", "prompt", "template"];
  connect() {
    this.handle({ target: this.promptTarget });
  }

  handle({ target }) {
    console.log(target.value);
    if (target.value == "Yes") {
      this.styleParamsTarget.innerHTML = this.templateTarget.innerHTML;
    } else {
      this.styleParamsTarget.innerHTML = "";
    }
  }
}
