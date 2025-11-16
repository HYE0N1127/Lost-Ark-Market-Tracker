import express from "express";
import { GemController } from "./controller/gem/gem.controller.js";
import { JewelController } from "./controller/jewel/jewel.controller.js";
import { EngraveController } from "./controller/engrave/engrave.controller.js";
import { jewelService } from "./service/jewel/jewel.service.js";
import { cache } from "./utils/cache.js";
import { engraveService } from "./service/engrave/engrave.service.js";
import cron from "node-cron";
import { gemService } from "./service/gem/gem.service.js";

class App {
  #server;
  #port;

  constructor() {
    this.#server = express();
    this.#port = 3000;

    this.initialize();

    this.#server.listen(this.#port, () => {
      console.log(`서버가 http://localhost:${this.#port} 에서 실행 중입니다.`);
      console.log("서버를 종료하려면 Ctrl+C를 누르세요.");
    });
  }

  async #sync() {
    const keys = ["jewel", "engrave", "gem"];

    const promises = [
      jewelService.getAll(),
      engraveService.getAll(),
      gemService.getAll(),
    ];

    const results = await Promise.allSettled(promises);

    results.forEach((result, index) => {
      const key = keys[index];

      if (result.status === "fulfilled") {
        // 이전 캐시를 가져오고 가격 비교 이후 캐시에 같이 업데이트 시키기
        cache.set(key, {
          ...result.value,
          lastUpdatedAt: new Date().toISOString(),
          status: "success",
        });
      }

      if (result.status === "rejected") {
        // 기존에 캐시된 데이터가 있는지 정도는 검증을 해서 이 로직을 실행할지 말지 결정을 해야됨
        cache.set(key, {
          ...cache.get(key),
          data: null,
          status: "error",
        });
      }
    });
  }

  initialize() {
    this.#server.use(express.json());

    const gemController = new GemController();
    const jewelController = new JewelController();
    const engraveController = new EngraveController();

    this.#server.get("/gems", gemController.getGem);
    this.#server.get("/jewels", jewelController.getJewel);
    this.#server.get("/engraves", engraveController.getEngraveData);

    // prevent cold-start
    this.#sync();

    cron.schedule("*/1 * * * *", () => this.#sync());
  }
}

export const app = new App();
