import { baseUrl } from "../../constants/base-url.js";
import {
  blazingJewelArray,
  doomfireJewelArray,
} from "../../constants/jewel.js";
import { apiKey } from "../../constants/key.js";

const path = "auctions/items";

class JewelRepository {
  async getAll() {}

  async #getJewelDataByName(name) {
    const response = await fetch(baseUrl + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: apiKey,
      },
      body: JSON.stringify({
        CategoryCode: "210000",
        ItemTier: 4,
        ItemName: name,
        PageNo: 1,
        SortCondition: "ASC",
      }),
    });

    if (!response.ok) {
      throw new Error(`[${name} Item Search] HTTP 에러: ${response.status}`);
    }

    return await response.json();
  }

  async getDoomfireJewelData() {
    try {
      const jewelPromiseArray = [];
      doomfireJewelArray.forEach((jewelName) => {
        jewelPromiseArray.push(this.#getJewelDataByName(jewelName));
      });

      const jewelData = await Promise.all(jewelPromiseArray);

      return jewelData;
    } catch (error) {
      console.error(`아이템 로드 중 오류 발생: ${error}`);
    }
  }

  async getBlazingJewelData() {
    try {
      const jewelPromiseArray = [];
      blazingJewelArray.forEach((jewelName) => {
        jewelPromiseArray.push(this.#getJewelDataByName(jewelName));
      });

      const jewelData = await Promise.all(jewelPromiseArray);

      return jewelData;
    } catch (error) {
      console.error(`아이템 로드 중 오류 발생: ${error}`);
    }
  }
}

export const jewelRepository = new JewelRepository();
