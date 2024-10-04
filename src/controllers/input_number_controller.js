import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["input"];
  static values = { min: Number, max: Number };

  increment() {
    if (this.maxValue && Number(this.inputTarget.value) >= this.maxValue)
      return;
    this.inputTarget.value = parseInt(this.inputTarget.value, 10) + 1;
    this.inputTarget.dispatchEvent(new Event("input"));
  }

  decrement() {
    if (this.minValue && Number(this.inputTarget.value) <= this.minValue)
      return;

    this.inputTarget.value = parseInt(this.inputTarget.value, 10) - 1;
    this.inputTarget.dispatchEvent(new Event("input"));
  }
}
