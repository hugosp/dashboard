<template>
  <div class="col-12">
    <table class="table table-striped table-sm">
      <tr v-if="labels">
        <th :class="extra" v-for="(val,i) in labels" v-html="val" :key="i"></th>
      </tr>
      <tr v-for="(row,ii) in values" :key="ii">
        <td :class="extra" v-for="(val,i) in row" v-html="val" :key="i"></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: ["labels", "values", "extra"]
};
</script>

<style>
</style>
