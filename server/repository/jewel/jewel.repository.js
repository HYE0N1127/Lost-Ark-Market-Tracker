import { baseUrl } from "../../constants/base-url.js";
import {
  blazingJewelArray,
  doomfireJewelArray,
} from "../../constants/jewel.js";
import { apiKey } from "../../constants/key.js";
import { Repository } from "../../utils/http.js";

class JewelRepository extends Repository {
  constructor() {
    super();

    this.setBaseUrl(baseUrl);
  }

  async getAll({ names }) {
    const promises = names.map((name) =>
      this.post("/auctions/items", {
        headers: {
          Authorization: apiKey,
        },
        body: {
          CategoryCode: "210000",
          ItemTier: 4,
          ItemName: name,
          PageNo: 1,
          SortCondition: "ASC",
        },
      })
    );

    const results = await Promise.all(promises);

    return results.map((result) => result.Items[0]);
  }
}

export const jewelRepository = new JewelRepository();
