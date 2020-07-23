<template>
  <div
    v-bind:style="{ 'background-color': LightenDarkenColor('#FFFFFF',15),
  'height' : 800 + 'vh' }"
  >
    <v-container fluid style="background-color: #FFFFFF; padding:0px; width:671px">
      <v-card
        flat
        style="  font-family: Avenir;
                font-size: 18px;
                font-weight: 300;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.39;
                letter-spacing: -0.36px;
                text-align: left;
                color: #264d6a;"
      >
        <v-col align="center" justify="center">
          <v-col class="mb-4" style="margin-top: 10px">
            <div class="nominal_pinjaman">Simulasi Pinjaman</div>
          </v-col>

          <v-row justify="space-between">
            <p style="margin-left:15px;">Nominal Pinjaman</p>
            <p style="margin-right:15px;">Rp {{$store.state.simulasi.loan}},-</p>
          </v-row>

          <v-row justify="space-between">
            <p style="margin-left:15px;">Bunga Pinjaman</p>
            <p style="margin-right:15px;">Rp {{(+cumulative).toLocaleString("id-ID")}},-</p>
          </v-row>
          <v-row justify="end">
            <div
              style=" width: 50%;
              margin-right: 12px;
                  margin-top: -10px;
                margin-bottom: 10px;
                          height: 1px;
                          border-top: 1px solid black;"
            ></div>
          </v-row>
          <v-row justify="space-between">
            <p style="margin-left:15px;">Total Pembayaran</p>
            <p
              style="margin-right:15px;  font-weight: 900;"
            >Rp {{(+$store.state.simulasi.loan.replace(/[^a-zA-Z0-9 ]/g, "") + +cumulative).toLocaleString("id-ID")}},-</p>
          </v-row>
          <v-row justify="space-between">
            <p style="margin-left:15px;">Jumlah Pembayaran</p>
            <p style="margin-right:15px;">{{$store.state.simulasi.tenor}}X</p>
          </v-row>
          <v-row justify="end">
            <div
              style=" width: 50%;
              margin-right: 12px;
                  margin-top: -10px;
                margin-bottom: 10px;
                          height: 1px;
                          border-top: 1px solid black;"
            ></div>
          </v-row>
          <v-row justify="space-between">
            <p style="margin-left:15px;">Pembayaran per Bulan</p>
            <p
              style="margin-right:15px;  font-weight: 900;"
            >Rp {{(+schedule).toLocaleString("id-ID")}},-</p>
          </v-row>
          <v-col class="mb-4" style="margin-top: 10px">
            <div class="nominal_pinjaman">Grafis Pinjaman</div>
          </v-col>
          <canvas id="simulasi-chart"></canvas>
          <canvas id="simulasi-chart2"></canvas>
          <v-col class="mb-4" style="margin-top: 10px">
            <div class="rincian_pembayaran">Rincian Pembayaran :</div>
          </v-col>
          <v-col>
            <v-data-table
              :headers="headers"
              :items="table"
              :indoMonth="indoMonth"
              :items-per-page="5"
              :rupiah="rupiah"
              class="elevation-1"
            >
              <template v-slot:item.number="{ item }" v-slot:slot-scope="{ indoMonth }">
                <div
                  style="font-weight:900"
                >{{item.number}} {{indoMonth(new Date(item.month).getMonth())}} {{new Date(item.month).getFullYear()}}</div>
              </template>
              <template v-slot:item.schedule="{ item }" v-slot:slot-scope="{ rupiah }">
                <div>{{rupiah(item.schedule)}}</div>
              </template>
              <template v-slot:item.principal="{ item }" v-slot:slot-scope="{ rupiah }">
                <div>{{rupiah(item.principal)}}</div>
              </template>
               <template v-slot:item.interest="{ item }" v-slot:slot-scope="{ rupiah }">
                <div>{{rupiah(item.interest)}}</div>
              </template>
                  <template v-slot:item.endingBalance="{ item }" v-slot:slot-scope="{ rupiah }">
                <div>{{rupiah(item.endingBalance)}}</div>
              </template>
            </v-data-table>
          </v-col>
        </v-col>
      </v-card>
    </v-container>
  </div>
