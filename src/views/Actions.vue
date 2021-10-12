<template>
  <div class="animated fadeIn">
<!--    <h3>Actions</h3>  -->
  <div>
    <b-card-group deck>
      <b-card
        bg-variant="light"
        border-variant="gray"
	header-tag="header"
        class="text-center"
      >
          <template #header><h5 class="mb-0">Airway & Breathing</h5> </template>
          <div>
	  <b-button-group>
            <b-dropdown variant="secondary" right text="PNEUMOTHORAX">
              <b-dropdown-item v-on:click="handleActionClick('pneumo_left_mild')">Left Closed Mild</b-dropdown-item>
              <b-dropdown-item v-on:click="handleActionClick('pneumo_left_moderate')">Left Closed Moderate</b-dropdown-item>
	      <b-dropdown-item v-on:click="handleActionClick('pneumo_left_severe')">Left Closed Severe</b-dropdown-item>
	      <b-dropdown-divider></b-dropdown-divider>
	      <b-dropdown-item v-on:click="handleActionClick('pneumo_right_mild')">Right Closed Mild</b-dropdown-item>
              <b-dropdown-item v-on:click="handleActionClick('pneumo_right_moderate')">Right Closed Moderate</b-dropdown-item>
              <b-dropdown-item v-on:click="handleActionClick('pneumo_right_severe')">Right Closed Severe</b-dropdown-item>
    	    </b-dropdown>
            <b-dropdown variant="secondary" right text="NEEDLE-D">
              <b-dropdown-item v-on:click="handleActionClick('ncd_left_2nd')">Left, 2nd Intercostal</b-dropdown-item>
              <b-dropdown-item v-on:click="handleActionClick('ncd_left_5th')">Left, 5th Intercostal</b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item v-on:click="handleActionClick('ncd_right_2nd')">Right, 2nd Intercostal</b-dropdown-item>
              <b-dropdown-item v-on:click="handleActionClick('ncd_right_5th')">Right 5th Intercostal</b-dropdown-item>
            </b-dropdown>
          </b-button-group>
	  </div>
	  <div class="mt-2">
	  <b-button-group>
            <b-dropdown variant="secondary" right text="INTUBATE">
              <b-dropdown-item v-on:click="handleActionClick('intubate_correct')">Correct</b-dropdown-item>
              <b-dropdown-item v-on:click="handleActionClick('intubate_ms')">Mainstem</b-dropdown-item>
              <b-dropdown-item v-on:click="handleActionClick('intubate_esoph')">Esophageal</b-dropdown-item>
            </b-dropdown>
	    <b-button variant="secondary" v-on:click="handleActionClick('tape_vent')">TAPE & VENTILATE</b-button>
	    <b-button variant="secondary" v-on:click="handleActionClick('extubate')">EXTUBATE</b-button>
	  </b-button-group>
	  </div>

	  <div class="mt-2">
          <b-button-group>
            <b-dropdown variant="secondary" right text="AIRWAY OBSTRUCTION" ref="dropdown">
                <b-dropdown-form>
  		<div>
    		    <label for="severity-sel">Severity</label>
		    <b-form-select id="severity-sel"
			v-model="airwayObstructionSeverity"
			:options="severityOptions"
		    >
		    </b-form-select>
  		</div>
		<div class="mt-3">
	            <b-button variant="primary" v-on:click="publishAirwayObstruction">Publish</b-button>
		</div>
		</b-dropdown-form>
            </b-dropdown>
          </b-button-group>
	  </div>

      </b-card>

      <b-card
        bg-variant="light"
        border-variant="gray"
        header-tag="header"
        class="text-center"
      >
          <template #header><h5 class="mb-0">FLUIDS, BLOOD & MEDS</h5> </template>
          <b-button-group>
            <b-dropdown variant="secondary" right text="GIVE KETAMINE">
              <b-dropdown-item v-on:click="handleActionClick('ketamine_100')">100mg 1% O2</b-dropdown-item>
            </b-dropdown>
            <b-dropdown variant="secondary" right text="GIVE SUCCS">
              <b-dropdown-item v-on:click="handleActionClick('succs_70')">70mg Normal Env</b-dropdown-item>
              <b-dropdown-item v-on:click="handleActionClick('succs_140')">140mg Normal Env</b-dropdown-item>
            </b-dropdown>
          </b-button-group>
      </b-card>
    </b-card-group>
  </div>
  <div class="mt-4">
    <b-card-group deck>
      <b-card
        bg-variant="light"
        border-variant="gray"
        header-tag="header"
        class="text-center"
      >
          <template #header><h5 class="mb-0">Fluidics Control</h5> </template>
	  <b-button-group v-for="action in actionCards" :key='action.title'>
            <button :class="action.type" v-on:click="handleActionClick(action.title)">
               <i :class="action.icon"></i>
               {{action.title}}
            </button>
          </b-button-group>
      </b-card>

      <b-card
	bg-variant="light"
        border-variant="gray"
	header-tag="header"
	class="text-center"
      >
          <template #header><h5 class="mb-0">Generic Actions</h5> </template>
          <b-button-group>
            <b-Button @click="physModModal = true" variant="primary">Physiology Modification</b-Button>
            <b-Button @click="renderModModal = true" variant="primary">Render Modification</b-Button>
