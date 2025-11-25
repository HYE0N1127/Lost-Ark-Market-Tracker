import { EngraveStore } from "../../../store/engrave/engrave.store.js";
import { formatTimestamp } from "../../../util/date.js";
import { RepaintableComponent } from "../../component.js";

export class EngravePageComponent extends RepaintableComponent {
  #store;
  #wrapperRenderer;
  #listRenderer;
  #itemRenderer;
  #statusRenderer;

  constructor(wrapperRenderer, listRenderer, itemRenderer, statusRenderer) {
    super(`
      <div class="tab__page">
      </div>
    `);

    this.#statusRenderer = statusRenderer;
    this.#listRenderer = listRenderer;
    this.#itemRenderer = itemRenderer;
    this.#wrapperRenderer = wrapperRenderer;
    this.#store = new EngraveStore();

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
    const { engrave, status, updatedAt } = this.#store.state.value;
    const messageDescription = this.#getMessage(status, updatedAt);
    const statusDescription = this.#getStatus(status);

    const engraveListElement = new this.#listRenderer(
      2,
      engrave,
      this.#itemRenderer
    );

    const listElement = new this.#wrapperRenderer([engraveListElement]);
    const statusElement = new this.#statusRenderer(
      messageDescription,
      statusDescription
    );

    listElement.attachTo(this.element);
    statusElement.attachTo(this.element);
  }
}
