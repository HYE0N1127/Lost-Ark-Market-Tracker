import { Repository } from "../../util/http.js";

export class JewelRepository extends Repository {
  constructor() {
    super();

    this.setBaseUrl("http://localhost:3000");
  }

  async getJewel() {
    return this.get("/jewels");
  }
}
