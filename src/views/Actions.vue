<template>
  <div class="animated fadeIn">
    <h3>Actions</h3>

    <b-row>
      <b-Tabs variant="pills">
        <b-Tab title="Home" active>
        </b-Tab>
        <b-Tab title="Fluidics">
          <b-button-group>
          <b-Button variant="success" v-on:click="publishCommand('[SYS]START_FLUIDICS');">Start Fluidics</b-Button>
          <b-Button variant="danger" v-on:click="publishCommand('[SYS]STOP_FLUIDICS');">Stop Fluidics</b-Button>
          </b-button-group>


          <b-button-group>
          <b-Button variant="warning" v-on:click="publishCommand('[SYS]START_PURGE');">Start Purge</b-Button>
          <b-Button variant="warning" v-on:click="publishCommand('[SYS]STOP_FLUIDICS');">Stop Purge</b-Button>
          </b-button-group>
        </b-Tab>
      </b-Tabs>
    </b-row>
  </div>
</template>

<script>

  import { Callout } from '@coreui/vue'

  export default {
    name: 'actions',
    components: {
      Callout
    },
    data: function () {
      return {}
    },
    methods: {}
  }
</script>
