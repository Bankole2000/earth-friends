<template>
<footer class="page-footer deep-purple darken-1">
  <div class="container">
    <div class="row">
      <div class="col l6 s12">
        <h5 class="white-text">About <router-link to="/" class="text-link">
        Earth Friends</router-link></h5>
        <p class="grey-text text-lighten-4">
          <router-link :to="{ name: 'Home' }" class="text-link">
        Earth Friends</router-link> is a simple Geolocation Web App built with
          <a href="https://vuejs.org" class="text-link" target="_blank"><span class="mdi mdi-vuejs"></span> VueJS</a> and
          <a href="https://firebase.com" class="text-link" target="_blank"><span class="mdi mdi-firebase"></span> Firebase</a> for practice and
          demonstration purposes. <a href="https://bankole2000.github.io/portfolio"
          class="text-link" target="_blank">The Developer</a> is currently available for projects,
          collaborations, training, and/or remote employment.</p>
        <p class="grey-text text-lighten-4">Feel free to
          <a href="tel:+2348069166906" class="text-link">
            <span class="mdi mdi-phone-in-talk"></span> Call</a>
        or <a href="mailto:techybanky@gmail.com" class="text-link">
          <span class="mdi mdi-email"></span> send an email.</a></p>
      </div>
      <div class="col l4 offset-l2 s12">
        <h5 class="white-text">Social Links</h5>
        <ul>
          <li><a class="grey-text text-lighten-3" href="https://facebook.com/esan.bankole"
          target="_blank"> <span class="mdi mdi-facebook"></span> Facebook</a></li>
          <li><a class="grey-text text-lighten-3" href="https://www.linkedin.com/in/bankoleesan"
          target="_blank"> <span class="mdi mdi-linkedin"></span> Linked In</a></li>
          <li><a class="grey-text text-lighten-3" href="https://twitter.com/bankolealexesan"
          target="_blank"> <span class="mdi mdi-twitter"></span> Twitter</a></li>
          <li><a class="grey-text text-lighten-3" href="https://github.com/bankole2000"
          target="_blank"> <span class="mdi mdi-github"></span> Github</a></li>
           <li><a class="grey-text text-lighten-3" href="https://discord.gg/HeAVxtM"
          target="_blank"> <span class="mdi mdi-discord"></span> Discord</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="footer-copyright">
    <div class="container">
    <strong>© {{ year }} <a href="https://bankole2000.github.io/portfolio" class="white-text">
    Bankole Esan</a></strong>
    <a class="grey-text text-lighten-4 right" href="https://github.com/Bankole2000/vue-smoothies">
      <span class="mdi mdi-github-circle mdi-12px"></span> View on Github</a>
    </div>
  </div>
</footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>

<style>
  footer.page-footer {
    position: relative;
    margin-top: 40px;
  }
  footer .text-link {
    color: #ffb74d;
  }
</style>
