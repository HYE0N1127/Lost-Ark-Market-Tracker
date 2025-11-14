class PriceService {
  /**
   * @description key 값 정의
   * 보석
   * "doomfire"
   * "blazing"
   *
   * 젬
   * "epicGem"
   * "rareGem"
   * "uncommonGem"
   *
   * 유물 각인서
   * "engrave"
   */
  #priceMaps = {};

  getPriceMap(category) {
    if (!this.#priceMaps[category]) {
      this.#priceMaps[category] = new Map();
    }
    return this.#priceMaps[category];
  }

  /**
   * @param {string} category
   * @param {Map<string, number>} newMap
   */
  updatePriceMap(category, newMap) {
    if (newMap instanceof Map) {
      this.#priceMaps[category] = newMap;
    } else {
      console.error(
        `[PriceStorage] ${category} 업데이트 실패: 유효한 Map 객체가 아닙니다.`
      );
    }
  }
}

export const priceService = new PriceService();
