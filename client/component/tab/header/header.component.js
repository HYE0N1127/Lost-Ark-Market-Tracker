import { Component } from "../../component.js";

export class TabHeaderComponent extends Component {
  constructor() {
    super(`        
      <nav class="tab__header">
        <button class="tab__navigator active" data-tab="engrave">각인서</button>
        <span class="tab__navigator-divider">|</span>
        <button class="tab__navigator" data-tab="jewel">보석</button>
        <span class="tab__navigator-divider">|</span>
        <button class="tab__navigator" data-tab="gem">젬</button>
      </nav>`);

    this.#bind();
    console.log(this.element);
  }

  #bind() {
    // ... 버튼 탐색 로직 (이전과 동일)
    const tabBtns = this.element.querySelectorAll(".tab__navigator");

    tabBtns.forEach((button) => {
      button.addEventListener("click", () => {
        tabBtns.forEach((b) => b.classList.remove("active"));
        button.classList.add("active");

        const targetId = button.getAttribute("data-tab");

        const event = new CustomEvent("tab-changed", {
          detail: { tabId: targetId },
          bubbles: true,
        });

        this.element.dispatchEvent(event);
      });
    });
  }
}
