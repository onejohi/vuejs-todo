<template>
  <nav class="nav nav-pills nav-justified">
    <router-link
      class="flex-sm-fill text-sm-center nav-link"
      :class="$route.name === 'mydos' ? 'active' : ''"
      to="/">MyDos</router-link>
    <router-link
      class="flex-sm-fill text-sm-center nav-link"
      :class="$route.name === 'wedo' ? 'active' : ''"
      to="/wedo">WeDo</router-link>
    <router-link
      class="flex-sm-fill text-sm-center nav-link"
      :class="$route.name === 'users' ? 'active' : ''"
      to="/users">Users</router-link>
    <router-link
      class="flex-sm-fill text-sm-center nav-link"
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
