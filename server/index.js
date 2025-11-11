import express from "express";
import { engrave } from "./engrave/engrave.js";
import { jewel } from "./jewel/jewel.js";
import { gem } from "./gem/gem.js";
import cron from "node-cron";

const app = express();

const port = 3000;

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
  console.log("서버를 종료하려면 Ctrl+C를 누르세요.");
});

const engraveData = engrave.getMarketData();
const blazingJewelData = jewel.getBlazingJewelData();
const doomfireJewelData = jewel.getBlazingJewelData();
const gemData = gem.getGemData();

cron.schedule("*/1 * * * *", () => {
  try {
    const today = new Date();

    const hours = ("0" + today.getHours()).slice(-2);
    const minutes = ("0" + today.getMinutes()).slice(-2);
    const seconds = ("0" + today.getSeconds()).slice(-2);

    const timeString = hours + ":" + minutes + ":" + seconds;

    const engraveData = engrave.getMarketData();
    const blazingJewelData = jewel.getBlazingJewelData();
    const doomfireJewelData = jewel.getBlazingJewelData();
    const gemData = gem.getGemData();

    console.log(`----- ${timeString} -----`);
    console.log(`engraveData: ${engraveData}`);
    console.log(`blazingJewelData: ${blazingJewelData}`);
    console.log(`doomfireJewelData: ${doomfireJewelData}`);
    console.log(`gemData: ${gemData}`);
  } catch (err) {
    console.error(`데이터 업데이트중 에러 발생: ${err}`);
  }
});
