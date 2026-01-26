import { create } from 'zustand'
import { keyColorOption, keyConfigLayout, TConfigAPP_DTO } from '../types'

export type TUpdateStateConfigApp = {
	name: string
	value: string
	key: keyConfigLayout
	keyColorOption: keyColorOption
}

type TStoreUserData = {
	dataConfigApp: Partial<TConfigAPP_DTO>
	setDataConfigApp: (config: Partial<TConfigAPP_DTO>) => void
	updateColor: (updateConfig: TUpdateStateConfigApp) => void
	updateTextSize: (updateConfig: TUpdateStateConfigApp) => void
	updateFont: (updateConfig: TUpdateStateConfigApp) => void
}

export const useConfigApp = create<TStoreUserData>((set) => ({
	dataConfigApp: {},
	setDataConfigApp: (config) => {
		set({ dataConfigApp: config })
	},

	updateColor: (updateConfig) => {
		set((state) => {
    const newConfig = { ...state.dataConfigApp }
    const layout = newConfig[updateConfig.key]
    
    if (layout && layout.color) {
      newConfig[updateConfig.key] = {
        ...layout,
        color: {
          ...layout.color,
          [updateConfig.keyColorOption]: updateConfig.value
        }
      }
    }
    
    return { dataConfigApp: newConfig }
  })
	},

	updateTextSize: (updateConfig) => {
		console.log('update text size')

		console.log(updateConfig)
	},

	updateFont(updateConfig) {},
}))
