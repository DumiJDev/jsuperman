import figlet from "figlet";

export const beautify = (text: string) =>
  figlet.textSync(text, { font: "Doom" });
