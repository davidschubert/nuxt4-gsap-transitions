import gsap from 'gsap'
import type { Ref } from 'vue'

/**
 * GSAP Composable with automatic cleanup using gsap.context()
 * 
 * @param scope - Optional ref to scope selectors to a specific element
 * @returns GSAP utilities with automatic cleanup on unmount
 */
export function useGsap(scope?: Ref<HTMLElement | null>) {
  let ctx: gsap.Context

  // Initialize context on mount
  onMounted(() => {
    ctx = gsap.context(() => {}, scope?.value || undefined)
  })

  // Clean up all animations and revert CSS on unmount
  onUnmounted(() => {
    ctx?.revert()
  })

  /**
   * Add animations to the context for automatic cleanup
   * Use this to wrap your animation code
   */
  function add(callback: () => void) {
    if (ctx) {
      ctx.add(callback)
    } else {
      // If called before mount, execute directly (will be cleaned up when ctx is created)
      callback()
    }
  }

  /**
   * Create a tween animation within the context
   */
  function to(target: gsap.TweenTarget, vars: gsap.TweenVars): gsap.core.Tween {
    return gsap.to(target, vars)
  }

  /**
   * Create a from animation within the context
   */
  function from(target: gsap.TweenTarget, vars: gsap.TweenVars): gsap.core.Tween {
    return gsap.from(target, vars)
  }

  /**
   * Create a fromTo animation within the context
   */
  function fromTo(
    target: gsap.TweenTarget,
    fromVars: gsap.TweenVars,
    toVars: gsap.TweenVars
  ): gsap.core.Tween {
    return gsap.fromTo(target, fromVars, toVars)
  }

  /**
   * Create a timeline within the context
   */
  function timeline(vars?: gsap.TimelineVars): gsap.core.Timeline {
    return gsap.timeline(vars)
  }

  /**
   * Set properties immediately (no animation)
   */
  function set(target: gsap.TweenTarget, vars: gsap.TweenVars): gsap.core.Tween {
    return gsap.set(target, vars)
  }

  /**
   * Get the context for advanced use cases
   */
  function getContext(): gsap.Context | undefined {
    return ctx
  }

  return {
    gsap,
    add,
    to,
    from,
    fromTo,
    timeline,
    set,
    getContext
  }
}
