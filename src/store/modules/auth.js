import {api_user} from '../../api/api_user'
export default {
  namespaced: true,
  state: {
    accessToken: null,
    confirm_pass: false,
    userInfo: {
      is_barista: false,
      is_staff: true,
      is_chef: false,
      is_purchesing: false,
      is_receptionist: false,
      id: null,
    },
    error: {
      status: false,
      text: "",
    },
  },
  mutations: {
    destroyToken(state) {
      localStorage.removeItem("username");
      localStorage.removeItem("password");
      api_user.post("logout/"+state.accessToken)
      state.accessToken = null;
    },
    newToken(state, { access }) {
      state.accessToken = access;
    },
    check_pass(state, bo) {
      state.check_pass = bo;
    },
    updateUserInfo(state, { userInfo }) {
      state.userInfo = userInfo;
    },
  },
  actions: {
    userLogout(context) {
      if (context.getters.loggedIn) {
        context.commit("destroyToken");
      }
    },
    confirm_pass_f(context, password) {
      api_user
        .post("conf-pas/", {
          password: password,
          id: context.state.userInfo.id,
        })
        .then(() => {
          context.commit("check_pass", true);
          api_product.get('sale-channel/ezzone').then((response)=>{
            $store.state.ezzone_id = response.data.id;
          })
          return "success";
        })
        .catch(() => {
          context.commit("check_pass", false);
          return "password incorrect";
        });
    },
  },
  getters: {
    userInfo(state) {
      return state.userInfo;
    },
    loggedIn(state) {
      return state.accessToken != null;
    },
    error_login(state) {
      return state.error_login;
    },
  },
};
