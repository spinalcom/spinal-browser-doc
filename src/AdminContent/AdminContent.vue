<template>
  <div class="md-layout">
    <CreateCategoryModal :openModalAdd="openCreateCategoryModal"
                         @closeModal="openCreateCategoryModal = false"
                         :value="list"
                         @input="onNewCategory"></CreateCategoryModal>
    <CodeIO :openCodeIO="openCodeIO"
            @closeModal="openCodeIO = false"
            :list="list"
            @updateList="onUpdateList"></CodeIO>

    <AdminCategory @save-data="onSave"
                   @reload-data="onReload"
                   @codeIO-data="openCodeIO = true"
                   @admin-create-item="openCreateCategoryModal = !openCreateCategoryModal"
                   class="md-layout-item md-size-33 layout-item-no-scroll"></AdminCategory>
    <AdminCategoryContent class="md-layout-item md-size-33 layout-item"
                          @update-children="onUpdateChildren"></AdminCategoryContent>

    <MainContent class="md-layout-item md-size-33 layout-item"></MainContent>
  </div>
</template>

<script>
import AdminCategory from "./AdminCategory.vue";
import AdminCategoryContent from "./AdminCategoryContent.vue";
import MainContent from "../MainContent/MainContent.vue";
import CreateCategoryModal from "./Modals/CreateCategory.vue";
import CodeIO from "./Modals/CodeIO.vue";
import { EventBus } from "../event-bus";
let id = 0;

export default {
  name: "AdminContent",
  components: {
    AdminCategory,
    AdminCategoryContent,
    MainContent,
    CreateCategoryModal,
    CodeIO
  },
  data() {
    return {
      list: [],
      selectedItem: {},
      openCreateCategoryModal: false,
      openCodeIO: false
    };
  },
  methods: {
    onItemSelected: function(item) {
      this.selectedItem = item;
    },
    onUpdateList: function(list) {
      this.list = list;
      this.selectedItem = {};
      EventBus.$emit("admin-select-list", this.list);
      EventBus.$emit("admin-select-item", this.selectedItem);
    },
    onUpdateChildren: function() {
      this.$forceUpdate();
    },
    onNewCategory: function(category) {
      this.list.push({
        label: category.label,
        type: category.type,
        target_url: category.target_url,
        id: ++id
      });
      EventBus.$emit("update-list");
    },
    onSave: function() {
      var vm = this;
      window.spinal.spinalSystem.getModel().then(model => {
        model.set(vm.list);
        EventBus.$emit("UPDATE-MODEL", model);
      });
    },
    getMaxId: function(lst) {
      let max = 0;
      for (var i = 0; i < lst.length; i++) {
        if (lst[i].id) max = lst[i].id > max ? lst[i].id : max;
      }
      return max;
    },
    onReload: function() {
      var vm = this;
      window.spinal.spinalSystem.getModel().then(model => {
        vm.list = model.get();
        id = this.getMaxId(vm.list);
        vm.selectedItem = {};
        EventBus.$emit("admin-select-list", vm.list);
        EventBus.$emit("admin-select-item", this.selectedItem);
      });
    }
  },
  mounted() {
    this.onReload();
  }
};
</script>

<style scoped>
.layout-item {
  height: calc(100vh - 64px) !important;
  overflow: auto;
  border: 1px solid #9e9e9e;
}
.layout-item-no-scroll {
  height: calc(100vh - 64px) !important;
  overflow: hidden;
  border: 1px solid #9e9e9e;
}

/* .md-layout {
} */
</style>