<!--            <b-Button @click="perfAssessmentModal = true" variant="primary">Performance Assessment</b-Button>-->
            <b-Button @click="commandModal = true" variant="primary">Command</b-Button>
          </b-button-group>
      </b-card>

    </b-card-group>
  </div>

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
        commandModal: false,
	actionCards: [
          {
            type: "btn btn-success",
            icon: "fa fa-play",
            title: "Start"
          },
          {
            type: "btn btn-danger",
            icon: "fa fa-stop",
            title: "Stop"
          }
        ],
	airwayObstructionSeverity: 5,
	severityOptions: [
	{value: 0, text: '0'},
	{value: 1, text: '1'},
	{value: 2, text: '2'},
	{value: 3, text: '3'},
	{value: 4, text: '4'},
	{value: 5, text: '5'},
	{value: 6, text: '6'},
	{value: 7, text: '7'},
	{value: 8, text: '8'},
	{value: 9, text: '9'},
	{value: 10, text: '10'}
	]
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
      },

      publishAirwayObstruction() {
        const type = "biogears";
        var payload = "XML placeholder";
        this.publishPhysiologyModification(type, '', '', '');
	this.$bvToast.toast(type, {
                title: `Physiology Modification performed: `,
                toaster: 'b-toaster-bottom-right',
                autoHideDelay: 5000,
                variant: 'danger',
                solid: true
            });
	this.$refs.dropdown.hide(true)
      },

      handleActionClick(command) {
        var actionCmd;
	var physModType;
	var rendModType;
	var toastVariant;
        switch (command.toLowerCase()) {
          case "start":
            actionCmd = "[SYS]START_FLUIDICS";
	    toastVariant = 'success';
            break;
          case "stop":
            actionCmd = "[SYS]STOP_FLUIDICS";
	    toastVariant = 'danger';
            break;
	  case "pneumo_left_mild":
	    physModType = "PNEUMOTHORAX_CLOSED_L_MILD";
	    rendModType = physModType;
	    break;
          case "pneumo_left_moderate":
            physModType = "PNEUMOTHORAX_CLOSED_L_MODERATE";
	    rendModType = physModType;
            break;
          case "pneumo_left_severe":
            physModType = "PNEUMOTHORAX_CLOSED_L_SEVERE";
	    rendModType = physModType;
            break;
          case "pneumo_right_mild":
            physModType = "PNEUMOTHORAX_CLOSED_R_MILD";
	    rendModType = physModType;
            break;
          case "pneumo_right_moderate":
            physModType = "PNEUMOTHORAX_CLOSED_R_MODERATE";
	    rendModType = physModType;
            break;
          case "pneumo_right_severe":
            physModType = "PNEUMOTHORAX_CLOSED_R_SEVERE";
	    rendModType = physModType;
            break;
	  case "ncd_left_2nd":
	    physModType = "NEEDLE_D_L";
	    rendModType = physModType;
	    break;
          case "ncd_left_5th":
            physModType = "NEEDLE_D_L";
	    rendModType = physModType;
            break;
          case "ncd_right_2nd":
            physModType = "NEEDLE_D_R";
	    rendModType = physModType;
            break;
          case "ncd_right_5th":
            physModType = "NEEDLE_D_R";
	    rendModType = physModType;
            break;
	  case "ketamine_100":
            physModType = "KETAMINE_100MG_1perc_O2";
            break;
          case "succs_70":
            physModType = "SUCCINYLCHOLINE_70MG_NORMAL_ENV";
            break;
          case "succs_140":
            physModType = "SUCCINYLCHOLINE_140MG_NORMAL_ENV";
            break;
	  case "intubate_correct":
	    physModType = "MASK_INSERT_ET_TUBE_CORRECT";
	    rendModType = physModType;
	    break;
          case "intubate_ms":
            physModType = "MASK_INSERT_ET_TUBE_MS";
            rendModType = physModType;
            break;
          case "intubate_esoph":
            physModType = "MASK_INSERT_ET_TUBE_ESOPH";
            rendModType = physModType;
            break;
	  case "tape_vent":
            physModType = "MASK_TAPE_VENTILATE_ET_TUBE";
            rendModType = physModType;
            break;
          case "extubate":
            physModType = "EXTUBATE";
            rendModType = physModType;
            break;
        }
	if (!toastVariant) {
	  toastVariant = 'info';
	}
      	if (actionCmd) {
          var commandUrl = "command/" + actionCmd;
          this.$http
            .get(commandUrl)
          this.$bvToast.toast(actionCmd, {
                title: `Action performed: `,
		toaster: 'b-toaster-bottom-right',
                autoHideDelay: 5000,
                variant: toastVariant,
                solid: true
            })
        }
        if (physModType) {
          this.publishPhysiologyModification(physModType, '', '', '')
	  this.$bvToast.toast(physModType, {
            	title: `Physiology Modification performed: `,
		toaster: 'b-toaster-bottom-right',
            	autoHideDelay: 5000,
		variant: 'danger',
            	solid: true
            })
        }
        if (rendModType) {
          this.publishRenderModification(rendModType, '', '', '')
          this.$bvToast.toast(rendModType, {
                title: `Render Modification performed: `,
                toaster: 'b-toaster-bottom-right',
                autoHideDelay: 5000,
                variant: 'secondary',
                solid: true
            })
        }
      }

    }
  }
</script>

