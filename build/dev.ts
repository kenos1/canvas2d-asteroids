import * as esbuild from "esbuild";
import SHARED_ESBUILD_CONFIG from "./shared";

const ctx = await esbuild.context({
  ...SHARED_ESBUILD_CONFIG,
});

ctx.watch();

const serve = await ctx.serve({
  servedir: "dist",
});

console.log(`http://localhost:${serve.port}`);
