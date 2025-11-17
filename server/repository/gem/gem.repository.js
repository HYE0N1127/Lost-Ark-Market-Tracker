import { Repository } from "../../utils/http.js";

export class GemRepository extends Repository {
  constructor() {
    super();

    this.setBaseUrl(process.env.SMILEGATE_API_BASE_URL);
  }

  async getAll({ grades }) {
    const promises = grades.map((grade) =>
      this.post("/markets/items", {
        headers: {
          Authorization: `bearer ${process.env.SMILEGATE_API_KEY}`,
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
