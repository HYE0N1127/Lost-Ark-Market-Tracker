import express from "express";

export class JewelRouter {
  router = express.Router();
  #controller;

  constructor(controller) {
    this.#controller = controller;
    this.#initialize();
  }

  #initialize() {
    this.router.get("/doomfire", this.#controller.getDoomfireJewelData);

    this.router.get("/blazing", this.#controller.getBlazingJewelData);
  }
}
