<template>
  <div id="app">
    <Navbar />
    <router-view/>
    <!-- <Footer /> -->
  </div>
</template>
<script>
import Navbar from '@/components/layouts/Navbar.vue';
// import Footer from '@/components/layouts/Footer.vue';

export default {
  name: 'App',
  data() {
    return {

    };
  },
  components: {
    Navbar,
    // Footer,
  },
};
</script>
<style>
  @import './assets/css/mdi.min.css';


</style>
