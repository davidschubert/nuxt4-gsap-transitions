import gsap from 'gsap'
import type { Ref } from 'vue'

export function useGsap() {
  const tweens: gsap.core.Tween[] = []
  const timelines: gsap.core.Timeline[] = []

  // Cleanup on unmount
  onUnmounted(() => {
    tweens.forEach(tween => tween.kill())
    timelines.forEach(timeline => timeline.kill())
  })

  /**
   * Create a tween animation with automatic cleanup
   */
  function to(
    target: gsap.TweenTarget,
    vars: gsap.TweenVars
  ): gsap.core.Tween {
    const tween = gsap.to(target, vars)
    tweens.push(tween)
    return tween
  }

  /**
   * Create a from animation with automatic cleanup
   */
  function from(
    target: gsap.TweenTarget,
    vars: gsap.TweenVars
  ): gsap.core.Tween {
    const tween = gsap.from(target, vars)
    tweens.push(tween)
    return tween
  }

  /**
   * Create a fromTo animation with automatic cleanup
   */
  function fromTo(
    target: gsap.TweenTarget,
    fromVars: gsap.TweenVars,
    toVars: gsap.TweenVars
  ): gsap.core.Tween {
    const tween = gsap.fromTo(target, fromVars, toVars)
    tweens.push(tween)
    return tween
  }

  /**
   * Create a timeline with automatic cleanup
   */
  function timeline(vars?: gsap.TimelineVars): gsap.core.Timeline {
    const tl = gsap.timeline(vars)
    timelines.push(tl)
    return tl
  }

  /**
   * Set properties immediately (no animation)
   */
  function set(
    target: gsap.TweenTarget,
    vars: gsap.TweenVars
  ): gsap.core.Tween {
    return gsap.set(target, vars)
  }

  /**
   * Animate elements on mount with stagger
   */
  function animateOnMount(
    target: Ref<HTMLElement | HTMLElement[] | null>,
    vars: gsap.TweenVars = {}
  ) {
    onMounted(() => {
      if (!target.value) return

      const defaultVars: gsap.TweenVars = {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        ...vars
      }

      from(target.value, defaultVars)
    })
  }

  /**
   * Animate multiple elements with stagger on mount
   */
  function staggerOnMount(
    targets: Ref<HTMLElement[] | null>,
    vars: gsap.TweenVars = {}
  ) {
    onMounted(() => {
      if (!targets.value || targets.value.length === 0) return

      const defaultVars: gsap.TweenVars = {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
        ...vars
      }

      from(targets.value, defaultVars)
    })
  }

  return {
    gsap,
    to,
    from,
    fromTo,
    timeline,
    set,
    animateOnMount,
    staggerOnMount
  }
}

