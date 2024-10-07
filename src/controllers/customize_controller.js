import { Controller } from "@hotwired/stimulus";
import axios from "axios";

export default class extends Controller {
  static targets = [
    "leftFrame",
    "rightFrame",
    "topFrame",
    "bottomFrame",
    "leftFrameInput",
    "rightFrameInput",
    "topFrameInput",
    "bottomFrameInput",
    "doorsContainer",
    "doorTemplate",
    "door",
    "doorsInput",
    "frameColorInput",
    "frameTypeInput",
    "pricing",
  ];

  static classes = [
    "activeFrame",
    "activeFrameChildren",
    "defaultFrame",
    "defaultFrameChildren",
  ];

  static values = {
    leftFrame: Number,
    rightFrame: Number,
    topFrame: Number,
    bottomFrame: Number,
    doors: Number,
    frameColor: String,
    frameType: String,
    productId: Number,
    domain: String,
  };

  static colorMap = {
    white: "border-white",
    black: "border-black",
    "bright-natural": "border-gray-800",
    "matte-natural": "border-slate-600",
  };

  static frameTypes = {
    "semi-frameless": "!border-8",
    frameless: "!border-0",
    "dividing-stripes": "!border-4",
  };

  PRODUCT_VARIANT_ENDPOINT = "/products/__productId__/variants";

  initialize() {
    // Register dynamic event handler for value changes
    Object.keys(this.constructor.values).forEach((value) => {
      if (this[`${value}ValueChanged`]) return;

      this[`${value}ValueChanged`] = function (newValue) {
        this.updatePricing();
        this[`${value}InputTarget`].value = newValue;

        const targetElement = this[`${value}Target`];
        targetElement.firstElementChild.innerHTML = `${newValue}mm`;
      };
    });
  }

  /**
   * Append the number of doors when the value changes
   * Mutate the DOM to show the number of doors
   * @param {Number} doors
   * @returns {void}
   */
  doorsValueChanged(doors) {
    //add or remove doors from the right side

    if (this.doorTargets.length > doors) {
      for (let i = doors; i < this.doorTargets.length; i++) {
        this.doorTargets[i].remove();
      }
      return;
    }

    for (let i = this.doorTargets.length; i < doors; i++) {
      this.doorsContainerTarget.insertAdjacentHTML(
        "beforeend",
        this.doorTemplateTarget.innerHTML.replace(/__index__/g, i + 1),
      );
    }

    this.doorsInputTarget.value = doors;
  }

  domainValueChanged(domain) {
    if (
      window.location.hostname == "localhost" ||
      window.location.hostname == "127.0.0.1"
    ) {
      axios.defaults.baseURL = `http://localhost:3000/`;
    } else {
      axios.defaults.baseURL = `http://${domain.trim()}/apps/api/api`;
    }
  }

  updatePricing() {
    let payload = {};
    let productId = this.productIdValue;

    Object.keys(this.constructor.values).forEach((value) => {
      console.log(this.camelToSnakeCase(value));
      payload[this.camelToSnakeCase(value)] = this[`${value}Value`];
    });

    if (
      window.location.hostname == "localhost" ||
      window.location.hostname == "127.0.0.1"
    ) {
      //let baseUrl = `https://${this.domainValue.trim()}/apps/api/api`;
      let baseUrl =
        "https://703a-2c0f-f8f0-726c-0-1b75-8bda-567d-b358.ngrok-free.app/api";
      let url =
        baseUrl +
        this.PRODUCT_VARIANT_ENDPOINT.replace("__productId__", productId) +
        "?shop=hail-hydra-15.myshopify.com";

      axios
        .post(url, {
          customizations: payload,
        })
        .then((response) => {
          this.pricingTarget.innerHTML = response.data.productVariants[0].price;
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      let url = this.PRODUCT_VARIANT_ENDPOINT.replace(
        "__productId__",
        productId,
      );
      axios
        .post(url, {
          customizations: payload,
        })
        .then((response) => {
          this.pricingTarget.innerHTML = response.data.productVariants[0].price;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  camelToSnakeCase(str) {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  }

  productIdValueChanged(productId) {}

  frameColorValueChanged(color) {
    this.doorsContainerTarget.classList.remove(
      ...Object.values(this.constructor.colorMap),
    );

    this.doorsContainerTarget.classList.add(this.constructor.colorMap[color]);
  }

  /**
   * Handle frame input change events
   * update the corresponding value and show an error message if the value is less than 1
   *
   * @param {Event} event
   * @returns {void}
   */
  frameInputChanged({ params }) {
    const value = Number(this[`${params.target}InputTarget`].value);

    // Reset the error message
    this[`${params.target}InputTarget`].classList.remove("border-red-500");
    const errorMessage = this[`${params.target}InputTarget`].nextElementSibling;
    if (errorMessage) errorMessage.remove();

    //show error message if value is less than 1
    if (value < 1 || isNaN(value)) {
      this.showError(
        this[`${params.target}InputTarget`],
        "Please enter a value greater than 0",
      );

      if (isNaN(value)) {
        this[`${params.target}InputTarget`].value = 0;
      }

      return;
    }

    // Update the corresponding value in state
    this[`${params.target}Value`] = this[`${params.target}InputTarget`].value;
  }

  frameTypeValueChanged(type) {
    this.doorsContainerTarget.classList.remove(
      ...Object.values(this.constructor.frameTypes),
    );
    this.doorsContainerTarget.classList.add(this.constructor.frameTypes[type]);
  }

  inputChanged({ params }) {
    console.log(`inputChanged ${params.target}InputTarget`);
    this[`${params.target}Value`] = this[`${params.target}InputTarget`].value;
  }

  insertChanged({ target, params }) {
    this.doorTargets.forEach((door) => {
      const controller = this.application.getControllerForElementAndIdentifier(
        door,
        params.controller,
      );

      controller.setInsert(target.value);
    });
  }

  /**
   * Show an error message below the input
   *
   * @param {HTMLElement} element
   * @param {string} message
   * @returns {void}
   */
  showError(element, message) {
    element.classList.add("border-red-500");
    const span = document.createElement("span");
    span.classList.add("text-red-500", "text-xl", "block");
    span.innerHTML = message;
    element.parentNode.appendChild(span);
  }

  /**
   * Highlight the frame when the corresponding input is focused
   *
   * @param {Event} event
   */
  highlight({ params }) {
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

  /**
   * Unhighlight the frame when the corresponding input is blurred
   *
   * @param {Event} event
   */
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
