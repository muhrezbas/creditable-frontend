<template>
  <v-container>
    <v-row class="text-center" align="center" justify="center">
      <v-col cols="12" style="margin-bottom:-12px" >
        <v-img class="my-3" contain height="200" src="@/assets/member.png"></v-img>
      </v-col>

      <v-col style="margin-top:-20px" >
        <v-row align="end" class="lightbox white--text pa-2 fill-height">
          <v-col>
            <div
              dark
              align="center"
              style="color:#EC5091"
              class="headline font-weight-medium"
              justify="center"
            >ONLY FOR MEMBER</div>
          </v-col>
        </v-row>
        <!-- </v-img> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
.img-circle {
  border-radius: 10%;
}
</style>