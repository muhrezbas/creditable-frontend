<template>
  <div>
    <Register v-if="!$store.state.isLogin" />
    <History v-if="$store.state.isLogin" />
  </div>
</template>

<script>
import Register from "../components/registerFor";
import History from "../components/History";
export default {
  components: {
    Register,
    History
  }
};
</script>

<style>
</style>