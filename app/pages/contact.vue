<script setup lang="ts">
useHead({
    title: "Kontakt",
});

const content = ref<HTMLElement | null>(null);
const headline = ref<HTMLElement | null>(null);

// Use page entrance animation composable
usePageEntrance(content, headline);
</script>

<template>
    <main class="page">
        <section ref="content" class="content">
            <h1 ref="headline" class="headline">Kontakt</h1>
            <p class="copy">
                Hast du Fragen zur GSAP Integration oder möchtest du mehr über
                Animationen in Nuxt erfahren?
            </p>
            <p class="copy">
                Schau dir den Quellcode an und experimentiere mit verschiedenen
                Animation-Patterns. GSAP bietet unendliche Möglichkeiten für
                kreative Webentwicklung.
            </p>
            <p class="copy">
                Von einfachen Fade-Ins bis hin zu komplexen
                Timeline-Animationen - mit dem richtigen Setup ist alles
                möglich.
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
