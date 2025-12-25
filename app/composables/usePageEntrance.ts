import type { Ref } from 'vue'

/**
 * Composable for page entrance animations
 * Handles the common pattern of animating headline and copy elements on page load
 *
 * @param content - Ref to the content container element
 * @param headline - Ref to the headline element
 * @param options - Optional configuration for the animation
 */
export function usePageEntrance(
  content: Ref<HTMLElement | null>,
  headline: Ref<HTMLElement | null>,
  options: {
    copySelector?: string
    headlineDuration?: number
    copyDuration?: number
    staggerDelay?: number
  } = {}
) {
  const {
    copySelector = '.copy',
    headlineDuration = 1,
    copyDuration = 0.8,
    staggerDelay = 0.2
  } = options

  const isLoading = useState('app-loading', () => true)
  const { add, set, timeline } = useGsap(content)

  function playEntranceAnimation() {
    if (!content.value) return

    const copyElements = content.value.querySelectorAll(copySelector)

    add(() => {
      const tl = timeline({ defaults: { ease: 'power3.out' } })

      tl.to(headline.value, {
        opacity: 1,
        y: 0,
        duration: headlineDuration
      }).to(
        copyElements,
        {
          opacity: 1,
          y: 0,
          duration: copyDuration,
          stagger: staggerDelay
        },
        '-=0.5'
      )
    })
  }

  onMounted(() => {
    // Immediately hide elements before any animation
    add(() => {
      set(headline.value, { opacity: 0, y: 50 })
      if (content.value) {
        set(content.value.querySelectorAll(copySelector), { opacity: 0, y: 30 })
      }
    })

    // Wait for loading screen to finish before animating
    if (isLoading.value) {
      const unwatch = watch(isLoading, (loading) => {
        if (!loading) {
          setTimeout(() => {
            playEntranceAnimation()
          }, 100)
          unwatch()
        }
      })
    } else {
      playEntranceAnimation()
    }
  })

  return {
    playEntranceAnimation
  }
}
