import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { SplitText } from 'gsap/SplitText'

// Register GSAP plugins (all plugins are free since Webflow acquisition)
gsap.registerPlugin(CustomEase, SplitText)

export default defineNuxtPlugin(() => {
  return {
    provide: {
      gsap
    }
  }
})
