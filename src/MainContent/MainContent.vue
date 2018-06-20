<template>
  <iframe id="main-content-iframe"
          :src="target_url">

  </iframe>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      target_url: ""
    };
  },
  watch: {
    $route() {
      if (this.$route.params.id) {
        this.target_url = atob(this.$route.params.id);
      }
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.target_url = atob(this.$route.params.id);
    }
  }
};
</script>

<style>
#main-content-iframe {
  width: 100%;
  height: 100%;
  background-color: white;
}
</style>
