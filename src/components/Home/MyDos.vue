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
        <div class="input-group mb-3 mt-3">
            <input
              type="text"
              class="form-control"
              v-model="searchInputValue"
              placeholder="task title or description"
              aria-describedby="button-addon2">
            <button
              class="btn btn-outline-secondary"
              type="button"
              @click="searchTasks(searchInputValue)"
              id="button-addon2">Search</button>
          </div>
        <div v-if="incompleteTasks.length <= 0" class="card mt-5">
            <div class="card-body">
              <p class="card-text text-center">
                No tasks
              </p>
            </div>
          </div>
        <div v-else v-for="task in incompleteTasks" :key="task.id" class="col col-12 col-md-4">

          <div class="wrapper my-2">
            <div class="front">
              <div class="card">
                <img
                  :src="task.imageUrl"
                  height="150"
                  class="card-img-top"
                  alt="...">
                <div class="card-body text-dark p-1 mx-3">
                  <small> {{ task.title }} </small>
                  <br>
                  <small class="text-muted">{{ task.description.slice(0, 40) }}</small>
                </div>
              </div>
            </div>
            
            <div class="back">
              <div class="text-primary"
                  :class="task.priority === 'urgent' ? 'text-danger' : 'text-secondary'">
                  <h5 class="fs-6">{{ task.title }}</h5>
                  <p class="card-text text-sm">
                    {{ task.description }}
                  </p>
                  <hr>
                  <p class="text-sm">
                    {{ task.priority !== 'urgent' ? 'do later' : 'urgent' }}
                  </p>
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
                  <div class="mb-3">
                    <button class="btn btn-primary" @click="pickPhoto">choose a photo</button>
                    <input
                      type="file"
                      ref="imageInput"
                      style="display: none"
                      @change="previewImage"
                      accept="image/*" > 
                  </div>
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
        <div v-if="img1!=null" class="my-2">                     
          <span class="badge bg-success">Upload Successful !</span>
        </div>
        <div v-if="loading" class="progress my-2">
          <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
        </div>
        <div class="btn btn-success" data-bs-dismiss="offcanvas" @click="createTask()">Create Task</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { storage } from '../../firebase';

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
      uploadUrl: '',
      img1: null,
      loading: false,
      searchInputValue: '',
    };
  },
  computed: {
    incompleteTasks() {
      return this.$store.state.tasks.mytasks;
    }
  },
  methods: {
    ...mapActions([
      'getTasks',
      'searchTasks',
    ]),
    pickPhoto() {
      this.$refs.imageInput.click()   
    },
    previewImage(event) {
      this.uploadValue=0;
      this.img1=null;
      this.imageData = event.target.files[0];
      this.onUpload()
    },
    onUpload(){
      this.loading = true;
      this.img1=null;
      const storageRef=storage.ref(`${this.imageData.name}`).put(this.imageData);
      storageRef.on(`state_changed`,snapshot=>{
      this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        }, error=>{console.log(error.message)},
      ()=>{this.uploadValue=100;
          storageRef.snapshot.ref.getDownloadURL().then((url)=>{
              this.img1 =url;
              this.loading = false;
            });
          }      
        );
    },
    createTask() {
      this.$store.dispatch('createTask', {
        title: this.title,
        description: this.description,
        priority: this.priority,
        private: this.private_task,
        imageUrl: this.img1
      });
      this.title = '';
      this.description = '';
      this.priority = '';
      this.private_task = false;
    }
  }
}
</script>

<style scoped>
.wrapper {
  height: 200px;
  width: 100%;
  transition: all .6s ease;
  transform-style: preserve-3d;
}

.wrapper:hover, .back {
  transform: rotateY(180deg);
}

.front, .back {
  position: absolute;
  height: 200px;
  color: white;
  width: 100%;
  border-radius: 12px;
  backface-visibility: hidden;
}

.front {
  background: #333;
  color: whitesmoke;
}

.back {
  background: rgb(233, 232, 232);
  padding: 15px;
}

.back {
  transform: rotateY(-180deg);
}
</style>
