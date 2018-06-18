<template>
  <div class="spinalLeftSideBar-container">
    <md-toolbar class="app-header"
                md-elevation="0">
      <h3>Navigation</h3>

      <div class="md-toolbar-section-end color_black">
        <md-button class="md-icon-button md-dense"
                   @click="toggleMenu">
          <md-icon>keyboard_arrow_left</md-icon>
        </md-button>
      </div>
    </md-toolbar>
    <md-content class="md-scrollbar left-bar-content">
      <spinalCategoryContainer></spinalCategoryContainer>

    </md-content>
  </div>
</template>

<script>
// import Vue from "vue";
import spinalCategoryContainer from "./spinal-category-container.vue";
export default {
  name: "SpinalLeftSideBar",
  components: {
    spinalCategoryContainer
  },

  data() {
    return {};
  },
  created() {},
  methods: {
    toggleMenu: function() {
      this.$emit("openmenu");
    }
  }
};
</script>

<style scoped>
.spinalLeftSideBar-container {
  overflow: hidden;
}
.left-bar-content {
  height: calc(100vh - 64px) !important;
  overflow: auto;
}
.md-icon {
  color: black;
}
.app-header {
  color: black;
  background-color: #fff;
}
.color_black .md-button,
.color_black .md-icon,
.color_black div {
  color: black !important;
}
</style>
