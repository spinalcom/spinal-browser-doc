<template>
  <md-dialog :md-active.sync="openModal">
    <md-dialog-title>Add Category</md-dialog-title>
    <form id="app"
          @submit.prevent="checkForm">
      <md-dialog-content>
        <p v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <ul>
            <li v-for="error in errors"
                :key="error">{{ error }}</li>
          </ul>
        </p>
        <md-field>
          <label for="type">Type</label>
          <md-select v-model="type">
            <md-option value="item">item</md-option>
            <md-option value="subheader">subheader</md-option>
            <md-option value="divider">divider</md-option>
          </md-select>
        </md-field>

        <md-field>
          <label>Label</label>
          <md-input v-model="label"
                    :required="type !== 'divider'"></md-input>
        </md-field>
        <md-field>
          <label>URL</label>
          <md-input v-model="url"></md-input>
        </md-field>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-raised md-accent"
                   @click="onCancel">
          Cancel
          <md-icon>cancel</md-icon>
        </md-button>
        <md-button class="md-raised md-primary"
                   type="submit"
                   value="Submit">
          Save
          <md-icon>check</md-icon>
        </md-button>
      </md-dialog-actions>
    </form>
  </md-dialog>
</template>

<script>
export default {
  name: "CreateCategoryModal",
  props: ["openModalAdd", "value"],
  data() {
    return {
      errors: [],
      type: "item",
      label: "",
      url: ""
    };
  },
  computed: {
    openModal: {
      get: function() {
        return this.openModalAdd;
      },
      set: function() {
        this.$emit("closeModal");
      }
    }
  },
  methods: {
    checkForm: function() {
      if (
        (this.type && this.type === "divider") ||
        (this.type && this.type === "subheader" && this.label) ||
        (this.type && this.type === "item" && this.label)
      ) {
        this.check();
        return true;
      }
      this.errors = [];
      if (!this.type) this.errors.push("Type required.");
      if (!this.label) this.errors.push("Label required.");
    },
    isLabelRequired: function() {
      return this.type === "item";
    },
    onCancel: function() {
      this.label = "";
      this.url = "";
      this.openModal = false;
    },
    check: function() {
      this.$emit("input", {
        type: this.type,
        label: this.label,
        target_url: this.url
      });
      this.type = "item";
      this.label = "";
      this.url = "";
    }
  }
};
</script>

<style>
.md-menu-content {
  z-index: 20;
}
</style>
