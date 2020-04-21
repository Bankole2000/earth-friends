<template>
  <div>
    <div class="login">
      <div class="container">
        <form @submit.prevent='login' class="card-panel">
          <h2 class="center deep-purple-text">
            Login
          </h2>
          <div class="field">
            <label for="email">Email</label>
            <input type="email" name="email" v-model="email" />
          </div>
          <div class="field">
            <label for="password">Password</label>
            <input type="password" name="password" v-model="password" />
          </div>
          <div class="progress" v-if="loading">
            <div class="indeterminate"></div>
          </div>
          <p v-if="feedback">{{ feedback }}</p>
          <div class="field center">
            <button class="btn deep-purple">
              <i class="mdi mdi-reload mdi-spin" v-if="loading"></i> Login</button>
          </div>
        </form>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import firebase from 'firebase';
import M from 'materialize-css';
import Footer from '../layouts/Footer.vue';

export default {
  name: 'Login',
  components: {
    Footer,
  },
  data() {
    return {
      email: null,
      password: null,
      feedback: null,
      loading: false,
    };
  },
  methods: {
    login() {
      this.loading = true;
      if (this.email && this.password) {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then((cred) => {
            console.log(cred.user);
            this.loading = false;
            M.toast({ html: '<span>Login Successful <i class="mdi mdi-check-circle green-text"></i><span>', classes: 'mtoast' });
            this.$router.push({ name: 'Home' });
          })
          .catch((err) => {
            this.loading = false;
            M.toast({ html: '<span>Login Failed<span><button class="btn-flat red-text toast-action">Error</button>', classes: 'mtoast' });
            this.feedback = err.message;
          });
        this.feedback = null;
      } else {
        this.loading = false;
        M.toast({ html: '<span>Incomplete Details<span><button class="btn-flat red-text toast-action">Error</button>' });
        this.feedback = 'Please fill all fields';
      }
    },
  },
};
</script>

<style>
  .login {
    max-width: 500px;
    margin: 100px auto;

  }
  .login h2 {
    font-size: 2.4em;
    margin-top: 5px;
  }
  .login .field {
    margin-bottom: 16px;
  }
</style>
