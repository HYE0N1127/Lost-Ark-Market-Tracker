export class JewelRequest {
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
