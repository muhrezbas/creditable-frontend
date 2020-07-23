<template>
  <div>
    <v-bottom-navigation v-model="bottomNav" light app fixed grow shift color="#264d6a">
      <v-btn value="home" :to="{ path: '/'}">
        <span>Credit Score</span>
        <v-icon>mdi-cog</v-icon>
      </v-btn>

      <v-btn value="partner" :to="{ path: '/pinjaman'}">
        <span>Pinjaman</span>
        <v-icon>mdi-bank</v-icon>
      </v-btn>

      <v-btn value="history" :to="{ path: '/riwayat'}">
        <span>Riwayat</span>
        <v-icon>mdi-history</v-icon>
      </v-btn>

      <v-btn value="simulasi" :to="{ path: '/simulasi'}">
        <span>Simulasi</span>
        <v-icon>mdi-poll</v-icon>
      </v-btn>
       <!-- <v-btn value="profil" :to="{ path: '/profil'}">
        <span>Profil</span>
        <v-icon>mdi-account</v-icon>
      </v-btn> -->
      <!-- <v-btn>
        <span>Image</span>
        <v-icon>mdi-image</v-icon>
      </v-btn>-->
    </v-bottom-navigation>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bottomNav: "home"
    };
  }
};
</script>

<style>
</style>
