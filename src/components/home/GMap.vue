<template>
  <div class="map">
    <div class="google-map" id="map"></div>
  </div>
</template>

<script>
import firebase from 'firebase';
import db from '@/firebase/init';

export default {
  name: 'GMap',
  data() {
    return {
      lat: 53,
      lng: -2,
    };
  },
  methods: {
    renderMap() {
      // eslint-disable-next-line
      const map = new google.maps.Map(document.getElementById('map'), {
        center: {
          lat: this.lat,
          lng: this.lng,
        },
        zoom: 6,
        maxZoom: 15,
        minZoom: 3,
        streetViewControl: false,
      });

      db.collection('users').get()
        .then((users) => {
          users.docs.forEach((doc) => {
            const data = doc.data();
            if (data.geolocation) {
              // eslint-disable-next-line
              const marker = new google.maps.Marker({
                position: {
                  lat: data.geolocation.lat,
                  lng: data.geolocation.lng,
                },
                map,
              });
              // Add click event to marker
              marker.addListener('click', () => {
                console.log(doc.id);
                this.$router.push({ name: 'ViewProfile', params: { user_slug: doc.id } });
              });
            }
          });
        });
    },
  },
  mounted() {
    this.renderMap();
    // get current user
    const user = firebase.auth().currentUser;

    // Get user geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.lat = pos.coords.latitude;
        this.lng = pos.coords.longitude;

        // find user record then update geo coords
        db.collection('users').where('user_id', '==', user.uid).get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              console.log(doc.id);
              db.collection('users').doc(doc.id).update({
                geolocation: {
                  lat: pos.coords.latitude,
                  lng: pos.coords.longitude,
                },
              });
            });
          })
          .then(() => {
            this.renderMap();
          });
      }, (err) => {
        console.log(err);
        this.renderMap();
      }, { maximumAge: 60000, timeout: 3000 });
    } else {
      // Position center by default values
      this.renderMap();
    }
    // console.log(firebase.auth().currentUser);
  },
};
</script>

<style>
 .google-map {
   width: 100%;
   height: 100%;
   margin: 0 auto;
   background: #fff;
   position: absolute;
   top: 0;
   left: 0;
   z-index: -1;
 }
</style>
