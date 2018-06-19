<template>
  <md-content>
    <CreateChildModal :openModalAdd="openModalAdd"
                      @closeModal="openModalAdd = false"
                      :value="selected"
                      @input="onNewChild"></CreateChildModal>
    <EditChildModal :openModalEdit="openModalEdit"
                    @closeModal="openModalEdit = false"
                    :value="childSelected"
                    @input="onEditChild"></EditChildModal>
    <md-toolbar class="app-header">
      <h3>Category Content Children</h3>
      <div class="md-toolbar-section-end color_black">
        <md-button v-if="selected.type === 'item'"
                   class="md-icon-button"
                   @click="openModalAdd = true">
          <md-tooltip>Add Child</md-tooltip>
          <md-icon>add</md-icon>
        </md-button>
      </div>
    </md-toolbar>

    <md-content v-if="selected.children"
                class="my_content">
      <transition-group name="flip-list"
                        tag="md-list"
                        class="md-list-no-padding">
        <md-list-item v-for="(item,id) in selected.children"
                      :key="item.label"
                      :class="{ 'admin-selected': item == selected }"
                      class="admin-item-list">
          <div>
            <md-button class="md-icon-button md-dense no-margin"
                       :disabled="id == 0"
                       @click="upInLst(id)">
              <md-icon>expand_less</md-icon>
            </md-button>
            <md-button class="md-icon-button md-dense no-margin"
                       :disabled="selected.children.length - 1 == id"
                       @click="downInLst(id)">
              <md-icon>expand_more</md-icon>
            </md-button>
          </div>
          <div class="md-list-item-text">
            <span>label: {{item.label}}</span>
            <p>target_url: {{item.target_url}}</p>
          </div>

          <md-button v-if="item.target_url && item.target_url.length > 0"
                     class="md-icon-button "
                     :to="btoa(item.target_url)">
            <md-icon>open_in_new</md-icon>
          </md-button>
          <md-button class="md-icon-button "
                     @click="deleteItem(item, id)">
            <md-icon>delete_forever</md-icon>
          </md-button>
          <md-button class="md-icon-button "
                     @click="openEditChild(item)">
            <md-icon>edit</md-icon>
          </md-button>
        </md-list-item>
      </transition-group>
    </md-content>

  </md-content>

</template>

<script>
import { EventBus } from "../event-bus";
import CreateChildModal from "./Modals/CreateChild.vue";
import EditChildModal from "./Modals/EditChild.vue";
export default {
  name: "AdminCategoryChildren",
  components: { CreateChildModal, EditChildModal },
  props: [],
  data() {
    return {
      selected: {},
      childSelected: {},
      openModalAdd: false,
      openModalEdit: false
    };
  },

  methods: {
    deleteItem: function(item, id) {
      if (confirm("confim delete !") == true) {
        this.selected.children.splice(id, 1);
        EventBus.$emit("update-children");
      }
    },
    btoa: function(str) {
      return btoa(str);
    },
    onNewChild: function(child) {
      if (!this.selected.children) this.selected.children = [];
      this.selected.children.push(child);
      this.openModalAdd = false;
      EventBus.$emit("update-children");
    },
    openEditChild: function(item) {
      this.childSelected = item;
      this.openModalEdit = true;
    },
    onEditChild: function(child) {
      this.childSelected.label = child.label;
      this.childSelected.target_url = child.target_url;
      this.openModalEdit = false;
      EventBus.$emit("update-children");
    },
    upInLst: function(id) {
      let list = this.selected.children;
      var b = list[id];
      list[id] = list[id - 1];
      list[id - 1] = b;
      this.$forceUpdate();
      EventBus.$emit("update-children");
    },
    downInLst: function(id) {
      let list = this.selected.children;
      var b = list[id];
      list[id] = list[id + 1];
      list[id + 1] = b;
      this.$forceUpdate();
      EventBus.$emit("update-children");
    }
  },
  mounted() {
    EventBus.$on("admin-select-item", selected => {
      this.selected = selected;
    });
  }
};
</script>

<style scoped>
.no-margin {
  margin: 0 !important;
}
.admin-item-list {
  border: 1px solid white;
  border-radius: 20px;
}
.admin-selected {
  background-color: brown;
}
.category-content-edit {
  padding-bottom: 5px;
  padding-top: 5px;
}
.category-content-edit .md-card-content {
  padding-bottom: 0px;
  padding-top: 0px;
}
.category-content-edit .md-field {
  margin-bottom: 10px;
}
</style>
