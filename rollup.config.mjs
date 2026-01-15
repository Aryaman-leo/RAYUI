import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";

export default [
  // JS build
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/cjs/index.js",
        format: "cjs",
        sourcemap: true
      },
      {
        file: "dist/esm/index.js",
        format: "es",
        sourcemap: true
      }
    ],
    external: ["react", "react/jsx-runtime"],
    plugins: [
      resolve(),
      commonjs(),
      postcss(),
      typescript({
        tsconfig: "./tsconfig.json",

        // 🔑 OVERRIDES — THIS FIXES YOUR ERROR
        declaration: false,
        declarationMap: false,
        emitDeclarationOnly: false,
        outDir: undefined
      })
    ]
  },

  // Types bundle
  {
    input: "dist/types/index.d.ts",
    output: {
      file: "dist/index.d.ts",
      format: "es"
    },
    plugins: [dts()],
    external: [/\.css$/]
  }
];
