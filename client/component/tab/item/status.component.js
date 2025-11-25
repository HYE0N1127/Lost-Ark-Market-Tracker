import { Component } from "../../component.js";
import { formatTimestamp } from "../../../util/date.js";

export class TabStatusComponent extends Component {
  constructor() {
    super(`
      <div class="tab__status">
        <span class="tab__description" id="tab__update-description">
        </span>
        <span class="tab__description" id="tab__status-description">
        </span>
      </div>
    `);
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

  #getMessage(status, lastUpdatedAt) {
    switch (status) {
      case "error":
        return "데이터 불러오기 실패";
      default:
        return `마지막 업데이트: ${formatTimestamp(lastUpdatedAt)}`;
    }
  }

  bind(status, lastUpdatedAt) {
    const lastUpdateElement = this.element.querySelector(
      "#tab__update-description"
    );
    const descriptionElement = this.element.querySelector(
      "#tab__status-description"
    );

    lastUpdateElement.textContent = this.#getMessage(status, lastUpdatedAt);
    descriptionElement.textContent = this.#getStatus(status);
  }
}
