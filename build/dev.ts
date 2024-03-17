import * as esbuild from "esbuild";

const ctx = await esbuild.context({
  entryPoints: ["src/main.ts"],
  minifySyntax: true,
  bundle: true,
  outdir: "dist",
});

ctx.watch();

const serve = await ctx.serve({
  servedir: "dist",
});

console.log(`http://localhost:${serve.port}`);
