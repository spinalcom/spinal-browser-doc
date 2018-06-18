<template>
  <md-list id="side-bar-list">
    <spinalCategory v-for="item in list"
                    :key="item.label"
                    :item=item></spinalCategory>

  </md-list>
</template>


<script>
import spinalCategory from "./spinal-category.vue";
import { EventBus } from "../event-bus";

export default {
  name: "spinalCategoryContainer",
  components: { spinalCategory },
  data() {
    return {
      list: []
    };
  },
  methods: {},
  mounted() {
    var vm = this;
    EventBus.$on("UPDATE-MODEL", model => {
      vm.list = model.get();
    });
    window.spinal.spinalSystem.getModel().then(model => {
      EventBus.$emit("UPDATE-MODEL", model);
    });
  }
};
</script>

<style>
#side-bar-list {
  padding-top: 0;
}
</style>
