import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueI18n from '@intlify/vite-plugin-vue-i18n'

const pathSrc = path.resolve(__dirname, "src");
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueI18n({
      include: `${pathSrc}/locales/**`
    })
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
    },
  },
  server: {
    port: 8080,
  }
})
