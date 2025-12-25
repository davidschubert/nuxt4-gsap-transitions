<script setup lang="ts">
const route = useRoute()

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'Über uns' },
  { path: '/contact', label: 'Kontakt' }
]
</script>

<template>
  <header class="header">
    <nav class="nav">
      <NuxtLink
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="nav-link"
        :class="{ active: route.path === item.path }"
      >
        {{ item.label }}
      </NuxtLink>
    </nav>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 1.5rem 2rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.nav {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.nav-link {
  position: relative;
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  text-decoration: none;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: #000;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
}

.nav-link:hover {
  color: #000;
}

.nav-link:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.nav-link.active {
  color: #000;
}

.nav-link.active::after {
  transform: scaleX(1);
}
</style>

