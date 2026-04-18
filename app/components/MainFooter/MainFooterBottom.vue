<template>
  <div class="footer-bottom">
    <AppContainer>
      <div class="footer-bottom-inner">
        <p class="copyright">
          &copy; {{ new Date().getFullYear() }} Placeholder Company. All rights
          reserved.
        </p>
      </div>
    </AppContainer>
  </div>
</template>

<style lang="scss" scoped>
.footer-bottom {
  background-color: var(--secondary-bg-color);
  color: var(--secondary-text-color);
  padding: 1rem 0;

  .footer-bottom-inner {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .copyright {
    margin: 0;
    font-size: 0.875rem;
    opacity: 0.9;
  }
}
</style>
