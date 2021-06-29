<template>
  <div class="container-fluid">
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
        <div class="col col-12 col-md-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Task title</h5>
              <p class="card-text">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis nesciunt repellendus dolores modi optio eaque animi dolore mollitia! Nesciunt, a?
              </p>
              <a href="#" class="btn btn-sm mx-2 btn-primary">Complete</a>
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
                placeholder="Title">
            </div>
            <div class="mb-3">
              <textarea
                placeholder="Description"
                class="form-control"
                rows="1"></textarea>
            </div>
          </div>
          <div class="col col-12 col-md-6">
            <div class="row">
              <div class="col">
                <select class="form-select" aria-label="Priority">
                  <option selected>Priority</option>
                  <option value="1">Urgent</option>
                  <option value="2">Not Urgent</option>
                  <option value="3">Do Later</option>
                </select>
              </div>
              <div class="col">
                <div class="d-grid gap-2">
                  <input type="radio" class="btn-check" name="options" id="option1" autocomplete="off" checked>
                  <label class="btn btn-secondary" for="option1">Private</label>
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
                <div class="mb-3">
                  <input
                    type="text"
                    class="form-control"
                    name="duedate"
                    placeholder="Due Date">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="btn btn-success">Create Task</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyDos'
}
</script>
