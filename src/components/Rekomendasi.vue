<template>
  <div>
    <v-container
      id="scroll-target"
      fluid
      class="overflow-y-auto"
      v-bind:style="{ 'background-color': 'white',
   'height' : 1000 + 'px' }"
      v-resize="onResize"
      v-scroll.self="onScroll"
    >
      <!-- {{ windowSize }} -->
      <v-layout align-center justify-center column>
        <!-- <v-subheader style="    position: fixed;
    top: 115px;">
          Offset Top
          {{this.visible + this.scrollY}}
          {{this.pageHeight}}
          {{this.add}}
        </v-subheader> -->
        <v-flex fluid style="margin-right:0px;">
          <CardBank
            v-for="(selectOption, indexOpt) in filteredList"
            :pinjaman="selectOption"
            :key="indexOpt"
          />
          <div v-if="this.$store.state.loader">
            <v-skeleton-loader
              v-for="(indexOpt) in this.loader"
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
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import CardBank from "./CardBank";
// import instance from "../myconfig";
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
    this.scroll(this.pinjaman_all);
    this.$store.dispatch("GET_PINJAMAN_ALL_LIMIT", [0, this.get]);
  },
  created() {
    this.$store.state.pinjaman_all = [];
    // window.addEventListener("scroll", () => {
    //   this.bottom = this.bottomVisible();
    // });
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
    ...mapState(["credit", "pinjaman_all"]),
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
    //  filteredList() {
    //   // var lowSearch = search.toLowerCase();
    //   return this.$store.state.pinjaman.filter(article => {
    //     return Object.values(article).some(val=>
    //       String(val).toLowerCase()
    //       .includes(this.$store.state.newSearching.toLowerCase())
    //   });
    // },
    total() {
      return this.filteredList.length;
    },
    check() {
      const scrollY = window.scrollY;
      const visible = document.documentElement.clientHeight;
      return scrollY + visible;
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

        // y -= i
        // y = 500
        // i++
      }
      return i;
    }
  },
  watch: {
    bottom(bottom) {
      if (bottom) {
        console.log(bottom, "terus");
        this.add += this.get;
        let sebelum = this.add;
        this.add += 6;
        this.loader = 6;
        this.$store.state.loader = true;
        this.$store.dispatch("GET_PINJAMAN_ALL_LIMIT", [sebelum, this.add]);
      }
    }
  },
  methods: {
    onScroll() {
      this.scrollY = window.scrollY;
      this.visible = document.documentElement.clientHeight;
      this.pageHeight = document.documentElement.scrollHeight;
      this.bottomOfPage = this.visible + this.scrollY >= this.pageHeight - 100;
      // this.page = pageHeight;
      // console.log(scrollY + visible, "tes");
      // console.log(bottomOfPage);
      // console.log(pageHeight, "pageheight");
      this.bottom = this.bottomOfPage;
      return this.bottomOfPage || this.pageHeight < this.visible;
    },
    scroll() {
      window.onscroll = () => {
        // console.log(pinjaman_all);
        //
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;
        // console.log(
        //   document.documentElement.scrollTop + window.innerHeight,
        //   "inset"
        // );

        if (bottomOfWindow) {
          // this.$store.dispatch("GET_PINJAMAN_ALL_LIMIT", [0, this.get + 1]);
          // Do something, anything!
        }
      };
    },

    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
      this.get = Math.round(document.documentElement.offsetHeight / 2 / 100);
      // this.get = 3;

      console.log("kepanggil ga");
      this.loader = this.get;
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
    bottom: false,
    add: 0,
    panggil: 0,
    pageHeight: 0,
    scrollY,
    visible: 0,
    offsetTop: 0,
    get: 0,
    loader: 0,
    doto: [""],
    data: ["lala", "yeye", "yoyo"],
    akhir: 97,
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
        bank: "BCA",
        tenor: "12 s/d 36 bulan",
        total: "Rp 1.000.000,- s/d Rp 4.000.000",
        avatar:
          "https://cdn.zeplin.io/5ee861a7486d3d9a9c57754b/assets/99FB8B36-9D73-42FD-8453-57183EFA82F1.png",
        bunga: "3% s/d 7%"
      },
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
