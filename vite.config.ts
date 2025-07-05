import type { UserConfig } from "vite";
import path from "path";

const config: UserConfig = {
  root: "src/",
  base: "/systems/ptu/",
  publicDir: path.resolve(__dirname, "public"),
  server: {
    port: 30001,
    open: true,
    proxy: {
      "^(?!/systems/ptu)": "http://localhost:30000/",
      "/socket.io": {
        target: "ws://localhost:30000",
        ws: true,
      },
    },
  },
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    sourcemap: true,
    lib: {
      name: "ptu",
      entry: path.resolve(__dirname, "src/main.js"),
      formats: ["es"],
      fileName: "main",
    },
  },
};

export default config;
