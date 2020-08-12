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

            <v-flex fluid style="  margin-top:10px">
              <v-layout align-start justify-space-between row style="margin-left: 6px">
                <span class="rekomendasi-pinjaman">Institusi keuangan:</span>
                <v-btn @click="daftar" text class="text-capitalize lihat-semua">Lihat Semua</v-btn>
              </v-layout>
            </v-flex>
            <v-flex class="mb-4" style="margin-top: 0px">
              <!-- <v-text-field solo class="form-keuangan" rounded placeholder="Tanggal Lahir"></v-text-field> -->
              <v-card
                width="500"
                :class="`d-flex justify-start mb-6 overflow-x-auto`"
                style="overflow-y: hidden; padding: 11px;"
                tile
                flat
              >
                <v-btn
                  class="button-institusi"
                  v-bind:style="{ 'background-color': institusi.includes(selectOption.id)?'#ec5091':'#FFFFFF',
                                  'border': institusi.includes(selectOption.id) ? ''  :'solid 1px #ec5091',
                                  'color': institusi.includes(selectOption.id) ? 'white' :'#264d6a'}"
                  style="background-color: #ffffff;"
                  @click="selectInstitusi(selectOption.id)"
                  v-for="(selectOption, indexOpt) in $store.state.mitras"
                  :key="indexOpt"
                >{{selectOption.name}}</v-btn>
              </v-card>
            </v-flex>
            <v-flex fluid style="  margin-top:10px">
              <v-layout align-start justify-space-between row style="margin-left: 6px">
                <span class="rekomendasi-pinjaman">Kategori Pinjaman:</span>
              </v-layout>
            </v-flex>

            <v-flex class="mb-4" style="margin-top: 0px">
              <!-- <v-text-field solo class="form-keuangan" rounded placeholder="Tanggal Lahir"></v-text-field> -->
              <v-card
                width="500"
                :class="`d-flex justify-start mb-6 overflow-x-auto`"
                style="overflow-y: hidden; padding: 11px;"
                tile
                flat
              >
                <v-btn
                  class="button-institusi"
                  v-bind:style="{ 'background-color': kategori.includes(selectOption.value)?'#ec5091':'#FFFFFF',
                                  'border': kategori.includes(selectOption.value) ? ''  :'solid 1px #ec5091',
                                  'color': kategori.includes(selectOption.value) ? 'white' :'#264d6a'}"
                  style="background-color: #ffffff;"
                  @click="selectKategori(selectOption.value)"
                  v-for="(selectOption, indexOpt) in kategoriPinjaman"
                  :key="indexOpt"
                >{{selectOption.name}}</v-btn>
              </v-card>
            </v-flex>
            <v-flex fluid style="  margin-top:10px">
              <v-layout align-start justify-space-between row style="margin-left: 6px">
                <span class="rekomendasi-pinjaman">Nominal Pinjaman:</span>
              </v-layout>
            </v-flex>
            <v-flex fluid>
              <v-card flat width="500">
                <v-layout style="display: flex;justify-content: space-between;">
                  <label style="padding: 33px 9px 0px 0px;">Minimal</label>
                  <v-text-field
                    style="max-width: 32%;"
                    class="form-profile"
                    prefix="Rp "
                    :value="range[0]"
                    @change="$set(range, 0, $event)"
                    color="#EC5091"
                  ></v-text-field>
                  <label style="padding: 33px 9px 0px 0px; margin-left: 5px">Maksimal</label>
                  <v-text-field
                    style="max-width: 32%;"
                    class="form-profile"
                    prefix="Rp "
                    :value="range[1]"
                    @change="$set(range, 1, $event)"
                    color="#EC5091"
                  ></v-text-field>
                </v-layout>
              </v-card>
            </v-flex>

            <v-flex>
              <v-layout>
                <v-range-slider
                  v-model="range"
                  color="#EC5091"
                  track-color="#264d6a"
                  thumb-size="19"
                  :max="max"
                  :min="min"
                  hide-details
                  class="align-center"
                ></v-range-slider>
              </v-layout>
            </v-flex>
            <v-flex fluid style="  margin-top:10px">
              <v-layout align-start justify-space-between row style="margin-left: 6px">
                <span class="rekomendasi-pinjaman">Bunga Pinjaman:</span>
              </v-layout>
            </v-flex>
            <v-flex fluid>
              <v-card flat width="500">
                <v-layout style="display: flex;justify-content: space-between;">
                  <label style="padding: 33px 9px 0px 0px;">Minimal</label>
                  <v-text-field
                    style="max-width: 32%;"
                    class="form-profile"
                    suffix="%"
                    :value="rangeBunga[0]"
                    @change="$set(rangeBunga, 0, $event)"
                    color="#EC5091"
                  ></v-text-field>
                  <label style="padding: 33px 9px 0px 0px; margin-left: 5px">Maksimal</label>
                  <v-text-field
                    style="max-width: 32%;"
                    class="form-profile"
                    suffix="%"
                    :value="rangeBunga[1]"
                    @change="$set(rangeBunga, 1, $event)"
                    color="#EC5091"
                  ></v-text-field>
                </v-layout>
              </v-card>
            </v-flex>

            <v-flex>
              <v-layout>
                <v-range-slider
                  v-model="rangeBunga"
                  color="#EC5091"
                  track-color="#264d6a"
                  thumb-size="19"
                  :max="bungaMax"
                  :min="bungaMin"
                  hide-details
                  class="align-center"
                ></v-range-slider>
              </v-layout>
            </v-flex>
            <v-flex fluid style="  margin-top:10px">
              <v-layout align-start justify-space-between row style="margin-left: 6px">
                <span class="rekomendasi-pinjaman">Tenor Pinjaman:</span>
              </v-layout>
            </v-flex>
            <v-flex fluid style="  margin-top:10px">
              <v-layout align-start justify-space-between row style="margin-left: 6px">
                <v-card
                  width="500"
                  :class="`d-flex justify-start overflow-x-auto`"
                  style="overflow-y: hidden;"
                  tile
                  flat
                >
                  <label style="margin: 1px 16px 0px 13px;">Tenor Dalam :</label>
                  <v-btn
                    @click="tenor = 'hari'"
                    class="button-tenor"
                    v-bind:style="{ 'background-color': tenor == 'hari'?'#ec5091':'#FFFFFF',
                                  'border': tenor == 'hari' ? ''  :'solid 1px #ec5091',
                                  'color': tenor == 'hari' ? 'white' :'#264d6a',
                                  'height' : '21px'}"
                  >Hari</v-btn>
                  <v-btn
                    @click="tenor = 'bulan'"
                    class="button-tenor"
                    v-bind:style="{ 'background-color': tenor == 'bulan'?'#ec5091':'#FFFFFF',
                                  'border': tenor == 'bulan' ? ''  :'solid 1px #ec5091',
                                  'color': tenor == 'bulan' ? 'white' :'#264d6a',
                                  'height' : '21px'}"
                  >Bulan</v-btn>
                  <v-btn
                    @click="tenor = 'tahun'"
                    class="button-tenor"
                    v-bind:style="{ 'background-color': tenor == 'tahun'?'#ec5091':'#FFFFFF',
                                  'border': tenor == 'tahun' ? ''  :'solid 1px #ec5091',
                                  'color': tenor == 'tahun' ? 'white' :'#264d6a',
                                  'height' : '21px'}"
                  >Tahun</v-btn>
                </v-card>
              </v-layout>
            </v-flex>
            <v-flex fluid>
              <v-card flat width="500">
                <v-layout style="display: flex;justify-content: space-between;">
                  <label style="padding: 33px 9px 0px 0px;">Minimal</label>
                  <v-text-field
                    style="max-width: 32%;"
                    class="form-profile"
                    :suffix="tenor"
                    :value="rangeTenor[0]"
                    @change="$set(rangeTenor, 0, $event)"
                    color="#EC5091"
                  ></v-text-field>
                  <label style="padding: 33px 9px 0px 0px; margin-left: 5px">Maksimal</label>
                  <v-text-field
                    style="max-width: 32%;"
                    class="form-profile"
                    :suffix="tenor"
                    :value="rangeTenor[1]"
                    @change="$set(rangeTenor, 1, $event)"
                    color="#EC5091"
                  ></v-text-field>
                </v-layout>
              </v-card>
            </v-flex>

            <v-flex>
              <v-layout>
                <v-range-slider
                  v-model="rangeTenor"
                  color="#EC5091"
                  track-color="#264d6a"
                  thumb-size="19"
                  :max="tenorMax"
                  :min="tenorMin"
                  hide-details
                  class="align-center"
                ></v-range-slider>
              </v-layout>
            </v-flex>
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
        >Filter</v-btn>
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
import instance from "../myconfig";
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
        pertama: new Date().toISOString().substr(0, 10),
      },
      institusi: [],
      kategori: [],
      tenor: "hari",
      min: 0,
      max: 1000000000,
      bungaMin: 0,
      kategoriPinjaman: [
        { name: "Kartu Kredit", value: "kartuKredit" },
        { name: "KTA", value: "kreditTanpaAgunan" },
      ],
      bungaMax: 100,
      tenorMin: 0,
      tenorMax: 8760,
      slider: 40,
      range: [0, 1000000000],
      rangeBunga: [0, 100],
      rangeTenor: [0, 8760],
      complete: 0,
      show: true,
      modal: false,
    };
  },
  created() {
    this.$store.dispatch("GET_MITRAS");
  },
  watch: {
    keuangan: {
      handler: function (val, oldVal) {
        console.log("watch 1", "newval: ", val, "   oldVal:", oldVal);
        console.log(Object.values(val));
        let arr = Object.values(val);
        let size = arr.filter(function (value) {
          return value !== undefined;
        }).length;

        console.log(size / 4);
        this.progress(size / arr.length);
        // if (this.complete == 100) {
        //   this.out();
        // }
      },
      deep: true,
    },
  },
  methods: {
    progress(payload) {
      this.complete = payload * 100;
    },
    selectInstitusi(payload) {
      console.log(payload);
      let tes = this.institusi.findIndex((data) => data === payload);
      console.log(tes, "keluar apa");
      if (tes == -1) {
        this.institusi.push(payload);
      } else if (tes !== -1) {
        this.institusi.splice(tes, 1);
      }
      console.log(this.institusi);
    },
    selectKategori(payload) {
      console.log(payload);
      let tes = this.kategori.findIndex((data) => data === payload);
      console.log(tes, "keluar apa");
      if (tes == -1) {
        this.kategori.push(payload);
      } else if (tes !== -1) {
        this.kategori.splice(tes, 1);
      }
      console.log(this.kategori);
    },
    ngetik() {
      // console.log(this.gaji);

      this.show = false;
    },
    out() {
      this.show = true;
    },
    next() {
      // console.log(this.range);
      let obj = {
        jenis: this.kategori,
        mitra: this.institusi,
        nominal: [this.range[0], this.range[1]],
        bunga: [this.rangeBunga[0], this.rangeBunga[1]],
        tenor: [this.rangeTenor[0], this.rangeTenor[1], this.tenor],
      };
      instance
        .post(`/pinjamans/filter`, obj, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then(({ data }) => {
          console.log(data, "FILTER");
          this.$store.commit("SET_PINJAMAN_ALL_LIMIT", data);
          this.$router.push({ path: "/rekomendasi" });
          this.$store.state.filter = true
          // console.log(context.state.pinjaman_all, "all");
          // let payload = context.state.pinjaman_all.concat(data);

          // context.questions = data;
          // context.commit("SET_PINJAMAN_ALL_LIMIT", payload);
          // console.log(context.questions);
        })
        .catch(function (error) {
          // localStorage.removeItem("token");
          // localStorage.removeItem("email");
          // context.commit("LOGOUT");
          console.log(error, "why");
        });

      console.log(obj);
      //       {
      //     "jenis": [
      //         "kartuKredit",
      //         "kreditTanpaAgunan"
      //     ],
      //      "mitra": [
      //         "5718746756808704",
      //         "5138716758638592"
      //     ],
      //     "nominal": [
      //         0,
      //         100000000
      //     ],
      //     "bunga": [
      //         0,
      //         9
      //     ],
      //     "tenor": [
      //         1,
      //         3,
      //         "bulan"
      //     ]
      // }
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
    },
  },
};
</script>
<style scoped>
.button-fix {
  position: fixed;
}
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
.button-institusi {
  font-family: Avenir;
  font-size: 12px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  margin-right: 5px;
  width: 90px;
  height: 35px;
  border-radius: 20px;
  line-height: 1.33;
  letter-spacing: -0.24px;
  text-align: left;
}
.button-tenor {
  width: 53px;
  height: 21px;
  border-radius: 20px;
  line-height: 1.33;
  letter-spacing: -0.24px;
  text-align: left;
  font-family: Avenir;
  font-size: 10px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  margin-right: 5px;
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