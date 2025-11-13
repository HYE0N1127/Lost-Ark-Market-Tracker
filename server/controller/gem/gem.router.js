import express from "express";

export class GemRouter {
  router = express.Router();
  #controller;

  constructor(controller) {
    this.#controller = controller;
    this.#initialize();
  }

  #initialize() {
    this.router.get("/uncommon", this.#controller.getUncommonGemData);

    this.router.get("/rare", this.#controller.getRareGemData);

    this.router.get("/epic", this.#controller.getEpicGemData);
  }
}
