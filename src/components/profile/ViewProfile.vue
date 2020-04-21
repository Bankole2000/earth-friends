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
  </div>
</template>

<script>
import db from '@/firebase/init';

export default {
  name: 'Profile',
  data() {
    return {
      profile: null,
      newComment: null,
      feedback: null,
    };
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

</style>
