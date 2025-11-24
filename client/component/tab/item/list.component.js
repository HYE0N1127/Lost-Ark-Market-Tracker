import { Component } from "../../component.js";

export class ItemListComponent extends Component {
  #itemRenderer;
  constructor(columnCount, itemList, itemRenderer) {
    super(`
      <div class="price-card-wrapper cols-${columnCount}">
      </div>
    `);

    this.#itemRenderer = itemRenderer;

    this.#bind(itemList);
  }

  #bind(list) {
    const sortedList = list.sort((a, b) => b.price - a.price);
    sortedList.forEach((item) => {
      const component = new this.#itemRenderer(item);
      component.attachTo(this.element);
    });
  }
}
