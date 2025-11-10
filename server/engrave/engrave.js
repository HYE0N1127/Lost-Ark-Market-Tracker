import { baseUrl } from "../constants/base-url.js";
import { EngraveRequest } from "./request/engrave.request.js";

const path = "markets/items";

class Engrave {
  async #getMarketDataByPage(pageNo) {
    const request = new EngraveRequest(
      "CURRENT_MAX_PRICE",
      40000,
      "유물",
      "ASC",
      pageNo
    ).get();

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

  async getMarketData() {
    try {
      // 총 페이지 계산을 위한 첫 번째 페이지 데이터 불러오기
      const firstPageData = await this.#getMarketDataByPage(1);

      const totalCount = firstPageData.TotalCount;
      const pageSize = firstPageData.PageSize;
      const totalPages = Math.ceil(totalCount / pageSize);

      const allItems = firstPageData.Items;

      const promiseArray = [];
      if (totalPages > 1) {
        for (let currentPage = 2; currentPage <= totalPages; currentPage++) {
          promiseArray.push(this.#getMarketDataByPage(currentPage));
        }
      }

      const remainingPagesData = await Promise.all(promiseArray);

      remainingPagesData.forEach((pageData) => {
        allItems.push(pageData.Items);
      });

      return allItems;
    } catch (error) {
      console.error(`아이템 로드 중 오류 발생: ${error}`);
    }
  }
}

export const engrave = new Engrave();
