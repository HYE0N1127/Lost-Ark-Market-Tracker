import { Repository } from "../../utils/http.js";

export class EngraveRepository extends Repository {
  constructor() {
    super();

    this.setBaseUrl(process.env.SMILEGATE_API_BASE_URL);
  }

  #getByPage(page) {
    return this.post("/markets/items", {
      headers: {
        Authorization: `bearer ${process.env.SMILEGATE_API_KEY}`,
      },
      body: {
        Sort: "CURRENT_MAX_PRICE",
        CategoryCode: 40000,
        ItemGrade: "유물",
        SortCondition: "DESC",
        PageNo: page,
      },
    });
  }

  async getAll() {
    const { TotalCount, PageSize } = await this.#getByPage(1);

    const totalPages = Math.ceil(TotalCount / PageSize);

    const promises = Array.from({ length: totalPages }, (_, index) =>
      this.#getByPage(index + 1)
    );

    const result = await Promise.all(promises);

    return result.flatMap((result) => result.Items);
  }
}
