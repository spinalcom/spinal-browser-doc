<template>
  <div>
    <spinalCategoryItem v-if="item.type == 'item'"
                        :item=item></spinalCategoryItem>
    <spinalCategorySubHeader v-if="item.type == 'subheader'"
                             :item=item></spinalCategorySubHeader>
    <md-divider class="md-inset"
                v-if="item.type == 'divider'"></md-divider>

  </div>
</template>


<script>
import spinalCategorySubHeader from "./spinal-category-type/spinal-category-subheader.vue";
import spinalCategoryItem from "./spinal-category-type/spinal-category-item.vue";

export default {
  name: "spinalCategoryContainer",
  props: ["item"],
  components: { spinalCategorySubHeader, spinalCategoryItem },
  data() {
    return {};
  },
  methods: {
    test: function() {
      console.log("click test");
    }
  }
};
</script>>
