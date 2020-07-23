<template>
  <div
    v-bind:style="{ 'background-color': LightenDarkenColor('#FFFFFF',15),
  'height' : 100 + 'vh' }"
  >
    <v-container fluid v-bind:style="{ 'background-color': LightenDarkenColor('#FFFFFF',15)}">
      <v-card flat>
        <v-layout align-center column>
          <v-flex class="mb-4" style="margin-top: 10px">
            <!-- <v-text-field  class="form-keuangan"  placeholder="Tanggal Lahir"></v-text-field> -->
            <!-- <div class="nominal_pinjaman">E-mail</div>
            <v-text-field class="form-keuangan" disabled v-model="keuangan.email" color="#EC5091"></v-text-field>-->
            <div class="nominal_pinjaman">Password Saat Ini</div>
            <v-text-field
              class="form-keuangan"
              v-model="keuangan.oldPassword"
              type="password"
              color="#EC5091"
            ></v-text-field>
            <div class="nominal_pinjaman">Password Baru</div>
            <v-text-field
              class="form-keuangan"
              v-model="keuangan.password"
              type="password"
              color="#EC5091"
            ></v-text-field>
            <div class="nominal_pinjaman">Ulangi Password Baru</div>
            <v-text-field
              class="form-keuangan"
              v-model="keuangan.repeatPassword"
              type="password"
              color="#EC5091"
            ></v-text-field>
          </v-flex>
        </v-layout>
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
      keuangan: {
        password:'',
        oldPassword:'',
        repeatPassword:''
      },
      complete: 0,
      show: true,
      modal: false
    };
  },
  created() {},
  watch: {
    keuangan: {
      handler: function(val, oldVal) {
        console.log("watch 1", "newval: ", val, "   oldVal:", oldVal);
        this.$store.commit('CHANGE_PASSWORD', val)
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

