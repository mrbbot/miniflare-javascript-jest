import worker from "../src/index.js";

test("worker should increment count", async () => {
  const env = getMiniflareBindings();

  let req = new Request("http://localhost");
  let ctx = new ExecutionContext();
  let res = await worker.fetch(req, env, ctx);
  await getMiniflareWaitUntil(ctx);
  expect(await res.text()).toBe("0");

  req = new Request("http://localhost");
  ctx = new ExecutionContext();
  res = await worker.fetch(req, env, ctx);
  await getMiniflareWaitUntil(ctx);
  expect(await res.text()).toBe("1");
});

test("object should increment count", async () => {
  const env = getMiniflareBindings();
  const id = env.COUNTER.newUniqueId();
  const stub = env.COUNTER.get(id);

  let res = await stub.fetch("http://localhost");
  // Note increments from above automatically "undone".
  // See https://miniflare.dev/testing/jest#isolated-storage for details.
  expect(await res.text()).toBe("0");
  res = await stub.fetch("http://localhost");
  expect(await res.text()).toBe("1");
});
