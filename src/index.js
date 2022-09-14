export { Counter } from "./counter.js";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/") {
      const id = env.COUNTER.idFromName("object");
      const stub = env.COUNTER.get(id);
      return stub.fetch(request);
    } else {
      return new Response(null, { status: 404 });
    }
  },
};
