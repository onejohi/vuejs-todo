<template>
  <div class="container-fluid">
    <form class="mt-5 text-center mx-auto" style="max-width: 400px;">
      <h3 class="text-center display-4 my-5">JstDoIT</h3>
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

      <div v-if="errorMsg" class="alert alert-danger alert-dismissible fade show" role="alert">
        {{ errorMsg }}
      </div>

      <div class="form-floating">
        <input
          type="email"
          class="form-control"
          id="floatingInput"
          v-model.trim="loginForm.email"
          placeholder="name@example.com">
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating mt-3">
        <input
          type="password"
          class="form-control"
          v-model.trim="loginForm.password"
          id="floatingPassword"
          placeholder="Password">
        <label for="floatingPassword">Password</label>
      </div>
      <button @click="loginAttempt($event)" class="w-100 mt-3 btn btn-lg btn-primary" type="submit">Sign in</button>
      <p>Don't have an account? <router-link to="/register" class="text-decoration-none">Register</router-link></p>
      <p class="mt-5 mb-3 text-muted">&copy; 2021</p>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      errorMsg: '',
      loginForm: {
        email: '',
        password: '',
      }
    }
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    async loginAttempt(e) {
      e.preventDefault();
      const loggedIn = await this.login({
        email: this.loginForm.email,
        password: this.loginForm.password
      });
      if (loggedIn && loggedIn.code === ('auth/invalid-email' || 'auth/user-not-found' || 400)) {
        this.errorMsg = loggedIn.message;
        return;
      }
      this.$router.push({ name: 'mydos' });
    }
  }
}
</script>