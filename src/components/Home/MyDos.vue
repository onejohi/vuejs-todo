<template>
  <div class="container-fluid pt-5">
    <nav class="navbar fixed-bottom navbar-light bg-light">
      <div class="container-fluid">
        <button
          class="btn btn-primary"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#newTaskOffcanvas"
          aria-controls="newTaskOffcanvas">
          New ToDo
        </button>
      </div>
    </nav>

    <div class="container-fluid">
      <div class="row mt-2 row-cols-1 row-cols-md-3">
        <div v-if="incompleteTasks.length <= 0" class="card mt-5">
            <div class="card-body">
              <p class="card-text text-center">
                No tasks
              </p>
            </div>
          </div>
        <div v-else v-for="task in incompleteTasks" :key="task.id" class="col col-12 col-md-4">

          <div class="card my-2">
            <div
              class="card-body text-primary"
              :class="task.priority === 'urgent' ? 'text-danger' : 'text-secondary'">
              <h5 class="fs-6">{{ task.title }}</h5>
              <p class="card-text text-sm">
                {{ task.description }}
              </p>
              <hr>
              <div class="form-check">
                <input class="form-check-input" @click="$store.dispatch('completeTask', task)" type="checkbox" value="">
                <label class="form-check-label">
                  Complete task
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- New task bottom offcanvas -->
    <div
      class="offcanvas offcanvas-bottom"
      tabindex="-1"
      id="newTaskOffcanvas"
      aria-labelledby="newTaskOffcanvasLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="newTaskOffcanvasLabel">New Task</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body small">
        <div class="row row-cols-1 row-cols-md-2">
          <div class="col col-12 col-md-6">
            <div class="mb-3">
              <input
                type="text"
                class="form-control"
                name="title"
                v-model="title"
                placeholder="Title">
            </div>
            <div class="mb-3">
              <textarea
                placeholder="Description"
                class="form-control"
                v-model="description"
                rows="1"></textarea>
            </div>
          </div>
          <div class="col col-12 col-md-6">
            <div class="row">
              <div class="col">
                <select v-model="priority" class="form-select" aria-label="Priority">
                  <option value="" selected>Priority</option>
                  <option value="urgent">Urgent</option>
                  <option value="noturgent">Not Urgent</option>
                  <option value="dolater">Do Later</option>
                </select>
              </div>
              <div class="col">
                <div class="d-grid gap-2">
                  <div class="form-check form-switch">
                    <input
                      class="form-check-input"
                      :checked="private_task"
                      @click="private_task = !private_task"
                      type="checkbox">
                    <label class="form-check-label">
                      {{ private_task ? 'Private' : 'Public' }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col">
                <div class="d-grid gap-2">
                  <button class="btn btn-primary" type="button">Upload File</button>
                </div>
              </div>
              <div class="col">
                <div class="d-grid gap-2">
                  <div class="mb-3">
                    <input
                      type="date"
                      style="max-width: 40vw"
                      class="form-control"
                      name="duedate"
                      placeholder="Due Date">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="btn btn-success" data-bs-dismiss="offcanvas" @click="createTask()">Create Task</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'MyDos',
  mounted() {
    this.getTasks();
  },
  data() {
    return {
      title: '',
      description: '',
      priority: '',
      private_task: true,
      duedate: '',
      uploadUrl: ''
    };
  },
  computed: {
    incompleteTasks() {
      return this.$store.state.tasks.mytasks.filter((task) => !task.complete)
    }
  },
  methods: {
    ...mapActions([
      'getTasks'
    ]),
    createTask() {
      this.$store.dispatch('createTask', {
        title: this.title,
        description: this.description,
        priority: this.priority,
        private: this.private_task,
        imageUrl: 'https://google.com'
      });
      this.title = '';
      this.description = '';
      this.priority = '';
      this.private_task = false;
    }
  }
}
</script>
