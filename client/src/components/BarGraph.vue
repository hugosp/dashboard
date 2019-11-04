<template>
  <div class="col-12">
    <span ref="bar" class="bar">{{ values.toString() }}</span>
  </div>
</template>

<script>
export default {
  name: "BarGraph",
  props: ["labels", "values", "extra"],
  mounted() {
    $(".bar").peity("bar");
  },
  watch: {
    values: function() {
      $(".bar").peity("bar");
    }
  }
};
</script>

<style>
</style>
