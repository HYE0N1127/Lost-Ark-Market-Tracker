class Cache {
  #registry;

  constructor() {
    this.#registry = new Map();
  }

  /**
   * @description key 에 해당하는 캐시된 데이터를 가져옵니다.
   * Key: engrave, gem, jewel
   */
  get(key) {
    return this.#registry.get(key);
  }

  set(key, value) {
    return this.#registry.set(key, value);
  }
}

export const cache = new Cache();
