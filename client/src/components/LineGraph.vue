<template>
  <div class="col-12">
    <span class="line">{{ values.toString() }}</span>
  </div>
</template>

<script>
export default {
  name: "LineGraph",
  props: ["labels", "values", "extra"],
  mounted() {
    $(".line").peity("line");
  },
  watch: {
    values: function() {
      $(".line").peity("line");
    }
  }
};
</script>

<style>
</style>
