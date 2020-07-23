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
            <span style="margin-top:10px" class="biodata">Isi Alamat</span>
          </v-flex>
          <v-flex class="mb-4">
            <v-img
              class="biodata-logo"
              style="margin-top: 32px"
              :src="require('../assets/alamat.png')"
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
              :items="provinces"
              v-model="alamat.provinsi"
              item-text="provinsi"
              return-object
              rounded
              placeholder="Provinsi"
            ></v-select>
            <v-select
              solo
              class="form-biodata"
              v-model="alamat.kota"
              item-text="kota"
              :items="$store.state.kotas"
              return-object
              rounded
              placeholder="Kota/Kabupaten"
            ></v-select>
            <v-textarea
              solo
              class="form-biodata"
              v-model="alamat.rumah"
              rounded
              @focus="show = false"
              @blur="show = true"
              placeholder="Alamat Rumah"
            ></v-textarea>
          </v-flex>
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
import { mapState } from "vuex";
export default {
  data() {
    return {
      colors: ["#EF8475", "#EF8475", "#F082AC", "#264D6A"],
      model: 0,
      alamat: {
        provinsi: "",
        kota: "",
        rumah: ""
      },
      modal: false,
      complete: 0,
      show: true
    };
  },
  created() {
    this.$store.dispatch("GET_PROVINCES");
    let temp = this.$store.state.incomplete;
    this.alamat.provinsi = temp.provinsi;
    this.alamat.kota = temp.kota;
    this.alamat.rumah = temp.rumah;
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
    ...mapState(["provinces"])
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
    },
    "alamat.provinsi"(val, oldVal) {
      console.log(val, oldVal, "hello");
      console.log("mana ni")
      this.$store.dispatch("GET_KOTAS", +val.kode);
    }
    // provinces(val, oldVal) {
    // }
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
      temp.provinsi = this.alamat.provinsi;
      temp.kota = this.alamat.kota;
      temp.rumah = this.alamat.rumah;
      console.log(temp, "tes");
      this.$store.commit("INCOMPLETE", temp);
      this.$store.commit("NEXT", "biodata");
    },
    next() {
      let temp = this.$store.state.incomplete;
      temp.provinsi = this.alamat.provinsi;
      temp.kota = this.alamat.kota;
      temp.rumah = this.alamat.rumah;
      console.log(temp, "tes");
      this.$store.commit("INCOMPLETE", temp);

      this.$store.commit("NEXT", "keuangan");
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
        var provinsi = this.keuangan.pendapatan.replace(/[^a-zA-Z0-9 ]/g, "");

        if (provinsi !== "" && !isNaN(provinsi)) {
          this.keuangan.pendapatan = parseInt(provinsi).toLocaleString("id-ID");
        }
      }
    },
    formatPengeluaran() {
      // console.log(this.gaji);

      if (parseInt(this.keuangan.pengeluaran) !== 0) {
        // console.log(this.gaji);
        var provinsi = this.keuangan.pengeluaran.replace(/[^a-zA-Z0-9 ]/g, "");

        if (provinsi !== "" && !isNaN(provinsi)) {
          this.keuangan.pengeluaran = parseInt(provinsi).toLocaleString(
            "id-ID"
          );
        }
      }
    },
    formatCicilan() {
      // console.log(this.gaji);

      if (parseInt(this.keuangan.cicilan) !== 0) {
        // console.log(this.gaji);
        var provinsi = this.keuangan.cicilan.replace(/[^a-zA-Z0-9 ]/g, "");

        if (provinsi !== "" && !isNaN(provinsi)) {
          this.keuangan.cicilan = parseInt(provinsi).toLocaleString("id-ID");
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
  width: 269px;
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
  width: 265.5px;
  height: 173.2px;
  object-fit: contain;
}
</style>

