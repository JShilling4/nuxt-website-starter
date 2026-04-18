<script setup lang="ts">
const title = "Service Area";

useHead({
  title: `${title} | Placeholder Title`,
  meta: [
    {
      name: "description",
      content: "Placeholder meta description for the Service Area page.",
    },
  ],
});
</script>

<template>
  <div>
    <SubpageHero :heading="title" />
    <section class="page-body" aria-labelledby="service-area-heading">
      <AppContainer>
        <h2 id="service-area-heading" class="section-title">Coverage</h2>
        <p class="lead">
          Replace this text with the regions, cities, or radius you serve. A
          map or list of areas works well here.
        </p>
      </AppContainer>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.page-body {
  padding: 2rem 0 3.5rem;
  background: #fff;
  color: var(--secondary-bg-color);
}

.section-title {
  margin: 0 0 1rem;
  font-size: 1.35rem;
  font-weight: 700;
}

.lead {
  margin: 0;
  max-width: 40rem;
  line-height: 1.65;
  font-size: 1rem;
}
</style>
