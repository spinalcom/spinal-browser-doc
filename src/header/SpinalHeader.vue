 <template>
  <div class="md-toolbar-row">

    <div class="md-toolbar-section-start">
      <md-button class="md-icon-button"
                 @click="toggleMenu"
                 v-if="!menuVisible">
        <md-icon>menu</md-icon>
      </md-button>
      <img src="dist/assets/img/SpinalBIMViewerLogo.png"
           alt="SpinalBIM Viewer"
           style="height: 42px;margin-top: 4px;">
    </div>
    <div class="md-toolbar-section-end">
      <!-- {{username}}
      <md-button class="md-icon-button"
                 v-on:click="toggleMenu">
        <md-icon>menu</md-icon>
      </md-button> -->
    </div>
  </div>
</template>

<script>
import spinal from "../SpinalSystem/spinal";
// import HeaderCtrl from "../header/HeaderCtrl.vue";

export default {
  name: "spinalHeader",
  data() {
    // var vm = this;
    return {
      fullPath: "",
      path: "",
      username: ""
    };
  },
  methods: {
    toggleMenu: function() {
      this.$emit("openmenu");

      // HeaderCtrl.toggleMenu();
    }
  },
  created() {
    var vm = this;
    // vm.username = spinal.spinalSystem.getUser().username;
    // vm.fullPath = spinal.spinalSystem.getPath();
    // let path = vm.fullPath.split("/");

    // vm.path = path[path.length - 1];
  }
};
</script>

<style scoped>
.md-button,
.md-icon,
div {
  color: black !important;
}
</style>
