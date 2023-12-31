import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { svgstore } from './src/vite_plugins/svgstore'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';
// https://vitejs.dev/config/
export default defineConfig({
  // base: "/mangosteen_front/dist/",
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      "/api/v1": {
        target: "http://121.196.236.94:8080/"
      }
    }
  },
  plugins: [
    vue(),
    vueJsx({
      // transformOn: true,这个属性开启或者关闭感觉影响不太大呀
      mergeProps: true
      // options are passed on to @vue/babel-plugin-jsx
    }),
    svgstore(),
    Components({
      resolvers: [VantResolver()],
    })
  ],

})
