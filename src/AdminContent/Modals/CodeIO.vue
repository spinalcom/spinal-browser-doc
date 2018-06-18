<template>

  <md-dialog :md-active.sync="openModal"
             :md-fullscreen=true>
    <md-dialog-title>Code IO</md-dialog-title>
    <md-dialog-content>
      <VlCode v-model="str_code" />
    </md-dialog-content>
    <md-dialog-actions>
      <md-button class="md-raised md-accent"
                 @click="onCancel">
        Cancel
        <md-icon>cancel</md-icon>
      </md-button>
      <md-button class="md-raised md-primary"
                 @click="save">
        Save
        <md-icon>check</md-icon>
      </md-button>
    </md-dialog-actions>
  </md-dialog>

</template>

<script>
import VlCode from "./CodeMirror.vue";
import { EventBus } from "../../event-bus";
const debounce = require("lodash.debounce");

export default {
  name: "CodeIO",
  components: { VlCode },
  props: ["openCodeIO", "list"],
  data() {
    return {
      str_code: ""
    };
  },
  // watch: {
  //   list: function() {
  //     // if (this.list) this.str_code = JSON.stringify(this.list, null, 2);
  //     // else this.str_code = "";
  //   }
  // },
  computed: {
    openModal: {
      get: function() {
        return this.openCodeIO;
      },
      set: function() {
        this.$emit("closeModal");
      }
    }
  },
  methods: {
    onCancel: function() {
      this.$emit("closeModal");
    },
    save: function() {
      try {
        let obj = JSON.parse(this.str_code);
        this.$emit("updateList", obj);
      } catch (error) {
        console.error(error);
      }
    }
  },
  mounted: function() {
    EventBus.$on(
      ["admin-select-item", "update-children", "update-list"],
      debounce(() => {
        if (this.list) this.str_code = JSON.stringify(this.list, null, 2);
        else this.str_code = "";
      }, 500)
    );
  }
};
</script>

<style scoped>
.md-dialog {
  min-width: 80vw;
  min-height: 80vh;
}
</style>
