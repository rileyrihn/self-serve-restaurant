import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import lodash from "lodash";
import VueLodash from "vue-lodash";

Vue.config.productionTip = false;
Vue.use(VueLodash, { lodash: lodash });

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
