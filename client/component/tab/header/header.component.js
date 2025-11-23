import { Component } from "../../component.js";

export class TabHeaderComponent extends Component {
  constructor() {
    super(`        
      <nav class="tab__header">
        <a class="tab__navigator active" href="/client/pages/engrave/index.html" data-tab="engrave">각인서</a>
        <span class="tab__navigator-divider">|</span>
        <a class="tab__navigator" href="/client/pages/jewel/index.html" data-tab="jewel">보석</a>
        <span class="tab__navigator-divider">|</span>
        <a class="tab__navigator" href="/client/pages/gem/index.html" data-tab="gem">젬</a>
      </nav>`);

    this.#highlightCurrentPage();
  }

  #highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const links = this.element.querySelectorAll("a");

    links.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href");
      if (href === currentPath || (currentPath === "/" && href === "/")) {
        link.classList.add("active");
      }
    });
  }
}
