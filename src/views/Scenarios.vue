<template>
  <div class="animated fadeIn">
    <h3>Scenarios</h3>

    Selecting a patient state from this list will reset the physiology engine to that state.

    <b-row v-for="scenario in stateData" :key="scenario.name">
      <b-col>
        <b-button size="lg" class="mr-1 bg-success" type="button" v-on:click="loadState(scenario.name)">
          <i v-if="scenario.name.includes('xml')" class="far fa-play-circle"></i>
          <i v-else class="fas fa-play-circle"></i>
        </b-button>
        <div v-if="scenario.name.includes('xml')">
          Biogears: {{ scenario.name }}
        </div>
        <div v-else>
          CAE: {{ scenario.name }}
        </div>
        <small>last modified {{ scenario.last_updated | formatDate }}</small>
      </b-col>
    </b-row>
  </div>
</template>

<script>


  export default {
    name: 'scenarios',
    data: function () {
      return {
        stateData: ""
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.loadData();
      });
    },
    methods: {
      loadData() {
        this.$http.get(`states`).then(
          response => {
            this.stateData = response.data;
          },
          response => {
            this.error = response;
          }
        );
      }
    }
  }
</script>
