<template>
  <div style="background-color:white; height: 123vh">
    <v-container fluid style="heigth:100%; padding:0px">
      <v-layout align-center justify-center column>
        <v-flex d-flex fluid>
          <span style="margin-top:20px" class="estimasi">Credit Score</span>
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="#c7c7c7" dark v-bind="attrs" v-on="on">mdi-help</v-icon>
            </template>
            <span>Tooltip</span>
          </v-tooltip>
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
        <v-flex fluid style="margin-top:5px; width:465px">
          <v-carousel cycle height="160" hide-delimiter-background :show-arrows="false">
            <v-carousel-item
              v-for="(slide, i) in slides"
              :key="i"
              style="background : linear-gradient(to bottom right, #EF8475,#EC5091,#F082AC)"
            >
              <v-row style="margin-left: 5px;">
                <v-avatar tile height="68" width="69" style=" margin-top: 29px">
                  <v-img
                    src="https://cdn.zeplin.io/5ee861a7486d3d9a9c57754b/assets/B0900C9B-0113-4B03-825B-1506C896F8F1.svg"
                    class="inline"
                    contain
                  ></v-img>
                </v-avatar>
                <v-col style=" margin-bottom: 10px">
                  <h3 style="color : white">Smart Tips:</h3>
                  <p style="color : white; padding-right:5px;">{{slide}}</p>
                </v-col>
              </v-row>
            </v-carousel-item>
          </v-carousel>
        </v-flex>

        <v-flex fluid style="margin-top:30px; margin-right:0px">
          <span class="rekomendasi-pinjaman">Rekomendasi Pinjaman:</span>
          <v-btn
            value="rekomendasi"
            :to="{ path: '/rekomendasi'}"
            text
            class="text-capitalize lihat-semua"
          >Lihat Semua</v-btn>
        </v-flex>
        <v-flex fluid style="margin-right:0px;">
          <!-- <v-skeleton-loader
            v-for="(indexOpt) in 3"
            :key="indexOpt"
            class="mx-auto"
            max-width="300"
            tile
            type="list-item-avatar-three-line"
          ></v-skeleton-loader>-->
          <div v-if="this.$store.state.loader">
            <v-skeleton-loader
              v-for="(indexOpt) in 3"
              :key="indexOpt"
              max-width="300"
              min-width="300"
            >
              <v-row>
                <v-boilerplate style="margin-top: 35px;margin-left: 20px;" type="avatar"></v-boilerplate>
                <v-boilerplate style="width:300px;" type="article"></v-boilerplate>
                <v-boilerplate style="margin-top: 40px;" type="button"></v-boilerplate>
              </v-row>
            </v-skeleton-loader>
          </div>
          <CardBank
            v-for="(selectOption, indexOpt) in this.filteredList"
            :pinjaman="selectOption"
            :key="indexOpt"
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
import { mapState } from "vuex";
export default {
  name: "HelloWorld",
  components: {
    CardBank,
    VBoilerplate: {
      functional: true,
      render(h, { data, props, children }) {
        return h(
          "v-skeleton-loader",
          {
            ...data,
            props: {
              boilerplate: false,
              elevation: 0,
              ...props
            }
          },
          children
        );
      }
    }
  },

  mounted() {
    this.onResize();
  },
  created() {
    this.$store.state.pinjaman_all = [];
    this.$store.dispatch("GET_CREDIT");
    this.$store.dispatch("GET_PINJAMAN_ALL_LIMIT", [0, 3]);
  },
  watch: {
    credit: function(val, oldVal) {
      console.log(oldVal, val);
      this.akhir = val.entityData.prediction;
      this.awal = val.entityData.prediction - 25;
    }
  },
  computed: {
    filteredList() {
      var lowSearch = this.$store.state.newSearching.toLowerCase();
      return this.pinjaman_all.filter(function(wine) {
        return Object.values(wine).some(val =>
          String(val)
            .toLowerCase()
            .includes(lowSearch)
        );
      });
    },
    ...mapState(["credit", "pinjaman_all"]),
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
    awal: 0,
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
    doto: [""],
    colors: ["indigo"],
    slides: [
      "Salah satu cara meningkatkan credit score adalah melakukan pembayaran pinjaman yang sedang berjalan tepat waktu.",
      "Memiliki terlalu banyak pinjaman yang sedang berjalan dapat mempengaruhi credit score anda.",
      "Cegah pengurangan credit score dengan tidak menutup kartu kredit anda miliki"
    ],
    data: ["lala", "yeye", "yoyo"],
    akhir: 100,
    showStepper: false,
    gaji: 0,
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
