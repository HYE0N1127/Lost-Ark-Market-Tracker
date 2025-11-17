import express from "express";
import { GemController } from "./controller/gem/gem.controller.js";
import { JewelController } from "./controller/jewel/jewel.controller.js";
import { EngraveController } from "./controller/engrave/engrave.controller.js";
import { jewelService } from "./service/jewel/jewel.service.js";
import { cache } from "./utils/cache.js";
import { engraveService } from "./service/engrave/engrave.service.js";
import cron from "node-cron";
import { gemService } from "./service/gem/gem.service.js";
import { HttpError } from "./utils/http.js";

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

  #getErrorStatus(error) {
    switch (error.status) {
      case 503:
        return "maintenance";
      default:
        return "error";
    }
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
        cache.set(key, {
          result: result.value,
          lastUpdatedAt: new Date().toISOString(),
          status: "success",
        });
      }

      if (result.status === "rejected") {
        const { reason } = result;

        const prev = cache.get(key);

        if (prev === undefined) {
          cache.set(key, {
            result: null,
            lastUpdatedAt: null,
            status: this.#getErrorStatus(reason),
          });

          return;
        }

        cache.set(key, {
          ...prev,
          status: this.#getErrorStatus(reason),
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
