<template>
  <div
    v-bind:style="{ 'background-color': LightenDarkenColor('#FFFFFF',15),
  'height' : 100 + 'vh' }"
  >
    <v-container fluid v-bind:style="{ 'background-color': LightenDarkenColor('#FFFFFF',15)}">
      <v-card flat>
        <v-layout align-center column>
          <v-flex class="mb-4" style="margin-top: 10px">
            <!-- <v-text-field solo class="form-keuangan" rounded placeholder="Tanggal Lahir"></v-text-field> -->
            <div class="nominal_pinjaman">Nominal Pinjaman</div>
            <v-text-field
              solo
              class="form-keuangan"
              v-model="keuangan.loan"
              prefix="Rp"
              color="#EC5091"
              v-on:keypress="isNumber()"
              @focus="show = false"
              @blur="show = true"
              @keyup="formatloan"
              rounded
            ></v-text-field>
            <div class="nominal_pinjaman">Tenor Pinjaman</div>
            <v-text-field
              solo
              class="form-keuangan"
              v-model="keuangan.tenor"
              @focus="show = false"
              @blur="show = true"
              suffix="Bulan"
              color="#EC5091"
              rounded
            ></v-text-field>
            <div class="nominal_pinjaman">Bunga Pinjaman</div>
            <v-text-field
              solo
              class="form-keuangan"
              v-model="keuangan.bunga"
              @focus="show = false"
              @blur="show = true"
              suffix="%"
              color="#EC5091"
              rounded
            ></v-text-field>
            <div class="pertama">Pembayaran Pertama</div>
            <div>
              <v-dialog
                ref="dialog"
                v-model="modal"
                :return-value.sync="keuangan.pertama"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="keuangan.pertama"
                    solo
                    class="form-biodata"
                    rounded
                    @focus="show = false"
                    @blur="show = true"
                    placeholder="Tahun Tanggal Lahir"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker color="#EF8475" v-model="keuangan.pertama" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="#EF8475" dark @click="modal = false">Cancel</v-btn>
                  <v-btn text color="#EF8475" dark @click="$refs.dialog.save(keuangan.pertama)">OK</v-btn>
                </v-date-picker>
              </v-dialog>
            </div>
            <div style="margin-left:23px;" v-if="!validDate">
              <p style="color:white; font-weight:bolder">Tanggal</p>
            </div>
          </v-flex>
        </v-layout>
        <v-btn
          absolute
          dark
          bottom
          :style="{left: '50%', transform:'translateX(-50%)'}"
          class="button-fix"
          @click="next"
          color="#ec5091"
        >Hitung</v-btn>
      </v-card>
    </v-container>

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
        loan: "",
        tenor: "",
        bunga: "",
        pertama: new Date().toISOString().substr(0, 10)
      },
      complete: 0,
      show: true,
      modal: false
    };
  },
  created() {
    let temp = this.$store.state.simulasi;
    this.keuangan.pertama = temp.pertama;
    this.keuangan.loan = temp.loan;
    this.keuangan.tenor = temp.tenor;
    this.keuangan.bunga = temp.bunga;
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
    next() {
      let temp = this.$store.state.simulasi;
      temp.bank = this.keuangan.bank;
      temp.loan = this.keuangan.loan;
      temp.tenor = this.keuangan.tenor;
      temp.bunga = this.keuangan.bunga;
      temp.pertama = this.keuangan.pertama;
      console.log(temp, "tes");
      this.$store.commit("SIMULASI", temp);
      this.$router.push({ path: "/result-simulasi" });
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
    formatloan() {
      // console.log(this.gaji);

      if (parseInt(this.keuangan.loan) !== 0) {
        // console.log(this.gaji);
        var bank = this.keuangan.loan.replace(/[^a-zA-Z0-9 ]/g, "");

        if (bank !== "" && !isNaN(bank)) {
          this.keuangan.loan = parseInt(bank).toLocaleString("id-ID");
        }
      }
    },
    formattenor() {
      // console.log(this.gaji);

      if (parseInt(this.keuangan.tenor) !== 0) {
        // console.log(this.gaji);
        var bank = this.keuangan.tenor.replace(/[^a-zA-Z0-9 ]/g, "");

        if (bank !== "" && !isNaN(bank)) {
          this.keuangan.tenor = parseInt(bank).toLocaleString("id-ID");
        }
      }
    },
    formatbunga() {
      // console.log(this.gaji);

      if (parseInt(this.keuangan.bunga) !== 0) {
        // console.log(this.gaji);
        var bank = this.keuangan.bunga.replace(/[^a-zA-Z0-9 ]/g, "");

        if (bank !== "" && !isNaN(bank)) {
          this.keuangan.bunga = parseInt(bank).toLocaleString("id-ID");
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
.button-fix {
  font-family: Avenir;
  font-size: 13px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.38;
  letter-spacing: -0.26px;
  text-align: left;
  color: #ffffff;
}
.fixed_button {
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 70px;
  border: 0px solid #d6d6d6;
}
.nominal_pinjaman {
  width: 245px;
  height: 41px;
  font-family: Avenir;
  margin-bottom: 5px;
  font-size: 30px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.37;
  letter-spacing: -0.6px;
  text-align: left;
  color: #264d6a;
}
.pertama {
  width: 293px;
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
</style>

