<template>
  <div>
    <v-container
      fluid
      v-bind:style="{ 'background-color': 'white',
   'height' : total <6 ? 100 + 'vh' : '' }"
    >
      <v-layout align-center justify-center column>
        <v-flex fluid style=" margin-right:-10px">
          <v-layout align-start justify-space-between row>
            <span class="rekomendasi-pinjaman">Pinjaman Berjalan:</span>
            <v-btn text class="text-capitalize lihat-semua">Lihat Semua</v-btn>
          </v-layout>
        </v-flex>
        <v-flex fluid style="margin-right:0px;">
          <CardBank
            v-for="(selectOption, indexOpt) in filteredListBerjalan"
            :pinjaman="selectOption"
            fungsi="ubah"
            :key="indexOpt"
          />
          <!-- <CardBank v-for="(selectOption, indexOpt) in this.doto" :key="indexOpt" /> -->
        </v-flex>
        <v-flex fluid style=" margin-right:-10px">
          <v-layout align-start justify-space-between row>
            <span class="riwayat-pinjaman">Riwayat Pinjaman:</span>
            <v-btn text class="text-capitalize lihat-semua">Lihat Semua</v-btn>
          </v-layout>
        </v-flex>
        <v-flex fluid style="margin-right:0px;">
          <CardBank
            v-for="(selectOption, indexOpt) in filteredList"
            :pinjaman="selectOption"
            fungsi="ubah"
            :key="indexOpt"
          />
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
import { mapState } from "vuex";
import CardBank from "./CardBank";
export default {
  name: "HelloWorld",
  components: { CardBank },
  created() {
    this.$store.dispatch("GET_PINJAMAN_BERJALAN", [0, 3]);
  },
  mounted() {
    this.onResize();
  },

  computed: {
    // filteredList() {
    //   // const self = this;
    //   return this.pinjaman.filter(pinjaman => {
    //     return pinjaman.bank
    //       .toLowerCase()
    //       .includes(this.$store.state.newSearching.toLowerCase());
    //   });
    // },
    ...mapState(["pinjaman_berjalan"]),
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
    filteredListBerjalan() {
      var lowSearch = this.$store.state.newSearching.toLowerCase();
      console.log(this.pinjaman_berjalan, "berjalan");
      return this.pinjaman_berjalan.filter(function(wine) {
        return Object.values(wine).some(val =>
          String(val)
            .toLowerCase()
            .includes(lowSearch)
        );
      });
    },
    //  filteredList() {
    //   // var lowSearch = search.toLowerCase();
    //   return this.$store.state.pinjaman.filter(article => {
    //     return Object.values(article).some(val=>
    //       String(val).toLowerCase()
    //       .includes(this.$store.state.newSearching.toLowerCase())
    //   });
    // },
    total() {
      return this.filteredListBerjalan.length + this.filteredList.length;
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
        name: "BCA",
        tenor: "60",
        limitKartu: "1000000",
        batasLimit: "4000000",
        image:
          "https://cdn.zeplin.io/5ee861a7486d3d9a9c57754b/assets/99FB8B36-9D73-42FD-8453-57183EFA82F1.png",
        bunga: "7"
      },
      {
        name: "Uang Teman",
        tenor: "1",
        limitKartu: "2000000",
        batasLimit: "5000000",
        image:
          "https://cdn.zeplin.io/5ee861a7486d3d9a9c57754b/assets/FE309305-9C1A-43EF-9D5F-3EF93A368E30.png",
        bunga: "20"
      },
      {
        name: "Pintek",
        tenor: "120",
        limitKartu: "100000",
        batasLimit: "5000000",
        image:
          "https://cdn.zeplin.io/5ee861a7486d3d9a9c57754b/assets/7A1375CE-9D0F-4003-8EF9-E7CAB4C91709.png",
        bunga: "24"
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
.riwayat-pinjaman {
  width: 249px;
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
