<script setup lang="ts">
const title = "FAQs";

useHead({
  title: "FAQs | Placeholder Title",
  meta: [
    {
      name: "description",
      content: "Placeholder meta description for the FAQs page.",
    },
  ],
});
</script>

<template>
  <div>
    <SubpageHero :heading="title" />
    <section class="page-body" aria-labelledby="faqs-heading">
      <AppContainer>
        <h2 id="faqs-heading" class="section-title">Common questions</h2>
        <p class="lead">
          Use this page for an accordion or list of frequently asked questions.
          Swap this paragraph for real Q&A content when you are ready.
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
