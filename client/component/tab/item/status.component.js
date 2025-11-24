import { Component } from "../../component.js";

export class TabStatusComponent extends Component {
  constructor(message, status) {
    super(`
      <div class="tab__status">
        <span class="tab__description" id="tab__update-description">
        </span>
        <span class="tab__description" id="tab__status-description">
        </span>
      </div>
    `);

    this.#bind(message, status);
  }

  #bind(message, status) {
    const lastUpdateElement = this.element.querySelector(
      "#tab__update-description"
    );
    const descriptionElement = this.element.querySelector(
      "#tab__status-description"
    );

    lastUpdateElement.textContent = message;
    descriptionElement.textContent = status;
  }
}
