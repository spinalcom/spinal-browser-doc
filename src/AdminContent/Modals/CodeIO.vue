<template>

  <md-dialog :md-active.sync="openModal"
             :md-fullscreen=true>
    <md-dialog-title>Code IO</md-dialog-title>
    <md-dialog-content>
      <!-- <MonacoEditor style="height: calc(80vh - 150px)"
                    language="json"
                    :code="str_code"
                    option="option"
                    @codeChange="onCodeChange">
      </MonacoEditor>
 -->
      <MonacoEditor class="editor"
                    v-model="str_code"
                    language="json">
      </MonacoEditor>

      <!-- <VlCode v-model="str_code" /> -->
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
// import VlCode from "./CodeMirror.vue";
import { EventBus } from "../../event-bus";
const debounce = require("lodash.debounce");
// import MonacoEditor from "vue-monaco-editor";
import MonacoEditor from "./CodeMonaco.js";

export default {
  name: "CodeIO",
  // components: { MonacoEditor },
  components: { MonacoEditor },
  // components: { VlCode },
  props: ["openCodeIO", "list"],
  data() {
    return {
      str_code: ""
      // option: {
      //   selectOnLineNumbers: true,
      //   roundedSelection: false,
      //   readOnly: false,
      //   cursorStyle: "line",
      //   automaticLayout: true,
      //   glyphMargin: true
      // }
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
    onCodeChange: function(editor) {
      console.log(editor.getValue());
    },
    onCancel: function() {
      this.$emit("closeModal");
    },
    save: function() {
      try {
        let obj = JSON.parse(this.str_code);
        this.$emit("updateList", obj);
      } catch (error) {
        let modelMarkers = window.monaco.editor
          .getModelMarkers({})
          .map(
            m => `Error: (${m.startLineNumber},${m.startColumn}) ${m.message}`
          )
          .join("\n");
        console.log(modelMarkers);

        // console.error(error);
        // console.log(

        //
        //
        // );
        alert(modelMarkers);
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
.editor {
  height: calc(80vh - 150px);
}
</style>
