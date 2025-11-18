import { Repository } from "../../utils/http.js";

export class JewelRepository extends Repository {
  constructor() {
    super();

    this.setBaseUrl(process.env.SMILEGATE_API_BASE_URL);
  }

  async getAll({ names }) {
    const promises = names.map((name) =>
      this.post("/auctions/items", {
        headers: {
          Authorization: `bearer ${process.env.SMILEGATE_API_KEY}`,
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

    return results.map((result) => {
      return result.Items.find((item) => item.AuctionInfo.BuyPrice !== null);
    });
  }
}
