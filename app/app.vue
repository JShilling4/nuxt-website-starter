<script setup lang="ts"></script>

<template>
  <div class="app">
    <MainHeader />
    <NuxtPage />
    <MainFooter />
  </div>
</template>

<style lang="scss">
@use "~/styles/responsive" as r;

.app {
  background-color: #fff;
}

.page-wrapper {
  margin: 0 auto;
  color: #fff;
  padding: 1rem 2rem 0;

  @include r.down(lg) {
    padding-top: 2rem;
  }

  @include r.down(md) {
    margin-top: 0;
  }

  // keep legacy "extra-small" tweaks without adding new breakpoints
  @media screen and (max-width: 556px) {
    padding: 2rem 2rem 0;
  }

  @media screen and (max-width: 430px) {
    padding: 2rem 1.5rem 0;
  }

  @media screen and (max-width: 375px) {
    padding: 2rem 0.5rem 0;
  }
}
</style>

