import express from "express";
import { engrave } from "./data/engrave/engrave.js";
import { jewel } from "./data/jewel/jewel.js";
import { gem } from "./data/gem/gem.js";
import cron from "node-cron";
import { jewelService } from "./service/jewel/jewel.service.js";
import { gemService } from "./service/gem/gem.service.js";
import { engraveService } from "./service/engrave/engrave.serivce.js";

const server = express();

const port = 3000;

class App {
  constructor() {
    server.listen(port, () => {
      console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
      console.log("서버를 종료하려면 Ctrl+C를 누르세요.");
    });
    this.log();
  }

  async log() {
    console.log(await gemService.getUncommonGemData());
    console.log(await gemService.getRareGemData());
    console.log(await gemService.getEpicGemData());

    console.log(await engraveService.getEngraveData());
  }
}

export const app = new App();
