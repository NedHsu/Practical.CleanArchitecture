import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import importToCDN from 'vite-plugin-cdn-import'

const pathSrc = path.resolve(__dirname, "src");
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueI18n({
      include: `${pathSrc}/locales/**`
    }),
    importToCDN({
      modules:[
        {
            name: 'vue',
            var: 'Vue',
            path: `https://unpkg.com/vue@3.0.5/dist/vue.runtime.global.prod.js`,
        },
      ]
    }),
  ],
  css: {
    // preprocessorOptions: {
    //   scss: { additionalData: `@import "./src/assets/style.scss";` },
    // },
  },
  resolve: {
    alias: {
      '@': pathSrc,
      '@components': `${pathSrc}/components`,
      '@modules': `${pathSrc}/store/modules`,
      '@assets': `${pathSrc}/assets`,
    },
  },
  server: {
    port: 8080,
  }
})
