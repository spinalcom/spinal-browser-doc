<template>
  <iframe id="main-content-iframe"
          :src="target_url">

  </iframe>
  <!-- <div></div> -->
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
    $route(to, from) {
      if (this.$route.params.id) {
        console.log("watch :)", atob(this.$route.params.id));
        console.log(to, from);
        this.target_url = atob(this.$route.params.id);
      }
    }
  },
  mounted() {
    if (this.$route.params.id) {
      console.log("monted :)", this.$route.params.id);
      this.target_url = atob(this.$route.params.id);
    }
  }
};
</script>

<style>
#main-content-iframe {
  width: 100%;
  height: 100%;
}
</style>
