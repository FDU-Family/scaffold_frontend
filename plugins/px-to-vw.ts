import type { Preset } from '@unocss/core'

const pxRE = /(-?[\.\d]+)px/g

export interface PxToVwOptions {
  /**
     * 100vw = n px
     * @default 750
     */
  viewportWidth?: number
}

export default function pxToVwPreset(options: PxToVwOptions = {}): Preset {
  const {
    viewportWidth = 750,
  } = options

  return {
    name: '@unocss/preset-px-to-vw',
    postprocess: (util) => {
      util.entries.forEach((i) => {
        const value = i[1]
        if (typeof value === 'string' && pxRE.test(value))
          i[1] = value.replace(pxRE, (_, p1) => `${p1 / viewportWidth * 100}vw`)
      })
    },
  }
}
