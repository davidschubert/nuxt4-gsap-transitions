<script setup lang="ts">
import gsap from 'gsap'

const isLoading = useState('app-loading', () => true)
const loadingScreen = ref<HTMLElement | null>(null)
const loadingText = ref<HTMLElement | null>(null)
const loadingBar = ref<HTMLElement | null>(null)

// GSAP Context for automatic cleanup
let ctx: gsap.Context

onMounted(() => {
  if (!isLoading.value) return

  // Create context scoped to the loading screen
  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        isLoading.value = false
      }
    })

    // Animate loading bar
    tl.to(loadingBar.value, {
      scaleX: 1,
      duration: 1.2,
      ease: 'power2.inOut'
    })
      // Fade out text
      .to(loadingText.value, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: 'power2.in'
      })
      // Slide up the loading screen
      .to(loadingScreen.value, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power3.inOut'
      })
  }, loadingScreen.value)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <div v-if="isLoading" ref="loadingScreen" class="loading-screen">
    <div class="loading-content">
      <p ref="loadingText" class="loading-text">Wird geladen...</p>
      <div class="loading-bar-container">
        <div ref="loadingBar" class="loading-bar"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loading-screen {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1a1a1a;
}

.loading-content {
  text-align: center;
}

.loading-text {
  font-size: 1.25rem;
  color: #fff;
  margin-bottom: 1.5rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.loading-bar-container {
  width: 200px;
  height: 3px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
}

.loading-bar {
  width: 100%;
  height: 100%;
  background: #fff;
  transform: scaleX(0);
  transform-origin: left;
}
</style>
