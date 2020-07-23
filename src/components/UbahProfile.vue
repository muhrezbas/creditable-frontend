<template>
  <div
    v-bind:style="{ 'background-color': LightenDarkenColor('#FFFFFF',15),
  'height' : 210 + 'vh' }"
  >
    <v-container fluid v-bind:style="{ 'background-color': LightenDarkenColor('#FFFFFF',15)}">
      <v-card flat>
        <v-layout align-center column>
          <v-avatar size="100" tile style="margin-top :4px">
            <v-img :src="require('../assets/woman.png')" class="inline" contain></v-img>
          </v-avatar>
          <v-flex class="mb-4" style="margin-top: 18px">
            <!-- <v-text-field  class="form-profile"  placeholder="Tanggal Lahir"></v-text-field> -->
            <div class="nominal_pinjaman">Nama Lengkap</div>
            <v-text-field class="form-profile" v-model="profile.name" color="#EC5091"></v-text-field>
            <div class="nominal_pinjaman">Nomor HP</div>
            <v-text-field class="form-profile" v-model="profile.phone" color="#EC5091"></v-text-field>
            <div class="nominal_pinjaman">E-mail</div>
            <v-text-field class="form-profile" v-model="profile.email" color="#EC5091"></v-text-field>
            <div class="nominal_pinjaman">Tanggal Lahir</div>
            <div>
              <v-dialog
                ref="dialog"
                v-model="modal"
                :return-value.sync="profile.date"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    class="form-profile"
                    v-model="profile.date"
                    color="#EC5091"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker color="#EF8475" v-model="profile.date" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="#EF8475" dark @click="modal = false">Cancel</v-btn>
                  <v-btn text color="#EF8475" dark @click="$refs.dialog.save(profile.date)">OK</v-btn>
                </v-date-picker>
              </v-dialog>
            </div>
            <div class="nominal_pinjaman">Jenis Kelamin</div>
            <v-select
              class="form-profile"
              v-model="profile.gender"
              :items="kelamin"
              item-value="kode"
              item-text="name"
              color="#EC5091"
            ></v-select>
            <div class="nominal_pinjaman">Provinsi</div>
            <v-select
              class="form-profile"
              :items="provinces"
              v-model="profile.provinsi"
              item-value="kode"
              item-text="provinsi"
              color="#EC5091"
            ></v-select>
            <div class="nominal_pinjaman">Kota/Kabupaten</div>
            <v-select
              class="form-profile"
              :items="$store.state.kotas"
              v-model="profile.kota"
              item-text="kota"
              item-value="kode"
              color="#EC5091"
            ></v-select>
            <div class="nominal_pinjaman">Alamat</div>
            <v-text-field class="form-profile" v-model="profile.alamat" color="#EC5091"></v-text-field>
            <div class="nominal_pinjaman">Bank yang diGunakan</div>
            <v-text-field class="form-profile" v-model="profile.bank" color="#EC5091"></v-text-field>
            <div class="nominal_pinjaman">Pendapatan per Bulan</div>
            <v-text-field
              class="form-profile"
              prefix="Rp "
              v-model="profile.pendapatan"
              color="#EC5091"
            ></v-text-field>
            <div class="nominal_pinjaman">Pengeluaran per Bulan</div>
            <v-text-field
              class="form-profile"
              prefix="Rp "
              v-model="profile.pengeluaran"
              color="#EC5091"
            ></v-text-field>
            <div class="nominal_pinjaman">Pekerjaan</div>
            <v-select
              class="form-profile"
              v-model="profile.pekerjaan"
              color="#EC5091"
              :items="pekerjaans"
              item-text="pekerjaan"
              item-value="kode"
            ></v-select>
            <div class="nominal_pinjaman">Bidang Pekerjaan</div>
            <v-select
              class="form-profile"
              v-model="profile.bidang"
              color="#EC5091"
              :items="bidangs"
              item-text="bidang"
              item-value="kode"
            ></v-select>
            <div class="nominal_pinjaman">Pengalaman Berkerja</div>
            <v-select
              class="form-profile"
              v-model="profile.pengalaman"
              color="#EC5091"
              :items="pengalamans"
              item-text="pengalaman"
              item-value="kode"
            ></v-select>
            <div class="nominal_pinjaman">Pendidikan Terakhir</div>
            <v-select
              class="form-profile"
              v-model="profile.pendidikan"
              color="#EC5091"
              :items="pendidikans "
              item-text="pendidikan"
              item-value="kode"
            ></v-select>
            <div class="nominal_pinjaman">Agama</div>
            <v-select
              class="form-profile"
              v-model="profile.agama"
              color="#EC5091"
              :items="agamas"
              item-text="agama"
              item-value="kode"
            ></v-select>
          </v-flex>
        </v-layout>
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
import { mapState } from "vuex";
export default {
  data() {
    return {
      colors: ["#EF8475", "#EF8475", "#F082AC", "#264D6A"],
      model: 0,
      kelamin: [
        { name: "Pria", kode: 0 },
        { name: "Wanita", kode: 1 },
      ],
      kawin: ["Kawin", "Belum Kawin"],
      profile: {
        pendapatan: 0,
        pengeluaran: 0,
        bidang: "",
        pekerjaan: "",
        pendidikan: "",
        pengalaman: "",
        agama: "",
        gender: "",
        provinsi: "",
        kota: "",
        name: "",
        alamat: "",
        phone: "",
        marital: "",
        email: "",
        date: new Date().toISOString().substr(0, 10),
      },
      complete: 0,
      show: true,
      modal: false,
    };
  },
  created() {
    this.$store.dispatch("GET_PROVINCES");
    this.$store.dispatch("GET_PENDIDIKANS");
    this.$store.dispatch("GET_PENGALAMANS");
    this.$store.dispatch("GET_AGAMAS");
    this.$store.dispatch("GET_BIDANGS");
    this.$store.dispatch("GET_PEKERJAANS");
    this.$store.dispatch("GET_PROFILE");
  },
  computed: {
    ...mapState([
      "provinces",
      "pengalamans",
      "pendidikans",
      "agamas",
      "bidangs",
      "pekerjaans",
    ]),
  },
  watch: {
    profile: {
      handler: function (val, oldVal) {
        console.log(val, oldVal, "ipdate");
        // this.$store.state.updateProfil = val;
        val.age = this.getAge(val.date);
        this.$store.commit("UPDATE_PROFIL", val);
      },
      deep: true,
    },
    "profile.provinsi"(val, oldVal) {
      console.log(val, oldVal, "hello");
      this.$store.dispatch("GET_KOTAS", +val);
    },
    "$store.state.profil"(val, oldVal) {
      console.log(val, oldVal, "profil");
      this.profile.name = val.user.name;
      this.profile.phone = val.user.phone;
      this.profile.email = val.user.email;
      this.profile.gender = val.gender;
      this.profile.provinsi = val.province;
      this.profile.kota = val.city;
      // console.log(val.province, "tes")
      this.profile.alamat = val.alamat;
      this.profile.bank = val.bank;
      this.profile.pendapatan = val.salary;
      this.profile.pengeluaran = val.amount;
      this.profile.pekerjaan = val.user.pekerjaan;
      this.profile.bidang = val.user.bidang;
      this.profile.pengalaman = val.user.pengalaman;
      this.profile.pendidikan = val.user.pendidikan;
      this.profile.agama = val.user.agama;
      this.profile.date = new Date(val.lahir).toISOString().substr(0, 10);
      this.profile.password = val.user.password;
      this.profile.marital = val.marital;
      this.profile.idCredit = +val.id;
    },
  },
  methods: {
    getAge(dateString) {
      var today = new Date();
      var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },
    progress(payload) {
      this.complete = payload * 100;
    },
    ngetik() {
      // console.log(this.gaji);

      this.show = false;
    },
    out() {
      this.show = true;
    },
    next() {
      let temp = this.$store.state.simulasi;
      temp.bank = this.profile.bank;
      temp.loan = this.profile.loan;
      temp.tenor = this.profile.tenor;
      temp.bunga = this.profile.bunga;
      temp.pertama = this.profile.pertama;
      console.log(temp, "tes");
      this.$store.commit("SIMULASI", temp);
      this.$router.push({ path: "/result-simulasi" });
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

      if (parseInt(this.profile.loan) !== 0) {
        // console.log(this.gaji);
        var bank = this.profile.loan.replace(/[^a-zA-Z0-9 ]/g, "");

        if (bank !== "" && !isNaN(bank)) {
          this.profile.loan = parseInt(bank).toLocaleString("id-ID");
        }
      }
    },
    formattenor() {
      // console.log(this.gaji);

      if (parseInt(this.profile.tenor) !== 0) {
        // console.log(this.gaji);
        var bank = this.profile.tenor.replace(/[^a-zA-Z0-9 ]/g, "");

        if (bank !== "" && !isNaN(bank)) {
          this.profile.tenor = parseInt(bank).toLocaleString("id-ID");
        }
      }
    },
    formatbunga() {
      // console.log(this.gaji);

      if (parseInt(this.profile.bunga) !== 0) {
        // console.log(this.gaji);
        var bank = this.profile.bunga.replace(/[^a-zA-Z0-9 ]/g, "");

        if (bank !== "" && !isNaN(bank)) {
          this.profile.bunga = parseInt(bank).toLocaleString("id-ID");
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
.kembali {
  font-family: Avenir;
  font-size: 30px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.37;
  letter-spacing: -0.6px;
  text-align: left;
  color: #ffffff;
}
.custom-placeholer-color input::placeholder {
  color: red !important;
  opacity: 1;
}
.v-item-group.v-bottom-navigation {
  bottom: 0;
  display: flex;
  left: 0;
  justify-content: center;
  width: 100%;
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0),
    0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);
}

.form-profile {
  width: 302px;
  height: 59px;
  margin-bottom: 3px;
}
.button-fix {
  font-family: Avenir;
  font-size: 13px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.38;
  letter-spacing: -0.26px;
  text-align: left;
  color: #ffffff;
}
.fixed_button {
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 70px;
  border: 0px solid #d6d6d6;
}
.nominal_pinjaman {
  font-family: Avenir;
  margin-bottom: 5px;
  font-size: 30px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.37;
  letter-spacing: -0.6px;
  text-align: left;
  color: #264d6a;
}
.pertama {
  width: 293px;
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
</style>

