import { Component } from "../../component.js";
import { ItemComponent } from "./item.component.js";

export class ItemListComponent extends Component {
  constructor(columnCount, itemList) {
    super(`
      <div class="price-card-wrapper cols-${columnCount}">
      </div>
    `);

    this.#bind(itemList);
  }

  #bind(list) {
    const sortedList = list.sort((a, b) => b.price - a.price);
    sortedList.forEach((item) => {
      const component = new ItemComponent(item);
      component.attachTo(this.element);
    });
  }
}
