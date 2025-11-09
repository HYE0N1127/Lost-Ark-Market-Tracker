import express from "express";
import { engrave } from "./engrave/engrave.js";

const app = express();

const port = 3000;

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
  console.log("서버를 종료하려면 Ctrl+C를 누르세요.");
});

engrave.getMarketData();
