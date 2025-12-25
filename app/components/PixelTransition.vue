<script setup lang="ts">
import gsap from "gsap";

const transitionEl = ref<HTMLElement | null>(null);
const blocks = ref<number[]>([]);
const isVisible = ref(false);

// GSAP Context for automatic cleanup
let ctx: gsap.Context;

// Calculate grid dimensions based on viewport
function calculateGrid() {
    if (!transitionEl.value) return;

    const computedStyle = window.getComputedStyle(transitionEl.value);
    const gridTemplateColumns = computedStyle.getPropertyValue(
        "grid-template-columns"
    );
    const columns = gridTemplateColumns.split(" ").length;

    const blockSize = window.innerWidth / columns;
    const rowsNeeded = Math.ceil(window.innerHeight / blockSize);

    // Update grid rows
    transitionEl.value.style.gridTemplateRows = `repeat(${rowsNeeded}, ${blockSize}px)`;

    // Calculate total blocks needed
    const totalBlocks = columns * rowsNeeded;
    blocks.value = Array.from({ length: totalBlocks }, (_, i) => i);
}

// Play the reveal animation (pixels fade out to show content)
function playReveal(): Promise<void> {
    return new Promise((resolve) => {
        if (!transitionEl.value) {
            resolve();
            return;
        }

        const blockElements =
            transitionEl.value.querySelectorAll(".transition-block");

        // Add animation to context
        ctx.add(() => {
            gsap.timeline({
                onStart: () => {
                    gsap.set(transitionEl.value, { background: "transparent" });
                },
                onComplete: () => {
                    isVisible.value = false;
                    resolve();
                },
                defaults: { ease: "linear" },
            }).to(
                blockElements,
                {
                    opacity: 0,
                    duration: 0.1,
                    stagger: { amount: 0.75, from: "random" },
                },
                0.1
            );
        });
    });
}

// Play the cover animation (pixels fade in to hide content)
function playCover(): Promise<void> {
    return new Promise((resolve) => {
        isVisible.value = true;

        nextTick(() => {
            calculateGrid();

            nextTick(() => {
                if (!transitionEl.value) {
                    resolve();
                    return;
                }

                const blockElements =
                    transitionEl.value.querySelectorAll(".transition-block");

                // Add animation to context
                ctx.add(() => {
                    gsap.set(transitionEl.value, { background: "transparent" });
                    gsap.fromTo(
                        blockElements,
                        { autoAlpha: 0 },
                        {
                            autoAlpha: 1,
                            duration: 0.001,
                            ease: "linear",
                            stagger: { amount: 0.5, from: "random" },
                            onComplete: resolve,
                        }
                    );
                });
            });
        });
    });
}

// Expose methods for parent component
defineExpose({
    playReveal,
    playCover,
});

// Setup on mount
onMounted(() => {
    // Initialize GSAP context
    ctx = gsap.context(() => {}, transitionEl.value);
    
    calculateGrid();

    // Recalculate grid on resize
    window.addEventListener("resize", calculateGrid);
});

onUnmounted(() => {
    // Clean up GSAP animations
    ctx?.revert();
    
    // Clean up event listener
    window.removeEventListener("resize", calculateGrid);
});
</script>

<template>
    <div v-show="isVisible" ref="transitionEl" class="pixel-transition">
        <div v-for="block in blocks" :key="block" class="transition-block" />
    </div>
</template>

<style scoped>
.pixel-transition {
    z-index: 9999;
    background-color: #1a1a1a;
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    place-content: center;
    place-items: center;
    width: 100%;
    min-height: 100vh;
    position: fixed;
    inset: 0;
}

.transition-block {
    aspect-ratio: 1;
    background-color: #1a1a1a;
    width: 100%;
}

@media screen and (max-width: 991px) {
    .pixel-transition {
        grid-template-columns: repeat(8, 1fr);
    }
}

@media screen and (max-width: 767px) {
    .pixel-transition {
        grid-template-columns: repeat(6, 1fr);
    }
}

@media screen and (max-width: 479px) {
    .pixel-transition {
        grid-template-columns: repeat(4, 1fr);
    }
}
</style>
