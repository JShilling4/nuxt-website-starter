<script setup lang="ts">
import { navItems } from "./navItems";
import type { NavItem } from "~/types";

const route = useRoute();
const openDropdownId = ref<string | null>(null);
/*  After navigation, desktop flyout stays open via :hover; suppress hover until
    pointer leaves the item or focus enters from outside nav.
*/
const suppressDesktopHoverFlyout = ref(false);

function navItemKey(item: NavItem): string {
  return item.kind === "link" ? item.to : item.id;
}

function submenuId(dropdownId: string): string {
  return `nav-${dropdownId}-submenu`;
}

function toggleDropdown(id: string): void {
  openDropdownId.value = openDropdownId.value === id ? null : id;
}

function closeDropdown(): void {
  openDropdownId.value = null;
}

function onDropdownMouseLeave(): void {
  suppressDesktopHoverFlyout.value = false;
}

function onNavFocusIn(event: FocusEvent): void {
  const root = event.currentTarget as HTMLElement | null;
  if (!root) return;
  const rt = event.relatedTarget;
  if (rt instanceof Node && root.contains(rt)) return;
  suppressDesktopHoverFlyout.value = false;
}

watch(
  () => route.path,
  () => {
    closeDropdown();
    suppressDesktopHoverFlyout.value = true;
    if (import.meta.client) {
      const el = document.activeElement;
      if (el instanceof HTMLElement) el.blur();
    }
  },
);
</script>

<template>
  <ul
    class="navlink-container"
    :class="{
      'navlink-container--suppress-desktop-hover-flyout':
        suppressDesktopHoverFlyout,
    }"
    @focusin="onNavFocusIn"
  >
    <template v-for="item in navItems" :key="navItemKey(item)">
      <li v-if="item.kind === 'link'" class="navlink">
        <RouterLink :to="item.to" class="navlink-text">{{
          item.label
        }}</RouterLink>
      </li>
      <li
        v-else
        class="navlink navlink--dropdown"
        :class="{ 'navlink--submenu-open': openDropdownId === item.id }"
        @keydown.escape="closeDropdown"
        @mouseleave="onDropdownMouseLeave"
      >
        <div class="navlink-dropdown-row">
          <RouterLink
            :to="item.to"
            class="navlink-text navlink-text--with-flyout"
            @click="closeDropdown"
          >
            {{ item.label }}
          </RouterLink>
          <button
            type="button"
            class="navlink-submenu-toggle"
            :aria-expanded="openDropdownId === item.id ? 'true' : 'false'"
            :aria-controls="submenuId(item.id)"
            :aria-label="`Toggle ${item.label} submenu`"
            @click="toggleDropdown(item.id)"
          >
            <FontAwesomeIcon
              :icon="['fas', 'chevron-down']"
              class="navlink-submenu-toggle-icon"
              aria-hidden="true"
            />
          </button>
        </div>
        <ul :id="submenuId(item.id)" class="submenu" role="list">
          <li
            v-for="child in item.children"
            :key="child.to"
            class="submenu-item"
          >
            <RouterLink
              :to="child.to"
              class="submenu-link"
              @click="closeDropdown"
            >
              {{ child.label }}
            </RouterLink>
          </li>
        </ul>
      </li>
    </template>
  </ul>
</template>

<style lang="scss" scoped>
@use "~/styles/responsive" as r;

