<template>
  <div class="animated fadeIn">
  <b-jumbotron >
    <!-- <template #header>Supervisor</template> -->
    <template #lead>
    <i class="fa fa-tasks"></i>
    AMM process management
    </template>
    <iframe :src="source" width="100%" height="480" style="border:1px solid black;"></iframe>
  </b-jumbotron>
  </div>
</template>

<script>
  import { freeSet } from '@coreui/icons-vue'
  export default {
    name: 'supervisor',
    data: () => ({
	source: 'http://localhost:9009/'
    }),
    icons: { freeSet }
  }
</script>

