import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    tippy(this.element, {
      content: this.contentValue,
      arrow: true,
      interactive: true,
      interactiveBorder: 20,
      interactiveDebounce: 0,
      maxWidth: 300,
      placement: "left",
      trigger: "focus",
      allowHTML: true,
    });
  }
  disconnect() {
    this.tippy.destroy();
  }
  get contentValue() {
    return `<div class="text-left">
    <h4 class="text-lg font-semibold text-white">Start here</h4>
    <p>Enter the name of your wardrobe</p>
    `;
  }
}
