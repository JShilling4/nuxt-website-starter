<script setup lang="ts">
const title = "About";

useHead({
  title: `${title} | Placeholder Title`,
  meta: [
    {
      name: "description",
      content: "Placeholder meta description for the About page.",
    },
  ],
});
</script>

<template>
  <div>
    <SubpageHero :heading="title" />
    <section class="page-body" aria-labelledby="about-body-heading">
      <AppContainer>
        <h2 id="about-body-heading" class="section-title">Overview</h2>
        <p class="lead">
          This is placeholder copy for an About page. Replace it with your
          story, mission, and what visitors should know about your organization.
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
