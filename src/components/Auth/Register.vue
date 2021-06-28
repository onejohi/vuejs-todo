<template>
  <div class="container-fluid">
    <form class="mt-5 text-center mx-auto" style="max-width: 400px;">
      <h3 class="text-center display-4 my-5">JstDoIT</h3>
      <h1 class="h3 mb-3 fw-normal">Create a new account</h1>

      <div class="form-floating">
        <input type="name" class="form-control" id="floatingName" placeholder="Name">
        <label for="floatingName">Username</label>
      </div>
      <div class="form-floating mt-3">
        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating mt-3">
        <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
        <label for="floatingPassword">Password</label>
      </div>
      <button class="w-100 mt-3 btn btn-lg btn-primary" type="submit">Register</button>
      <p class="mt-5 mb-3 text-muted">&copy; 2021</p>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Register',
}
</script>