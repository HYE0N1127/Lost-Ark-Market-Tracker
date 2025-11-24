import { Component, RepaintableComponent } from "../../component.js";

export class ItemListWrapperComponent extends Component {
  constructor(list) {
    super(`
      <div class="tab__list"></div>
    `);

    this.#bind(list);
  }

  #bind(list) {
    list.forEach((component) => {
      component.attachTo(this.element);
    });
  }
}
