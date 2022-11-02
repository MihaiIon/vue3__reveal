<template>
  <section class="c-page">
    <slot />
  </section>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import { usePagesStore } from "@/stores/navigation";

export default {
  data() {
    return {
      instanceId: uuidv4(),
      pages: usePagesStore(),
    };
  },
  created() {
    this.registerPage();
  },
  methods: {
    registerPage() {
      this.pages.registerPageById(this.instanceId);
    },
  },
};
</script>

<style></style>
