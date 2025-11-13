import express from "express";

export class EngraveRouter {
  router = express.Router();
  #controller;

  constructor(controller) {
    this.#controller = controller;
    this.#initialize();
  }

  #initialize() {
    this.router.get("/", this.#controller.getEngraveData);
  }
}
