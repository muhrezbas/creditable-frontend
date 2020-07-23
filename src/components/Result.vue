<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-form @submit.prevent="login">
          <v-img
            class="white--text align-end"
            min="200"
            max="500"
            height="70px"
            gradient="to bottom right,  #EF8475,#EC5091,  #F082AC"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-card-title class="headline">Masuk</v-card-title>
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
    <v-container fluid style="background-color:white; height: 100vh">
      <v-layout align-center justify-center column>
        <v-flex d-flex fluid>
          <span style="margin-top:20px" class="estimasi">Estimasi Kredit</span>
        </v-flex>
        <v-flex d-flex fluid>
          <span style="margin-top:0px; margin-right:175px" class="estimasi">Score:</span>
        </v-flex>
        <v-flex fluid>
          <span
            class="score"
            v-bind:style="{ 'color': awal >= 66.68 && awal < 83.35 ?  '#ccef2b' : awal >= 66.68 && awal < 83.35 ? '#3bf25d' : awal >= 50.01 && awal < 66.68 ?  '#c4f22b' : awal >= 33.34 && awal < 50.01 ?  '#f2e32b' : awal >= 16.67 && awal < 33.34 ? '#f2962b' : awal >= 83.35 && awal <= 100 ? '#2bf270' : '#f22b2b'}"
          >{{awal}}</span>
          <span class="score" style="margin: 30px">-</span>
          <span
            class="score"
            v-bind:style="{ 'color': akhir >= 66.68 && akhir < 83.35 ?  '#ccef2b' : akhir >= 66.68 && akhir < 83.35 ? '#3bf25d' : akhir >= 50.01 && akhir < 66.68 ?  '#c4f22b' : akhir >= 33.34 && akhir < 50.01 ?  '#f2e32b' : akhir >= 16.67 && akhir < 33.34 ? '#f2962b' : akhir >= 83.35 && akhir <= 100 ? '#2bf270' : '#f22b2b'}"
          >{{akhir}}</span>
          <!-- 50,01 -->
        </v-flex>
        <v-flex fluid>
          <!-- triangle -->
          <div class="score-board"></div>
          <!-- <div class="polygon"></div> -->
          <v-icon
            v-bind:style="{ 'margin-left': awal +'%', 'display':'inline'}"
            small
            class="polygon"
          >mdi-triangle</v-icon>
          <v-icon
            v-bind:style="{ 'margin-left': akhir-awal-10 +'%', 'display':'inline'}"
            small
            class="polygon"
          >mdi-triangle</v-icon>
        </v-flex>
        <v-flex fluid style="margin-top:30px; margin-right:0px">
          <span class="rekomendasi-pinjaman">Rekomendasi Pinjaman:</span>
          <v-btn @click="daftar" text class="text-capitalize lihat-semua">Lihat Semua</v-btn>
        </v-flex>
        <v-flex fluid style="margin-right:0px;">
          <CardBank
            v-for="(selectOption, indexOpt) in [this.filteredList[0]]"
            :pinjaman="selectOption"
            :key="indexOpt"
          />
          <!-- <v-img :src="require('../assets/bca.png')" class="inline" height="87" width="115"></v-img>
          <v-btn @click="daftar" text class="text-capitalize lihat-semua">Lihat Semua</v-btn>-->
        </v-flex>
        <v-flex fluid style="margin-top:20px; margin-right:0px; z-index:1">
          <v-layout align-center justify-space-between column class="card-login" style="z-index:1;">
            <!-- <div class="card-login d-flex justify-content-center"> -->
            <div class="lengkapi" style="margin-top:13px">
              Lengkapi profilmu untuk
              mengetahui lebih lanjut
            </div>
            <v-btn class="lengkapi-button" @click="next()" color="#ec5091">Lengkapi Profil</v-btn>
            <div class="atau">atau</div>
            <v-btn @click.stop="dialog = true" class="login" text color="#ec5091">Log In</v-btn>
            <!-- </div> -->
          </v-layout>
          <!-- <v-img :src="require('../assets/bca.png')" class="inline" height="87" width="115"></v-img>
          <v-btn @click="daftar" text class="text-capitalize lihat-semua">Lihat Semua</v-btn>-->
        </v-flex>
        <v-flex fluid style="margin-top:-254px; margin-right:0px; ">
          <CardBank
            style="  -webkit-filter: blur(5px);
  -moz-filter: blur(5px);
  -o-filter: blur(5px);
  -ms-filter: blur(5px);
  filter: blur(5px);"
            v-for="(selectOption, indexOpt) in this.filteredList"
            :key="indexOpt"
            :pinjaman="selectOption"
          />
          <!-- <v-img :src="require('../assets/bca.png')" class="inline" height="87" width="115"></v-img>
          <v-btn @click="daftar" text class="text-capitalize lihat-semua">Lihat Semua</v-btn>-->
        </v-flex>
      </v-layout>
    </v-container>
    <!-- https://drive.google.com/file/d/1sREh_8njW0w6lclLL1HwnSiuZhz2wwCC/view?usp=sharing -->
    <!-- <v-row v-resize="onResize" align="center" justify="center">
      <v-subheader>Window Size</v-subheader>
      {{ windowSize }}
    </v-row>-->
    <!-- 16.67 -->
  </div>
</template>

