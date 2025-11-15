export class JewelRequest {
  /**
   * @description 객체 명세
   * code: 아이템 분류 코드
   * tier: 아이템 티어(겁화, 작열은 4티어 고정)
   * name: 검색할 아이템의 이름(N레벨 겁화의 보석 or N레벨 작열의 보석)
   * sortCondition: 가격 내림차순 혹은 오름차순(ASC, DESC)
   */
  #code;
  #tier;
  #name;
  #sortCondition;

  constructor(code, tier, name, sortCondition) {
    this.#code = code;
    this.#tier = tier;
    this.#name = name;
    this.#sortCondition = sortCondition;
  }

  get() {
    return {
      CategoryCode: this.#code,
      ItemTier: this.#tier,
      ItemName: this.#name,
      PageNo: 1,
      SortCondition: this.#sortCondition,
    };
  }
}
