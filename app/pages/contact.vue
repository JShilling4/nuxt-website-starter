<script setup lang="ts">
import { officeBillingPhone, servicePhones } from "~/constants/company";

useHead({
  title: "Contact | Placeholder Title",
  meta: [
    {
      name: "description",
      content: "Placeholder meta description",
    },
  ],
});

const route = useRoute();
const config = useRuntimeConfig();
const siteKey = computed(() => String(config.public.recaptchaSiteKey ?? ""));
const formAction = computed(() => route.path);

const form = reactive({
  name: "",
  phone: "",
  email: "",
  message: "",
});

const errors = reactive({
  name: "",
  email: "",
  message: "",
  recaptcha: "",
});

const recaptchaRef = ref<HTMLElement | null>(null);
const recaptchaWidgetId = ref<number | null>(null);
const recaptchaLoadError = ref(false);
const recaptchaAlive = ref(true);
const submitting = ref(false);
const submitSuccess = ref(false);
const submitError = ref("");

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      render: (
        container: HTMLElement,
        opts: { sitekey: string; theme?: "light" | "dark" },
      ) => number;
      reset: (widgetId?: number) => void;
      getResponse: (widgetId?: number) => string;
    };
  }
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clearFieldErrors() {
  errors.name = "";
  errors.email = "";
  errors.message = "";
  errors.recaptcha = "";
}

/**
 * Wait for the v2 explicit API. Uses grecaptcha.ready (required); avoids hanging
 * when a recaptcha script tag already finished loading before we subscribed to "load".
 */
function loadRecaptchaScript(): Promise<void> {
  if (import.meta.server) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const settleReady = () => {
      const g = window.grecaptcha;
      if (g?.ready) {
        g.ready(() => resolve());
      } else {
        reject(new Error("reCAPTCHA"));
      }
    };

    if (window.grecaptcha?.ready) {
      settleReady();
      return;
    }

    const deadline = () => Date.now() + 15_000;

    const pollUntilApi = (until: number) => {
      const step = () => {
        if (window.grecaptcha?.ready) {
          settleReady();
        } else if (Date.now() > until) {
          reject(new Error("reCAPTCHA"));
        } else {
          requestAnimationFrame(step);
        }
      };
      step();
    };

    const existing = document.querySelector<HTMLScriptElement>(
      'script[src*="google.com/recaptcha/api.js"]',
    );

    if (existing) {
      existing.addEventListener("load", () => pollUntilApi(deadline()), {
        once: true,
      });
      existing.addEventListener("error", () => reject(new Error("reCAPTCHA")), {
        once: true,
      });
      pollUntilApi(deadline());
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.onload = () => pollUntilApi(deadline());
    script.onerror = () => reject(new Error("reCAPTCHA"));
    document.head.appendChild(script);
  });
}

async function initRecaptchaWidget() {
  const key = siteKey.value;
  const el = recaptchaRef.value;
  if (
    !key ||
    !el ||
    recaptchaWidgetId.value !== null ||
    recaptchaLoadError.value
  ) {
    return;
  }
  try {
    await loadRecaptchaScript();
    if (!recaptchaAlive.value) {
      return;
    }
    await nextTick();
    if (!recaptchaAlive.value || recaptchaRef.value !== el) {
      return;
    }
    recaptchaWidgetId.value = window.grecaptcha!.render(el, {
      sitekey: key,
      theme: "light",
    });
  } catch {
    if (recaptchaAlive.value) {
      recaptchaLoadError.value = true;
    }
  }
}

watch(
  [() => siteKey.value, recaptchaRef],
  () => {
    void initRecaptchaWidget();
  },
  { flush: "post", immediate: true },
);

onBeforeUnmount(() => {
  recaptchaAlive.value = false;
  recaptchaWidgetId.value = null;
});

