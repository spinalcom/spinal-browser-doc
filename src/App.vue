<template>
  <div id="app"
       v-cloak>
    <md-app md-waterfall
            md-mode="fixed">
      <md-app-toolbar class="app-header">
        <spinalHeader v-on:openmenu="menuVisible = !menuVisible" />
      </md-app-toolbar>

      <md-app-drawer class="spinalLeftSideBar-container"
                     :md-active.sync="menuVisible"
                     md-persistent="full">
        <spinalLeftSideBar v-on:openmenu="menuVisible = !menuVisible" />
      </md-app-drawer>

      <md-app-content>
        <router-view class="view"></router-view>
        <!-- <MainContent /> -->
      </md-app-content>
    </md-app>

  </div>
</template>

<script>
import spinalHeader from "./header/SpinalHeader.vue";
import spinalLeftSideBar from "./LeftSideBar/SpinalLeftSideBar.vue";
// import SpinalRightSideBar from "./RightSideBar/SpinalRightSideBar.vue";
// import MainContent from "./MainContent/MainContent.vue";

export default {
  name: "app",
  data() {
    return {
      menuVisible: true
    };
  },
  computed: {
    // menuVisible: {
    //   get: function() {
    //     return this.menuVisibleObs;
    //   },
    //   set: function(newValue) {
    //     HeaderCtrl.setViewMenu(newValue);
    //   }
    // }
  },
  created() {
    // var vm = this;
  },
  mounted() {
    var vm = this;
    // this.$subscribeTo(HeaderCtrl.getObservable(), function(val) {
    //   vm.menuVisibleObs = val;
    // });
  },

  components: {
    spinalLeftSideBar,
    spinalHeader
    // SpinalRightSideBar,
    // MainContent
  }
};
</script>

<style scoped>
#app .md-app {
  height: 100vh;
  overflow: hidden;
}
.app-header {
  color: black;
  background-color: #fff;
}
.md-app-content {
  height: calc(100vh - 64px) !important;
  position: relative;
  padding: 0;
}
.spinalLeftSideBar-container {
  overflow: hidden;
}
</style>
<style>
.md-app-container {
  overflow: hidden;
}
</style>
