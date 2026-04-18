<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";

export type AppButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "outline-white"
  | "outline-secondary"
  | "white";

const props = withDefaults(
  defineProps<{
    variant?: AppButtonVariant;
    size?: "md" | "sm";
    raised?: boolean;
    to?: RouteLocationRaw | string;
    href?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
  }>(),
  {
    variant: "primary",
    size: "md",
    raised: false,
    type: "button",
  },
);

const rootClass = computed(() => [
  "app-button",
  `app-button--${props.variant}`,
  {
    "app-button--sm": props.size === "sm",
    "app-button--raised": props.raised,
  },
]);
</script>

<template>
  <RouterLink v-if="to !== undefined" :to="to" :class="rootClass">
    <slot />
  </RouterLink>
  <a v-else-if="href !== undefined" :href="href" :class="rootClass">
    <slot />
  </a>
  <button
    v-else
    :type="type"
    :disabled="disabled"
    :class="rootClass"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.app-button {
  display: inline-block;
  padding: 1rem 3.5rem;
  outline: none;
  border-radius: 2rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 16px;
  cursor: pointer;
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  text-decoration: none;
  text-align: center;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    background-color 0.25s ease,
    color 0.25s ease,
    border-color 0.25s ease;

  &:hover:not(:disabled),
  &:focus-visible:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.28);
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
    transform: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  }
}

.app-button--sm {
  font-size: 14px;
  padding: 0.5rem 2.5rem;
  letter-spacing: initial;
}

.app-button--raised {
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.12),
    0 0.5rem 0.75rem rgba(0, 0, 0, 0.5);

  &:hover:not(:disabled),
  &:focus-visible:not(:disabled) {
    box-shadow:
      0 10px 24px rgba(0, 0, 0, 0.28),
      0 0.5rem 0.75rem rgba(0, 0, 0, 0.45);
  }

  &:disabled {
    box-shadow:
      0 2px 8px rgba(0, 0, 0, 0.12),
      0 0.5rem 0.75rem rgba(0, 0, 0, 0.5);
  }
}

.app-button--primary {
  background-color: var(--primary-bg-color);
  color: var(--primary-text-color);
  border: none;
}

.app-button--secondary {
  background-color: var(--secondary-bg-color);
  color: var(--secondary-text-color);
  border: none;
}

.app-button--tertiary {
  background-color: var(--tertiary-bg-color);
  color: var(--tertiary-text-color);
  border: none;
}

.app-button--outline-white {
  background-color: transparent;
  color: #fff;
  border: 2px solid #fff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);

  &:hover:not(:disabled),
  &:focus-visible:not(:disabled) {
    background-color: #fff;
    color: var(--secondary-bg-color);
  }
}

.app-button--outline-secondary {
  background-color: transparent;
  color: var(--secondary-bg-color);
  border: 2px solid var(--secondary-bg-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  &:hover:not(:disabled),
  &:focus-visible:not(:disabled) {
    background-color: var(--secondary-bg-color);
    color: var(--secondary-text-color);
  }
}

.app-button--white {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  background-color: #fff;
  color: var(--secondary-bg-color);
  border: 2px solid var(--secondary-bg-color);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
}
</style>
