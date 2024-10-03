import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["leftFrame", "rightFrame", "topFrame", "bottomFrame"];

  static classes = [
    "activeFrame",
    "activeFrameChildren",
    "defaultFrame",
    "defaultFrameChildren",
  ];

  highlight({ target, params }) {
    const targetElement = this[`${params.target}Target`];
    targetElement.classList.remove(...this.defaultFrameClasses);
    targetElement.firstElementChild.classList.remove(
      ...this.defaultFrameChildrenClasses,
    );
    targetElement.classList.add(...this.activeFrameClasses);
    targetElement.firstElementChild.classList.add(
      ...this.activeFrameChildrenClasses,
    );
  }

  unhighlight({ target, params }) {
    const targetElement = this[`${params.target}Target`];
    targetElement.classList.remove(...this.activeFrameClasses);
    targetElement.firstElementChild.classList.remove(
      ...this.activeFrameChildrenClasses,
    );
    targetElement.classList.add(...this.defaultFrameClasses);
    targetElement.firstElementChild.classList.add(
      ...this.defaultFrameChildrenClasses,
    );
  }
}
