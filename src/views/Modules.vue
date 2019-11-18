<template>
  <div class="animated fadeIn">
    <h3>Connected AMM Modules</h3>

    <b-row>
      <b-col v-for="module in modules" :key="module.Module_Name + module.Module_ID">
        <b-card no-body>
          <b-card-header>
            <h5 class="card-title">
              {{module.Module_Name}}
            </h5>
          </b-card-header>
          <b-card-body>
            <table>
              <tr>
                <th>Model</th>
                <td>{{module.Model}}</td>
              </tr>
              <tr>
                <th>Manufacturer</th>
                <td>{{module.Manufacturer}}</td>
              </tr>
            </table>

          </b-card-body>
          <b-card-footer>
            <small>
              <b>ID: {{module.Module_ID}}</b><br/>
              <b>GUID: {{module.Module_GUID}}</b>
            </small>
          </b-card-footer>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>

  import { Callout } from '@coreui/vue'

  export default {
    name: 'modules',
    components: {
      Callout
    },
    mounted: function () {
      this.$nextTick(function () {
        this.loadData();
      });
    },
    methods: {
      showCap(moduleId) {
        this.cap[ moduleId ] = true;
      },
      hideCap(moduleId) {
        this.cap[ moduleId ] = false;
      },
      loadData() {
        this.$http.get(`modules`).then(
          response => {
            if (response.data) {
              this.modules = response.data;
              this.modules.forEach(function (arrayItem, index) {
              }, this.modules);
            }
            setTimeout(this.loadData, 3000);
          },
          response => {
            this.error = response;
          }
        );
      }
    },
    data: function () {
      return {
        modules: "",
        cap: [],
        coreModules: [ '' ]
      };
    },
    props: {
      dataBackgroundColor: {
        type: String,
        default: ""
      }
    }
  }
</script>
