<template>
  <v-touch
    @swipeleft="next"
    @swiperight="before"
    :swipe-options="{
             direction: 'horizontal'
         }"
  >
    <div
      v-bind:style="{ 'background-color': LightenDarkenColor('#F082AC',15),
  'height' : 100 + 'vh' }"
    >
      <v-container fluid v-bind:style="{ 'background-color': LightenDarkenColor('#F082AC',15)}">
        <v-layout align-center column>
          <v-progress-linear v-model="complete" color="white darken-2"></v-progress-linear>
          <v-flex align-center d-flex fluid>
            <span style="margin-top:10px" class="keuangan">Info Keuangan</span>
          </v-flex>
          <v-flex class="mb-4">
            <v-img
              class="keuangan-logo"
              style="margin-top: 32px"
              :src="require('../assets/dompet.png')"
            />
          </v-flex>

          <v-flex class="mb-4" style="margin-top: 10px">
            <v-text-field
              solo
              class="form-keuangan"
              v-model="keuangan.bank"
              @focus="show = false"
              @blur="show = true"
              rounded
              placeholder="Bank yang Digunakan"
            ></v-text-field>
            <!-- <v-text-field solo class="form-keuangan" rounded placeholder="Tanggal Lahir"></v-text-field> -->

            <v-text-field
              solo
              class="form-keuangan"
              v-model="keuangan.pendapatan"
              prefix="Rp"
              color="#EC5091"
              v-on:keypress="isNumber()"
              @focus="show = false"
              @blur="show = true"
              @keyup="formatPendapatan"
              rounded
              placeholder="Pendapatan per Bulan"
            ></v-text-field>
            <v-text-field
              solo
              class="form-keuangan"
              v-model="keuangan.pengeluaran"
              v-on:keypress="isNumber()"
              @focus="show = false"
              @blur="show = true"
              @keyup="formatPengeluaran"
              prefix="Rp"
              color="#EC5091"
              rounded
              placeholder="Pengeluaran per Bulan"
            ></v-text-field>
            <v-text-field
              solo
              class="form-keuangan"
              v-model="keuangan.cicilan"
              v-on:keypress="isNumber()"
              @focus="show = false"
              @blur="show = true"
              prefix="Rp"
              color="#EC5091"
              @keyup="formatCicilan"
              rounded
              placeholder="Total Biaya Cicilan per Bulan"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
      <v-bottom-navigation
        v-if="show"
        grow
        fixed
        dark
        :background-color="LightenDarkenColor('#F082AC',15)"
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
export default {
  data() {
    return {
      colors: ["#EF8475", "#EF8475", "#F082AC", "#264D6A"],
      model: 0,
      kelamin: ["Pria", "Wanita"],
      kawin: ["Kawin", "Belum Kawin"],
      keuangan: {
        bank: "",
        pendapatan: "",
        pengeluaran: "",
        cicilan: ""
      },
      complete: 0,
      show: true,
      modal: false
    };
  },
  created() {
    let temp = this.$store.state.incomplete;
    this.keuangan.bank = temp.bank;
    this.keuangan.pendapatan = temp.pendapatan;
    this.keuangan.pengeluaran = temp.pengeluaran;
    this.keuangan.cicilan = temp.cicilan;
  },
  watch: {
    keuangan: {
      handler: function(val, oldVal) {
        console.log("watch 1", "newval: ", val, "   oldVal:", oldVal);
        console.log(Object.values(val));
        let arr = Object.values(val);
        let size = arr.filter(function(value) {
          return value !== undefined;
        }).length;

        console.log(size / 4);
        this.progress(size / arr.length);
        // if (this.complete == 100) {
        //   this.out();
        // }
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
      temp.bank = this.keuangan.bank;
      temp.pendapatan = this.keuangan.pendapatan;
      temp.pengeluaran = this.keuangan.pengeluaran;
      temp.cicilan = this.keuangan.cicilan;
      this.$store.commit("NEXT", "alamat");
    },
    next() {
      let temp = this.$store.state.incomplete;
      temp.bank = this.keuangan.bank;
      temp.pendapatan = this.keuangan.pendapatan;
      temp.pengeluaran = this.keuangan.pengeluaran;
      temp.cicilan = this.keuangan.cicilan;
      console.log(temp, "tes");
      this.$store.commit("INCOMPLETE", temp);

      this.$store.commit("NEXT", "thank");
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
        var bank = this.keuangan.pendapatan.replace(/[^a-zA-Z0-9 ]/g, "");

        if (bank !== "" && !isNaN(bank)) {
          this.keuangan.pendapatan = parseInt(bank).toLocaleString("id-ID");
        }
      }
    },
    formatPengeluaran() {
      // console.log(this.gaji);

      if (parseInt(this.keuangan.pengeluaran) !== 0) {
        // console.log(this.gaji);
        var bank = this.keuangan.pengeluaran.replace(/[^a-zA-Z0-9 ]/g, "");

        if (bank !== "" && !isNaN(bank)) {
          this.keuangan.pengeluaran = parseInt(bank).toLocaleString("id-ID");
        }
      }
    },
    formatCicilan() {
      // console.log(this.gaji);

      if (parseInt(this.keuangan.cicilan) !== 0) {
        // console.log(this.gaji);
        var bank = this.keuangan.cicilan.replace(/[^a-zA-Z0-9 ]/g, "");

        if (bank !== "" && !isNaN(bank)) {
          this.keuangan.cicilan = parseInt(bank).toLocaleString("id-ID");
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

.form-keuangan {
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
.keuangan {
  width: 331px;
  height: 68px;
  font-family: Avenir;
  font-size: 50px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: -1px;
  text-align: left;
  color: #ffffff;
}
.keuangan-logo {
  width: 259.5px;
  height: 175.3px;
  object-fit: contain;
}
</style>

