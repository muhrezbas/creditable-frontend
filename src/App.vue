<template>
  <v-app
    style=" background: #3A1C71; background: -webkit-linear-gradient(to right, #FFAF7B, #D76D77, #3A1C71); background: linear-gradient(to bottom right, #EF8475,#EC5091,#F082AC); "
  >
    <TopToolbar
      v-if=" this.$store.state.isLogin || this.$store.state.stepperNow=='welcome' ||  this.$store.state.stepperNow=='masuk' ||  this.$store.state.stepperNow=='result'"
    ></TopToolbar>

    <!-- <PopUpLogin />
    <router-view />-->
    <v-content>
      <router-view></router-view>
    </v-content>
    <BottomNav v-if="this.$store.state.isLogin && this.$router.currentRoute.name !== 'Rekomendasi' && this.$router.currentRoute.name !== 'Detil' && this.$router.currentRoute.name !== 'Filter'  && this.$router.currentRoute.name !== 'Profile'  && this.$router.currentRoute.name !== 'UbahProfile'  && this.$router.currentRoute.name !== 'UbahPassword'  && this.$router.currentRoute.name !== 'Keuntungan'"></BottomNav>
    <v-snackbar v-model="snackbar" top :multi-line="true">
      {{test}}
      <v-btn color="red" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
// import HelloWorld from "./components/HelloWorld"
// import PopUpLogin from "./components/PopUpLogin";
// import instance from "./myconfig";
import sinarmas from "./sinarmas";
import TopToolbar from "./components/TopToolbar.vue";
import BottomNav from "./components/BottomNav.vue";
import { Plugins } from "@capacitor/core";
const { PushNotifications } = Plugins;
// import { FCM } from "capacitor-fcm";
// const fcm = new FCM();
// const { FCMPlugin } = Plugins;
export default {
  name: "App",

  components: { TopToolbar, BottomNav },
  created() {
    // console.log("hello");
    // Push notification settings...
    PushNotifications.requestPermission().then(result => {
      if (result.granted) {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register().then(() =>
          console.log(`registered for push`)
        );
      } else {
        // Show some error
      }
    });

    // Select platform

    PushNotifications.addListener("registration", token => {
      alert("Push registration success, token: " + token.value);
      console.log(token.value);
    });

    PushNotifications.addListener("pushNotificationReceived", notification => {
      console.log("halo bandung");
      alert("Push received: " + JSON.stringify(notification));
    });
    PushNotifications.addListener(
      "pushNotificationActionPerformed",
      notification => {
        alert("Push action performed: " + JSON.stringify(notification));
      }
    );
    // PushNotifications.register()
    //   .then(() => {
    //     //
    //     // Subscribe to a specific topic
    //     this.test = "berhasil";
    //     this.snackbar = true;
    //     // you can use `FCMPlugin` or just `fcm`
    //     FCMPlugin
    //       .subscribeTo({ topic: "test" })
    //       .then(r => alert(`subscribed to topic` + r))
    //       .catch(err => console.log(err, "error"));
    //   })
    //   .catch(err => {
    //     console.log(err, "ini ni nana");
    //     alert("error");
    //   });

    // //
    // // Unsubscribe from a specific topic
    // fcm
    //   .unsubscribeFrom({ topic: "test" })
    //   .then(() => alert(`unsubscribed from topic`))
    //   .catch(err => console.log(err));

    // //
    // // Get FCM token instead the APN one returned by Capacitor
    // fcm
    //   .getToken()
    //   .then(r => alert(`Token ${r.token}`))
    //   .catch(err => console.log(err));

    // //
    // // Remove FCM instance
    // fcm
    //   .deleteInstance()
    //   .then(() => alert(`Token deleted`))
    //   .catch(err => console.log(err));
    sinarmas
      .get("")
      .then(({ data }) => {
        console.log("hello");
        // this.test="ini yang halo"
        // this.snackbar = true;
        console.log(data.data, "AYO");
        // localStorage.setItem("token", data.access_token);
        // // var decoded = jwt.decode(jwttoken)
        // localStorage.setItem("name", data.name);
      })
      .catch(err => {
        console.log(err);
        this.snackbar = true;
      });
    let token = localStorage.getItem("token");
    console.log(token, "mana");
    if (token) {
      // console.log("anjayyyyyyyyyyyyy");
      // console.log("ANDA DIMANA");
      // instance
      //   .get(`/credits/public`, {
      //     headers: {
      //       token: localStorage.getItem("token")
      //     }
      //   })
      //   .then(({ data }) => {
      //     console.log(data, "AYO LAH");
      //     // localStorage.setItem("token", data.access_token);
      //     // // var decoded = jwt.decode(jwttoken)
      // localStorage.setItem("name", data.name);
      this.$store.commit("LOGIN");
      // })
      // .catch(err => {
      //   console.log("hello");
      //   console.log(err.response.data);
      //   localStorage.removeItem("token");
      //   localStorage.removeItem("email");
      //   this.$store.commit("LOGOUT");
      // });

      // this.$store.commit("LOGIN");
    }
    // console.log("hal o");
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      this.$store.commit("LOGOUT");
    }
  },

  data: () => ({
    //
    snackbar: false,
    dialog: false,
    dialog2: false,
    test: "belum",
    dialog3: false
  })
};
</script>
<style scoped>
a.bar.router-link-exact-active {
  color: #f5ca4a;
  text-decoration: none;
}
a.bar {
  color: black;
  text-decoration: none;
}
</style>

