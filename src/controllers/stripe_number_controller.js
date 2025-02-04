import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  handle({ target }) {
    if (target.value == "") {
      return;
    }
    if (Number(target.value) < 1) {
      target.value = 1;
      return;
    }

    if (Number(target.value) > 4) {
      target.value = 4;
    }
  }
}
