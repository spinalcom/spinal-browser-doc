<template>
  <md-content class="md-scrollbar category-content-container"
              md-dynamic-height>
    <md-toolbar class="app-header">
      <div class="md-list-item-text">
        <span>label: {{selected.label}}</span>
        <span>type : {{selected.type}}</span>
        <p>target_url: {{selected.target_url}}
          <md-tooltip v-if="selected.target_url && selected.target_url.length > 10">{{selected.target_url}}</md-tooltip>
        </p>
      </div>
      <div class="md-toolbar-section-end color_black">
        <h3>Category Content</h3>
        <md-button class="md-icon-button"
                   @click="editContent = !editContent">
          <md-tooltip>Add Child</md-tooltip>
          <md-icon>edit</md-icon>
        </md-button>
      </div>
    </md-toolbar>
    <transition name="slide-fade">

      <md-content md-elevation="1"
                  class="category-content-edit"
                  v-if="editContent">
        <md-card-content>
          <md-field>
            <label for="type">Type</label>
            <md-select v-model="selectedType">
              <md-option value="item">item</md-option>
              <md-option value="subheader">subheader</md-option>
              <md-option value="divider">divider</md-option>
            </md-select>
          </md-field>

          <md-field>
            <label>Label</label>
            <md-input v-model="selectedLabel"></md-input>
          </md-field>

          <md-field>
            <label>Target Url</label>
            <md-input v-model="selectedTarget_url"></md-input>
            <md-button v-if="selected.target_url && selected.target_url.length > 0"
                       class="md-icon-button "
                       :to="btoa(selected.target_url)">
              <md-icon>open_in_new</md-icon>
            </md-button>
          </md-field>
        </md-card-content>
      </md-content>
    </transition>
    <AdminCategoryChildren @update-children="onUpdateChildren"></AdminCategoryChildren>
  </md-content>

</template>
<script>
import AdminCategoryChildren from "./AdminCategoryChildren.vue";
import { EventBus } from "../event-bus";
const debounce = require("lodash.debounce");

export default {
  name: "AdminCategoryContent",
  components: { AdminCategoryChildren },
  props: [],
  data() {
    return {
      selected: {},
      editContent: false
    };
  },
  computed: {
    selectedType: {
      get: function() {
        return this.selected.type;
      },
      set: function(result) {
        this.selected.type = result;
        this.onUpdateChildren();
      }
    },
    selectedLabel: {
      get: function() {
        return this.selected.label;
      },
      set: function(result) {
        this.selected.label = result;
        this.onUpdateChildren();
      }
    },
    selectedTarget_url: {
      get: function() {
        return this.selected.target_url;
      },
      set: function(result) {
        this.selected.target_url = result;
        this.onUpdateChildren();
      }
    }
  },
  methods: {
    btoa: function(str) {
      return btoa(str);
    },
    toggleModal: function() {
      this.$emit("admin-create-item");
    },
    onUpdateChildren: debounce(function() {
      EventBus.$emit("update-children");
    }, 1000)
  },
  mounted() {
    EventBus.$on("admin-select-item", selected => {
      this.selected = selected;
    });
  }
};
</script>
<style>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>


<style scoped>
.category-content-container {
  height: calc(100vh - 64px) !important;
  overflow: auto;
}
.my_content {
  border: 1px solid red;
}
.admin-item-list {
  border: 1px solid white;
  border-radius: 20px;
}
.admin-selected {
  background-color: brown;
}
.category-content-edit {
  height: 200px;
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
