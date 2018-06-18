<template>
  <md-dialog :md-active.sync="openModal">
    <md-dialog-title>Edit Child</md-dialog-title>
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
          <label>Label</label>
          <md-input v-model="label"
                    required></md-input>
        </md-field>
        <md-field>
          <label>URL</label>
          <md-input v-model="url"
                    required></md-input>
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
  name: "EditChildModal",
  props: ["openModalEdit", "value"],
  data() {
    return {
      errors: [],
      label: "",
      url: ""
    };
  },

  computed: {
    openModal: {
      get: function() {
        return this.openModalEdit;
      },
      set: function() {
        this.$emit("closeModal");
      }
    }
  },
  watch: {
    value: function() {
      this.label = this.value.label;
      this.url = this.value.target_url;
    }
  },
  methods: {
    checkForm: function() {
      if (this.label && this.url) {
        this.check();
        return true;
      }
      this.errors = [];
      if (!this.label) this.errors.push("Label required.");
      if (!this.url) this.errors.push("URL required.");
    },
    onCancel: function() {
      this.openModal = false;
    },
    check: function() {
      this.$emit("input", { label: this.label, target_url: this.url });
    }
  }
};
</script>
