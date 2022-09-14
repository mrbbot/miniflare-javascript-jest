export class Counter {
  constructor(state) {
    this.storage = state.storage;
  }

  async fetch() {
    const count = (await this.storage.get("count")) ?? 0;
    this.storage.put("count", count + 1);
    return new Response(String(count));
  }
}
