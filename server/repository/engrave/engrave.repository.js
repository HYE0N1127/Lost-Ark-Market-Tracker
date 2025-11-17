import { baseUrl } from "../../constants/base-url.js";
import { Repository } from "../../utils/http.js";

class EngraveRepository extends Repository {
  constructor() {
    super();
    this.setBaseUrl(baseUrl);
  }

  #calculateTotalPage(totalCount, pageSize) {
    return Math.ceil(totalCount / pageSize);
  }

  async getAll() {
    const promises = [];
    const firstPageData = await this.#getFirstPageData();
    const totalPages = this.#calculateTotalPage(
      firstPageData.TotalCount,
      firstPageData.PageSize
    );

    Array.from({ length: totalPages }, (_, index) => {
      promises.push(
        this.post("markets/items", {
          headers: {
            Authorization: apiKey,
          },
          body: {
            Sort: "CURRENT_MAX_PRICE",
            CategoryCode: 40000,
            ItemGrade: "유물",
            SortCondition: "DESC",
            PageNo: index + 1,
          },
        })
      );
    });

    const result = await Promise.all(promises);

    return result.flatMap((result) => result.Items);
  }

  async #getFirstPageData() {
    return this.post("markets/items", {
      headers: {
        Authorization: apiKey,
      },
      body: {
        Sort: "CURRENT_MAX_PRICE",
        CategoryCode: 40000,
        ItemGrade: "유물",
        SortCondition: "ASC",
        PageNo: 1,
      },
    });
  }
}

export const engraveRepository = new EngraveRepository();
