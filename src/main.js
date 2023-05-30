import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";

// router setup
import routes from "./routes/routes";

// Plugins
import AxiosPlugin from "./plugins/axios";
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import Notifications from "./components/NotificationPlugin";
import LoadingPlugin from "./plugins/loading.js";
import moment from 'moment';
import 'moment/locale/pt-br';

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import BootstrapVue from "bootstrap-vue";

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";

import Chartist from "chartist";
import { createPinia, PiniaVuePlugin } from "pinia";
import vuetify from "./plugins/vuetify";

Vue.use(PiniaVuePlugin);
const pinia = createPinia();

// configure router
const router = new VueRouter({
  mode: "history",
  routes,
  linkExactActiveClass: "nav-item active",
});

Vue.prototype.$moment = moment;
Vue.prototype.$Chartist = Chartist;

Vue.use(LoadingPlugin);
Vue.use(BootstrapVue);
Vue.use(AxiosPlugin);
Vue.use(VueRouter);
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: (h) => h(App),
  router,
  pinia,
  vuetify,

  data: {
    Chartist: Chartist,
  },
});
