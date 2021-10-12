<template>
  <div class="animated fadeIn">
  <b-card header-tag="header" no-body>
    <!-- <template #header>Supervisor</template> -->
    <template #header>
    	<h5 class="mb-0"> <i class="fa fa-tasks"></i>
    	AMM process management </h5>
    </template>
 	<!-- <iframe :src="source" width="100%" height="480" style="border:1px solid gray;"></iframe> -->
  <b-embed
    type="iframe"
    aspect="16by9"
    :src="source"
  ></b-embed>
  </b-card>

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

