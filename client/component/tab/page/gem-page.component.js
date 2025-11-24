import { GemStore } from "../../../store/gem/gem.store.js";
import { formatTimestamp } from "../../../util/date.js";
import { RepaintableComponent } from "../../component.js";

export class GemPageComponent extends RepaintableComponent {
  #store;
  #listRenderer;
  #itemRenderer;
  #wrapperRenderer;
  #statusRenderer;

  constructor(wrapperRenderer, listRenderer, itemRenderer, statusRenderer) {
    super(`
      <div class="tab__page">
      </div>
    `);

    this.#listRenderer = listRenderer;
    this.#itemRenderer = itemRenderer;
    this.#wrapperRenderer = wrapperRenderer;
    this.#statusRenderer = statusRenderer;
    this.#store = new GemStore();

    this.#store.state.subscribe(() => this.#bind());

    this.#store.fetch();

    this.#bind();
  }

  #getStatus(status) {
    switch (status) {
      case "error":
        return "서버에서 에러가 발생하였습니다. 잠시 후 시도해주세요.";
      case "maintenance":
        return "로스트아크 API 서버 점검중입니다. 가장 최근의 데이터를 불러옵니다.";
      default:
        return "경매장 시세는 1분 주기로 업데이트 됩니다.";
    }
  }

  #getMessage(status, lastUpdate) {
    switch (status) {
      case "error":
        return "데이터 불러오기 실패";
      default:
        return `Last Updated: ${formatTimestamp(lastUpdate)}`;
    }
  }

  #bind() {
    this.cleanup();

    const { uncommonGem, rareGem, epicGem, status, updatedAt } =
      this.#store.state.value;
    const messageDescription = this.#getMessage(status, updatedAt);
    const statusDescription = this.#getStatus(status);

    const uncommonListElement = new this.#listRenderer(
      1,
      uncommonGem,
      this.#itemRenderer
    );
    const rareListElement = new this.#listRenderer(
      1,
      rareGem,
      this.#itemRenderer
    );
    const epicListElement = new this.#listRenderer(
      1,
      epicGem,
      this.#itemRenderer
    );

    const listElement = new this.#wrapperRenderer([
      uncommonListElement,
      rareListElement,
      epicListElement,
    ]);
    const statusElement = new this.#statusRenderer(
      messageDescription,
      statusDescription
    );

    listElement.attachTo(this.element);
    statusElement.attachTo(this.element);
  }
}
