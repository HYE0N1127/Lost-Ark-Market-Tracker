import { gemRepository } from "../../repository/gem/gem.repository.js";

class GemService {
  #mappingGemData(gemData) {
    const itemList = [];

    gemData.Items.forEach((gem) => {
      let priceDiff = 0;
      let priceDiffPercent = "0%";

      itemList.push({
        itemName: gem.Name ?? "매물이 존재하지 않습니다.",
        image: gem.Icon ?? "",
        price: gem.CurrentMinPrice ?? 0,
        priceDiff: priceDiff,
        priceDiffPercent: priceDiffPercent,
        grade: gem.Grade,
      });
    });

    return itemList;
  }

  async getAll() {
    try {
      const promises = [
        gemRepository.getUncommonGemData(),
        gemRepository.getRareGemData(),
        gemRepository.getEpicGemData(),
      ];
      const results = await Promise.allSettled(promises);

      const response = {
        uncommonGem: [],
        rareGem: [],
        epicGem: [],
      };

      if (results[0].status === "fulfilled") {
        response.uncommonGem = this.#mappingGemData(results[0].value);
      }

      if (results[1].status === "fulfilled") {
        response.rareGem = this.#mappingGemData(results[1].value);
      }

      if (results[2].status === "fulfilled") {
        response.epicGem = this.#mappingGemData(results[2].value);
      }

      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

export const gemService = new GemService();
