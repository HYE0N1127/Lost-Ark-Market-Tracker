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
    this.#server.get("/status", (req, res) => {
      res.status(200).send("EXPRESS ROUTING OK");
    });
    // 👇 Controller 인스턴스 생성 중 오류를 확인하기 위해 try-catch로 감쌉니다.
    try {
      const gemRouter = new GemRouter(new GemController());
      const jewelRouter = new JewelRouter(new JewelController());
      const engraveRouter = new EngraveRouter(new EngraveController());

      this.#server.use("/gem", gemRouter.router);
      this.#server.use("/jewel", jewelRouter.router);
      this.#server.use("/engrave", engraveRouter.router);
    } catch (error) {
      // 서버 시작 시 터미널에 이 오류 메시지가 나오는지 확인하세요.
      console.error("라우터 초기화 중 치명적인 오류 발생:", error.message);
      // 서버를 종료하거나 초기화 실패 상태를 알리는 로직 추가 가능
    }
  }
}

export const app = new App();
