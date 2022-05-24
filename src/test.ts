import test from "ava";
import { format } from "./sqlish-formatter";

// test("foo", (t) => {
//   t.pass();
// });

// test("bar", async (t) => {
//   const bar = Promise.resolve("bar");
//   t.is(await bar, "bar");
// });

test("format", (t) => {
  t.is(
    format("select 1, 2, 3 from sometable inner JOIN "),
    "select\n\t1,\n\t2,\n\t3\nfrom\n\tsometable\n\tinner JOIN"
  );
});
