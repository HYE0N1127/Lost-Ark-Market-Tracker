export class Observable {
  #listener = new Set();

  subscribe(subscriber) {
    this.#listener.add(subscriber); // 중복된 함수는 알아서 무시됨
  }

  unsubscribe(subscriber) {
    this.#listener.delete(subscriber); // 함수 참조를 찾아 즉시 삭제
  }

  notify() {
    this.#listener.forEach((observer) => observer());
  }
}
