<!-- Semantic icons: register sources in `~/constants/icons.ts` (see README **Icons**). -->
<script setup lang="ts">
import { computed } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ICONS, type AppIconName } from "~/constants/icons";

const props = defineProps<{
  name: AppIconName;
}>();

const entry = computed(() => ICONS[props.name]);

const fontAwesomeDefinition = computed(() =>
  entry.value.source === "fontawesome" ? entry.value.icon : undefined,
);

const iconifyName = computed(() =>
  entry.value.source === "iconify" ? entry.value.name : undefined,
);
</script>

<template>
  <FontAwesomeIcon
    v-if="fontAwesomeDefinition"
    :icon="fontAwesomeDefinition"
  />
  <NuxtIcon v-else-if="iconifyName" :name="iconifyName" />
</template>
