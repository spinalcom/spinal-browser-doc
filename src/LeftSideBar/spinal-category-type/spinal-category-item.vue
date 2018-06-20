<template>
  <div>
    <md-list-item v-if="this.item.children && this.item.children.length > 0"
                  class="md-elevation-0"
                  :class="{ 'left-selected': btoa(item.target_url) == $route.params.id }"
                  md-expand>
      <router-link :to="btoa(item.target_url)"
                   class="md-list-item-text">
        <span>{{item.label}}</span>
      </router-link>

      <md-list class="md-list-no-padding"
               slot="md-expand">
        <md-list-item v-for="it in item.children"
                      v-bind:key="it.label"
                      :class="{ 'left-selected': btoa(it.target_url) == $route.params.id }"
                      :to="btoa(it.target_url)"
                      class="md-inset md-elevation-0">
          {{it.label}}
        </md-list-item>
      </md-list>
    </md-list-item>
    <md-list-item v-else
                  :class="{ 'left-selected': btoa(item.target_url) == $route.params.id }"
                  :to="btoa(item.target_url)">
      <span class="md-list-item-text">{{item.label}}</span>
    </md-list-item>

  </div>
</template>


<script>
export default {
  name: "spinalCategoryExpand",
  props: ["item"],
  data() {
    return {};
  },
  methods: {
    btoa: function(str) {
      return btoa(str);
    }
  }
};
</script>


<style>
.md-list-item-text {
  color: inherit !important;
  text-decoration: none !important;
}
.md-list-no-padding {
  padding: 0;
}
.left-selected {
  background-color: #4d7db3;
  text-decoration: none !important;
}
.left-selected > a > div {
  color: white !important;
}
</style>
