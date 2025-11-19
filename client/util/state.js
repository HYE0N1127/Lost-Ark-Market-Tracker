import { Observable } from "./observable.js";

export class State extends Observable {
  #value;

  constructor(initial) {
    super();
    this.#value = initial;
  }

  get value() {
    return this.#value;
  }

  set value(modify) {
    this.#value = modify;
    this.notify();
  }
}
