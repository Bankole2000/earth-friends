<template>
  <div>
    <div class="view-profile container">
      <div v-if="profile" class="card">
        <h2 class="deep-purple-text center">{{ profile.alias }}'s Wall</h2>
        <ul class="comments collection">
          <li v-for="(comment, index) in comments" :key="index"><div class="deep-purple-text">
            {{ comment.from }}
            <span class="grey-text text-darken-2">
              {{ comment.time | moment('from', 'now') }}</span></div>
          <div class="grey-text text-darken-4">{{ comment.content }}</div></li>
        </ul>
        <form @submit.prevent='addComment'>
          <div class="field">
            <label for="comment">Add a comment</label>
            <input type="text" name="comment" v-model="newComment">
            <p v-if="feedback" class="red-text center">{{ feedback }}</p>
          </div>
        </form>
      </div>
    </div>
    <div class="hide-on-small-only space"></div>
    <Footer />
  </div>
</template>

<script>
import firebase from 'firebase';
import M from 'materialize-css';
import db from '@/firebase/init';
import Footer from '../layouts/Footer.vue';

export default {
  name: 'Profile',
  data() {
    return {
      profile: null,
      newComment: null,
      feedback: null,
      loggedInUser: null,
      comments: [],
    };
  },
  components: {
    Footer,
  },
  methods: {
    addComment() {
      if (this.newComment) {
        this.feedback = null;
        db.collection('comments').add({
          to: this.$route.params.user_slug,
          from: this.loggedInUser.alias,
          content: this.newComment,
          time: Date.now(),
        })
          .then(() => {
            this.newComment = null;
            M.toast({ html: '<span>Comment Added <span><i class="mdi mdi-check-all green-text"></i>', classes: 'mtoast' });
          });
      } else {
        this.feedback = 'Please enter a comment to add';
      }
    },
  },
  created() {
    const ref = db.collection('users');
    // get current user
    ref.where('user_id', '==', firebase.auth().currentUser.uid).get()
      .then((snapshot) => {
        console.log(snapshot);
        snapshot.forEach((doc) => {
          this.loggedInUser = doc.data();
          this.loggedInUser.id = doc.id;
        });
      });
    // Profile data
    ref.doc(this.$route.params.user_slug).get()
      .then((user) => {
        this.profile = user.data();
      });

    // Get data
    db.collection('comments').where('to', '==', this.$route.params.user_slug)

      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            this.comments.unshift({
              from: change.doc.data().from,
              content: change.doc.data().content,
              time: change.doc.data().time,
            });
          }
        });
      });
  },
};
</script>

<style>
  .view-profile .card {
    padding: 20px;
    margin-top: 60px;
  }

  .view-profile h2 {
    font-size: 2em;
    margin-top: 0;
  }

  .view-profile li {
    padding: 10px;
    border-bottom: 1px solid #000;
  }

  .space {
    height: 120px;
  }

  @media screen and (min-width: 600px) {
    .space {
      height: 260px;
    }
  }
</style>
