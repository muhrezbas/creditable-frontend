<template>
  <div>
    <v-container fluid style="background-color:white; height: 100vh">
      <v-layout align-center justify-center column>
        <v-flex fluid style=" margin-right:-10px">
          <v-layout align-start justify-space-between row>
            <span class="rekomendasi-pinjaman">Apply Kartu Kredit:</span>
            <v-btn @click="daftar" text class="text-capitalize lihat-semua">Lihat Semua</v-btn>
          </v-layout>
        </v-flex>
        <v-flex fluid style="margin-right:0px;">
          <!-- <CardBank v-for="(selectOption, indexOpt) in this.doto" :key="indexOpt" /> -->
          <v-card
            width="500"
            :class="`d-flex justify-start mb-6 overflow-x-auto`"
            style="overflow-y: hidden; padding: 11px;"
            tile
            flat
          >
            <v-card
              @click="goToDetil(selectOption.id)"
              min-width="145px"
              max-width="145px"
              style="margin-right: 5px"
              v-for="(selectOption, indexOpt) in $store.state.kartuKredits"
              :key="indexOpt"
              max-height="200px"
              min-height="200px"
            >
              <v-img :src="selectOption.image" height="89px"></v-img>

              <v-card-title
                style="
                    font-family: Avenir;
                    font-size: 15px;
                    font-weight: 900;
                    font-stretch: normal;
                    margin-top:-12px;
                    margin-left: -6px;
                    font-style: normal;
                    line-height: 1.33;
                    letter-spacing: -0.3px;
                    text-align: left;
                    color: #264d6a;"
              >{{selectOption.name}}</v-card-title>
              <v-card-subtitle
                style="font-family: Avenir;
                    font-size: 8px;
                    font-weight: 300;
                    font-stretch: normal;
                    font-style: normal;
                    margin-left: -6px;
                    line-height: 1.38;
                    letter-spacing: -0.16px;
                    text-align: left;
                    color: #264d6a;"
                class="justify-space-between"
              >
                <span style="float:left;">Limit Kartu :</span>
                <span
                  style="float:right;
              font-family: Avenir;
              font-size: 8px;
              font-weight: 900;
              font-stretch: normal;
              font-style: normal;
              line-height: 1.38;
              letter-spacing: -0.16px;
              text-align: left;
              color: #264d6a;
"
                >{{selectOption.limitKartu}}</span>
              </v-card-subtitle>
              <v-card-subtitle
                style="font-family: Avenir;
                    font-size: 8px;
                    font-weight: 300;
                    font-stretch: normal;
                    font-style: normal;
                    margin-top:-14px;
                    margin-left: -6px;
                    line-height: 1.38;
                    letter-spacing: -0.16px;
                    text-align: left;
                    color: #264d6a;"
                class="justify-space-between"
              >
                <span style="float:left;">Bunga :</span>
                <span
                  style="float:right;
              font-family: Avenir;
              font-size: 8px;
              font-weight: 900;
              font-stretch: normal;
              font-style: normal;
              line-height: 1.38;
              letter-spacing: -0.16px;
              text-align: left;
              color: #264d6a;
"
                >{{selectOption.bunga}}%</span>
              </v-card-subtitle>
              <v-card-subtitle
                style="font-family: Avenir;
                    font-size: 8px;
                    font-weight: 300;
                    font-stretch: normal;
                    font-style: normal;
                    margin-left: -6px;
                    margin-top: -14px;
                    line-height: 1.38;
                    letter-spacing: -0.16px;
                    text-align: left;
                    color: #264d6a;"
                class="justify-space-between"
              >
                <span style="float:left;">Min. Pendapatan</span>
                <span
                  style="float:right;
              font-family: Avenir;
              font-size: 8px;
              font-weight: 900;
              font-stretch: normal;
              font-style: normal;
              line-height: 1.38;
              letter-spacing: -0.16px;
              text-align: left;
              color: #264d6a;
"
                >Rp {{selectOption.pendapatan}},-</span>
              </v-card-subtitle>
            </v-card>
          </v-card>
        </v-flex>
        <v-flex fluid style="margin-right:80px">
          <v-layout align-start justify-start row>
            <span class="rekomendasi-pinjaman">Ajukan Pinjaman:</span>
          </v-layout>
        </v-flex>
        <v-flex fluid style="margin-right:0px;">
          <!-- <CardBank v-for="(selectOption, indexOpt) in this.doto" :key="indexOpt" /> -->
          <v-card
            :class="`d-flex justify-start mb-6 overflow-x-auto`"
            style="  overflow-y: hidden; padding: 11px;"
            tile
            width="500"
            flat
          >
            <v-card
              style="margin-right: 5px"
              max-width="124px"
              min-width="124px"
              :color="selectOption.color"
              v-for="(selectOption, indexOpt) in this.pinjaman"
              :key="indexOpt"
              max-height="173px"
              min-height="173px"
            >
              <v-card-text class="text-center">
                <v-icon color="white" style="margin-top: 15px;" size="40">{{selectOption.icon}}</v-icon>
              </v-card-text>
              <v-card-text style="margin-top: -20px;" class="text-center">
                <span
                  style="
                    font-family: Avenir;
                    font-size: 12px;
                    width:100px;
                    font-weight: 900;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: 1.33;
                    letter-spacing: -0.24px;
                    text-align: center;
                   color: #ffffff;"
                >{{selectOption.product}}</span>
              </v-card-text>
              <v-card-text style="margin-top: -20px;" class="text-center">
                <span
                  style="
                   font-family: Avenir;
                    font-size: 8px;
                    font-weight: 300;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: 1.38;
                    letter-spacing: -0.16px;
                    text-align: center;
                    color: #ffffff;"
                >{{selectOption.desc}}</span>
              </v-card-text>
            </v-card>
          </v-card>
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
export default {
  name: "HelloWorld",
  components: {},
  created() {
    this.$store.dispatch("GET_KARTU_KREDITS");
  },
  mounted() {
    this.onResize();
  },
  computed: {
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
    goToDetil(payload) {
      this.$router.push({ path:  `/pinjaman/${payload}` });
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
    data: ["lala", "yeye", "yoyo"],
    akhir: 97,
    pinjaman: [
      {
        product: "Kredit Tanpa Agunan",
        desc: "Pendidikan, Pengobatan, dan lain-lain",
        icon: "mdi-wallet",
        color: "#ef8475"
      },
      {
        product: "Kredit Dengan Agunan",
        desc: "Pernikahan, Renovasi Rumah, dan lain-lain",
        icon: "mdi-safe-square",
        color: "#ec5091"
      },
      {
        product: "Kredit Kendaraan Bermotor",
        desc: "Motor dan Mobil",
        icon: "mdi-car",
        color: "#f082ac"
      }
    ],
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
  width: 269px;
  height: 41px;
  font-family: Avenir;
  font-size: 30px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.37;
  letter-spacing: -0.6px;
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
