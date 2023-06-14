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
import { createPinia, PiniaVuePlugin } from "pinia";
import Chartist from "chartist";

// Bootstrap plugin
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import BootstrapVue from "bootstrap-vue";

import { removeMoeda, formataMoeda } from './functions/numero';

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";

// Vuetify plugin
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
Vue.filter('formataMoeda', formataMoeda)
Vue.filter('removeMoeda', removeMoeda)
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
