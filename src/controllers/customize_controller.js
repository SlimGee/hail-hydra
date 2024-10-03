import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["leftFrame", "rightFrame", "topFrame", "bottomFrame"];

  FRAME_HIGHLITED_CLASSES = [
    "bg-orange-500",
    "border-orange-500",
    "text-white",
  ];

  FRAME_CHILDREN_ACTIVE_CLASSES = ["bg-orange-500", "text-white"];

  FRAME_DEFAULT_CLASSES = ["bg-gray-500"];
  FRAME_CHILDREN_DEFAULT_CLASSES = ["bg-gray-200"];

  highlight({ target, params }) {
    const targetElement = this[`${params.target}Target`];
    targetElement.classList.remove(...this.FRAME_DEFAULT_CLASSES);
    targetElement.firstElementChild.classList.remove(
      ...this.FRAME_CHILDREN_DEFAULT_CLASSES,
    );
    targetElement.classList.add(...this.FRAME_HIGHLITED_CLASSES);
    targetElement.firstElementChild.classList.add(
      ...this.FRAME_CHILDREN_ACTIVE_CLASSES,
    );
  }

  unhighlight({ target, params }) {
    const targetElement = this[`${params.target}Target`];
    targetElement.classList.remove(...this.FRAME_HIGHLITED_CLASSES);
    targetElement.firstElementChild.classList.remove(
      ...this.FRAME_CHILDREN_ACTIVE_CLASSES,
    );
    targetElement.classList.add(...this.FRAME_DEFAULT_CLASSES);
    targetElement.firstElementChild.classList.add(
      ...this.FRAME_CHILDREN_DEFAULT_CLASSES,
    );
  }
}
