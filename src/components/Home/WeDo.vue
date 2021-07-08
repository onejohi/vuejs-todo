<template>
  <div class="container-fluid pt-5">
    <div class="row mt-2 row-cols-1 row-cols-md-3">
        <div v-if="$store.state.tasks.pubtasks.length <= 0" class="card mt-5">
          <div class="card-body">
            <p class="card-text text-center">
              No Public Tasks
            </p>
          </div>
        </div>
      
      <div v-else v-for="task in $store.state.tasks.pubtasks" :key="task.id" class="col col-12 col-md-4">
        <div class="card my-2">
          <div class="card-body">
            <h5 class="card-title">{{ task.title }}</h5>
            <p class="card-text">
              {{ task.description }}
            </p>
            {{ task.likes }}
            <button @click="likePublicTask(task)" class="btn mx-1 btn-light">
              <i class="bi bi-heart-fill text-danger"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'WeDo',
  mounted() {
    this.getPublicTasks();
  },
  methods: {
    ...mapActions([
      'getPublicTasks',
      'likePublicTask'
    ])
  }
}
</script>
