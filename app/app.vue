<script setup lang="ts">
import gsap from "gsap";

const pixelTransition = ref<InstanceType<typeof PixelTransition> | null>(null);
const isNavigating = ref(false);

// GSAP Context for transition animations cleanup
let ctx: gsap.Context;

onMounted(() => {
    ctx = gsap.context(() => {});
});

onUnmounted(() => {
    ctx?.revert();
});

// Handle page leave - cover with pixels
const onLeave = async (el: Element, done: () => void) => {
    if (pixelTransition.value && !isNavigating.value) {
        isNavigating.value = true;
        await pixelTransition.value.playCover();
    }

    // Quick fade out of old content within context
    ctx.add(() => {
        gsap.to(el, {
            opacity: 0,
            duration: 0.1,
            onComplete: done,
        });
    });
};

// Handle page enter - reveal by fading out pixels
const onEnter = async (el: Element, done: () => void) => {
    // Set initial state within context
    ctx.add(() => {
        gsap.set(el, { opacity: 1 });
    });

    // Reveal pixels after a small delay
    if (pixelTransition.value && isNavigating.value) {
        await pixelTransition.value.playReveal();
    }

    isNavigating.value = false;
    done();
};
</script>

<template>
    <div id="app">
        <!-- Initial page loading animation -->
        <LoadingScreen />

        <!-- Pixel transition for page changes -->
        <PixelTransition ref="pixelTransition" />

        <AppHeader />
        <NuxtPage
            :transition="{
                css: false,
                mode: 'out-in',
                onLeave,
                onEnter,
            }"
        />
    </div>
</template>

<style>
*,
*::before,
*::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
        Roboto, "Helvetica Neue", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

body {
    background: #fafafa;
    color: #1a1a1a;
    line-height: 1.6;
}

#app {
    min-height: 100vh;
}
</style>
