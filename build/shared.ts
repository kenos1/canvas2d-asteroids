import * as esbuild from "esbuild";

const SHARED_ESBUILD_CONFIG: esbuild.BuildOptions = {
  entryPoints: ["src/main.ts"],
  treeShaking: true,
  bundle: true,
  outdir: "dist",
};

export default SHARED_ESBUILD_CONFIG;
