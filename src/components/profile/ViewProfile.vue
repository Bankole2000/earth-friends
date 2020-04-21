<template>
  <div>
    <div class="view-profile container">
      <div v-if="profile" class="card">
        <h2 class="deep-purple-text center">{{ profile.alias }}'s Wall</h2>
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
