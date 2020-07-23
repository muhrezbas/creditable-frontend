<template>
  <div>
    <Register v-if="!$store.state.isLogin" />
    <Partner v-if="$store.state.isLogin" />
  </div>
</template>

<script>
import Register from "../components/registerFor";
import Partner from "../components/Partner";
export default {
  components: {
    Register,
    Partner
  }
};
</script>

<style>
</style>