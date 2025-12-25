<script setup lang="ts">
useHead({
    title: "Über uns",
});

const content = ref<HTMLElement | null>(null);
const headline = ref<HTMLElement | null>(null);
const isLoading = useState("app-loading", () => true);

// Use GSAP composable with scope for automatic cleanup
const { add, set, timeline } = useGsap(content);

function playEntranceAnimation() {
    if (!content.value) return;

    const copyElements = content.value.querySelectorAll(".copy");

    add(() => {
        const tl = timeline({ defaults: { ease: "power3.out" } });

        tl.to(headline.value, {
            opacity: 1,
            y: 0,
            duration: 1,
        }).to(
            copyElements,
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2,
            },
            "-=0.5"
        );
    });
}

onMounted(() => {
    // Immediately hide elements before any animation
    add(() => {
        set(headline.value, { opacity: 0, y: 50 });
        if (content.value) {
            set(content.value.querySelectorAll(".copy"), { opacity: 0, y: 30 });
        }
    });

    // Wait for loading screen to finish before animating
    if (isLoading.value) {
        const unwatch = watch(isLoading, (loading) => {
            if (!loading) {
                setTimeout(() => {
                    playEntranceAnimation();
                }, 100);
                unwatch();
            }
        });
    } else {
        playEntranceAnimation();
    }
});
</script>

<template>
    <main class="page">
        <section ref="content" class="content">
            <h1 ref="headline" class="headline">Über dieses Projekt</h1>
            <p class="copy">
                Dieses Projekt demonstriert die nahtlose Integration von GSAP
                (GreenSock Animation Platform) in eine moderne Nuxt 4
                Applikation.
            </p>
            <p class="copy">
                GSAP ist die leistungsstärkste Animations-Bibliothek für das Web
                und ermöglicht butterweiche Animationen mit präziser Kontrolle
                über Timing und Easing.
            </p>
            <p class="copy">
                Mit unserem Setup kannst du GSAP überall in deiner App nutzen -
                für Entrance-Animationen, Page Transitions und komplexe
                interaktive Erlebnisse.
            </p>
        </section>
    </main>
</template>

<style scoped>
.page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    padding-top: 6rem;
}

.content {
    max-width: 800px;
    text-align: center;
}

.headline {
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: 700;
    margin-bottom: 1.5rem;
    line-height: 1.1;
}

.copy {
    font-size: 1.25rem;
    line-height: 1.7;
    color: #666;
    margin-bottom: 1rem;
}
</style>
