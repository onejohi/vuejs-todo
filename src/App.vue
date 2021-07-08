<template>
  <div v-if="loading" class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>

  <router-view v-else />
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      loading: false,
    };
  },
  mounted() {
    this.loading = true;
    this.authorizeUser();
    this.loading = false;
  },
  methods: {
    ...mapActions([
      'authorizeUser',
    ]),
  }
}
</script>

<style>
body {
  font-family: 'Segoe UI Light';
  margin: 0  !important;
  padding: 0 !important;
}
</style>
