import Vue from 'vue';
import App from './App';
import utils from './utils';

import './assets/style.css';

// Vue.config.productionTip = false;
// Vue.config.devtools = false;

new Vue({
  el: '#panels-app',
  data() {
    return {
      socket: null
    };
  },
  created() {
    this.socket = io('http://localhost:3000');
  },
  render: h => h(App)
});
