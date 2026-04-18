<script setup lang="ts">
defineProps<{
  heading: string;
}>();
</script>

<template>
  <section class="subpage-hero" aria-labelledby="subpage-hero-heading">
    <AppContainer>
      <h1 id="subpage-hero-heading" class="subpage-hero__heading">
        {{ heading }}
      </h1>
    </AppContainer>
  </section>
</template>

<style lang="scss" scoped>
@use "~/styles/responsive" as r;

.subpage-hero {
  padding: 2.25rem 0;
  background: linear-gradient(
    135deg,
    var(--secondary-bg-color) 0%,
    #023a7a 100%
  );
  color: var(--secondary-text-color);
}

.subpage-hero__heading {
  margin: 0;
  font-size: 1.65rem;
  font-weight: 700;
  line-height: 1.2;

  @include r.up(md) {
    font-size: 2rem;
  }
}
</style>
