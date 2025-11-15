import express from "express";
import { GemRouter } from "./controller/gem/gem.router.js";
import { JewelRouter } from "./controller/jewel/jewel.router.js";
import { EngraveRouter } from "./controller/engrave/engrave.router.js";
import { GemController } from "./controller/gem/gem.controller.js";
import { JewelController } from "./controller/jewel/jewel.controller.js";
import { EngraveController } from "./controller/engrave/engrave.controller.js";

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

  initialize() {
    this.#server.use(express.json());
    try {
      const gemRouter = new GemRouter(new GemController());
      const jewelRouter = new JewelRouter(new JewelController());
      const engraveRouter = new EngraveRouter(new EngraveController());

      this.#server.use("/gem", gemRouter.router);
      this.#server.use("/jewel", jewelRouter.router);
      this.#server.use("/engrave", engraveRouter.router);
    } catch (error) {
      console.error("라우터 초기화 중 치명적인 오류 발생:", error.message);
    }
  }
}

export const app = new App();
