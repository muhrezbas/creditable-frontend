<template>
  <div
    v-bind:style="{ 'background-color': LightenDarkenColor('#FFFFFF',15),
  'height' : 800 + 'vh' }"
  >
    <v-container fluid style="background-color: #FFFFFF; padding:0px; width:671px">
      <v-card
        flat
        style="  font-family: Avenir;
                font-size: 18px;
                font-weight: 300;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.39;
                letter-spacing: -0.36px;
                text-align: left;
                color: #264d6a;"
      >
        <v-col align="center" justify="center">
          <v-col class="mb-4" style="margin-top: 10px">
            <div class="nominal_pinjaman">{{this.$store.state.detil.name}}</div>
          </v-col>

          <v-row justify="center">
            <v-img :src="this.$store.state.detil.image"></v-img>
          </v-row>

          <v-row justify="space-between" style="margin-top : 24px; font-size: 14px;">
            <div>
              <p>{{ this.$store.state.detil.batasLimit == null ? "N/A" : limit}}</p>
              <p>Limit Kartu</p>
            </div>
            <div style="border-right: 1px solid black;"></div>
            <div>
              <p>{{this.$store.state.detil.bunga}}%</p>
              <p>Bunga</p>
            </div>
            <div style="border-left: 1px solid black;"></div>
            <div>
              <p>Rp {{this.rupiah(+this.$store.state.detil.pendapatan)}}</p>
              <p>Min. Pendapatan</p>
            </div>
          </v-row>

          <v-col class="mb-4" style="margin-top: 10px">
            <div class="nominal_pinjaman">Deskripsi</div>
          </v-col>
          <v-col class="mb-4" style="margin-top: 10px">
            <div class="nominal_pinjaman">Keuntungan</div>
          </v-col>
          <v-col class="mb-4" style="margin-top: 10px">
            <div class="nominal_pinjaman">Syarat & Ketentuan</div>
          </v-col>

          <v-col class="mb-4" style="margin-top: 10px"></v-col>
          <v-col></v-col>
        </v-col>
      </v-card>
      <v-btn
        fixed
        dark
        bottom
        style="left: 50%; transform:translateX(-50%)
         width: 119px;
  height: 35px;
  border-radius: 30px;
  box-shadow: 0 6px 6px 0 rgba(236, 80, 145, 0.2);"
        @click="ajukan($store.state.detil)"
        color="#ec5091"
      >AJUKAN</v-btn>
    </v-container>
  </div>
</template>

<script>
// const ctx = document.getElementById('simulasi-chart');
import instance from "../myconfig";
export default {
  data() {
    return {};
  },
  computed: {
    limit() {
      return `Rp ${this.rupiah(
        +this.$store.state.detil.limitKartu
      )},- s/d Rp ${this.rupiah(+this.$store.state.detil.batasLimit)}`;
    },
  },
  created() {
    // console.log(this.$router);
    this.$store.dispatch("GET_KARTU_KREDIT_ONE", this.$route.params.id);
  },
  mounted() {},
  watch: {},
  methods: {
    rupiah(payload) {
      // console.log(payload.toLocaleString("id-ID"))
      return payload.toLocaleString("id-ID");
    },
    ajukan(payload) {
      console.log(payload);
      let input = {
        kartuID: +payload.id,
        jenis: payload.jenis,
      };

      instance
        .post(`/pinjamans/kartu-kredit`, input, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then(({ data }) => {
          console.log(data);
          // localStorage.setItem("token", data.access_token);
          // // var decoded = jwt.decode(jwttoken)
          // localStorage.setItem("name", data.name);
          // // this.$store.commit("LOGIN");
          // // this.dialog = false;
        })
        .catch((err) => {
          console.log(err.response.data);
          // localStorage.removeItem("token");
          // localStorage.removeItem("email");
          // this.$store.commit("LOGOUT");
        });
    },

    isNumber: function () {
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
    },
  },
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
  display: col;
  left: 0;
  justify-content: center;
  width: 100%;
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0),
    0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);
}
.rincian_pembayaran {
  width: 283px;
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
.nominal_pinjaman {
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

