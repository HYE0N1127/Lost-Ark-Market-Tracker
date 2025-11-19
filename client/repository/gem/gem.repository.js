import { Repository } from "../../util/http.js";

export class GemRepository extends Repository {
  constructor() {
    super();

    this.setBaseUrl("http://localhost:3000");
  }

  async getGem() {
    return this.get("/gems");
  }
}
