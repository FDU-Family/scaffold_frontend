/// <reference types="vitest" />

import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import UniLayouts from '@uni-helper/vite-plugin-uni-layouts'
import ReactivityTransform from '@vue-macros/reactivity-transform/vite'
import pxtovw from 'postcss-px-to-viewport'
import pxToVwPreset from './plugins/px-to-vw'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    /**
     * vite-plugin-uni-pages
     * @see https://github.com/uni-helper/vite-plugin-uni-pages
     */
    UniPages(),

    /**
     * vite-plugin-uni-layouts
     * @see https://github.com/uni-helper/vite-plugin-uni-layouts
     */
    UniLayouts(),

    /**
     * unocss
     * @see https://github.com/antfu/unocss
     * see unocss.config.ts for config
    */
    Unocss({
      presets: [
        // presetUno(),
        pxToVwPreset({ viewportWidth: 750 }),
      ],
    }),

    /**
     * unplugin-auto-import 按需 import
     * @see https://github.com/antfu/unplugin-auto-import
     */
    AutoImport({
      imports: [
        'vue',
        'uni-app',
      ],
      dts: true,
      dirs: [
        './src/composables',
      ],
      vueTemplate: true,
    }),

    /**
     * unplugin-vue-components 按需引入组件
     * 注意：需注册至 uni 之前，否则不会生效
     * @see https://github.com/antfu/vite-plugin-components
     */
    Components({
      dts: 'src/components.d.ts',
    }),

    uni(),

    /**
     * Reactivity Transform
     * @see https://vue-macros.sxzz.moe/zh-CN/features/reactivity-transform.html
     */
    ReactivityTransform(),
  ],

  /**
   * Vitest
   * @see https://github.com/vitest-dev/vitest
   */
  test: {
    environment: 'jsdom',
  },

  css: {
    transformer: 'lightningcss',
    postcss: {
      plugins: [
        pxtovw({
          viewportWidth: 750,
          viewportUnit: 'vw',
        }),
      ],
    },
  },

  build: {
    cssMinify: 'lightningcss',
    target: 'es6',
    cssTarget: 'chrome61',
  },
})
