<template>
  <div class="container-fluid">
    <div class="text-center mt-5">
      <img class="rounded-circle" :src="`https://ui-avatars.com/api/?name=${user.username}?size=100`" alt="">
      <br>
      <br>
      <h4 class="display-5">{{ user.username }}</h4>
      <br>
      <button @click="logOutAttempt()" class="btn btn-danger">Log out</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Me',
  computed: {
    ...mapState(['user'])
  },
  methods: {
    logOutAttempt() {
      this.$store.dispatch('logout');
      this.$router.push({ name: 'login' });
    }
  }
}
</script>
