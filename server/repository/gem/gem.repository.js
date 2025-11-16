import { baseUrl } from "../../constants/base-url.js";
import { apiKey } from "../../constants/key.js";

const path = "markets/items";

class GemRepository {
  async #getGemDataByGrade(grade) {
    const response = await fetch(baseUrl + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: apiKey,
      },
      body: JSON.stringify({
        CategoryCode: 230000,
        ItemGrade: grade,
        PageNo: 1,
        SortCondition: "DESC",
      }),
    });

    if (!response.ok) {
      throw new Error(`[${pageNo}페이지] HTTP 에러: ${response.status}`);
    }
    return await response.json();
  }

  async getUncommonGemData() {
    try {
      return await this.#getGemDataByGrade("고급");
    } catch (error) {
      console.error(`아이템 로드 중 오류 발생: ${error}`);
    }
  }

  async getRareGemData() {
    try {
      return await this.#getGemDataByGrade("희귀");
    } catch (error) {
      console.error(`아이템 로드 중 오류 발생: ${error}`);
    }
  }

  async getEpicGemData() {
    try {
      return await this.#getGemDataByGrade("영웅");
    } catch (error) {
      console.error(`아이템 로드 중 오류 발생: ${error}`);
    }
  }
}

export const gemRepository = new GemRepository();
