import { existsSync, readFileSync } from "fs";

let version = "1.0.6";

if (existsSync("../../package.json")) {
  const packageString = readFileSync("../../package.json", {
    encoding: "utf8",
  });

  const packageJson = JSON.parse(packageString);

  version = packageJson.version as string;
}

export default version;
