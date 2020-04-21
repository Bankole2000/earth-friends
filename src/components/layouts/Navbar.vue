<template>
  <div class="navbar">
    <nav class="deep-purple darken-1">
      <div class="container">
        <router-link :to="{ name: 'Home' }"><a class="brand-logo left">Earth Friends</a>
        </router-link>
        <ul class="right">
          <li v-if="!user"><router-link :to="{ name: 'Signup' }">Signup</router-link></li>
          <li v-if="!user"><router-link :to="{ name: 'Login' }">Login</router-link></li>
          <li v-if="user" class="hide-on-small-only">{{ user.email }} </li>
          <li v-if="user"><img :src="(user.image)" @error="noGravatar"
          width="40px" alt="" class="circle responsive-img"
          style="margin-top: .6rem; margin-left: 10px;"></li>
          <li v-if="user"><a @click='logout'>Logout</a></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import firebase from 'firebase';
import M from 'materialize-css';
import md5 from 'md5-hash';

export default {
  name: 'Navbar',
  data() {
    return {
      user: null,
    };
  },
  methods: {
    logout() {
      firebase.auth().signOut()
        .then(() => {
          M.toast({ html: '<span>Logged Out <span><i class="mdi mdi-logout red-text"></i>', classes: 'mtoast' });
          this.$router.push({ name: 'Login' });
        });
    },
    noGravatar() {
      this.user.image = '../../assets/images/avatar.png';
    },
  },
  created() {
    // let user = firebase.auth().currentUser;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        // console.log(user.uid);
        // get gravatar
        const gravatar = md5(this.user.email.trim().toLowerCase());
        this.user.image = `https://www.gravatar.com/avatar/${gravatar}`;
      } else {
        this.user = null;
      }
    });
  },
};
</script>

<style>
  .navbar {
    z-index: 2;
  }
  .mtoast {
    display: flex !important;
    justify-content: space-evenly !important;
  }
</style>