async function onSubmit() {
  clearFieldErrors();
  submitError.value = "";
  submitSuccess.value = false;

  let ok = true;
  if (!form.name.trim()) {
    errors.name = "Please enter your name.";
    ok = false;
  }
  if (!form.email.trim()) {
    errors.email = "Please enter your email.";
    ok = false;
  } else if (!validateEmail(form.email)) {
    errors.email = "Please enter a valid email address.";
    ok = false;
  }
  if (!form.message.trim()) {
    errors.message = "Please enter a message.";
    ok = false;
  }

  const key = siteKey.value;
  let token = "";
  if (!key) {
    errors.recaptcha = "Error loading reCAPTCHA. Site key is missing.";
    ok = false;
  } else if (recaptchaLoadError.value || recaptchaWidgetId.value === null) {
    errors.recaptcha =
      "Verification could not load. Refresh the page and try again.";
    ok = false;
  } else {
    token = window.grecaptcha?.getResponse(recaptchaWidgetId.value) ?? "";
    if (!token) {
      errors.recaptcha = "Please check the “I’m not a robot” box.";
      ok = false;
    }
  }

  if (!ok) {
    return;
  }

  submitting.value = true;
  try {
    const body = new URLSearchParams();
    body.set("form-name", "contact");
    body.set("name", form.name.trim());
    body.set("phone", form.phone.trim());
    body.set("email", form.email.trim());
    body.set("message", form.message.trim());
    body.set("g-recaptcha-response", token);
    body.set("bot-field", "");

    const res = await fetch(formAction.value, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });

    if (!res.ok) {
      throw new Error(String(res.status));
    }

    submitSuccess.value = true;
    form.name = "";
    form.phone = "";
    form.email = "";
    form.message = "";
    if (recaptchaWidgetId.value !== null) {
      window.grecaptcha?.reset(recaptchaWidgetId.value);
    }
  } catch {
    submitError.value =
      "Something went wrong. Please try again or call us directly.";
    if (recaptchaWidgetId.value !== null) {
      window.grecaptcha?.reset(recaptchaWidgetId.value);
    }
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <div>
    <SubpageHero heading="Contact Us" />
    <section class="contact-main" aria-labelledby="contact-heading">
      <AppContainer>
        <div class="layout">
          <div class="intro">
            <h2 id="contact-heading" class="section-title">Get in touch</h2>
            <p class="copy">Placeholder copy</p>
            <div class="contact-phones" aria-label="Phone numbers">
              <div class="contact-phones__group">
                <h3 class="contact-phones__heading">Service</h3>
                <ul class="contact-phones__list">
                  <li v-for="phone in servicePhones" :key="phone.tel">
                    <a :href="phone.tel">
                      <span class="contact-phones__name"
                        >{{ phone.name }}:</span
                      >
                      {{ phone.display }}
                    </a>
                  </li>
                </ul>
              </div>
              <div class="contact-phones__group">
                <h3 class="contact-phones__heading">Office &amp; Billing</h3>
                <p class="contact-phones__office-line">
                  <a :href="officeBillingPhone.tel">{{
                    officeBillingPhone.display
                  }}</a>
                </p>
              </div>
            </div>
            <div class="story-image-wrap">
              <NuxtImg
                src="https://placehold.co/600x400"
                alt="Placeholder alt tag"
                class="story-image"
                width="600"
                height="400"
              />
            </div>
          </div>

          <form
            name="contact"
            class="form"
            method="POST"
            :action="formAction"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            novalidate
            netlify
            @submit.prevent="onSubmit"
          >
            <input type="hidden" name="form-name" value="contact" />
            <p class="hp-field" aria-hidden="true">
              <label>
                Do not fill this in:
                <input
                  name="bot-field"
                  type="text"
                  tabindex="-1"
                  autocomplete="off"
                />
              </label>
            </p>
            <div class="field">
              <label for="contact-name">Name <span class="req">*</span></label>
              <input
                id="contact-name"
                v-model="form.name"
                type="text"
                name="name"
                autocomplete="name"
                required
                :aria-invalid="Boolean(errors.name)"
                :aria-describedby="errors.name ? 'err-name' : undefined"
              />
              <p
                v-if="errors.name"
                id="err-name"
                class="field-error"
                role="alert"
              >
                {{ errors.name }}
              </p>
            </div>

            <div class="field">
              <label for="contact-phone">Phone</label>
              <input
                id="contact-phone"
                v-model="form.phone"
                type="tel"
                name="phone"
                autocomplete="tel"
              />
            </div>

            <div class="field">
              <label for="contact-email"
                >Email <span class="req">*</span></label
              >
              <input
                id="contact-email"
                v-model="form.email"
                type="email"
                name="email"
                autocomplete="email"
                required
                :aria-invalid="Boolean(errors.email)"
                :aria-describedby="errors.email ? 'err-email' : undefined"
              />
              <p
                v-if="errors.email"
                id="err-email"
                class="field-error"
                role="alert"
              >
                {{ errors.email }}
              </p>
            </div>

            <div class="field">
              <label for="contact-message"
                >Message <span class="req">*</span></label
              >
              <textarea
                id="contact-message"
                v-model="form.message"
                name="message"
                rows="6"
                required
                :aria-invalid="Boolean(errors.message)"
                :aria-describedby="errors.message ? 'err-message' : undefined"
              />
              <p
                v-if="errors.message"
                id="err-message"
                class="field-error"
                role="alert"
              >
                {{ errors.message }}
              </p>
            </div>

            <div class="recaptcha-wrap">
              <div v-if="siteKey" ref="recaptchaRef" class="recaptcha-target" />
              <p v-if="!siteKey" class="config-hint" role="status">
                Add <code>NUXT_PUBLIC_RECAPTCHA_SITE_KEY</code> (or
                <code>RECAPTCHA_SITE_KEY</code>) in <code>.env</code> locally
                and in Netlify for <strong>all build/deploy contexts</strong> so
                the site key is available.
              </p>
              <p v-if="errors.recaptcha" class="field-error" role="alert">
                {{ errors.recaptcha }}
              </p>
            </div>

            <p v-if="submitSuccess" class="form-success" role="status">
              Thanks — your message was sent. We will get back to you soon.
            </p>
            <p v-if="submitError" class="field-error form-banner" role="alert">
              {{ submitError }}
            </p>

            <AppButton
              type="submit"
              variant="secondary"
              class="submit-btn"
              :disabled="submitting"
            >
              {{ submitting ? "Sending…" : "Submit" }}
            </AppButton>
          </form>
        </div>
      </AppContainer>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@use "~/styles/responsive" as r;

.contact-main {
  padding: 2rem 0 3.5rem;
  color: var(--secondary-bg-color);
  background-color: #fff;

  @include r.up(md) {
    padding: 2.75rem 0 4.5rem;
  }
}

.layout {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @include r.up(lg) {
    flex-direction: row;
    align-items: flex-start;
    gap: 3rem;
  }
}

.intro {
  flex: 1;
  min-width: 0;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 1rem;
  color: var(--secondary-bg-color);

  @include r.up(md) {
    font-size: 1.75rem;
  }
}

.copy {
  margin: 0;
  font-size: 1rem;
  line-height: 1.65;
  font-weight: 400;
  max-width: 36rem;

  @include r.up(md) {
    font-size: 1.05rem;
    line-height: 1.7;
  }
}

.contact-phones {
  margin-top: 1.35rem;
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
  max-width: 36rem;

  @include r.up(md) {
    margin-top: 1.5rem;
    gap: 1.25rem;
  }
}

.contact-phones__heading {
  margin: 0 0 0.45rem;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--secondary-bg-color);
  opacity: 0.85;
}

