<script setup lang="ts">
const showMenu = ref(true);
const windowWidth = ref(0);

const route = useRoute();

function isMobileNav(): boolean {
  return windowWidth.value <= 1200;
}

function syncBodyScrollLock(): void {
  if (typeof document === "undefined") return;
  if (isMobileNav() && showMenu.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
}

watch(
  () => route.path,
  () => {
    if (isMobileNav()) showMenu.value = false;
  },
  { immediate: true },
);

watch(showMenu, () => {
  syncBodyScrollLock();
});

onMounted((): void => {
  windowWidth.value = window.innerWidth;
  window.addEventListener("resize", onResize);
  if (windowWidth.value <= 1200) showMenu.value = false;
  syncBodyScrollLock();
});

onUnmounted((): void => {
  window.removeEventListener("resize", onResize);
  if (typeof document !== "undefined") {
    document.body.style.overflow = "";
  }
});

function onResize(): void {
  windowWidth.value = window.innerWidth;
  if (windowWidth.value >= 1201) {
    showMenu.value = true;
  } else {
    showMenu.value = false;
  }
  syncBodyScrollLock();
}

function toggleMenu(): void {
  if (windowWidth.value >= 1201) return;
  showMenu.value = !showMenu.value;
}

function closeMenu(): void {
  if (windowWidth.value >= 1201) return;
  showMenu.value = false;
}
</script>

<template>
  <AppContainer>
    <header class="header">
      <RouterLink class="brand" to="/">
        <img
          src="~/assets/images/brand-logo.png"
          alt="Brand Logo"
          width="254"
          height="133"
          fetchpriority="high"
        />
      </RouterLink>
      <button
        class="menu-toggle"
        :class="{ 'menu-toggle--open': showMenu }"
        type="button"
        :aria-label="
          showMenu ? 'Close navigation menu' : 'Open navigation menu'
        "
        :aria-expanded="showMenu ? 'true' : 'false'"
        aria-controls="main-nav"
        @click="toggleMenu"
      >
        <span class="menu-toggle-bars" aria-hidden="true">
          <span class="menu-toggle-bar menu-toggle-bar--top"></span>
          <span class="menu-toggle-bar menu-toggle-bar--middle"></span>
          <span class="menu-toggle-bar menu-toggle-bar--bottom"></span>
        </span>
      </button>
      <div
        class="nav-backdrop"
        :class="{ 'nav-backdrop--open': showMenu }"
        aria-hidden="true"
        @click="closeMenu"
      />
      <nav id="main-nav" class="nav" :class="{ open: showMenu }">
        <MainHeaderNav />
      </nav>
    </header>
  </AppContainer>
</template>

<style lang="scss" scoped>
@use "~/styles/responsive" as r;

.header {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  position: relative;
  z-index: 1002;
}

.brand {
  flex-shrink: 0;

  img {
    width: auto;
    height: auto;
    height: 30px;
    vertical-align: middle;

    @include r.up(md) {
      height: 50px;
    }
    @include r.up(xl) {
      height: 50px;
    }
    @include r.up(xxl) {
      height: 50px;
    }
  }
}

.menu-toggle {
  border: 0;
  background: transparent;
  cursor: pointer;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  justify-content: center;
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  position: relative;
  z-index: 1003;

  @include r.up(xl) {
    display: none;
  }

  .menu-toggle-bars {
    position: relative;
    width: 28px;
    height: 22px;
    display: block;
  }

  .menu-toggle-bar {
    position: absolute;
    left: 0;
    width: 100%;
    height: 3px;
    background: var(--secondary-bg-color);
    border-radius: 999px;
    display: block;
    transition:
      transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
      opacity 0.25s ease,
      top 0.3s cubic-bezier(0.4, 0, 0.2, 1),
      bottom 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .menu-toggle-bar--top {
    top: 0;
  }

  .menu-toggle-bar--middle {
    top: 50%;
    transform: translateY(-50%);
  }

  .menu-toggle-bar--bottom {
    bottom: 0;
  }

  &.menu-toggle--open {
    .menu-toggle-bar--top {
      top: 50%;
      transform: translateY(-50%) rotate(45deg);
    }

    .menu-toggle-bar--middle {
      opacity: 0;
      transform: translateY(-50%) scaleX(0);
    }

    .menu-toggle-bar--bottom {
      bottom: auto;
      top: 50%;
      transform: translateY(-50%) rotate(-45deg);
    }
  }
}

.nav-backdrop {
  display: none;

  @include r.down(xl) {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(27, 37, 71, 0.45);
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition:
      opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
      visibility 0.3s;

    &.nav-backdrop--open {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    }
  }
}

.nav {
  display: flex;
  align-items: center;

  @include r.down(xl) {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    align-items: flex-start;
    width: min(20rem, 88vw);
    max-width: 100%;
    height: 100vh;
    height: 100dvh;
    margin: 0;
    padding: 5.5rem 1rem 1.5rem;
    background: #fff;
    box-shadow: -8px 0 32px rgba(0, 0, 0, 0.12);
    z-index: 1001;
    transform: translateX(100%);
    pointer-events: none;
    overflow-y: auto;
    overscroll-behavior: contain;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &.open {
      transform: translateX(0);
      pointer-events: auto;
    }
  }
}
</style>
