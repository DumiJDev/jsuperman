import { readFileSync, existsSync } from "fs";

let version = "1.0.5";

if (existsSync("../../package.json")) {
  const packageString = readFileSync("../../package.json", {
    encoding: "utf8",
  });

  const packageJson = JSON.parse(packageString);

  version = packageJson.version as string;
}

export default version;
