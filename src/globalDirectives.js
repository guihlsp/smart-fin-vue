import { removeMoeda, formataMoeda } from './functions/numero';
import {
  directive as vClickOutside
} from "vue-clickaway";



/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalDirectives = {
  install(Vue) {
    Vue.directive("click-outside", vClickOutside);

    Vue.directive('mascara-moeda', {
      inserted: function (el, binding) {
        if (binding.value === false) {
          return false
        }
        const casas = binding.value || 2
        el.style.textAlign = 'left';
        el.addEventListener('keypress', function (e) {
          let tecla
          if (window.event) {
            tecla = e.keyCode;
          } else if (e.which) {
            tecla = e.which;
          } else {
            tecla = 0;
          }
          if ((tecla >= 48 && tecla <= 57) || (tecla == 8) || (tecla == 44) || (tecla == 46) || (tecla == 45) || e.ctrlKey) {
            return true;
          } else {
            e.preventDefault()
          }
        }, true)
        el.addEventListener('focus', function () {
          el.select()
          el.setAttribute('placeholder', 'R$ '+formataMoeda(0, casas))
        }, true)
        el.addEventListener('blur', function (e) {
          el.setAttribute('placeholder', '')
          if (e.target.value == '') {
            return false
          }
          if (e.target.value.replace(/-/g, '') == '' || (e.target.value.split("-").length - 1) > 1) {
            e.target.value = formataMoeda(0, casas)
            return false
          }
          const valor = removeMoeda(e.target.value)
          e.target.value = formataMoeda(valor, casas)
        }, true)
      }
    })
  },
};

export default GlobalDirectives;