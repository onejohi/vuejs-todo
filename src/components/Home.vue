<template>
  <nav class="nav nav-pills bg-dark fixed-top justify-content-center p-2">
    <router-link
      class="text-sm-center nav-link"
      :class="$route.name === 'mydos' ? 'active' : ''"
      to="/">MyDos</router-link>
    <router-link
      class="text-sm-center nav-link"
      :class="$route.name === 'wedo' ? 'active' : ''"
      to="/wedo">WeDo</router-link>
    <router-link
      class="text-sm-center nav-link"
      :class="$route.name === 'users' ? 'active' : ''"
      to="/users">Users</router-link>
    <router-link
      class="text-sm-center nav-link"
      :class="$route.name === 'me' ? 'active' : ''"
      to="/me">Me</router-link>
  </nav>
  <router-view />
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

<style scoped>
.nav-link {
  min-width: 100px;
}

@media screen and (width: 360px) {
  .nav-link {
    min-width: 20vw;
  }
}
</style>
