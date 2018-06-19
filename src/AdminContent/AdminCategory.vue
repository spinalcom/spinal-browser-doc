<template>
  <md-content class="left-container no-scroll">
    <md-toolbar class="app-header">
      <h3>Category</h3>
      <div class="md-toolbar-section-end color_black">

        <md-button class="md-icon-button"
                   @click="$emit('codeIO-data')">
          <md-tooltip>Open Json</md-tooltip>
          <md-icon>assignment_turned_in</md-icon>
        </md-button>

        <md-button class="md-icon-button"
                   @click="$emit('reload-data')">
          <md-tooltip>Reload from model</md-tooltip>
          <md-icon>sync</md-icon>
        </md-button>

        <md-button class="md-icon-button"
                   @click="$emit('save-data')">
          <md-tooltip>Save in model</md-tooltip>
          <md-icon>save</md-icon>
        </md-button>

        <md-button class="md-icon-button"
                   @click="$emit('admin-create-item')">
          <md-tooltip>Add Category</md-tooltip>
          <md-icon>add</md-icon>
        </md-button>
      </div>
    </md-toolbar>
    <md-content class="md-scrollbar admin-left-content ">
      <md-empty-state v-if="current_list.length == 0"
                      md-icon="cancel"
                      md-label="Nothing in Category">
        <md-button class="md-primary md-raised"
                   @click="$emit('admin-create-item')">Create a category</md-button>
      </md-empty-state>
      <transition-group v-else
                        name="flip-list"
                        tag="md-list"
                        class="md-list-no-padding">
        <md-list-item v-for="(item,id) in current_list"
                      :class="{ 'admin-selected': item == selected }"
                      :key="item.id"
                      class="admin-item-list">
          <div>
            <md-button class="md-icon-button md-dense no-margin"
                       :disabled="id == 0"
                       @click="upInLst(id,item)">
              <md-icon>expand_less</md-icon>
            </md-button>
            <md-button class="md-icon-button md-dense no-margin"
                       :disabled="current_list.length - 1 == id"
                       @click="downInLst(id,item)">
              <md-icon>expand_more</md-icon>
            </md-button>
          </div>
          <div class="md-list-item-text">
            <span>label: {{item.label}}</span>
            <span>type : {{item.type}}</span>
            <p>target_url: {{item.target_url}}
              <md-tooltip v-if="item.target_url && item.target_url.length > 10">{{item.target_url}}</md-tooltip>
            </p>
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
                     @click="selectItem(item)">
            <md-icon>keyboard_arrow_right</md-icon>
          </md-button>
        </md-list-item>
      </transition-group>
    </md-content>

  </md-content>

</template>

<script>
import { EventBus } from "../event-bus";

export default {
  name: "AdminCategory",
  components: {},
  props: [],
  data() {
    return {
      current_list: [],
      selected: {}
    };
  },
  methods: {
    btoa: function(str) {
      return btoa(str);
    },
    deleteItem: function(item, id) {
      if (confirm("confim delete !") == true) {
        this.current_list.splice(id, 1);
        if (this.selected == item) {
          this.selected = {};
        }
        EventBus.$emit("admin-select-item", this.selected);
        EventBus.$emit("update-list");
      }
    },
    selectItem: function(item) {
      EventBus.$emit("admin-select-item", item);
    },
    upInLst: function(id) {
      let list = this.current_list;
      let b = list[id];
      list[id] = list[id - 1];
      list[id - 1] = b;
      this.$forceUpdate();
      EventBus.$emit("update-list");
    },
    downInLst: function(id) {
      let list = this.current_list;
      let b = list[id];
      list[id] = list[id + 1];
      list[id + 1] = b;
      this.$forceUpdate();
      EventBus.$emit("update-list");
    },
    getListen: function() {
      EventBus.$on("admin-select-item", item => {
        this.selected = item;
      });
      EventBus.$on("admin-select-list", list => {
        this.current_list = list;
      });
    }
  },
  mounted() {
    this.getListen();
  }
};
</script>

<style scoped>
.no-scroll {
  overflow: hidden;
}
.md-layout {
  height: 100%;
}
.left-container {
  height: calc(100vh - 64px) !important;
}
.admin-left-content {
  height: calc(100vh - 128px) !important;
  overflow: auto;
}
.admin-item-list {
  border: 1px solid #9e9e9e;
  border-radius: 20px;
}
.admin-selected {
  background-color: brown;
}
</style>

<style>
.admin-item-list .md-list-item-content {
  padding-left: 5px;
}
.flip-list-move {
  transition: transform 0.2s;
}
.flip-list-enter-active,
.flip-list-leave-active {
  transition: opacity 0.2s;
}
.flip-list-enter,
.flip-list-leave-to {
  opacity: 0;
}
</style>
