import { readFileSync, writeFileSync } from "node:fs";

const env = readFileSync(".env", "utf8");
const match = env.match(/^NEXT_PUBLIC_WEB3FORMS_KEY=(.*)$/m);
const key = match?.[1]?.trim();

if (!key) {
  throw new Error("Missing NEXT_PUBLIC_WEB3FORMS_KEY in .env");
}

writeFileSync(
  "web3forms-config.js",
  `window.LUXBASE_WEB3FORMS_KEY = ${JSON.stringify(key)};\n`
);
