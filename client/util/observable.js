export class Observable {
  #listener = new Set();

  subscribe(subscriber) {
    this.#listener.add(subscriber);
  }

  unsubscribe(subscriber) {
    this.#listener.delete(subscriber);
  }

  notify() {
    this.#listener.forEach((observer) => observer());
  }
}
