<script setup>
import Navbar from "@/components/Navbar.vue";
import { RouterView, useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <div>
    <Navbar v-if="!route.meta.hideNavbar" />
    <!-- <Navbar /> -->
    <RouterView />
  </div>
</template>
