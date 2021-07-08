<template>
  <div class="container-fluid pt-5">
    <div class="row row-cols-1 row-cols-md-3 pt-3">
      <div v-for="user in $store.state.users.allUsers" :key="user.id" class="col col-12 col-md-4">
        <div class="card my-1">
          <div class="card-body">
            <div class="row">
              <div class="col-3">
                <img class="rounded-circle" :src="`https://ui-avatars.com/api/?name=${user.displayName}?size=40`" alt="">
              </div>
              <div class="col-9">
                <h4 class="mt-3">{{ user.displayName }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Users',
  mounted() {
    this.getUsers();
  },
  methods: {
    ...mapActions([
      'getUsers'
    ])
  }
}
</script>
