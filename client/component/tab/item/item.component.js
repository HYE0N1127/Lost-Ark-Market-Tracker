import { Component } from "../../component.js";

export class ItemComponent extends Component {
  constructor(item) {
    super(`
        <div class="price-card">
          <div class="price-card__wrapper">
            <img
              class="price-card__icon"
            />
            <span class="price-card__name"></span> 
            </div>
          <div class="price-card__wrapper">
            <span class="price-card__price"></span>
            <span class="price-card__change-icon"></span>
            <span class="price-card__change-rate"></span>
          </div>
        </div>
      `);

    this.#bind(item);
  }

  /**
   * @param { "itemName", "image", "price", "priceDiff", "priceDiffPercent } item
   */

  #bind(item) {
    const iconElement = this.element.querySelector(".price-card__icon");
    const nameElement = this.element.querySelector(".price-card__name");
    const priceElement = this.element.querySelector(".price-card__price");
    const priceChangeIconElement = this.element.querySelector(
      ".price-card__change-icon"
    );
    const priceChangeRateElement = this.element.querySelector(
      ".price-card__change-rate"
    );

    // abs는 절댓값을 반환함
    const changeRateContent = `${Math.abs(item.priceDiff)} (${
      item.priceDiffPercent
    })`;

    iconElement.src = item.image;
    nameElement.textContent = item.itemName;
    priceElement.textContent = item.price.toLocaleString();
    priceChangeRateElement.textContent = changeRateContent;

    if (item.priceDiff > 0) {
      priceChangeIconElement.textContent = "▲";
      priceChangeIconElement.classList.add("price-card__change-increase-color");
      priceChangeRateElement.classList.add("price-card__change-increase-color");
    } else {
      priceChangeIconElement.textContent = "▼";
      priceChangeIconElement.classList.add("price-card__change-decrease-color");
      priceChangeRateElement.classList.add("price-card__change-decrease-color");
    }
  }
}
