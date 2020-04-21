<template>
  <div>
    <div class="view-profile container">
      <div v-if="profile" class="card">
        <h2 class="deep-purple-text center">{{ profile.alias }}'s Wall</h2>
        <ul class="comments collection">
          <li>Comment</li>
        </ul>
        <form @submit.prevent='addComment'>
          <div class="field">
            <label for="comment">Add a comment</label>
            <input type="text" name="comment" v-model="newComment">
            <p v-if="feedback">{{ feedback }}</p>
          </div>
        </form>
      </div>
    </div>
    <div class="hide-on-small-only space"></div>
    <Footer />
  </div>
</template>

<script>
import db from '@/firebase/init';
import Footer from '../layouts/Footer.vue';

export default {
  name: 'Profile',
  data() {
    return {
      profile: null,
      newComment: null,
      feedback: null,
    };
  },
  components: {
    Footer,
  },
  created() {
    const ref = db.collection('users');
    ref.doc(this.$route.params.user_slug).get()
      .then((user) => {
        this.profile = user.data();
      });
  },
};
</script>

<style>
  .space {
    height: 120px;
  }

  @media screen and (min-width: 600px) {
    .space {
      height: 260px;
    }
  }
</style>
