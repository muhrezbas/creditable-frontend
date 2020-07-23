<template>
  <v-touch
    @swipeleft="next"
    @swiperight="before"
    :swipe-options="{
             direction: 'horizontal'
         }"
  >
    <div
      v-bind:style="{ 'background-color': LightenDarkenColor('#EF8475',15),
  'height' : 100 + 'vh' }"
    >
      <v-container fluid v-bind:style="{ 'background-color': LightenDarkenColor('#EF8475',15)}">
        <v-layout align-center column>
          <v-progress-linear v-model="complete" color="white darken-2"></v-progress-linear>
          <v-flex align-center d-flex fluid>
            <span style="margin-top:10px" class="biodata">Isi Biodata</span>
          </v-flex>
          <v-flex class="mb-4">
            <v-img
              class="biodata-logo"
              style="margin-top: 32px"
              :src="require('../assets/biodata.png')"
            />
          </v-flex>
          <v-flex
            :class="scrollable ? 'overflow-y-auto' : ''"
            v-bind:style="{ 
            'max-height' : scrollHeight + 'px' }"
            id="scroll-target"
          >
            <v-text-field
              solo
              class="form-biodata"
              v-model="biodata.name"
              @focus="show = false"
              @blur="show = true"
              rounded
              placeholder="Nama (Sesuai KTP)"
            ></v-text-field>
            <div style="margin-left:23px;" v-if="!validName">
              <p style="color:white; font-weight:bolder">Nama wajib diisi</p>
            </div>
            <!-- <v-text-field solo class="form-biodata" rounded placeholder="Tanggal Lahir"></v-text-field> -->
            <div>
              <v-dialog
                ref="dialog"
                v-model="modal"
                :return-value.sync="biodata.date"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="biodata.date"
                    solo
                    class="form-biodata"
                    rounded
                    @focus="show = false"
                    @blur="show = true"
                    placeholder="Tahun Tanggal Lahir"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker color="#EF8475" v-model="biodata.date" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="#EF8475" dark @click="modal = false">Cancel</v-btn>
                  <v-btn text color="#EF8475" dark @click="$refs.dialog.save(biodata.date)">OK</v-btn>
                </v-date-picker>
              </v-dialog>
            </div>
            <div style="margin-left:23px;" v-if="!validDate">
              <p style="color:white; font-weight:bolder">Tahun Tanggal Lahir wajib diisi</p>
            </div>
            <v-select
              solo
              class="form-biodata"
              :items="kelamin"
              v-model="biodata.gender"
              rounded
              placeholder="Jenis Kelamin"
            ></v-select>
            <div style="margin-left:23px;" v-if="!validGender">
              <p style="color:white; font-weight:bolder">Jenis Kelamin wajib diisi</p>
            </div>
            <v-select
              solo
              class="form-biodata"
              v-model="biodata.nikah"
              :items="kawin"
              rounded
              placeholder="Status Pernikahan"
            ></v-select>
            <div style="margin-left:23px;" v-if="!validNikah">
              <p style="color:white; font-weight:bolder">Status Pernikahan wajib diisi</p>
            </div>
            <v-text-field
              solo
              class="form-biodata"
              type="email"
              @focus="show = false"
              @blur="show = true"
              v-model="biodata.email"
              rounded
              placeholder="E-mail"
            ></v-text-field>
            <div style="margin-left:23px;" v-if="!validEmail">
              <p style="color:white; font-weight:bolder">Email wajib diisi</p>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
      <!-- <v-row align="center" justify="center">
        <v-container style="position:absolute; bottom:0px;">
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
    <v-bottom-navigation
      v-if="show"
      grow
      fixed
      dark
      :background-color="LightenDarkenColor('#EF8475',15)"
    >
      <v-btn text dark @click="before()">
        <h2 class="text-capitalize kembali">Kembali</h2>
      </v-btn>
      <v-btn dark text @click="next()">
        <h2 class="text-capitalize kembali">Berikutnya</h2>
      </v-btn>
    </v-bottom-navigation>
  </v-touch>
</template>

