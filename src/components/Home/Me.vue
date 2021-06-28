<template>
  <div class="container-fluid">
    <div class="text-center mt-5">
      <img class="rounded-circle" src="https://ui-avatars.com/api/?name=John+Doe?size=100" alt="">
      <br>
      <br>
      <h4 class="display-5">John Doe</h4>
      <br>
      <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Log out</button>
    </div>

    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Confirm</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Are you sure you want to log out?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <router-link to="/login" class="btn btn-primary">Yes</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Me'
}
</script>
