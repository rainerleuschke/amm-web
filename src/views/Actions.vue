<template>
  <div class="animated fadeIn">
    <h3>Actions</h3>

    <b-row>
      <b-Tabs variant="pills">
        <b-Tab title="Generic" active>
          <b-button-group>
            <b-Button @click="physModModal = true" variant="success">Physiology Modification</b-Button>
            <b-Button @click="renderModModal = true" variant="warning">Render Modification</b-Button>
<!--            <b-Button @click="perfAssessmentModal = true" variant="danger">Performance Assessment</b-Button>-->
            <b-Button @click="commandModal = true" variant="success">Command</b-Button>
          </b-button-group>
        </b-Tab>

      </b-Tabs>
    </b-row>


    <b-modal title="Physiology Modification" v-model="physModModal" @ok="sendPhysModForm(); physModModal = false">
      <b-form id="physModForm">
        <b-form-group>
          <label for="type">Type</label>
          <b-form-input type="text" id="type" placeholder="Enter type"></b-form-input>
        </b-form-group>
        <b-form-group>
          <label for="payload">Payload (XML)</label>
          <b-form-input type="text" id="payload" placeholder="Enter payload"></b-form-input>
        </b-form-group>
      </b-form>
    </b-modal>

    <b-modal title="Render Modification" v-model="renderModModal" @ok="sendRenderModForm(); renderModModal = false">
      <b-form id="renderModForm">
        <b-form-group>
          <label for="type">Type</label>
          <b-form-input type="text" id="type" placeholder="Enter type"></b-form-input>
        </b-form-group>
        <b-form-group>
          <label for="payload">Payload (XML)</label>
          <b-form-input type="text" id="payload" placeholder="Enter payload"></b-form-input>
        </b-form-group>
      </b-form>
    </b-modal>

    <b-modal title="Performance Assessment" v-model="perfAssessmentModal" @ok="perfAssessmentModal= false">

    </b-modal>

    <b-modal title="Command" v-model="commandModal" @ok="sendCommandForm(); commandModal = false">
      <b-form id="commandForm">
        <b-form-group>
          <label for="command">Command</label>
          <b-form-input type="text" id="command" placeholder="Enter command"></b-form-input>
        </b-form-group>
      </b-form>
    </b-modal>

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
      return {
        physModModal: false,
        renderModModal: false,
        eventRecordModal: false,
        perfAssessmentModal: false,
        commandModal: false
      }
    },
    methods: {
      sendPhysModForm() {
        const physModForm = document.getElementById('physModForm');
        const typeInput = physModForm.querySelector('input[id=type]');
        const payloadInput = physModForm.querySelector('input[id=payload]');
        const type = typeInput.value;
        const payload = payloadInput.value;
        this.publishPhysiologyModification(type, '', '', payload);
      },
      sendRenderModForm() {
        const renderModForm = document.getElementById('renderModForm');
        const typeInput = renderModForm.querySelector('input[id=type]');
        const payloadInput = renderModForm.querySelector('input[id=payload]');
        const type = typeInput.value;
        const payload = payloadInput.value;
        this.publishRenderModification(type, '', '', payload);
      },
      sendCommandForm() {
        const commandForm = document.getElementById('commandForm');
        const commandInput = commandForm.querySelector('input[id=command]');
        const command = commandInput.value;
        this.publishCommand(command);
      }
    }
  }
</script>