.contact-phones__list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.contact-phones__list li + li {
  margin-top: 0.35rem;
}

.contact-phones a {
  font-size: 1rem;
  line-height: 1.5;
  color: var(--primary-bg-color);
  font-weight: 600;
  text-decoration: none;

  &:hover,
  &:focus-visible {
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 2px solid var(--primary-bg-color);
    outline-offset: 2px;
    border-radius: 2px;
  }
}

.contact-phones__name {
  font-weight: 700;
  color: var(--secondary-bg-color);
}

.contact-phones__office-line {
  margin: 0;
}

.story-image-wrap {
  display: flex;
  align-items: center;
  margin-top: 1.75rem;

  @include r.up(md) {
    margin-top: 2rem;
  }
}

.story-image {
  width: 100%;
  max-width: 480px;
  height: auto;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 12px 40px rgba(27, 37, 71, 0.32);
}

.hp-field {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
  pointer-events: none;
}

.form {
  position: relative;
  flex: 1;
  min-width: 0;
  max-width: 36rem;

  @include r.up(lg) {
    max-width: 28rem;
  }
}

.field {
  margin-bottom: 1.15rem;

  @include r.up(md) {
    margin-bottom: 1.35rem;
  }
}

label {
  display: block;
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.4rem;
}

.req {
  color: var(--primary-bg-color);
  font-weight: 700;
}

input,
textarea {
  width: 100%;
  padding: 0.65rem 0.85rem;
  border: 1px solid #c8c8c8;
  border-radius: 6px;
  font: inherit;
  color: var(--secondary-bg-color);
  background-color: #fff;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: var(--primary-bg-color);
    box-shadow: 0 0 0 2px rgba(8, 131, 93, 0.2);
  }
}

textarea {
  resize: vertical;
  min-height: 8rem;
}

.field-error {
  margin: 0.35rem 0 0;
  font-size: 0.875rem;
  color: #b00020;
}

.form-banner {
  margin: 0 0 1rem;
}

.form-success {
  margin: 0 0 1rem;
  font-size: 0.95rem;
  color: var(--primary-bg-color);
  font-weight: 600;
}

.recaptcha-wrap {
  margin: 0.25rem 0 1.25rem;
}

.recaptcha-target {
  min-height: 78px;
}

.config-hint {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.5;
  color: #555;

  code {
    font-size: 0.8rem;
    word-break: break-all;
  }
}

.submit-btn {
  width: 100%;
  border: none;
  margin-top: 0.25rem;

  @include r.up(sm) {
    width: auto;
    min-width: 12rem;
  }
}
</style>
