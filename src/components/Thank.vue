<template>
  <v-touch
    @swipeleft="next"
    @swiperight="before"
    :swipe-options="{
             direction: 'horizontal'
         }"
  >
    <div
      v-bind:style="{ 'background-color': LightenDarkenColor('#264D6A',15),
  'height' : 100 + 'vh' }"
    >
      <v-container
        fluid
        v-bind:style="{ 'background-color': LightenDarkenColor('#264D6A',15), 'height' : 100 + '%'}"
      >
        <v-layout align-center column wrap justify-space-around style="height:100%">
          <v-flex align-center d-flex fluid>
            <span style="margin-top:-10px;" class="biodata">Terima Kasih!</span>
          </v-flex>
          <v-flex align-center d-flex fluid class="mb-4 desc">
            <span style="padding-left:1px;">
              Selamat! Anda berhasil mengisi seluruh data yang dibutuhkan untuk melakukan penilaian kredit. klik
              <span
                style="  font-weight: 900;"
              >“berikutnya”</span>untuk mengetahui nilai kredit anda.
            </span>
          </v-flex>
          <v-flex align-center d-flex fluid class="mb-4 disclaimer">
            <span>Disclaimer : Layanan penilaian kredit yang kami sampaikan dalam web dan/atau aplikasi “Creditable” adalah hasil olahan, analisa, ulasan, pengalaman, dan penilaian mesin kami. Kami tidak memiliki afiliasi dengan hasil penilaian kredit dari berbagai institusi keuangan lainnya. Nilai kredit yang telah kami berikan dan ditunjukan dalam web dan/atau aplikasi “Creditable” dapat berbeda dengan penilaian kredit pada institusi lainnya. Kami menyarankan untuk menggunakan kebijaksanaan sebelum menggunakan layanan apa pun dari pihak yang tidak terafiliasi dengan kami, dan cari penasihat profesional jika ada masalah.</span>
          </v-flex>
        </v-layout>
      </v-container>
      <!-- <v-row align="center" justify="center">
        <v-container style="position:absolute; bottom:0px;">
          <v-row align="center" justify="space-around">
            <v-btn value="partner" text dark @click="before()">
              <h2 class="text-capitalize">Kembali</h2>
            </v-btn>
            <v-btn value="history" dark text @click="next()">
              <h2 class="text-capitalize">Berikutnya</h2>
            </v-btn>
          </v-row>
        </v-container>
      </v-row>-->
    </div>
    <v-bottom-navigation
      v-if="show"
      grow
      fixed
      dark
      :background-color="LightenDarkenColor('#264D6A',15)"
    >
      <v-btn text dark @click="before()">
        <h2 class="text-capitalize kembali">Kembali</h2>
      </v-btn>
      <v-btn dark text @click="next()">
        <h2 class="text-capitalize kembali">Berikutnya</h2>
      </v-btn>
    </v-bottom-navigation>
  </v-touch>
</template>