.navlink-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  align-items: stretch;
  gap: 0.25rem;

  @include r.up(xl) {
    flex-direction: row;
    align-items: center;
    gap: 0;
  }

  .navlink {
    position: relative;
    height: 100%;
    letter-spacing: 1.2px;
    text-align: right;
    cursor: pointer;

    .navlink-text {
      display: inline-block;
      padding: 0.9rem 1rem;
      opacity: 1;
      font-size: 16px;
      font-weight: 700;
      color: var(--secondary-bg-color);
      transition: all 0.3s;
      border-radius: 12px;
      width: 100%;

      &.router-link-active {
        background: var(--tertiary-bg-faded);
      }

      @include r.down(xl) {
        /* Shared right gutter: disclosure column on dropdown rows, empty on plain links */
        padding: 0.9rem calc(1rem + 2.25rem) 0.9rem 1rem;
      }

      @include r.up(xl) {
        width: auto;
        padding: 0 1.75rem;
        border-radius: 0;
        background: transparent;
        font-size: 15px;

        &:after {
          content: "";
          position: absolute;
          bottom: -0.5rem;
          left: 50%;
          width: 0;
          transform: translateX(-50%);
          transition: all 0.3s;
          background-color: var(--primary-bg-color);
          height: 3px;
        }

        &:hover,
        &.router-link-active {
          background: transparent;

          &:after {
            width: 4rem;
          }
        }
      }

      @media screen and (min-width: 1270px) {
        font-size: 16px;
        padding: 0 1.9rem;
      }
      @media screen and (min-width: 1400px) {
        font-size: 16px;
        padding: 0 2.25rem;
      }
    }

    .social-icon {
      font-size: 25px;
    }
  }

  .navlink--dropdown {
    @include r.up(xl) {
      .navlink-text.navlink-text--with-flyout {
        &:hover,
        &.router-link-active {
          background: transparent;

          &:after {
            width: 0;
          }
        }
      }

      &:hover .submenu,
      &:focus-within .submenu {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
        transform: translate(-50%, 0);
      }
    }
  }

  .navlink-container--suppress-desktop-hover-flyout
    .navlink--dropdown:hover
    .submenu {
    @include r.up(xl) {
      opacity: 0 !important;
      visibility: hidden !important;
      pointer-events: none !important;
      transform: translate(-50%, 12px) !important;
    }
  }

  .navlink-container--suppress-desktop-hover-flyout
    .navlink--dropdown:focus-within
    .submenu {
    @include r.up(xl) {
      opacity: 1 !important;
      visibility: visible !important;
      pointer-events: auto !important;
      transform: translate(-50%, 0) !important;
    }
  }

  .navlink-dropdown-row {
    position: relative;
    width: 100%;

    @include r.down(xl) {
      display: block;
    }

    @include r.up(xl) {
      display: contents;
    }
  }

  .navlink .navlink-text--with-flyout {
    text-align: right;

    @include r.down(xl) {
      width: 100%;
      box-sizing: border-box;
    }

    @include r.up(xl) {
      flex: none;
    }
  }

  .navlink-submenu-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    min-width: 2rem;
    padding: 0.25rem;
    border-radius: 7px;
    border: none;
    background-color: var(--secondary-bg-color);
    color: var(--secondary-text-color);
    cursor: pointer;
    transition:
      background 0.2s ease,
      transform 0.25s ease;

    @include r.down(xl) {
      position: absolute;
      right: 0.5rem;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1;
    }

    @include r.up(xl) {
      display: none;
    }
  }

  .navlink-submenu-toggle-icon {
    width: 0.75rem;
    height: 0.75rem;
    transition: transform 0.25s ease;
  }

  .navlink--submenu-open .navlink-submenu-toggle-icon {
    transform: rotate(180deg);
  }

  .submenu {
    list-style: none;
    margin: 0;
    padding: 0;
    display: none;

    @include r.down(xl) {
      display: block;
      max-height: 0;
      overflow: hidden;
      opacity: 0;
      transition:
        max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1),
        opacity 0.25s ease;
      border-left: 3px solid var(--tertiary-bg-color);
      margin: 0.15rem 0 0.35rem 0.75rem;
      padding-left: 0.5rem;
    }

    @include r.up(xl) {
      display: block;
      position: absolute;
      /* Sit slightly under the label so there is no dead air between li and panel */
      top: calc(100% + 12px);
      left: 50%;
      transform: translate(-50%, 12px);
      min-width: 10rem;
      padding: 0.5rem 0;
      background: #fff;
      border-radius: 12px;
      box-shadow:
        0 12px 40px rgba(27, 37, 71, 0.22),
        0 2px 8px rgba(0, 0, 0, 0.16);
      z-index: 1010;
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      transition:
        opacity 0.2s ease,
        visibility 0.2s ease,
        transform 0.2s ease;

      /* Invisible wedge so pointer stays “in” the menu while moving from Services */
      &::before {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: 100%;
        height: 12px;
      }
    }
  }

  .navlink--submenu-open .submenu {
    @include r.down(xl) {
      max-height: 30rem;
      opacity: 1;
    }
  }

  .submenu-item {
    margin: 0;
    text-align: right;

    @include r.up(xl) {
      text-align: left;
    }
  }

  .submenu-link {
    display: block;
    padding: 0.65rem 1rem 0.65rem 0.5rem;
    font-size: 15px;
    font-weight: 600;
    white-space: nowrap;
    letter-spacing: 0.04em;
    color: var(--secondary-bg-color);
    text-decoration: none;
    border-radius: 8px;
    transition:
      background 0.2s ease,
      color 0.2s ease;

    &.router-link-active {
      background: var(--tertiary-bg-faded);
      color: var(--secondary-bg-color);
    }

    @include r.up(xl) {
      padding: 0.65rem 1.25rem;

      &:hover {
        background: var(--tertiary-bg-faded);
        color: var(--secondary-bg-color);
      }
    }
  }
}
</style>
