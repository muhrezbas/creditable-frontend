<template>
  <div
    v-bind:style="{ 'background-color': LightenDarkenColor('#FFFFFF',15),
  'height' : 100 + 'vh' }"
  >
    <v-container fluid v-bind:style="{ 'background-color': LightenDarkenColor('#FFFFFF',15)}">
      <v-row align="center" justify="center">
        <v-card width="345" flat>
          <v-col>
            <v-row>
              <v-avatar size="59" tile style="margin-top :4px">
                <v-img :src="require('../assets/woman.png')" class="inline" contain></v-img>
              </v-avatar>
              <v-col>
                <p
                  style="  font-family: Avenir;
  font-size: 25px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: -0.5px;
  text-align: left;
  color: #264d6a;
  margin-bottom:0px"
                >{{$store.state.profil.user.name}}</p>
                <p
                  style="  font-family: Avenir;
  font-size: 15px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: -0.3px;
  text-align: left;
  color: #264d6a;"
                >{{$store.state.profil.user.phone}}</p>
              </v-col>
              <v-btn icon style="margin-top: 15px;" @click="push('/profile/ubah-profile')">
                <v-icon color="#264d6a">mdi-pencil</v-icon>
              </v-btn>
            </v-row>
            <p class="title">Ubah</p>
            <v-row @click="push('/profile/ubah-password')">
              <v-icon color="#264d6a">mdi-key</v-icon>
              <v-col>
                <p class="isi">Ubah Password</p>
              </v-col>
              <v-btn icon>
                <v-icon color="#264d6a">mdi-chevron-right</v-icon>
              </v-btn>
            </v-row>
            <v-divider />
            <p class="title" style="margin-top: 15px">Tentang</p>
            <v-row @click="push('/profile/keuntungan')">
              <v-icon color="#264d6a">mdi-trophy</v-icon>
              <v-col>
                <p class="isi">Keuntungan Creditable</p>
              </v-col>
              <v-btn icon>
                <v-icon color="#264d6a">mdi-chevron-right</v-icon>
              </v-btn>
            </v-row>
            <v-divider />
            <v-row>
              <v-icon color="#264d6a">mdi-text-box-multiple</v-icon>
              <v-col>
                <p class="isi">Syarat & Ketentuan</p>
              </v-col>
              <v-btn icon>
                <v-icon color="#264d6a">mdi-chevron-right</v-icon>
              </v-btn>
            </v-row>
            <v-divider />
            <v-row>
              <v-icon color="#264d6a">mdi-lock</v-icon>
              <v-col>
                <p class="isi">Kebijakan Privasi</p>
              </v-col>
              <v-btn icon>
                <v-icon color="#264d6a">mdi-chevron-right</v-icon>
              </v-btn>
            </v-row>
            <v-divider />
            <v-row>
              <v-icon color="#264d6a">mdi-star</v-icon>
              <v-col>
                <p class="isi">Rate Creditable</p>
              </v-col>
              <v-btn icon>
                <v-icon color="#264d6a">mdi-chevron-right</v-icon>
              </v-btn>
            </v-row>
            <v-divider />
          </v-col>
        </v-card>
      </v-row>
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
    this.$store.dispatch("GET_PROFILE");
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
    push(payload) {
      console.log(payload, "tes");
      this.$router.push({ path: payload });
    },
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
.title {
  font-family: Avenir !important;
  font-size: 30px !important;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.37;
  letter-spacing: -0.6px !important;
  text-align: left;
  color: #264d6a;
}
.isi {
  font-family: Avenir !important;
  font-size: 18px !important;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.39;
  letter-spacing: -0.36px !important;
  text-align: left;
  color: #264d6a;
  margin-bottom: 0px;
}
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