<script>
import instance from "../myconfig";
export default {
  data() {
    return {
      colors: ["#EF8475", "#EF8475", "#F082AC", "#264D6A"],
      model: 0,
      offsetTop: 0,
      complete: 0,
      show: true,
      modal: false
    };
  },
  computed: {
    height() {
      return window.innerHeight;
    },
    scrollHeight() {
      if (window.innerHeight < 600) {
        return window.innerHeight / 4.8;
      } else if (window.innerHeight < 700) {
        return window.innerHeight / 3.3;
      } else if (window.innerHeight < 850) {
        return window.innerHeight / 2.7;
      } else {
        return window.innerHeight / 2;
      }
    },
    scrollable() {
      if (window.innerHeight < 800) {
        return true;
      } else {
        return false;
      }
    }
  },
  created() {
    // let temp = this.$store.state.incomplete;
  },
  methods: {
    progress(payload) {
      this.complete = payload * 100;
    },
    ngetik() {
      // console.log(this.gaji);

      this.show = false;
    },
    out() {
      this.show = true;
    },
    getAge(dateString) {
      var today = new Date();
      var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },
    next() {
      console.log(this.$store.state.incomplete);
      let hasil =
        +this.$store.state.incomplete.pengeluaran.replace(
          /[^a-zA-Z0-9 ]/g,
          ""
        ) + +this.$store.state.incomplete.cicilan.replace(/[^a-zA-Z0-9 ]/g, "");
      let input = {
        amount: +hasil,
        salary: +this.$store.state.incomplete.pendapatan.replace(
          /[^a-zA-Z0-9 ]/g,
          ""
        ),
        province: this.$store.state.incomplete.provinsi,
        age: this.getAge(this.$store.state.incomplete.date),
        lahir: this.$store.state.incomplete.date,
        city: this.$store.state.incomplete.kota,
        gender: this.$store.state.incomplete.gender,
        marital: this.$store.state.incomplete.marital == false ? "tidak" : "ya",
        bank: this.$store.state.incomplete.bank,
        alamat: this.$store.state.incomplete.rumah
      };
      console.log(input);
      instance
        .post(`/credits/public`, input)
        .then(({ data }) => {
          let temp = this.$store.state.incomplete;
          temp.key = data.newCredit.entityKey;
          this.$store.commit("NEXT", "result");
          console.log(data.newCredit.entityKey);
          // localStorage.setItem("token", data.access_token);
          // // var decoded = jwt.decode(jwttoken)
          // localStorage.setItem("name", data.name);
          // // this.$store.commit("LOGIN");
          // // this.dialog = false;
        })
        .catch(err => {
          console.log(err.response.data);
          // localStorage.removeItem("token");
          // localStorage.removeItem("email");
          // this.$store.commit("LOGOUT");
        });
      console.log(input, "tes");
      // console.log(this.$store.state.incomplete.pendapatan.replace(/[^a-zA-Z0-9 ]/g, ""));

      //
    },
    onScroll(e) {
      this.offsetTop = e.target.scrollTop;
    },
    before() {
      this.$store.commit("NEXT", "keuangan");
    },
    doSomething(direction) {
      console.log(direction); // May be left / right / top / bottom
      console.log("hello");
      this.next();
    },
    LightenDarkenColor(col, amt) {
      var usePound = false;

      if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
      }

      var num = parseInt(col, 16);

      var r = (num >> 16) + amt;

      if (r > 255) r = 255;
      else if (r < 0) r = 0;

      var b = ((num >> 8) & 0x00ff) + amt;

      if (b > 255) b = 255;
      else if (b < 0) b = 0;

      var g = (num & 0x0000ff) + amt;

      if (g > 255) g = 255;
      else if (g < 0) g = 0;

      return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
    }
  }
};
</script>

<style scoped>
.kembali {
  font-family: Avenir;
  font-size: 30px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.37;
  letter-spacing: -0.6px;
  text-align: left;
  color: #ffffff;
}
.custom-placeholer-color input::placeholder {
  color: red !important;
  opacity: 1;
}
.v-item-group.v-bottom-navigation {
  bottom: 0;
  display: flex;
  left: 0;
  justify-content: center;
  width: 100%;
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0),
    0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);
}
.form-biodata {
  width: 302px;
  height: 59px;
  margin-bottom: 3px;
}
.fixed_button {
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 70px;
  border: 0px solid #d6d6d6;
}
.biodata {
  font-family: Avenir;
  font-size: 55px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: -1.1px;
  text-align: left;
  color: #ffffff;
}
.biodata-logo {
  width: 180.5px;
  height: 203.2px;
  object-fit: contain;
}
.desc {
  width: 359px;
  height: 154px;
  margin-left: 10px;
  font-family: Avenir;
  font-size: 20px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.35;
  letter-spacing: -0.4px;
  text-align: left;
  color: #ffffff;
}
.disclaimer {
  width: 359px;
  height: 67px;
  font-family: Avenir;
  font-size: 8px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.38;
  letter-spacing: -0.16px;
  text-align: left;
  color: #ffffff;
}
</style>