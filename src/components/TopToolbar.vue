<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-form @submit.prevent="daftar">
          <v-img
            class="white--text align-end"
            min="200"
            max="500"
            height="70px"
            gradient="to bottom right,  #EF8475,#EC5091,  #F082AC"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-card-title class="headline">{{ form == 'daftar' ? "Daftar" : "Masuk"}}</v-card-title>
          </v-img>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col v-if="form=='daftar'" cols="12" sm="6" md="4">
                  <v-text-field label="Nama Sesuai KTP*" v-model="name" color="#EC5091" required></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field label="Email*" color="#EC5091" v-model="email" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Password*"
                    type="password"
                    v-model="password"
                    color="#EC5091"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indikasi wajib diisi</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#EC5091" text @click="dialog = false">Cancel</v-btn>
            <v-btn color="#EC5091" type="submit" text>Save</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-navigation-drawer
      app
      fixed
      v-model="showMenu"
      right
      v-if="!this.$store.state.stepperNow=='welcome'"
    >
      <v-list dense right>
        <v-list-item v-if="!this.$store.state.isLogin" @click.stop="dialog = true; form='daftar'">
          <v-list-item-action>
            <v-icon>mdi-account-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Daftar</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="!this.$store.state.isLogin" @click.stop="dialog = true; form='masuk'">
          <v-list-item-action>
            <v-icon>mdi-login</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Masuk</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="this.$store.state.isLogin" @click="doNothing">
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Profil</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="doNothing">
          <v-list-item-action>
            <v-icon>mdi-information</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Tentang</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="this.$store.state.isLogin" @click="keluar">
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Keluar</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- logout-variant -->
        <v-list-item @click="doNothing">
          <v-list-item-action>
            <v-icon>help</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Help</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      dark
      flat
      v-bind:style="{ 'background': $store.state.stepperNow=='result' ? '-webkit-linear-gradient(to right, #FFAF7B, #D76D77, #3A1C71)' :'', 'background': $store.state.stepperNow=='result' || $store.state.isLogin ? 'linear-gradient(to bottom right, #EF8475,#EC5091,#F082AC)' : '' }"
      :color="$store.state.stepperNow=='welcome' ? 'transparent' : '#EC5091'"
    >
      <v-toolbar-title
        v-if="this.$store.state.isLogin && link =='Home'"
        style="font-family:'Avenir'; font-weight:1000; font-size:25px; letter-spacing: -0.070rem; padding:1px"
      >Creditable</v-toolbar-title>
      <v-toolbar-title
        v-if="this.$store.state.isLogin && link =='Partner'"
        style="font-family:'Avenir'; font-weight:1000; font-size:25px; letter-spacing: -0.070rem; padding:1px"
      >Pinjaman</v-toolbar-title>
      <v-toolbar-title
        v-if="this.$store.state.isLogin && link =='History'"
        style="font-family:'Avenir'; font-weight:1000; font-size:25px; letter-spacing: -0.070rem; padding:1px"
      >Riwayat</v-toolbar-title>
      <v-toolbar-title
        v-if="this.$store.state.isLogin && link =='Simulasi'"
        style="font-family:'Avenir'; font-weight:1000; font-size:25px; letter-spacing: -0.070rem; padding:1px"
      >Simulasi</v-toolbar-title>
      <v-toolbar-title
        @click="back()"
        v-if="this.$store.state.isLogin && link =='Profile' || this.$store.state.isLogin && link == 'UbahPassword' || this.$store.state.isLogin && link == 'UbahProfile' || this.$store.state.isLogin && link == 'Keuntungan'"
        style="font-family:'Avenir'; font-weight:1000; font-size:25px; letter-spacing: -0.070rem; padding:1px"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-toolbar-title>

      <v-spacer
        v-if="this.$store.state.isLogin && link =='Profile' || this.$store.state.isLogin && link == 'UbahPassword' || this.$store.state.isLogin && link == 'UbahProfile' || this.$store.state.isLogin && link == 'Keuntungan'"
      ></v-spacer>
      <v-toolbar-title
        v-if="this.$store.state.isLogin && link =='Profile' || this.$store.state.isLogin && link == 'UbahPassword' || this.$store.state.isLogin && link == 'UbahProfile' || this.$store.state.isLogin && link == 'Keuntungan'"
        style="font-family:'Avenir'; font-weight:1000; font-size:25px; letter-spacing: -0.070rem; padding:1px"
      >Profile</v-toolbar-title>
      <v-toolbar-title
        @click="back()"
        v-if="this.$store.state.isLogin && link =='Rekomendasi' || this.$store.state.isLogin && link =='Filter'"
        style="font-family:'Avenir'; font-weight:1000; font-size:25px; letter-spacing: -0.070rem; padding:1px"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-toolbar-title>

      <v-spacer v-if="this.$store.state.isLogin && link =='Rekomendasi' || this.$store.state.isLogin && link =='Filter'"></v-spacer>
      <v-toolbar-title
        v-if="this.$store.state.isLogin && link =='Rekomendasi' || this.$store.state.isLogin && link =='Filter'"
        style="font-family:'Avenir'; font-weight:1000; font-size:25px; letter-spacing: -0.070rem; padding:1px"
      >Rekomendasi</v-toolbar-title>
      <v-toolbar-title
        @click="back()"
        v-if="this.$store.state.isLogin && link =='Detil'"
        style="font-family:'Avenir'; font-weight:1000; font-size:25px; letter-spacing: -0.070rem; padding:1px"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-toolbar-title>

      <v-spacer v-if="this.$store.state.isLogin && link =='Detil'"></v-spacer>
      <v-toolbar-title
        v-if="this.$store.state.isLogin && link =='Detil'"
        style="font-family:'Avenir'; font-weight:1000; font-size:25px; letter-spacing: -0.070rem; padding:1px"
      >Pinjaman</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn
        text
        class="text-capitalize"
        x-small
        v-if="this.$store.state.isLogin && link !='History' && link !='Rekomendasi' && link !=='Profile' && link !== 'UbahPassword' && link !== 'UbahProfile' && link !=='Filter'"
        @click="push('/profile')"
        style="font-weight:1000; font-size:14px;padding:1px;"
      >Hi, {{username}}!</v-btn>
      <v-btn
        text
        class="text-capitalize"
        x-small
        v-if="this.$store.state.isLogin && link =='Profile'"
        @click="keluar()"
        style="font-weight:1000; font-size:14px;padding:1px;"
      >Logout</v-btn>
      <v-btn
        text
        class="text-capitalize"
        x-small
        v-if="this.$store.state.isLogin && link =='UbahPassword'"
        @click="simpanPassword()"
        style="font-weight:1000; font-size:14px;padding:1px;"
      >Simpan</v-btn>
      <v-btn
        text
        class="text-capitalize"
        x-small
        v-if="this.$store.state.isLogin && link =='UbahProfile'"
        @click="simpanProfile()"
        style="font-weight:1000; font-size:14px;padding:1px;"
      >Simpan</v-btn>
      <v-btn
        text
        class="text-capitalize"
        x-small
        v-if="this.$store.state.isLogin && link =='Rekomendasi'"
         @click="push('/rekomendasi/filter')"
        style="font-weight:1000; font-size:14px; padding:1px"
      >Filter</v-btn>
       <v-btn
        text
        class="text-capitalize"
        x-small
        v-if="this.$store.state.isLogin && link =='Filter'"
         @click="hapusFilter()"
        style="font-weight:1000; font-size:14px; padding:1px"
      >Hapus Filter</v-btn>
      <v-btn
        text
        class="text-capitalize"
        x-small
        v-if="this.$store.state.isLogin && link =='History'"
        @click="keluar()"
        style="font-weight:1000; font-size:14px; padding:1px"
      >Add</v-btn>
      <v-btn
        text
        x-small
        class="text-capitalize"
        @click.stop="dialog = true; form='masuk'"
        style="font-weight:1000; font-size:14px; padding:1px"
        v-if="this.$store.state.stepperNow=='welcome' && !this.$store.state.isLogin"
      >Log In</v-btn>
      <v-btn
        @click="home"
        text
        x-small
        class="text-capitalize"
        style="font-weight:1000; font-size:14px; padding:1px;"
        v-if="this.$store.state.stepperNow=='result'"
      >Home</v-btn>
      <v-app-bar-nav-icon
        v-if="!this.$store.state.stepperNow=='welcome'"
        style="color:white"
        @click.stop="toggleMenu"
      ></v-app-bar-nav-icon>
      <template
        v-slot:extension
        v-if="this.$store.state.isLogin && link =='History' || this.$store.state.isLogin && link =='Rekomendasi'"
      >
        <v-text-field
          class="search"
          flat
          light
          style="margin-top : 10px"
          height="29"
          color="#EC5091"
          background-color="white"
          label="Cari Pinjaman"
          prepend-inner-icon="search"
          solo
          v-model="newSearch"
          @keyup="search"
        ></v-text-field>
      </template>
      <!-- <v-spacer></v-spacer>
      <v-icon>bookmark_border</v-icon>-->
    </v-app-bar>
  </div>
