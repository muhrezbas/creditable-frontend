
<template>
  <v-app
    style=" background: #3A1C71; background: -webkit-linear-gradient(to right, #FFAF7B, #D76D77, #3A1C71); background: linear-gradient(to bottom right, #EF8475,#EC5091,#F082AC); "
  >
    <Welcome v-if="this.$store.state.stepperNow=='welcome'" />
    <Biodata v-if="this.$store.state.stepperNow=='biodata'" />
    <Alamat v-if="this.$store.state.stepperNow=='alamat'" />
    <Keuangan v-if="this.$store.state.stepperNow=='keuangan'" />
    <Thank v-if="this.$store.state.stepperNow=='thank'" />
    <Result v-if="this.$store.state.stepperNow=='result'" />
    <Akun v-if="this.$store.state.stepperNow=='akun'" />
    <Profil v-if="this.$store.state.stepperNow=='profil'" />
    <!-- <v-carousel v-model="model" :continuous=false style="height:100%" :cycle=false>
      <v-carousel-item
        v-bind:style="{ 'background-color': LightenDarkenColor(color,15) }"
        v-for="(color,i) in colors"
        :key="color"
      >
        <v-row class="fill-height" align="center" justify="center">
          <div class="display-3">Slide {{ i + 1 }}</div>
        </v-row>
      </v-carousel-item>
    </v-carousel>-->
  </v-app>
</template>

<script>
import Biodata from "../components/Biodata";
import Alamat from "../components/Alamat";
import Keuangan from "../components/Keuangan";
import Welcome from "../components/Welcoming";
import Thank from "../components/Thank";
import Result from "../components/Result";
import Akun from "../components/Akun";
import Profil from "../components/Profil";
export default {
  data() {
    return {
      colors: ["#EF8475", "#EC5091", "#F082AC", "#264D6A"],
      model: 0
    };
  },
  components: {
    Biodata,
    Alamat,
    Keuangan,
    Welcome,
    Thank,
    Result,
    Akun,
    Profil
  },
  methods: {
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
