<template>
  <div class="animated fadeIn">

    <b-row>
      <b-col>
        <b-card>
          <b-card-header class="bg-success">
            <h3>Simulation Status</h3>
            <b-row>
              <b-col>
                <small>Status: {{status}}</small>
              </b-col>
              <b-col>
                <small v-if="scenario">
                  Scenario: {{scenario}}
                </small>
              </b-col>
              <b-col>
                <small v-if="state">
                  Patient State: {{state}}
                </small>
              </b-col>
            </b-row>
          </b-card-header>
          <b-card-content>
            <div class="text-center">
              <b-row>
                <b-col>
                  <h5>{{simTime}}
                    <br>
                    <small>Sim Time</small>
                  </h5>
                </b-col>
                <b-col>
                  <h5>
                    <router-link to="modules">{{modulesConnected}}</router-link>
                    <br>
                    <small>Total Modules Connected</small>
                  </h5>
                </b-col>
              </b-row>
            </div>
          </b-card-content>
          <b-card-footer>
            <b-row>
              <b-col v-for="action in actionCards" :key='action.title'>
                <button :class="action.type" v-on:click="handleActionClick(action.title)">
                  <i :class="action.icon"></i>
                  {{action.title}}
                </button>
              </b-col>
            </b-row>
          </b-card-footer>
        </b-card>
      </b-col>

      <b-col>
        <b-row>
          <b-col>
            <b-card class="bg-danger">


              <p class="category">Heart Rate</p>
              <h4 class="title">
                {{HR}}
              </h4>

            </b-card>
          </b-col>
          <b-col>
            <b-card class="bg-primary">

              <p class="category">Breath Rate</p>
              <h4 class="title">
                {{BR}}
                <small>bpm</small>
              </h4>


            </b-card>
          </b-col>
          <b-col>
            <b-card class="bg-info">
              <p class="category">SPO2</p>
              <h4 class="title">
                {{SPO2}}
              </h4>

            </b-card>
          </b-col>

          <b-col>
            <b-card class="bg-danger">
              <p class="category">Blood Pressure</p>
              <h4 class="title">
                {{SYS}}
                /
                {{DIA}}
              </h4>
            </b-card>
          </b-col>

        </b-row>
      </b-col>
    </b-row>

  </div>
</template>

<script>

  import { Callout } from '@coreui/vue'

  import { mapState } from "vuex";
  import moment from "moment";

  export default {
    name: 'dashboard',
    computed: mapState([ "nodes" ]),
    components: {
      Callout
    },
    data: function () {
      return {
        status: "Not running",
        node: {},
        currentScenario: "",
        scenario: "",
        state: "",
        PAS: "-",
        HR: "-",
        BR: "-",
        SYS: "-",
        DIA: "-",
        SPO2: "-",
        simTime: "-",
        simTimeObj: "",
        modulesConnected: "-",
        lastTick: 0,
        ticks: 0,
        actionCards: [
          {
            type: "btn btn-success",
            icon: "fa fa-play",
            title: "Start"
          },
          {
            type: "btn btn-warning",
            icon: "fa fa-pause",
            title: "Pause"
          },
          {
            type: "btn btn-danger",
            icon: "fa fa-refresh",
            title: "Reset"
          },
          {
            type: "btn btn-success",
            icon: "fa fa-save",
            title: "Save"
          }
        ]
      }
    },
    created: function () {
      this.init();
    },
    mounted: function () {
    },
    methods: {
      init: function () {
        this.loadNodeData();
        this.nodeTimerId = setInterval(
          function () {
            this.loadNodeData();
          }.bind(this),
          1500
        );
      },
      destroyed: function () {
        clearInterval(this.nodeTimerId);
      },
      handleActionClick(command) {
        var actionCmd;
        switch (command.toLowerCase()) {
          case "start":
            actionCmd = "[SYS]START_SIM";
            this.nodeTimerId = setInterval(
              function () {
                this.loadNodeData();
              }.bind(this),
              1500
            );
            break;
          case "stop":
            actionCmd = "[SYS]STOP_SIM";
            clearInterval(this.nodeTimerId);
            this.nodeTimerId = setInterval(
              function () {
                this.loadNodeData();
              }.bind(this),
              5000
            );
            break;
          case "pause":
            actionCmd = "[SYS]PAUSE_SIM";
            // Stop the page refresh
            clearInterval(this.nodeTimerId);
            this.nodeTimerId = setInterval(
              function () {
                this.loadNodeData();
              }.bind(this),
              3000
            );
            break;
          case "reset":
            actionCmd = "[SYS]RESET_SIM";
            this.PAS = "-";
            this.HR = "-";
            this.BR = "-";
            this.SYS = "-";
            this.DIA = "-";
            this.SPO2 = "-";
            this.simTime = "-";
            this.lastTick = 0;
            this.ticks = 0;
            if (this.scenario !== "") {
              setTimeout(function () {
                this.loadScenario(this.scenario);
              }, 2000);
            }
            this.nodeTimerId = setInterval(
              function () {
                this.loadNodeData();
              }.bind(this),
              5000
            );
            break;
          case "save":
            actionCmd = "[SYS]SAVE_STATE";
            break;
          default:
            break;
        }

        if (actionCmd) {
          var commandUrl = "command/" + actionCmd;
          this.$http
            .get(commandUrl)
            .then(response => {
              this.$notify({
                message: "Action performed: " + command,
                icon: "play_arrow",
                horizontalAlign: "center",
                verticalAlign: "top",
                type: "info"
              });
            })
            .catch(e => {
              // this.errors.push(e)
            });
        }
      },
      loadNodeData() {
        this.$http.get(`nodes`).then(
          response => {
            if (response.data) {
              try {
                response.data.forEach(function (element) {
                  Object.keys(element).forEach(function eachKey(key) {
                    this.node[ key ] = element[ key ];
                  }, this);
                }, this);
              } catch (err) {
                console.log("Error");
              }
              this.ticks = Number(this.node[ "TICK" ]).toFixed(0);
              // if (this.ticks > this.lastTick) {
              this.PAS = Number(
                this.node[ "Nervous_GetPainVisualAnalogueScale" ]
              ).toFixed(0);
              this.HR = Number(this.node[ "Cardiovascular_HeartRate" ]).toFixed(
                0
              );
              this.BR = Number(
                this.node[ "Respiratory_Respiration_Rate" ]
              ).toFixed(0);
              this.SPO2 = Number(
                this.node[ "BloodChemistry_Oxygen_Saturation" ]
              ).toFixed(0);
              this.simTime = moment("2017-01-01")
                .add(Number(this.node[ "SIM_TIME" ]).toFixed(0), "seconds")
                .format("hh:mm:ss");
              this.status = this.node[ "STATUS" ];
              this.scenario = this.node[ "SCENARIO" ];
              this.state = this.node[ "STATE" ];

              this.SYS = Number(
                this.node[ "Cardiovascular_Arterial_Systolic_Pressure" ]
              ).toFixed(0);
              this.DIA = Number(
                this.node[ "Cardiovascular_Arterial_Diastolic_Pressure" ]
              ).toFixed(0);

              if (this.status === "RUNNING") {
                this.hrClass = { "fa-pulse": true };
              } else {
                this.hrClass = { "fa-pulse": false };
              }

              //   }
              this.lastTick = this.ticks;
            }
          },
          response => {
            this.error = response;
            clearInterval(this.nodeTimerId);
          }
        );
        this.$http.get(`modules/count`).then(
          response => {
            if (response.data) {
              this.modulesConnected = response.data.module_count;
            }
          },
          response => {
            this.error = response;
          }
        );
      }
    }
  }
</script>
