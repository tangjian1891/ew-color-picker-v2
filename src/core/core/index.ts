import ERROR_VARIABLE from "../utils/error";
import util from "@ew-color-picker/utils";
import "../style/index.scss";
import Box from "./box/box";
import { CORE_TEMPLATE } from "./template";
import { initConfig, normalizeBox } from "./core-method";
import { consoleColorPickerInfo } from "../utils/console";

export default class ewColorPicker {
  config!: Omit<OptionType, "el"> & { el: HTMLElement };
  container!: HTMLElement | null;
  constructor(options?: WrapperType | OptionType) {
    if (util.isUndefined(new.target) && __DEV__) {
      util.ewError(ERROR_VARIABLE.CONSTRUCTOR_ERROR);
      return;
    }
    this.container = null;
    this.config = initConfig(options);
    const { isLog } = this.config;
    if (isLog) {
      consoleColorPickerInfo();
    }
    this.render();
  }
  onBoxClickHandler(v: InstanceType<typeof Box>) {
    console.log(v);
    const { defaultColor } = v.options;
    if (defaultColor) {
      v.options.defaultColor = "";
    } else {
      v.options.defaultColor = "#2396ef";
    }
    v.update(["defaultColor"]);
  }
  render() {
    const { el, hasBox, boxHasColorIcon, boxNoColorIcon, defaultColor } =
      this.config;
    const node = util.createByTemplate(CORE_TEMPLATE);
    if (el) {
      util.insertNode(el, node, this.container!);
    }
    this.container = util.$(".ew-color-picker", el);
    if (hasBox) {
      const { b_width: width, b_height: height } = normalizeBox(this.config);
      const box = new Box({
        container: this.container!,
        width,
        height,
        boxNoColorIcon,
        boxHasColorIcon,
        defaultColor,
        onClick: this.onBoxClickHandler,
      });
    }
  }
}
