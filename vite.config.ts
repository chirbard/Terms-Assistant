import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
// import { resolve, dirname } from "node:path";
// import { fileURLToPath } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    crx({ manifest }),
    VueI18nPlugin({
      /* options */
      // locale messages resource pre-compile option
      // include: resolve(
      //   dirname(fileURLToPath(import.meta.url)),
      //   "./src/locales/**"
      // ),
    }),
  ],
});
