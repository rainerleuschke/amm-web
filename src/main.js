// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'

import axios from "axios";
import VueAxios from "vue-axios";
import moment from "moment";
import Vuex from "vuex";

// todo
// cssVars()

Vue.use(BootstrapVue)
Vue.use(VueAxios, axios);
Vue.use(Vuex);

Vue.filter("formatDate", function (value) {
  if (value) {
    return moment(String(value), "X").format("MM/DD/YYYY hh:mm");
  }
});

Vue.filter("formatTimestamp", function (value) {
  if (value) {
    return moment.unix(value).format("MM/DD/YYYY hh:mm:ss");
  }
});

Vue.filter("formatTick", function (value) {
  if (value >= 18446744073709552000) {
    return "stopped";
  } else {
    return value;
  }
});

Vue.mixin({
  methods: {
    loadState(scenarioName, e) {
      let actionCmd = "[SYS]LOAD_STATE:" + scenarioName.slice(0, -4);
      this.$http
        .get(`command/` + actionCmd)
        .then(response => {
          this.$notify({
            message: "Loaded scenario: " + scenarioName,
            icon: "play_arrow",
            horizontalAlign: "center",
            verticalAlign: "top",
            type: "info"
          });
        })
        .catch(e => {
          this.$notify({
            message: "Unable to load state: " + scenarioName,
            icon: "play_arrow",
            horizontalAlign: "center",
            verticalAlign: "top",
            type: "danger"
          });
        });
    },
    loadScenario(scenarioName, e) {
      let actionCmd = "[SYS]LOAD_SCENARIO:" + scenarioName;
      this.$http
        .get(`command/` + actionCmd)
        .then(response => {
          this.$notify({
            message: "Loaded scenario: " + scenarioName,
            icon: "play_arrow",
            horizontalAlign: "center",
            verticalAlign: "top",
            type: "info"
          });
        })
        .catch(e => {
          this.$notify({
            message: "Unable to load scenario: " + scenarioName,
            icon: "play_arrow",
            horizontalAlign: "center",
            verticalAlign: "top",
            type: "danger"
          });
        });
    },
    handleClick(e, command) {
      if (command) {
        this.$http
          .get(`command/` + command)
          .then(response => {
            console.log("Got back " + response);
            this.$notify({
              message: "Action performed: " + command,
              icon: "play_arrow",
              horizontalAlign: "center",
              verticalAlign: "top",
              type: "success"
            });
          })
          .catch(e => {
            // this.errors.push(e);
          });
      }
    },
    publishPhysiologyModification(type, location, practitioner, payload) {
      var postData = {
        type: type,
        location: location,
        practitioner: practitioner,
        payload: payload
      };
      let axiosConfig = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*"
        }
      };
      this.$http
        .post(`topic/physiology_modification`, postData, axiosConfig)
        .then(response => {
          this.$notify({
            message: "Physiology modification (" + type + ") performed",
            icon: "check",
            horizontalAlign: "center",
            verticalAlign: "top",
            type: "success"
          });
        })
        .catch(e => {
          // this.errors.push(e);
        });
    },
    publishRenderModification(type, location, practitioner, payload) {
      var postData = {
        type: type,
        location: location,
        practitioner: practitioner,
        payload: payload
      };
      let axiosConfig = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*"
        }
      };
      this.$http
        .post(`topic/render_modification`, postData, axiosConfig)
        .then(response => {
          this.$notify({
            message: "Render modification (" + type + ") performed",
            icon: "check",
            horizontalAlign: "center",
            verticalAlign: "top",
            type: "success"
          });
        })
        .catch(e => {
          // this.errors.push(e);
        });
    },
    publishPerformanceAssessment(
      type,
      location,
      practitioner,
      info,
      step,
      comment
    ) {
      var postData = {
        assessment_type: type,
        location: location,
        practitioner: practitioner,
        assessment_info: info,
        step: step,
        comment: comment
      };
      let axiosConfig = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*"
        }
      };
      this.$http
        .post(`topic/performance_assessment`, postData, axiosConfig)
        .then(response => {
          this.$notify({
            message: "Performance assessment performed",
            icon: "check",
            horizontalAlign: "center",
            verticalAlign: "top",
            type: "success"
          });
        })
        .catch(e => {
          // this.errors.push(e);
        });
    },
    publishCommand(payload) {
      var postData = {
        payload: payload
      };
      let axiosConfig = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*"
        }
      };
      this.$http
        .post(`execute`, postData, axiosConfig)
        .then(response => {
          this.$notify({
            message: "Command performed",
            icon: "check",
            horizontalAlign: "center",
            verticalAlign: "top",
            type: "success"
          });
        })
        .catch(e => {
          // this.errors.push(e);
        });
    },
    publishTopic(topicName, xml) {
      var postData = {
        payload: xml
      };
      let axiosConfig = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*"
        }
      };
      this.$http
        .post(`topic/` + topicName, postData, axiosConfig)
        .then(response => {
          this.$notify({
            message: "Action performed",
            icon: "check",
            horizontalAlign: "center",
            verticalAlign: "top",
            type: "success"
          });
        })
        .catch(e => {
          // this.errors.push(e);
        });
    }
  }
});

var parser = document.createElement("a");
parser.href = window.location;
Vue.axios.defaults.baseURL = "http://" + parser.hostname + ":9080/";

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
