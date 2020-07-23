
<template>
  <v-stepper v-model="e6" vertical non-linear>
    <v-form @submit.prevent="confirm">
      <v-stepper-step :complete="e6 > 1" step="1" color="#EC5091" editable>
        Biodata diri
        <small>Sesuai KTP</small>
      </v-stepper-step>

      <v-stepper-content step="1">
        <!-- <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card> -->
        <v-text-field color="#EC5091" label="Nama" v-model="nama" placeholder="John Doe"></v-text-field>
        <v-text-field
          color="#EC5091"
          label="Email"
          type="email"
          v-model="email"
          placeholder="johndoe@mail.com"
        ></v-text-field>
        <v-radio-group v-model="kelamin" row label="Kelamin" style="margin-top:0">
          <v-radio label="Pria" color="#EC5091" value="male"></v-radio>
          <v-radio label="Perempuan" color="#EC5091" value="female"></v-radio>
        </v-radio-group>
        <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              color="#EC5091"
              v-model="date"
              label="Tahun Tanggal Lahir"
              prepend-icon="event"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker color="#EC5091" v-model="date" scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="#EC5091" dark @click="modal = false">Cancel</v-btn>
            <v-btn text color="#EC5091" dark @click="$refs.dialog.save(date)">OK</v-btn>
          </v-date-picker>
        </v-dialog>
        <v-checkbox v-model="marital" style="margin-top:0" color="#EC5091" label="Menikah"></v-checkbox>

        <v-btn color="#EC5091" dark @click="e6 = 2">Continue</v-btn>
        <v-btn @click="back" text>Back</v-btn>
      </v-stepper-content>

      <v-stepper-step color="#EC5091" :complete="e6 > 2" step="2" editable>
        Alamat
        <small>Sesuai KTP</small>
      </v-stepper-step>

      <v-stepper-content step="2">
        <v-text-field color="#EC5091" v-model="provinsi" label="Provinsi" placeholder="DKI Jakarta"></v-text-field>
        <v-text-field
          color="#EC5091"
          v-model="kota"
          label="Kota/Kabupaten"
          placeholder="Kota Jakarta Pusat"
        ></v-text-field>
        <v-textarea
          color="#EC5091"
          clearable
          clear-icon="cancel"
          v-model="alamat"
          label="Alamat Tinggal"
          value="Jln. Jenderal Sudirman"
        ></v-textarea>
        <v-btn color="#EC5091" dark @click="e6 = 3">Continue</v-btn>
        <v-btn text @click="back">Back</v-btn>
      </v-stepper-content>

      <v-stepper-step color="#EC5091" :complete="e6 > 3" step="3" editable>Finansial</v-stepper-step>

      <v-stepper-content step="3">
        <v-text-field color="#EC5091" v-model="bank" label="Bank" placeholder="BCA"></v-text-field>
        <v-text-field
          color="#EC5091"
          label="Pengeluaran per bulan"
          prefix="Rp"
          v-on:keypress="isNumber()"
          v-model="spend"
          @keyup="formatSpend"
          placeholder="10.000.000"
        ></v-text-field>
        <v-text-field
          color="#EC5091"
          label="Cicilan sekarang per bulan"
          prefix="Rp"
          v-model="cicilan"
          v-on:keypress="isNumber()"
          @keyup="formatCicilan"
          placeholder="10.000.000"
        ></v-text-field>
        <v-btn color="#EC5091" dark @click="e6 = 4">Continue</v-btn>
        <v-btn text @click="back">Back</v-btn>
      </v-stepper-content>

      <!-- <v-stepper-step step="4" editable>View setup instructions</v-stepper-step>
    <v-stepper-content step="4">
      <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
      <v-btn color="#EC5091" dark @click="e6 = 1">Continue</v-btn>
      <v-btn text @click="back">Back</v-btn>
      </v-stepper-content>-->
      <v-btn
        type="submit"
        v-if="e6==4"
        style="margin-top:5px"
        block
        color="#EC5091"
        dark
      >Cek Kredit Skoring</v-btn>
    </v-form>
    <v-snackbar v-model="snackbar" top :multi-line="multiLine">
      {{ text }}
      <v-btn color="red" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-stepper>
</template>

<script>
import instance from "../myconfig";
export default {
  data() {
    return {
      e6: 1,
      nama: "",
      email: "",
      kelamin: null,
      marital: false,
      provinsi: "",
      kota: "",
      alamat: "",
      bank: "",
      spend: "",
      cicilan: "",
      modal: false,
      date: new Date().toISOString().substr(0, 10),
      multiLine: true,
      snackbar: false,
      text: "I'm a multi-line snackbar."
    };
  },
  methods: {
    back() {
      this.e6 = this.e6 - 1;
      if (this.e6 == 0) {
        this.$store.state.stepper = false;
      }
    },
    isNumber: function() {
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
    formatCicilan() {
      if (parseInt(this.cicilan) !== 0) {
        var name = this.cicilan.replace(/[^a-zA-Z0-9 ]/g, "");
        if (name !== "" && !isNaN(name)) {
          this.cicilan = parseInt(name).toLocaleString("id-ID");
        }
      }
    },
    formatSpend() {
      if (parseInt(this.spend) !== 0) {
        var name = this.spend.replace(/[^a-zA-Z0-9 ]/g, "");
        if (name !== "" && !isNaN(name)) {
          this.spend = parseInt(name).toLocaleString("id-ID");
        }
      }
    },
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
    confirm() {
      console.log(this);
      console.log(this.getAge(this.date));
      let input = {
        amount: this.$store.state.amount,
        salary: this.$store.state.gaji,
        province: this.provinsi,
        age: this.getAge(this.date),
        city: this.kota,
        gender: this.kelamin,
        marital: this.marital == false ? "tidak" : "ya",
        bank: this.bank
      };
      instance.post(`/credits/public`, input).then(({ data }) => {
        console.log(data.newCredit.prediction);
        if (data.newCredit.prediction == 1) {
          this.text = "kredit skoring anda kurang baik";
        } else {
          this.text = "kredit skoring anda baik";
        }
        this.snackbar = true;
      });
      console.log(input);
    }
  }
};
</script>