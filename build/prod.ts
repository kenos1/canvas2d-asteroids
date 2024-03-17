import * as esbuild from "esbuild";
import SHARED_ESBUILD_CONFIG from "./shared";

esbuild.buildSync({
  ...SHARED_ESBUILD_CONFIG,
  minify: true,
  platform: "browser",
});
