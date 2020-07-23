<template>
  <div class="home">
    <HelloWorld v-if="this.$store.state.isLogin" msg="Welcome to Your Vue.js App" />
    <RegisWorld v-if="!this.$store.state.isLogin" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import RegisWorld from "../components/FormRegis.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
    RegisWorld
  }
};
</script>
s
