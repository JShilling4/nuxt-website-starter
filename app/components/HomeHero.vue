<script setup lang="ts">
import { servicePhones } from "~/constants/company";

const firstServicePhone = servicePhones[0]!;
</script>

<template>
  <section class="home-hero">
    <div class="overlay"></div>
    <AppContainer>
      <div class="content-block">
        <h1 class="hero-heading">Placeholder Slogan</h1>
        <p class="hero-subtext">&ldquo;Placeholder Subtext.&rdquo;</p>
        <div class="btn-container">
          <RouterLink to="/contact" class="btn btn-secondary raised-1">
            Request Estimate
          </RouterLink>
          <a :href="firstServicePhone.tel" class="btn btn-white raised-1">
            <FontAwesomeIcon
              :icon="['fas', 'phone']"
              aria-hidden="true"
              class="hero-phone-btn__icon"
            />
            {{ firstServicePhone.display }}
          </a>
        </div>
      </div>
    </AppContainer>
  </section>
</template>

<style lang="scss" scoped>
@use "~/styles/responsive" as r;

.home-hero {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 420px;
  background-color: black;
  background-image: url("/images/indiana_outdoors_bg.webp");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 1;

  @include r.up(sm) {
    min-height: 460px;
  }

  @include r.up(md) {
    min-height: 530px;
  }

  @include r.up(lg) {
    min-height: 580px;
  }

  // Mobile/tablet: flat tint so centered text reads against any part of the image.
  // Desktop: directional scrim only over the right half where the copy lives.
  .overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: rgba(1, 44, 101, 0.52);
    z-index: 0;

    @include r.up(lg) {
      background: linear-gradient(
        to left,
        rgba(1, 44, 101, 0.9) 0%,
        rgba(1, 44, 101, 0.6) 40%,
        rgba(1, 44, 101, 0.4) 52%,
        transparent 68%
      );
    }
  }

  .content-block {
    position: relative;
    text-align: center;
    padding: 4rem 0 3rem;

    @include r.up(md) {
      padding: 5rem 2rem 4rem;
    }

    @include r.up(lg) {
      margin-left: 30%;
    }

    @include r.up(xl) {
      margin-left: 35%;
    }
  }

  .hero-heading {
    font-size: clamp(2.9rem, 7.5vw, 4.5rem);
    font-family: "Story Script";
    letter-spacing: 0.06em;
    margin-bottom: 0.5rem;
    color: #fff;
    line-height: 1.2;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);

    @include r.up(lg) {
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
    }
  }

  .hero-subtext {
    font-size: clamp(0.8rem, 2vw, 1.05rem);
    font-style: italic;
    font-weight: 600;
    letter-spacing: 0.11em;
    color: rgba(255, 255, 255, 0.82);
    margin-bottom: 2.6rem;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);

    @include r.up(lg) {
      font-size: clamp(0.8rem, 2vw, 1.38rem);
    }

    &::before {
      content: "";
      display: block;
      width: 10rem;
      height: 2px;
      background: rgba(255, 255, 255, 0.6);
      margin: 0.8rem auto;
    }
  }

  .btn-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.85rem;

    .btn {
      margin: 0;
      width: min(18rem, 100%);
      font-size: clamp(0.75rem, calc(0.62rem + 0.65vw), 1rem);
      padding-block: clamp(0.7rem, calc(0.55rem + 0.45vw), 1rem);
      padding-inline: clamp(1.1rem, calc(0.65rem + 2.4vw), 3.5rem);
      letter-spacing: clamp(0.04em, calc(0.03em + 0.12vw), 0.0625em);

      @include r.up(md) {
        width: auto;
      }
    }

    @include r.up(md) {
      flex-direction: row;
      justify-content: center;
      gap: 1.5rem;
    }
  }
}
</style>
