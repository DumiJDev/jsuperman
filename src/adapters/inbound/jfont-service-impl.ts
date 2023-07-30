import { Fonts, textSync } from "figlet";
import JFontService from "../../domain/services/jfont-service";

export default class JFontServiceImpl implements JFontService {
  constructor(private readonly font?: Fonts) {}
  design(text: string): string {
    return textSync(text, { font: this.font ? this.font : "Doom" });
  }
}
