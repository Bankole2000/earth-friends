<template>
  <div>
    <div class="signup">
    <div class="container">
    <form @submit.prevent="signup" class="card-panel">
      <h2 class="center deep-purple-text">Signup</h2>
      <div class="field">
        <label for="email">Email</label>
        <input type="email" name="email" v-model="email">
      </div>
      <div class="field">
        <label for="password">Password</label>
        <input type="password" name="password" v-model="password">
      </div>
      <div class="field">
        <label for="alias">Display name</label>
        <input type="text" name="alias" v-model="alias">
      </div>
      <p class="red-text center" v-if="feedback">{{ feedback }}</p>
      <div class="field center">
        <button class="btn deep-purple">Sign up</button>
      </div>
    </form>
    </div>
  </div>
  <Footer />
  </div>

</template>

<script>
import M from 'materialize-css';
import slugify from 'slugify';
import firebase from 'firebase';
import Footer from '@/components/layouts/Footer.vue';
import db from '../../firebase/init';


export default {
  name: 'Signup',
  data() {
    return {
      email: null,
      password: null,
      alias: null,
      slug: null,
      feedback: null,
    };
  },
  components: {
    Footer,
  },
  methods: {
    signup() {
      if (this.alias && this.email && this.password) {
        this.slug = slugify(this.alias, {
          replacement: '-',
          remove: /[$*_+~()'"!\-:@]/g,
        });
        const ref = db.collection('users').doc(this.slug);
        ref.get()
          .then((doc) => {
            if (doc.exists) {
              this.feedback = 'This username has already been used';
              M.toast({ html: '<span>User Name is Already Taken<span><button class="btn-flat red-text toast-action">Error</button>' });
            } else {
              firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                .then((cred) => {
                  ref.set({
                    alias: this.alias,
                    geolocation: null,
                    user_id: cred.user.uid,
                  });
                  console.log(cred.user);
                  this.feedback = 'This username is free to use';
                  M.toast({
                    html: '<span>Signup Successful<span><button class="btn-flat green toast-action">success</button>',
                  });
                })
                .then(() => {
                  this.$router.push({ name: 'Home' });
                })
                .catch((err) => {
                  console.log(err);
                  this.feedback = err.message;
                  M.toast({
                    html: '<span>Signup failed<span><button class="btn-flat red toast-action">error</button>',
                  });
                });
            }
          });
      } else {
        this.feedback = 'A display Name is required';
        M.toast({ html: '<span>Display Name is Required<span><button class="btn-flat toast-action">Undo</button>' });
      }
    },
  },
  mounted() {
    M.AutoInit();
  },
};
</script>

<style>
  .signup {
    max-width: 500px;
    margin: 60px auto;

  }
  .signup h2 {
    font-size: 2.4em;
    margin-top: 5px;
  }
  .signup .field {
    margin-bottom: 16px;
  }
</style>
