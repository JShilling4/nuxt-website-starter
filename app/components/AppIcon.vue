<script setup lang="ts">
import { computed } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ICONS, type AppIconName } from "~/constants/icons";

const props = defineProps<{
  name: AppIconName;
}>();

const definition = computed(() => ICONS[props.name]);
</script>

<template>
  <FontAwesomeIcon :icon="definition" />
</template>
