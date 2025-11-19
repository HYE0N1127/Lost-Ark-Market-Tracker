import { Repository } from "../../util/http.js";

export class EngraveRepository extends Repository {
  constructor() {
    super();

    this.setBaseUrl("http://localhost:3000");
  }

  async getEngrave() {
    return this.get("/engraves");
  }
}
