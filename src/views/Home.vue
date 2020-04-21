<template>
  <div class="home">
    <GMap />
  </div>
</template>

<script>
// @ is an alias to /src
import GMap from '@/components/home/GMap.vue';

export default {
  name: 'Home',
  components: {
    GMap,
  },
};
</script>