<script>
export default {
  data() {
    return {
      colors: ["#EF8475", "#EF8475", "#F082AC", "#264D6A"],
      model: 0,
      offsetTop: 0,
      kelamin: ["Pria", "Wanita"],
      kawin: ["Kawin", "Belum Kawin"],
      validName: true,
      validEmail: true,
      validNikah: true,
      validDate: true,
      validGender: true,
      manual: false,
      biodata: {
        name: "",
        email: "",
        date: new Date().toISOString().substr(0, 10),
        nikah: "",
        gender: ""
      },
      complete: 0,
      show: true,
      modal: false
    };
  },
  computed: {
    scrollHeight() {
      if (window.innerHeight < 600) {
        return window.innerHeight / 4.8;
      } else if (window.innerHeight < 700) {
        return window.innerHeight / 3.3;
      } else if (window.innerHeight < 850) {
        return window.innerHeight / 2.7;
      } else {
        return window.innerHeight / 2;
      }
    },
    scrollable() {
      if (this.manual) {
        return true;
      } else {
        if (window.innerHeight < 800) {
          return true;
        } else {
          return false;
        }
      }
    }
  },
  created() {
    let temp = this.$store.state.incomplete;
    this.biodata.name = temp.name;
    this.biodata.email = temp.email;
    this.biodata.date = temp.date;
    this.biodata.nikah = temp.nikah;
    this.biodata.gender = temp.gender;
  },
  watch: {
    biodata: {
      handler: function(val, oldVal) {
        console.log("watch 1", "newval: ", val, "   oldVal:", oldVal);
        console.log(Object.values(val));
        let arr = Object.values(val);
        let size = arr.filter(function(value) {
          return value !== undefined && value.replace(/\s/g, "") !== "";
        }).length;

        console.log(size / 5);
        this.progress(size / arr.length);
        // if (this.complete == 100) {
        //   this.out();
        // }
      },
      deep: true
    }
  },
  methods: {
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
      console.log(this.biodata);
      let temp = this.$store.state.incomplete;
      // if (temp.name == undefined || temp.name == "") {
      //   this.validName = false;
      // }
      // else {
      //   this.validName = true;
      // }
      if (this.methodRequired(this.biodata.name)) {
        console.log("hello");
        this.validName = true;
      } else {
        this.validName = false;
      }
      if (this.methodRequired(this.biodata.date)) {
        this.validDate = true;
      } else {
        this.validDate = false;
      }
      if (this.methodRequired(this.biodata.gender)) {
        this.validGender = true;
      } else {
        this.validGender = false;
      }
      if (this.methodRequired(this.biodata.nikah)) {
        this.validNikah = true;
      } else {
        this.validNikah = false;
      }
      if (this.methodRequired(this.biodata.email)) {
        this.validEmail = true;
      } else {
        this.validEmail = false;
      }

      // console.log(tes, "tes next");
      temp.name = this.biodata.name;
      temp.email = this.biodata.email;
      temp.date = this.biodata.date;
      temp.nikah = this.biodata.nikah;
      temp.gender = this.biodata.gender;
      if (
        this.validName &&
        this.validEmail &&
        this.validDate &&
        this.validNikah &&
        this.validGender
      ) {
        this.$store.commit("NEXT", "alamat");
      } else {
        console.log('halo sayangz')
        this.manual = true;
      }

      this.$store.commit("INCOMPLETE", temp);
    },
    onScroll(e) {
      this.offsetTop = e.target.scrollTop;
    },
    methodRequired(payload) {
      console.log(payload, "tes");
      if (payload == undefined || payload.replace(/\s/g, "") == "") {
        return false;
      } else {
        return true;
      }
    },
    before() {
      let temp = this.$store.state.incomplete;
      temp.name = this.biodata.name;
      temp.email = this.biodata.email;
      temp.date = this.biodata.date;
      temp.nikah = this.biodata.nikah;
      temp.gender = this.biodata.gender;
      this.$store.commit("INCOMPLETE", temp);
      this.$store.commit("NEXT", "welcome");
    },
    doSomething(direction) {
      console.log(direction); // May be left / right / top / bottom
      console.log("hello");
      this.next();
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
    }
  }
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
.form-biodata {
  width: 302px;
  height: 59px;
  margin-bottom: 3px;
}
.fixed_button {
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 70px;
  border: 0px solid #d6d6d6;
}
.biodata {
  width: 285px;
  height: 82px;
  font-family: Avenir;
  font-size: 60px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.37;
  letter-spacing: -1.2px;
  text-align: left;
  color: #ffffff;
}
.biodata-logo {
  width: 180.5px;
  height: 203.2px;
  object-fit: contain;
}
</style>