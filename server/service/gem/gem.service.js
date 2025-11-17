import { gemRepository } from "../../repository/gem/gem.repository.js";

class GemService {
  #mapping(gemData) {
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
    const grades = ["고급", "희귀", "영웅"];
    const results = await gemRepository.getAll({ grades: grades });

    const [uncommonResult, rareResult, epicResult] = results;

    return {
      uncommonGem: uncommonResult.Items,
      rareGem: rareResult.Items,
      epicGem: epicResult.Items,
    };
  }
}

export const gemService = new GemService();
