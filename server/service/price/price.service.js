class PriceService {
  /**
   * @description key 값 정의
   * 보석
   * "doomfire"
   *    - "8레벨 겁화"
   *    - "9레벨 겁화"
   *    - "10레벨 겁화"
   * "blazing"
   *    - "8레벨 작열"
   *    - "9레벨 작열"
   *    - "10레벨 작열"
   *
   * 젬
   * "epicGem"
   * "rareGem"
   * "uncommonGem"
   *    - 질서의 젬 : 견고
   *    - 질서의 젬 : 불변
   *    - 혼돈의 젬 : 왜곡
   *    - 혼돈의 젬 : 붕괴
   *    - 혼돈의 젬 : 침식
   *    - 질서의 젬 : 안정
   *
   * 유물 각인서
   * "engrave"
   *    - 각인서 이름
   */
  #priceMaps = {};

  getPriceMap(category) {
    // 객체 내에서 category에 맞는 데이터 값 가져오기
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
    this.#priceMaps[category] = newMap;
  }
}

export const priceService = new PriceService();
