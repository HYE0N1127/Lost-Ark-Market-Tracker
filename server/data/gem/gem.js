import { baseUrl } from "../../constants/base-url.js";
import { apiKey } from "../../constants/key.js";
import { GemRequest } from "./request/gem.request.js";

const path = "markets/items";

class Gem {
  async #getGemDataByGrade(grade) {
    const request = new GemRequest(230000, grade, "DESC").get();

    const response = await fetch(baseUrl + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: apiKey,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`[${pageNo}페이지] HTTP 에러: ${response.status}`);
    }
    return await response.json();
  }

  async getGemData() {
    try {
      const gradeArray = ["고급", "희귀", "영웅"];
      const promiseArray = [];

      gradeArray.forEach((grade) => {
        promiseArray.push(this.#getGemDataByGrade(grade));
      });

      const gemData = await Promise.all(promiseArray);

      return gemData;
    } catch (error) {
      console.error(`아이템 로드 중 오류 발생: ${error}`);
    }
  }
}

export const gem = new Gem();
