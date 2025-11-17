export class HttpError extends Error {
  #status;
  #name;

  constructor(message, status, name = "HttpError") {
    super(`${name}: ${message}`);

    this.#status = status;
    this.#name = name;
  }

  get status() {
    return this.#status;
  }

  get name() {
    return this.#name;
  }

  static isInstance(error) {
    return error.name === "HttpError" && error.status !== undefined;
  }
}

export class Repository {
  #baseUrl;

  setBaseUrl(baseUrl) {
    this.#baseUrl = baseUrl;
  }

  async #request(path, init) {
    const { headers, body, ...rest } = init;

    const url = `${this.#baseUrl}${path}`;

    const response = await fetch(url, {
      ...rest,
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new HttpError("Request failed");
    }

    return response.json();
  }

  async get(path, init) {
    return this.#request(path, { ...init, method: "GET" });
  }

  async post(path, init) {
    return this.#request(path, { ...init, method: "POST" });
  }
}
