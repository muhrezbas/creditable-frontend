<template>
  <v-touch
    @swipeleft="next"
    @swiperight="before"
    :swipe-options="{
             direction: 'horizontal'
         }"
  >
    <div
      v-bind:style="{ 'background-color': LightenDarkenColor('#EC5091',15),
  'height' : 100 + 'vh' }"
    >
      <v-container fluid v-bind:style="{ 'background-color': LightenDarkenColor('#EC5091',15)}">
        <v-layout align-center column>
          <v-progress-linear v-model="complete" color="white darken-2"></v-progress-linear>
          <v-flex align-center d-flex fluid>
            <span style="margin-top:10px" class="biodata">Isi Profil</span>
          </v-flex>
          <v-flex class="mb-4">
            <v-img
              class="biodata-logo"
              style="margin-top: 32px"
              :src="require('../assets/profil.png')"
            />
          </v-flex>

          <v-flex
            class="mb-4"
            :class="scrollable ? 'overflow-y-auto' : ''"
            v-bind:style="{ 
            'max-height' : scrollHeight + 'px' , 'margin-top' : 10 + 'px'}"
            id="scroll-target"
          >
            <v-select
              solo
              class="form-biodata"
              :items="pekerjaans"
              v-model="alamat.pekerjaan"
              item-text="pekerjaan"
              item-value="kode"
              rounded
              placeholder="Pekerjaan"
            ></v-select>
            <v-select
              solo
              class="form-biodata"
              v-model="alamat.bidang"
              :items="bidangs"
              item-text="bidang"
              item-value="kode"
              rounded
              placeholder="Bidang Pekerjaan"
            ></v-select>
            <v-select
              solo
              class="form-biodata"
              v-model="alamat.pengalaman"
              :items="pengalamans"
              item-text="pengalaman"
              item-value="kode"
              rounded
              placeholder="Pengalaman Berkerja"
            ></v-select>
            <v-select
              solo
              class="form-biodata"
              v-model="alamat.pendidikan"
              :items="pendidikans "
              item-text="pendidikan"
              item-value="kode"
              rounded
              placeholder="Pendidikan Terakhir"
            ></v-select>
            <v-select
              solo
              class="form-biodata"
              v-model="alamat.agama"
              :items="agamas"
              item-text="agama"
              item-value="kode"
              rounded
              placeholder="Agama"
            ></v-select>
          </v-flex>
          <div style="margin-top: -40px;">
            <v-checkbox v-model="setuju" color="white" hide-details>
              <template v-slot:label>
                <label class="disclaimer">
                  Dengan ini saya telah membaca, memahami, dan setuju seluruh isi dari
                  <span
                    style=" font-weight: 900;  text-decoration: underline;"
                  >syarat dan ketentuan</span> yang telah berlaku.
                </label>
              </template>
            </v-checkbox>
          </div>
        </v-layout>
      </v-container>
      <v-bottom-navigation
        v-if="show"
        grow
        fixed
        dark
        :background-color="LightenDarkenColor('#EC5091',15)"
      >
        <v-btn text dark @click="before()">
          <h2 class="text-capitalize kembali">Kembali</h2>
        </v-btn>
        <v-btn dark text @click="next()">
          <h2 class="text-capitalize kembali">Berikutnya</h2>
        </v-btn>
      </v-bottom-navigation>

      <!-- <v-row align="center" justify="center">
        <v-container style="position:absolute;bottom:0px">
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
  </v-touch>
</template>