</template>

<script>
import instance from "../myconfig";
export default {
  created() {
    console.log(localStorage.getItem("name"), "name");
    console.log(this.$router.currentRoute.name, "hello route");
    this.test = this.$router.currentRoute.name;
    // console.log(this.$router.currentRoute.name)
    // console.log(this.$route.params.id);
    // this.username = localStorage.getItem("name");
    // if(localStorage.getItem("token")){
    //   console.log('halo')
    // }
  },
  data: () => ({
    //
    showMenu: false,
    dialog: false,
    form: "",
    name: "",
    password: "",
    test: "",
    newSearch: "",
    email: ""
  }),
  computed: {
    username() {
      return localStorage.getItem("name");
    },
    link() {
      console.log(this.test, "test");
      console.log(this.$router.currentRoute.name);
      return this.test;
    }
  },

  watch: {
    // link(newValue, oldValue) {
    //   console.log(newValue, oldValue, "watch")
    //   // Do whatever makes sense now
    // }
    $route(to, from) {
      this.test = to.name;
      console.log(to, from);
    }
  },

  methods: {
    back() {
      this.$router.go(-1);
    },
    simpanProfile() {
      console.log(this.$store.state.updateProfil);
      instance
        .put(`/users/update-profile`, this.$store.state.updateProfil, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          console.log(data);
        })
        .catch(err => {
          console.log(err.response.data);
        });
    },
    simpanPassword() {
      console.log(this.$store.state.changePassword);
      let change = this.$store.state.changePassword;
      if (change.repeatPassword == change.password) {
        instance
          .put(`/users/change-password`, this.$store.state.changePassword, {
            headers: {
              token: localStorage.getItem("token")
            }
          })
          .then(({ data }) => {
            console.log(data);
          })
          .catch(err => {
            console.log(err.response.data);
          });
      } else {
        console.log("salah");
      }
    },
    push(payload) {
      console.log(payload, "tes");
      this.$router.push({ path: payload });
    },
    search() {
      console.log(this.newSearch);
      this.$store.commit("SEARCHING", this.newSearch);
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    home() {
      this.$store.commit("NEXT", "welcome");
    },
    keluar() {
      this.$store.commit("LOGOUT");
      localStorage.removeItem("token");
      // var decoded = jwt.decode(jwttoken)
      localStorage.removeItem("name");
    },
    masuk() {
      this.$store.commit("NEXT", "masuk");
    },
    daftar() {
      if (this.form == "masuk") {
        instance
          .post(`/users/signin-public`, {
            email: this.email,
            password: this.password
          })
          .then(({ data }) => {
            console.log(data);
            localStorage.setItem("token", data.access_token);
            // var decoded = jwt.decode(jwttoken)
            localStorage.setItem("name", data.name);
            this.$store.commit("LOGIN");
            this.dialog = false;
          })
          .catch(err => {
            console.log(err.response.data);
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            this.$store.commit("LOGOUT");
          });
      } else if (this.form == "daftar") {
        instance
          .post(`/users/signup-public`, {
            email: this.email,
            password: this.password,
            name: this.name
          })
          .then(({ data }) => {
            console.log(data);
            localStorage.setItem("token", data.access_token);
            // var decoded = jwt.decode(jwttoken)
            localStorage.setItem("name", data.name);
            this.$store.commit("LOGIN");
            this.dialog = false;
          })
          .catch(err => {
            console.log(err.response.data);
            // localStorage.removeItem("token");
            // localStorage.removeItem("email");
            // this.$store.commit("LOGOUT");
          });
      }
    },
    doNothing() {}
  }
};
</script>

<style>
.search.v-input .v-input__slot {
  border-radius: 5px;
  height: 29px;
  font-size: 14px;
  box-shadow: 0 6px 6px 0 rgba(0, 0, 0, 0.16);
}
/* .theme--light.v-text-field--outline:not(.v-input--is-focused):not(.v-input--has-state)>.v-input__control>.v-input__slot:hover{
border-width: 1px;
border-style: solid;
border-color: #6fbd44;
} */
</style>