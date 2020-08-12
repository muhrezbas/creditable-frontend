import Vue from 'vue'
import Vuex from 'vuex'
import instance from "../myconfig";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    stepper: false,
    amount: 0,
    stepperNow: 'welcome',
    page: "register",
    loader: true,
    gaji: 0,
    biodata: true,
    newSearching: '',
    credits: [],
    credit: {},
    pinjaman_berjalan: [],
    kartuKredits: [],
    provinces: [],
    filter: false,
    kotas: [],
    pendidikans: [],
    pengalamans: [],
    simulasi: {},
    agamas: [],
    bidangs: [],
    pekerjaans: [],
    detil: {},
    pinjaman_all: [],
    mitras: [],
    incomplete: {
    },
    profil: {

    },
    updateProfil: {

    },
    changePassword: {

    },
    user: {
      email: ""
    },
    isLogin: false
  },
  getters: {
    pinjaman_berjalan: state => state.pinjaman_berjalan,
    provinces: state => state.provinces,
    pengalamans: state => state.pengalamans,
    pendidikans: state => state.pendidikans,
    agamas: state => state.agamas,
    pekerjaans: state => state.pekerjaans,
    bidangs: state => state.bidangs,
    credit: state => state.credit,
    pinjaman_all: state => state.pinjaman_all
  },
  mutations: {
    CHANGE_PASSWORD(state, payload) {
      state.changePassword = payload
    },
    UPDATE_PROFIL(state, payload) {
      state.updateProfil = payload
    },
    SET_LOADER(state) {
      state.loader = false
    },
    SEARCHING(state, payload) {
      state.newSearching = payload;
      console.log(state.newSearching, "tes")
    },
    SIMULASI(state, payload) {
      state.simulasi = payload
    },
    INCOMPLETE(state, payload) {
      console.log(payload)
      state.incomplete = payload
    },
    LOGOUT(state) {
      state.user.email = ""
      state.isLogin = false
    },
    NEXT(state, payload) {
      state.stepperNow = payload
    },
    LOGIN(state) {
      console.log('oi')
      state.isLogin = true
    },
    SET_CREDITS(state, payload) {
      state.credits = payload
    },
    SET_CREDIT(state, payload) {
      state.credit = payload
    },
    SET_KARTU_KREDITS(state, payload) {
      console.log(payload.entities)
      state.kartuKredits = payload.entities
    },
    SET_PROVINCES(state, payload) {
      state.provinces = payload
    },
    SET_KOTAS(state, payload) {
      state.kotas = payload
    },
    SET_PENGALAMANS(state, payload) {
      state.pengalamans = payload
    },
    SET_PENDIDIKANS(state, payload) {
      state.pendidikans = payload
    },
    SET_AGAMAS(state, payload) {
      state.agamas = payload
    },
    SET_PEKERJAANS(state, payload) {
      state.pekerjaans = payload
    },
    SET_BIDANGS(state, payload) {
      console.log("set", payload)
      state.bidangs = payload
    },
    SET_PINJAMAN_BERJALAN(state, payload) {
      state.pinjaman_berjalan = payload
    },
    SET_PINJAMAN_ALL_LIMIT(state, payload) {
      console.log(payload)
      state.loader = false
      state.pinjaman_all = payload
    },
    SET_PINJAMAN_ALL(state, payload) {
      state.pinjaman_all = payload
    },
    SET_KARTU_KREDIT_ONE(state, payload) {
      state.detil = payload
    },
    SET_PROFILE(state, payload) {
      state.profil = payload
    },
    SET_MITRAS(state, payload) {
      state.mitras = payload
    }
  },
  actions: {
    GET_PROFILE(context) {
      console.log('hello, lahh disini kok kepanggil mulu')
      instance
        .get(`/users/get-profile`, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          console.log(data, "GET_PROFILE");
          // context.questions = data;
          context.commit("SET_PROFILE", data)
          // console.log(context.questions);
        })
        .catch(function (error) {
          console.log('kepanggil tidak')
          localStorage.removeItem("token");
          localStorage.removeItem("email");
          context.commit("LOGOUT");
          console.log(error);
        })
    },
    GET_KARTU_KREDIT_ONE(context, payload) {
      instance
        .get(`/mitras/kartu-kredit/${payload}`, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          console.log(data, "KARTUKREDIT");
          // context.questions = data;
          let input = data.entityData
          input.jenis = 'kartuKredit'
          input.id = data.entityKey.id
          console.log(input, "input")
          context.commit("SET_KARTU_KREDIT_ONE", input)
          // console.log(context.questions);
        })
        .catch(function (error) {
          localStorage.removeItem("token");
          localStorage.removeItem("email");
          context.commit("LOGOUT");
          console.log(error);
        })
    },
    GET_PINJAMAN_ALL_LIMIT(context, payload) {
      console.log(payload[1], "payload")
      instance
        .get(`/pinjamans/limit/${payload[0]}/${payload[1]}`, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
     
          console.log(data, "LIMIT");
          console.log(context.state.pinjaman_all, "all")
          let payload = context.state.pinjaman_all.concat(data)
          console.log(payload)
          // context.questions = data;
          context.commit("SET_PINJAMAN_ALL_LIMIT", payload)
          // console.log(context.questions);
        })
        .catch(function (error) {
          localStorage.removeItem("token");
          localStorage.removeItem("email");
          context.commit("LOGOUT");
          console.log(error);
        })
    },
    GET_PINJAMAN_ALL(context) {
      instance
        .get(`/pinjamans`, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          console.log(data, "ALL");
          // context.questions = data;
          context.commit("SET_PINJAMAN_ALL", data)
          // console.log(context.questions);
        })
        .catch(function (error) {
          localStorage.removeItem("token");
          localStorage.removeItem("email");
          context.commit("LOGOUT");
          console.log(error);
        })
    },
    GET_PINJAMAN_BERJALAN(context, payload) {
      instance
        .get(`/pinjamans/berjalan/${payload[0]}/${payload[1]}`, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          console.log(data, "disini");
          // context.questions = data;
          let arr = []
          data.forEach(element => {
            if (element.kartuKredit !== null) {
              arr.push({
                name: element.kartuKredit.name,
                image: element.kartuKredit.image,
                bunga: element.kartuKredit.bunga,
                limitKartu: +element.kartuKredit.limitKartu,
                jenis: "kartuKredit",
                id: +element.kartuKredit.id
              })
            }
            if (element.kreditTanpaAgunan !== null) {
              // console.log(element.kreditTanpaAgunan, "tanpa")
              arr.push({
                name: element.kreditTanpaAgunan.name,
                tenor: element.kreditTanpaAgunan.tenor,
                image: element.kreditTanpaAgunan.image,
                bunga: element.kreditTanpaAgunan.bunga,
                limitKartu: +element.kreditTanpaAgunan.limitKartu,
                batasLimit: +element.kreditTanpaAgunan.batasLimit,
                id: +element.kreditTanpaAgunan.id,
                jenis: "kreditTanpaAgunan"
              })
              console.log(arr, "tanpa")
            }
          });
          context.commit("SET_PINJAMAN_BERJALAN", arr)
          console.log(arr, "test")
          // console.log(context.questions);
        })
        .catch(function (error) {
          localStorage.removeItem("token");
          localStorage.removeItem("email");
          context.commit("LOGOUT");
          console.log(error);
        });
    },
    GET_CREDIT(context) {
      instance
        .get("/credits/public", {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          console.log(data, "disini");
          // context.questions = data;
          context.commit("SET_CREDIT", data)
          // console.log(context.questions);
        })
        .catch(function (error) {
          localStorage.removeItem("token");
          localStorage.removeItem("email");
          context.commit("LOGOUT");
          console.log(error);
        });
    },
    GET_CREDITS(context) {
      instance
        .get("/credits/public-registered", {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          console.log(data, "disini");
          // context.questions = data;
          context.commit("SET_CREDITS", data)
          // console.log(context.questions);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    GET_PENGALAMANS(context) {
      instance
        .get("/locations/pengalamans", {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          console.log(data, "disini");
          // context.questions = data;
          context.commit("SET_PENGALAMANS", data)
          // console.log(context.questions);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    GET_PENDIDIKANS(context) {
      instance
        .get("/locations/pendidikans", {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          console.log(data, "disini");
          // context.questions = data;
          context.commit("SET_PENDIDIKANS", data)
          // console.log(context.questions);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    GET_AGAMAS(context) {
      instance
        .get("/locations/agamas", {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          console.log(data, "disini");
          // context.questions = data;
          context.commit("SET_AGAMAS", data)
          // console.log(context.questions);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    GET_PEKERJAANS(context) {
      instance
        .get("/locations/pekerjaans", {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          console.log(data, "disini");
          // context.questions = data;
          context.commit("SET_PEKERJAANS", data)
          // console.log(context.questions);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    GET_BIDANGS(context) {
      instance
        .get("/locations/bidangs", {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          console.log(data, "disini bidangs");
          // context.questions = data;
          context.commit("SET_BIDANGS", data)
          // console.log(context.questions);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    GET_PROVINCES(context) {
      instance
        .get("/locations/provinces", {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          console.log(data, "disini");
          // context.questions = data;
          context.commit("SET_PROVINCES", data)
          // console.log(context.questions);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    GET_KOTAS(context, payload) {
      instance
        .get(`/locations/kotas/${payload}`, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          console.log(data, "disini");
          // context.questions = data;
          context.commit("SET_KOTAS", data)
          // console.log(context.questions);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    GET_KARTU_KREDITS(context) {
      instance
        .get("/mitras/kartu-kredit", {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          console.log(data, "disini");
          // context.questions = data;
          context.commit("SET_KARTU_KREDITS", data)
          // console.log(context.questions);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    GET_MITRAS(context) {
      instance
        .get("/mitras", {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          console.log(data, "disini mitra");
          // context.questions = data;
          context.commit("SET_MITRAS", data.entities)
          // console.log(context.questions);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  },
  modules: {
  }
})
