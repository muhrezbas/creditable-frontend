<template>
  <div>
    <v-card light class="cardColor" max-height="200">
      <div class="d-flex flex-no-wrap justify-space-between">
        <v-avatar size="125" tile style="margin-top :4px">
          <v-img :src="pinjaman.image" class="inline" height="87" width="115" contain></v-img>
        </v-avatar>
        <div>
          <!-- <v-card-title class="headline" v-text="item.title"></v-card-title> -->
          <v-card-text>
            <div class="logo-bank">{{pinjaman.name}}</div>
            <div
              style="margin-top :5px"
            >{{ pinjaman.tenor == null ? "N/A" : pinjaman.tenor + " Bulan"}}</div>
            <div style="margin-top :5px">{{ pinjaman.batasLimit == null ? "N/A" : limit}}</div>
            <p style="margin-top :5px">{{pinjaman.bunga}}%</p>
          </v-card-text>
        </div>
        <div class="d-flex flex-no-wrap justify-space-between">
          <v-card-actions  v-if="fungsi!='ubah'">
            <v-btn color="#ec5091" @click="ajukan(pinjaman)" class="ajui ajukan">Ajukan</v-btn>
          </v-card-actions>
          <v-card-actions v-if="fungsi=='ubah'">
            <v-btn color="#ec5091" @click="ubah(pinjaman)" class="ajui ajukan">Ubah</v-btn>
          </v-card-actions>
          <!-- <v-card-title class="headline" v-text="item.title"></v-card-title> -->
        </div>
      </div>
    </v-card>
    <v-divider></v-divider>
  </div>
</template>

<script>
import instance from "../myconfig";
export default {
  name: "CardBank",
  props: ["pinjaman", "fungsi"],
  methods: {
    rupiah(payload) {
      return payload.toLocaleString("id-ID");
    },
    ubah(payload){
      console.log(payload)
    },
    ajukan(payload) {
      console.log(payload);
      let input = {
        kartuID: +payload.id,
        jenis: payload.jenis
      };

      instance
        .post(`/pinjamans/kartu-kredit`, input, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          console.log(data);
          // localStorage.setItem("token", data.access_token);
          // // var decoded = jwt.decode(jwttoken)
          // localStorage.setItem("name", data.name);
          // // this.$store.commit("LOGIN");
          // // this.dialog = false;
        })
        .catch(err => {
          console.log(err.response.data);
          // localStorage.removeItem("token");
          // localStorage.removeItem("email");
          // this.$store.commit("LOGOUT");
        });
    }
  },
  computed: {
    limit() {
      return `Rp ${this.rupiah(
        +this.pinjaman.limitKartu
      )},- s/d Rp ${this.rupiah(+this.pinjaman.batasLimit)}`;
    }
  }
};
</script>

<style scoped>
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
  width: 268px;
  height: 34px;
  font-family: Avenir;
  font-size: 25px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: -0.5px;
  text-align: left;
  color: #264d6a;
}
.lihat-semua {
  font-family: Avenir;
  font-size: 10px;
  font-weight: 900;
  font-stretch: normal;
  margin-left: 26px;
  margin-bottom: 6px;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: -0.2px;
  text-align: left;
  color: #ec5091;
}
.logo-bank {
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

    