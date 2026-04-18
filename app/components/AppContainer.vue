<script setup lang="ts">
const { maxW = "1400px" } = defineProps<{
  maxW?: string;
}>();
</script>

<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
@use "~/styles/responsive" as r;

.container {
  width: 100%;
  max-width: v-bind(maxW);
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;

  @include r.up(md) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  @include r.up(xl) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
</style>
