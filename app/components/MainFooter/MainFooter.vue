<script setup lang="ts">
import type { SocialMediaLink } from "~/constants/company";
import { companyEmail, servicePhones, socialMedia } from "~/constants/company";
import { navItems } from "~/components/MainHeader/navItems";

function socialIcon(social: SocialMediaLink): [string, string] {
  if (social.name.toLowerCase() === "facebook") {
    return ["fab", "facebook"];
  }
  return ["fas", "link"];
}
</script>

<template>
  <footer class="footer">
    <div class="footer-main">
      <AppContainer>
        <div class="footer-grid">
          <div class="footer-brand">
            <RouterLink to="/" class="footer-logo">
              <img
                src="~/assets/images/brand-logo.png"
                alt="Brand Logo"
                width="400"
                height="216"
              />
            </RouterLink>
          </div>

          <div class="footer-links">
            <h3 class="footer-heading">Quick Links</h3>
            <ul>
              <li v-for="item in navItems" :key="item.to">
                <RouterLink :to="item.to">{{ item.label }}</RouterLink>
              </li>
            </ul>
          </div>

          <div class="footer-contact">
            <h3 class="footer-heading">Contact Us</h3>
            <ul class="contact-list">
              <li v-for="phone in servicePhones" :key="phone.tel">
                <FontAwesomeIcon :icon="['fas', 'phone']" aria-hidden="true" />
                <div class="contact-list__body">
                  <a :href="phone.tel">
                    <span class="contact-list__label">{{ phone.name }}: </span>
                    {{ phone.display }}</a
                  >
                </div>
              </li>
              <li>
                <FontAwesomeIcon
                  :icon="['fas', 'envelope']"
                  aria-hidden="true"
                />
                <div class="contact-list__body">
                  <a :href="`mailto:${companyEmail}`">{{ companyEmail }}</a>
                </div>
              </li>
              <li v-for="social in socialMedia" :key="social.url">
                <FontAwesomeIcon
                  :icon="socialIcon(social)"
                  aria-hidden="true"
                />
                <div class="contact-list__body">
                  <a
                    :href="social.url"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ social.name }}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </AppContainer>
    </div>

    <MainFooterBottom />
  </footer>
</template>

<style lang="scss" scoped>
@use "~/styles/responsive" as r;

.footer {
  margin-top: auto;
}

.footer-main {
  background-color: var(--primary-bg-color);
  color: var(--secondary-text-color);
  padding: 1rem 0;

  @include r.up(md) {
    padding: 2rem 2rem;
  }
}

.footer-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2.5rem;
  align-items: start;

  @include r.down(md) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
}

.footer-brand {
  .footer-logo img {
    max-height: 186px;
    width: auto;
    height: auto;
    display: block;
    // filter: brightness(0) invert(1);

    @include r.down(md) {
      margin: 0 auto;
    }

    @include r.up(lg) {
      max-height: unset;
      padding-right: 2rem;
      width: 100%;
    }
  }

  .tagline {
    margin-top: 1rem;
    font-size: 0.95rem;
    line-height: 1.5;
  }
}

.footer-heading {
  font-size: 1rem;
  position: relative;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
  color: var(--secondary-text-color);

  &:after {
    content: "";
    position: absolute;
    height: 1px;
    width: 7rem;
    bottom: -7px;
    left: 50%;
    transform: translate(-50%, 0);
    background-color: var(--tertiary-bg-color);

    @include r.up(md) {
      left: 0;
      transform: translate(0, 0);
    }
  }
}

.footer-links {
  @include r.up(md) {
    margin-left: 8%;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 0.5rem;
    }

    a {
      color: var(--secondary-text-color);
      text-decoration: none;
      font-size: 0.95rem;
      transition: opacity 0.2s;

      &:hover {
        opacity: 0.85;
        text-decoration: underline;
      }
    }
  }
}

.contact-list {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
    font-size: 0.95rem;

    @include r.down(md) {
      justify-content: center;
    }
  }

  .contact-list__body {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.15rem;
    min-width: 0;

    @include r.down(md) {
      align-items: center;
    }
  }

  .contact-list__label {
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    opacity: 0.9;
  }

  svg {
    flex-shrink: 0;
    margin-top: 0.2rem;
    width: 1rem;
    opacity: 0.9;
    color: #fff;
  }

  a {
    color: var(--secondary-text-color);
    text-decoration: none;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.85;
      text-decoration: underline;
    }
  }
}
</style>