</template>

<script>
var Chart = require("chart.js");
// const ctx = document.getElementById('simulasi-chart');

export default {
  data() {
    return {
      colors: ["#EF8475", "#EF8475", "#F082AC", "#264D6A"],
      model: 0,
      kelamin: ["Pria", "Wanita"],
      kawin: ["Kawin", "Belum Kawin"],
      keuangan: {
        pendapatan: "",
        pengeluaran: "",
        cicilan: "",
        pertama: new Date().toISOString().substr(0, 10)
      },
      headers: [
        {
          text: "Bulan/Tahun",
          align: "start",
          sortable: false,
          value: "number"
        },
        { text: "Pembayaran Perbulan", value: "schedule" },
        { text: "Bunga Dibayar", value: "interest" },
        { text: "Principal", value: "principal" },
        { text: "Mortgage Balance", value: "endingBalance" }
      ],

      complete: 0,
      show: true,
      modal: false
    };
  },
  computed: {
    chartData2() {
      return {
        type: "line",
        data: {
          labels: this.table.map(function(item) {
            return item["number"];
          }),
          datasets: [
            {
              // another line graph
              label: "Interest Paid",
              data: this.table.map(function(item) {
                return item["interest"];
              }),
              borderColor: ["#47b784"],
              backgroundColor: ["#47b784"],
              borderWidth: 2
            },
            {
              // one line graph
              label: "Principal Paid",
              data: this.table.map(function(item) {
                return item["principal"];
              }),
              borderColor: ["#264d6a"],
              backgroundColor: ["#264d6a"],
              borderWidth: 3
            }
          ]
        },
        options: {
          responsive: true,
          lineTension: 1,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  padding: 25
                }
              }
            ]
          }
        }
      };
    },

    chartData() {
      return {
        type: "line",
        data: {
          labels: this.table.map(function(item) {
            return item["number"];
          }),
          datasets: [
            {
              // one line graph
              label: "Principal",
              data: this.table.map(function(item) {
                return item["principal"];
              }),
              fill: false,
              borderColor: ["#264d6a"]
            },
            {
              // another line graph
              label: "Interest",
              data: this.table.map(function(item) {
                return item["interest"];
              }),
              fill: false,
              borderColor: ["#47b784"],
              borderWidth: 2
            },

            {
              // another line graph
              label: "Balance",
              data: this.table.map(function(item) {
                return item["endingBalance"];
              }),
              fill: false,
              borderColor: ["#F082AC"],
              borderWidth: 2
            }
          ]
        },
        options: {
          responsive: true,
          lineTension: 1,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  padding: 25
                }
              }
            ]
          }
        }
      };
    },
    table() {
      let bunga = this.$store.state.simulasi.bunga / 100 / 12;
      console.log(bunga, "tes")
      let schedule = +this.schedule;
      let loan = +this.$store.state.simulasi.loan.replace(/[^a-zA-Z0-9 ]/g, "");
      let temp = 0;
      let arr = [];
      //  let principal = 0
      let interest = 0;
      console.log(schedule);
      for (let i = 0; i < this.$store.state.simulasi.tenor; i++) {
        interest = loan * bunga;
        temp += interest;
        console.log(this.$store.state.simulasi.pertama, "pertama");
        let date = new Date(this.$store.state.simulasi.pertama);
        // console.log(date, "this date");
        // console.log(new Date(date.setMonth(date.getMonth() + 1)));
        arr.push({
          number: i + 1,
          schedule: schedule,
          principal: +(schedule - interest).toFixed(2),
          interest: +interest.toFixed(2),
          endingBalance:
            +(loan - schedule - interest).toFixed(2) < 0
              ? 0
              : +(loan - schedule - interest).toFixed(2),
          month: date,
          cumulative: +temp.toFixed(2)
        });
        // date = new Date(date.setMonth(date.getMonth() + 1));
        date.setMonth(date.getMonth() + i);
        // console.log(interest)
        loan -= schedule - interest;
        // console.log(loan)
      }
      return arr;
    },
    schedule() {
      let bunga = this.$store.state.simulasi.bunga / 100 / 12;
      console.log(bunga);
      let bagi = 1 + bunga;
      console.log(bagi);
      let isi = Math.pow(bagi, this.$store.state.simulasi.tenor * -1);
      let pow = 1 - isi;
      console.log(pow, "pow");
      let atas =
        this.$store.state.simulasi.loan.replace(/[^a-zA-Z0-9 ]/g, "") * bunga;
      console.log(atas, "atas");

      let schedule = atas / pow;

      return schedule.toFixed(2);
    },
    cumulative() {
      let tenorAkhir = this.$store.state.simulasi.tenor - 1;
      return this.table[tenorAkhir].cumulative;
    }
  },
  created() {
    let temp = this.$store.state.incomplete;
    this.keuangan.bank = temp.bank;
    this.keuangan.pendapatan = temp.pendapatan;
    this.keuangan.pengeluaran = temp.pengeluaran;
    this.keuangan.cicilan = temp.cicilan;
    console.log(this.table, "table");
  },
  mounted() {
    this.createChart("simulasi-chart", this.chartData);
    this.createChart("simulasi-chart2", this.chartData2);
  },
  watch: {
    keuangan: {
      handler: function(val, oldVal) {
        console.log("watch 1", "newval: ", val, "   oldVal:", oldVal);
        console.log(Object.values(val));
        let arr = Object.values(val);
        let size = arr.filter(function(value) {
          return value !== undefined;
        }).length;

        console.log(size / 4);
        this.progress(size / arr.length);
        // if (this.complete == 100) {
        //   this.out();
        // }
      },
      deep: true
    }
  },
  methods: {
    rupiah(payload) {
      // console.log(payload.toLocaleString("id-ID"))
      return payload.toLocaleString("id-ID");
    },
    indoMonth(payload) {
      let arr = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember"
      ];
      return arr[payload];
    },
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      });
      console.log(myChart);
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
    before() {
      let temp = this.$store.state.incomplete;
      temp.bank = this.keuangan.bank;
      temp.pendapatan = this.keuangan.pendapatan;
      temp.pengeluaran = this.keuangan.pengeluaran;
      temp.cicilan = this.keuangan.cicilan;
      this.$store.commit("NEXT", "alamat");
    },
    next() {
      let temp = this.$store.state.incomplete;
      temp.bank = this.keuangan.bank;
      temp.pendapatan = this.keuangan.pendapatan;
      temp.pengeluaran = this.keuangan.pengeluaran;
      temp.cicilan = this.keuangan.cicilan;
      console.log(temp, "tes");
      this.$store.commit("INCOMPLETE", temp);

      this.$store.commit("NEXT", "thank");
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
    formatPendapatan() {
      // console.log(this.gaji);

      if (parseInt(this.keuangan.pendapatan) !== 0) {
        // console.log(this.gaji);
        var bank = this.keuangan.pendapatan.replace(/[^a-zA-Z0-9 ]/g, "");

        if (bank !== "" && !isNaN(bank)) {
          this.keuangan.pendapatan = parseInt(bank).toLocaleString("id-ID");
        }
      }
    },
    formatPengeluaran() {
      // console.log(this.gaji);

      if (parseInt(this.keuangan.pengeluaran) !== 0) {
        // console.log(this.gaji);
        var bank = this.keuangan.pengeluaran.replace(/[^a-zA-Z0-9 ]/g, "");

        if (bank !== "" && !isNaN(bank)) {
          this.keuangan.pengeluaran = parseInt(bank).toLocaleString("id-ID");
        }
      }
    },
    formatCicilan() {
      // console.log(this.gaji);

      if (parseInt(this.keuangan.cicilan) !== 0) {
        // console.log(this.gaji);
        var bank = this.keuangan.cicilan.replace(/[^a-zA-Z0-9 ]/g, "");

        if (bank !== "" && !isNaN(bank)) {
          this.keuangan.cicilan = parseInt(bank).toLocaleString("id-ID");
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
  display: col;
  left: 0;
  justify-content: center;
  width: 100%;
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0),
    0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);
}
.rincian_pembayaran {
  width: 283px;
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

.form-keuangan {
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
.nominal_pinjaman {
  width: 245px;
  height: 41px;
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

