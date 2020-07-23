<template>
  <div class="home">
    <Keuntungan v-if="this.$store.state.isLogin" />
  </div>
</template>

<script>
// @ is an alias to /src
import Keuntungan from "../components/Keuntungan.vue";

export default {
  name: "Home",
  components: {
    Keuntungan
  }
};
</script>
s
