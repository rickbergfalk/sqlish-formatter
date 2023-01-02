import test from "ava";
import { readdirSync, readFileSync } from "fs";
import { format } from "./format";

const r = readdirSync("./src/tests");

function getTestParts(str: string) {
  return str.split("\n~~~\n");
}

r.filter((filename) => filename.endsWith(".sql")).forEach((filename) => {
  const basic = readFileSync(`./src/tests/${filename}`, "utf8");
  const [original, expected] = getTestParts(basic);
  test(filename, (t) => {
    t.is(format(original), expected);
  });
});