<script>
import instance from "../myconfig";
import { mapState } from "vuex";
export default {
  data() {
    return {
      colors: ["#EF8475", "#EF8475", "#F082AC", "#264D6A"],
      model: 0,
      alamat: {
        pekerjaan: "",
        bidang: "",
        agama: "",
        pengalaman: "",
        pendidikan: ""
      },
      setuju: false,
      modal: false,
      complete: 0,
      show: true
    };
  },
  created() {
    this.$store.dispatch("GET_PENDIDIKANS");
    this.$store.dispatch("GET_PENGALAMANS");
    this.$store.dispatch("GET_AGAMAS");
    this.$store.dispatch("GET_BIDANGS");
    this.$store.dispatch("GET_PEKERJAANS");
    let temp = this.$store.state.incomplete;
    this.alamat.pekerjaan = temp.pekerjaan;
    this.alamat.bidang = temp.bidang;
    this.alamat.agama = temp.agama;
    this.alamat.pendidikan = temp.pendidikan;
    this.alamat.pengalaman = temp.pengalaman;
  },
  computed: {
    scrollHeight() {
      if (window.innerHeight < 600) {
        return window.innerHeight / 5;
      } else if (window.innerHeight < 700) {
        return window.innerHeight / 1;
      } else if (window.innerHeight < 850) {
        return window.innerHeight / 1;
      } else {
        return window.innerHeight / 1;
      }
    },
    scrollable() {
      if (window.innerHeight < 700) {
        return true;
      } else {
        return false;
      }
    },
    ...mapState([
      "pengalamans",
      "pendidikans",
      "agamas",
      "bidangs",
      "pekerjaans"
    ])
  },
  watch: {
    alamat: {
      handler: function(val, oldVal) {
        console.log("watch 1", "newval: ", val, "   oldVal:", oldVal);
        console.log(Object.values(val));
        let arr = Object.values(val);
        let size = arr.filter(function(value) {
          return value !== undefined;
        }).length;

        console.log(size / 3);
        this.progress(size / arr.length);
      },
      deep: true
    }
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
    before() {
      let temp = this.$store.state.incomplete;
      temp.pekerjaan = this.alamat.pekerjaan;
      temp.bidang = this.alamat.bidang;
      temp.agama = this.alamat.agama;
      temp.pengalaman = this.alamat.pengalaman;
      temp.pendidikan = this.alamat.pendidikan;
      console.log(temp, "tes");
      this.$store.commit("INCOMPLETE", temp);
      this.$store.commit("NEXT", "akun");
    },
    next() {
      console.log(this.setuju);
      if (this.setuju) {
        let temp = this.$store.state.incomplete;
        temp.pekerjaan = this.alamat.pekerjaan;
        temp.bidang = this.alamat.bidang;
        temp.agama = this.alamat.agama;
        temp.pengalaman = this.alamat.pengalaman;
        temp.pendidikan = this.alamat.pendidikan;
        console.log(temp, "tes");
        this.$store.commit("INCOMPLETE", temp);
        console.log(this.$store.state.incomplete);
        let input = {
          name: temp.name,
          email: temp.email,
          password: temp.password,
          phone: temp.telepon,
          bidang: temp.bidang,
          pekerjaan: temp.pekerjaan,
          pengalaman: temp.pengalaman,
          pendidikan: temp.pendidikan,
          agama: temp.agama,
          creditID: temp.key
        };
        console.log(input);
        instance
          .post(`/users/signup-public`, input)
          .then(({ data }) => {
            localStorage.setItem("token", data.access_token);
            // var decoded = jwt.decode(jwttoken)
            localStorage.setItem("name", data.name);
            this.$store.commit("LOGIN");
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
      }
    },
    isNumber: function() {
      // console.log(evt, "tes")
      let evt = window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    formatPendapatan() {
      // console.log(this.gaji);

      if (parseInt(this.keuangan.pendapatan) !== 0) {
        // console.log(this.gaji);
        var pekerjaan = this.keuangan.pendapatan.replace(/[^a-zA-Z0-9 ]/g, "");

        if (pekerjaan !== "" && !isNaN(pekerjaan)) {
          this.keuangan.pendapatan = parseInt(pekerjaan).toLocaleString(
            "id-ID"
          );
        }
      }
    },
    formatPengeluaran() {
      // console.log(this.gaji);

      if (parseInt(this.keuangan.pengeluaran) !== 0) {
        // console.log(this.gaji);
        var pekerjaan = this.keuangan.pengeluaran.replace(/[^a-zA-Z0-9 ]/g, "");

        if (pekerjaan !== "" && !isNaN(pekerjaan)) {
          this.keuangan.pengeluaran = parseInt(pekerjaan).toLocaleString(
            "id-ID"
          );
        }
      }
    },
    formatCicilan() {
      // console.log(this.gaji);

      if (parseInt(this.keuangan.cicilan) !== 0) {
        // console.log(this.gaji);
        var pekerjaan = this.keuangan.cicilan.replace(/[^a-zA-Z0-9 ]/g, "");

        if (pekerjaan !== "" && !isNaN(pekerjaan)) {
          this.keuangan.cicilan = parseInt(pekerjaan).toLocaleString("id-ID");
        }
      }
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
  width: 220px;
  height: 82px;
  font-family: Avenir;
  font-size: 60px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.37;
  letter-spacing: -1.2px;
  text-align: left;
  color: #ffffff;
}
.biodata-logo {
  width: 235.2px;
  height: 198.9px;
  object-fit: contain;
}
.disclaimer {
  width: 266px;
  height: 30px;
  font-family: Avenir;
  font-size: 10.4px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.35;
  letter-spacing: normal;
  text-align: left;
  color: #ffffff;
}
</style>

