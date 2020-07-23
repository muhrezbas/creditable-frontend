<template>
  <div>
    <v-container fluid>
      <v-layout align-center column>
        <v-flex align-center d-flex fluid>
          <span style="margin-right: 150px; margin-top:20px" class="Credit-Checker">Credit</span>
        </v-flex>
        <v-flex align-left d-flex fluid style="margin-top:-20px">
          <span style="margin-right: 94px" class="Credit-Checker">Checker</span>
        </v-flex>
        <v-flex class="mb-4">
          <span style="margin-right: 73px" class="Cepat-Akurat-Aman">Cepat. Akurat. Aman.</span>
        </v-flex>
        <v-flex class="mb-4">
          <v-img
            class="analisis"
            style="margin-top: 32px"
            :src="require('../assets/analisis.png')"
          />
        </v-flex>

        <v-flex class="mb-4" v-bind:style="{ 'margin-top': button + 'px'}">
          <v-btn
            @click="cek"
            width="200"
            class="Cek-Sekarang text-capitalize"
            height="50"
            rounded
            color="#264d6a"
            dark
          >Cek Sekarang</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container fluid style="background-color:white;">
      <v-layout align-center column>
        <v-flex align-center d-flex fluid>
          <span style="margin-top:20px" class="Untuk-apa-credit-score">Untuk apa credit score?</span>
        </v-flex>
        <v-flex align-center d-flex fluid style="margin-top:15px; ; margin-right:170px;">
          <v-layout
            align-center
            column
            class="rectangle"
            style="padding:6px;  background-color: #ef8475;"
          >
            <v-flex align-center d-flex fluid>
              <v-img class="logo-finansial" :src="require('../assets/financial.png')" />
            </v-flex>
            <v-flex align-center d-flex fluid>
              <span class="text-finansial">Akses Finansial</span>
            </v-flex>
            <v-flex align-center d-flex fluid>
              <span class="desc-finansial">Memudahkan akses ke berbagai macam institusi keuangan</span>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex align-center d-flex fluid style="margin-top:-50px; ; margin-right:-170px;">
          <v-layout
            align-center
            column
            class="rectangle"
            style="padding:6px; background-color: #ec5091;"
          >
            <v-flex align-center d-flex fluid>
              <v-img class="logo-finansial" :src="require('../assets/worldwide.svg')" />
            </v-flex>
            <v-flex align-center d-flex fluid>
              <span class="text-finansial" style="width: 121px;">Limit Lebih Tinggi</span>
            </v-flex>
            <v-flex align-center d-flex fluid>
              <span
                class="desc-finansial"
              >Memudahkan untuk mendapat limit pinjaman yang lebih tinggi</span>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex align-center d-flex fluid style="margin-top:-40px; ; margin-right:170px;">
          <v-layout
            align-center
            column
            class="rectangle"
            style="padding:6px;  background-color: #f082ac;"
          >
            <v-flex align-center d-flex fluid>
              <v-img class="logo-finansial" :src="require('../assets/tax.png')" />
            </v-flex>
            <v-flex align-center d-flex fluid>
              <span class="text-finansial">Bunga Rendah</span>
            </v-flex>
            <v-flex align-center d-flex fluid>
              <span
                class="desc-finansial"
              >Menjadikan bunga yang harus dibayarkan lebih rendah dari yang seharusnya</span>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex align-center d-flex fluid>
          <v-layout align-center column>
            <v-flex align-center d-flex fluid>
              <span
                style="margin-top:50px; margin-bottom:30px;"
                class="mengapa-creditable"
              >Mengapa Creditable?</span>
            </v-flex>
            <v-flex align-center d-flex fluid>
              <v-img class="mengapa-logo" :src="require('../assets/keamanan.png')" />
            </v-flex>
            <v-flex align-center d-flex fluid>
              <span
                style="margin-top:50px; margin-bottom:30px;"
                class="keamanan"
              >Mengutamakan Keamanan</span>
            </v-flex>
            <v-flex align-center d-flex fluid>
              <span
                style="margin-bottom:30px;"
                class="text-desc"
              >Kami menjamin seluruh data yang telah diberikan akan tersimpan dengan aman dan terenskripsi dengan baik.</span>
            </v-flex>
            <v-flex align-center d-flex fluid>
              <v-img class="logo-keamanan" :src="require('../assets/akurat.png')" />
            </v-flex>
            <v-flex align-center d-flex fluid>
              <span
                style="margin-top:50px; margin-bottom:30px;"
                class="akurat"
              >Penilaian yang Akurat*</span>
            </v-flex>
            <v-flex align-center d-flex fluid>
              <span
                style="margin-bottom:30px;"
                class="text-desc"
              >Kami selalu memberikan penilaian yang akurat berdasarkan pengalaman analisa yang kami miliki dan kesesuaian data yang kami terima.</span>
            </v-flex>
            <v-flex align-center d-flex fluid>
              <v-img class="logo-keamanan" :src="require('../assets/rekomendasi.png')" />
            </v-flex>
            <v-flex align-center d-flex fluid>
              <span
                style="margin-top:50px; margin-bottom:30px;"
                class="rekomendasi"
              >Memberikan Rekomendasi</span>
            </v-flex>
            <v-flex align-center d-flex fluid>
              <span
                style="margin-bottom:30px;"
                class="text-desc"
              >Kami memberikan rekomendasi kepada pengguna kami atas institusi keuangan apa saja yang dapat diakses.</span>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- <v-row v-resize="onResize" align="center" justify="center">
      <v-subheader>Window Size</v-subheader>
      {{ windowSize }}
    </v-row>-->
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  components: {},

  mounted() {
    this.onResize();
  },
  computed: {
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
        console.log(i);
        console.log(y);
        // y -= i
        // y = 500
        // i++
      }
      return i;
    }
  },
  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    },
    cek() {
      this.$store.commit("NEXT", "biodata");
    }
  },
  data: () => ({
    amount: 0,
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
.rekomendasi {
  width: 278px;
  height: 31px;
  font-family: Avenir;
  font-size: 23px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.35;
  letter-spacing: -0.46px;
  text-align: left;
  color: #264d6a;
}
.akurat {
  width: 239px;
  height: 31px;
  font-family: Avenir;
  font-size: 23px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.35;
  letter-spacing: -0.46px;
  text-align: left;
  color: #264d6a;
}
.text-desc {
  width: 279px;
  height: 70px;
  font-family: Avenir;
  font-size: 15px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: -0.3px;
  text-align: left;
  color: #4a4a4a;
}
.mengapa-logo {
  width: 208.1px;
  height: 173.1px;
  margin-right: 23px;
  object-fit: contain;
}
.logo-keamanan {
  width: 199px;
  height: 173.3px;
  object-fit: contain;
}
.keamanan {
  width: 279px;
  height: 31px;
  font-family: Avenir;
  font-size: 23px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.35;
  letter-spacing: -0.46px;
  text-align: left;
  color: #264d6a;
}
.mengapa-creditable {
  width: 263px;
  height: 37px;
  font-family: Avenir;
  font-size: 26.7px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.39;
  letter-spacing: -0.53px;
  text-align: left;
  color: #264d6a;
}
.rectangle {
  width: 156px;
  height: 154px;
  border-radius: 15px;
  box-shadow: 0 10px 14px 0 rgba(239, 132, 117, 0.3);
}
.logo-finansial {
  width: 70.4px;
  height: 70.4px;
}
.text-finansial {
  width: 103px;
  height: 20px;
  font-family: Avenir;
  font-size: 15px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: -0.3px;
  text-align: left;
  color: #ffffff;
}
.desc-finansial {
  width: 112px;
  height: 37px;
  font-family: Avenir;
  font-size: 9px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: -0.18px;
  text-align: center;
  color: #ffffff;
}
.Credit-Checker {
  font-size: 60px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.37;
  letter-spacing: -1.2px;
  text-align: left;
  color: #ffffff;
}
.Cepat-Akurat-Aman {
  font-size: 25px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: -0.5px;
  text-align: left;
  color: #ffffff;
}
.analisis {
  width: 289.4px;
  height: 206.3px;
  object-fit: contain;
}
.Cek-Sekarang {
  font-family: Avenir;
  font-size: 20px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.4px;
  text-align: left;
  color: #ffffff;
}
.Untuk-apa-credit-score {
  width: 289px;
  height: 37px;
  font-family: Avenir;
  font-size: 26.7px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.39;
  letter-spacing: -0.53px;
  text-align: left;
  color: #264d6a;
}
</style>
