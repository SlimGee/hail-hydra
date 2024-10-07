import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static values = {
    insert: String,
  };

  static targets = ["input"];

  static insertMap = {
    "grey-mirror": "mirror",
    "black-mirror": "black-mirror",
    "painted-glass": "painted-glass",
    "super-white-mirror": "super-white-mirror",
  };

  wasChangedManually = false;

  connect() {}

  insertValueChanged(insert) {
    this.element.classList.remove(...Object.values(this.constructor.insertMap));
    this.element.classList.add(this.constructor.insertMap[insert]);
    this.inputTarget.value = insert;
  }

  setInsert(insert) {
    if (this.wasChangedManually) {
      return;
    }

    this.insertValue = insert;
  }

  insertChanged(event) {
    this.wasChangedManually = true;
    this.insertValue = event.target.value;
  }

  get payload() {
    return {
      insert: this.insertValue,
    };
  }
}
