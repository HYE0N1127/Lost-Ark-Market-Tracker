import { baseUrl } from "../../constants/base-url.js";
import { apiKey } from "../../constants/key.js";
import { Repository } from "../../utils/http.js";

class GemRepository extends Repository {
  constructor() {
    super();

    this.setBaseUrl(baseUrl);
  }

  async getAll({ grades }) {
    const promises = grades.map((grade) =>
      this.post("/markets/items", {
        headers: {
          Authorization: apiKey,
        },
        body: {
          CategoryCode: 230000,
          ItemGrade: grade,
          PageNo: 1,
          SortCondition: "DESC",
        },
      })
    );

    return await Promise.all(promises);
  }
}

export const gemRepository = new GemRepository();
