import ewColorPicker from "@ew-color-picker/core";
import { extend, log } from "@ew-color-picker/utils";
import { ewColorPickerMergeOptionsData } from "packages/core/src/mergeOptions";
export const tips = [
  `%c ew-color-picker@2.0.0%c 联系QQ：854806732 %c 联系微信：eveningwater %c github:https://github.com/eveningwater/ew-color-picker %c `,
  "background:#0ca6dc ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff",
  "background:#ff7878 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff",
  "background:#ff7878 ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff",
  "background:#ff7878 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff",
  "background:transparent",
];

export default class ewColorPickerConsolePlugin {
  static pluginName = "ewColorPickerConsole";
  options: ewColorPickerConsolePluginOptions &
    Omit<ewColorPickerMergeOptionsData, "el"> = {
    isLog: true,
  };
  constructor(public ewColorPicker: ewColorPicker) {
    this.handleOptions();
    this.run();
  }
  handleOptions() {
    this.options = extend(this.options, this.ewColorPicker.options);
  }
  run() {
    const { isLog } = this.options;
    if (isLog) {
      log(...tips);
    }
  }
}

export type ewColorPickerConsolePluginOptions = {
  isLog?: boolean;
};

declare module "@ew-color-picker/core" {
  interface CustomOptions {
    ewColorPickerConsolePlugin?: ewColorPickerConsolePluginOptions;
  }
}
