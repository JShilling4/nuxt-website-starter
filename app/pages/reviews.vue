<script setup lang="ts">
const title = "Reviews";

useHead({
  title: `${title} | Placeholder Title`,
  meta: [
    {
      name: "description",
      content: "Placeholder meta description for the Reviews page.",
    },
  ],
});
</script>

<template>
  <div>
    <SubpageHero :heading="title" />
    <section class="page-body" aria-labelledby="reviews-heading">
      <AppContainer>
        <h2 id="reviews-heading" class="section-title">Testimonials</h2>
        <p class="lead">
          Add quotes from clients or embed a reviews widget. This block is only
          starter placeholder content.
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
