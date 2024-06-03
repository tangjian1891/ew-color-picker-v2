import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import scss from 'rollup-plugin-scss';
const version = require('./package.json');
const rollupTypescript = require('rollup-plugin-typescript');
const banner =
  '/*!\n' +
  ` * ew-color-picker.js v${version.version}\n` +
  ` * (c) 2019-${new Date().getFullYear()} eveningwater \n` +
  ' * Released under the MIT License.\n' +
  ' */';
export default {
  input: 'src/index.ts',
  output: [
    {
      file: './dist/ew-color-picker.js',
      format: 'umd',
      name: 'ewColorPicker',
      banner
    },
    {
      file: './dist/ew-color-picker.min.js',
      format: 'umd',
      name: 'ewColorPicker',
      plugins: [terser()],
      banner
    },
    {
      file: './dist/ew-color-picker.esm.js',
      format: 'es',
      name: 'ewColorPicker',
      banner
    },
    {
      file: './dist/ew-color-picker.esm.min.js',
      format: 'es',
      name: 'ewColorPicker',
      plugins: [terser()],
      banner
    }
  ],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**' // 只编译我们的源代码
    }),
    rollupTypescript(),
    scss({
      include: ['/**/*.css', '/**/*.scss', '/**/*.sass'],
      output: 'dist/ew-color-picker.min.css',
      failOnError: true,
      outputStyle: 'compressed' //压缩
    })
  ]
};