<script>
import CardBank from "./CardBank";
import instance from "../myconfig";
export default {
  name: "HelloWorld",
  components: { CardBank },

  mounted() {
    this.onResize();
  },
  computed: {
    filteredList() {
      var lowSearch = this.$store.state.newSearching.toLowerCase();
      return this.pinjaman.filter(function(wine) {
        return Object.values(wine).some(val =>
          String(val)
            .toLowerCase()
            .includes(lowSearch)
        );
      });
    },
    button() {
      // var height = window.innerHeight;
      // var tambah = 0;
      // while (height !== 212) {
      //   height = height - tambah;
      //   tambah++;
      // }
      let y = window.innerHeight;
      let i = 1;
      let layar = (window.innerHeight * 7) / 8;
      while (y > layar) {
        y--;
        i++;
        console.log(i);
        console.log(y);
        // y -= i
        // y = 500
        // i++
      }
      return i;
    }
  },

  methods: {
    login() {
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
           this.$store.commit("NEXT", "welcome");
          this.dialog = false;
        })
        .catch(err => {
          console.log(err.response.data);
          localStorage.removeItem("token");
          localStorage.removeItem("email");
          this.$store.commit("LOGOUT");
        });
    },
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    },
    cek() {
      this.$store.commit("NEXT", "biodata");
    },
    next() {
      this.$store.commit("NEXT", "akun");
    }
  },
  data: () => ({
    amount: 0,
    awal: 40,
    doto: [""],
    dialog: false,
    data: ["lala", "yeye", "yoyo"],
    akhir: 97,
    showStepper: false,
    gaji: 0,
    pinjaman: [
      {
        bank: "BCA",
        tenor: "12 s/d 36 bulan",
        total: "Rp 1.000.000,- s/d Rp 4.000.000",
        avatar:
          "https://cdn.zeplin.io/5ee861a7486d3d9a9c57754b/assets/99FB8B36-9D73-42FD-8453-57183EFA82F1.png",
        bunga: "3% s/d 7%"
      },
      {
        bank: "Uang Teman",
        tenor: "1 s/d 6 bulan",
        total: "Rp 500.000,- s/d Rp 8.000.000",
        avatar:
          "https://cdn.zeplin.io/5ee861a7486d3d9a9c57754b/assets/FE309305-9C1A-43EF-9D5F-3EF93A368E30.png",
        bunga: "12% s/d 20%"
      },
      {
        bank: "Pintek",
        tenor: "1 s/d 3 bulan",
        total: "Rp 5000.000,- s/d Rp 2.000.000",
        avatar:
          "https://cdn.zeplin.io/5ee861a7486d3d9a9c57754b/assets/7A1375CE-9D0F-4003-8EF9-E7CAB4C91709.png",
        bunga: "15% s/d 24%"
      }
    ],
    windowSize: {
      x: 0,
      y: 0
    }
  })
};
</script>
<style scoped>
.login {
  width: 31px;
  height: 15px;
  font-family: Avenir;
  font-size: 11px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: -0.22px;
  text-align: left;
  color: #ec5091;
}
.atau {
  width: 17px;
  height: 12px;
  font-family: Avenir;
  font-size: 9px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: -0.18px;
  text-align: left;
  color: #808080;
}
.lengkapi-button {
  width: 146px;
  height: 29px;
  font-family: Avenir;
  font-size: 11px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: -0.22px;
  text-align: left;
  color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 10px 12px 0 rgba(236, 80, 145, 0.2);
  background-color: #ec5091;
}
.card-login {
  width: 261px;
  height: 197px;
  border-radius: 8px;
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
}
.lengkapi {
  width: 160px;
  height: 38px;
  font-family: Avenir;
  font-size: 14px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: -0.28px;
  text-align: center;
  color: #264d6a;
}
.estimasi {
  font-family: Avenir;
  font-size: 48px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.38;
  letter-spacing: -0.96px;
  text-align: left;
  color: #264d6a;
}
.ajukan {
  width: 78px;
  height: 23px;
  border-radius: 30px;
  box-shadow: 0 6px 10px 0 rgba(236, 80, 145, 0.2);
  background-color: #ec5091;
}
.ajui {
  width: 28px;
  height: 12px;
  font-family: Avenir;
  font-size: 9px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: -0.18px;
  text-align: left;
  color: #ffffff;
}
.score {
  width: 100%;
  height: 131px;
  font-family: Avenir;
  font-size: 96px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: -1.92px;
  text-align: left;
  color: #264d6a;
}
.cardColor {
  background-color: rgba(255, 255, 255, 0.5) !important;
  border-color: white !important;
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0),
    0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);
}
.score-board {
  width: 338px;
  height: 14px;
  border-radius: 400px;
  background-image: linear-gradient(
    to right,
    #f22b2b,
    #f2962b 23%,
    #f2e32b 45%,
    #c4f22b 67%,
    #68f22b 85%,
    #2bf270
  );
}
.polygon {
  color: #264d6a;
}
.rekomendasi-pinjaman {
  font-family: Avenir;
  font-size: 23px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: -0.5px;
  text-align: left;
  color: #264d6a;
}
.lihat-semua {
  font-family: Avenir;
  font-size: 10px;
  font-weight: 900;
  font-stretch: normal;
  margin-bottom: 6px;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: -0.2px;
  text-align: left;
  color: #ec5091;
}
.logo-bank {
  width: 73px;
  height: 22px;
  font-family: Avenir;
  font-size: 16px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.38;
  letter-spacing: -0.32px;
  text-align: left;
  color: #264d6a;
}
/* .awal {
  color: #ccef2b;
}
.akhir {
  color: #3bf25d;
} */
</style>
