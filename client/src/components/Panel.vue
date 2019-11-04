<template>
  <div class="card card-stats" :class="{ 'danger-danger' : alert }">
    <div v-if="background" class="card-bg" :style="{backgroundImage:background}"></div>

    <div class="card-body">
      <div class="title-grid">
        <div class="icon-big">
          <i v-if="icon" :class="icon"></i>
          <img v-if="img" :src="img" class="img-fluid" />
        </div>
        <div class="text-right">
          <p class="title">{{title}}</p>
          <p class="subtitle">{{subtitle}}</p>
        </div>
      </div>

      <div class="row">
        <Table v-if="type == 'table'" :values="values" :labels="labels" :extra="extra"></Table>

        <Chat v-if="type == 'chat'" :values="values" :labels="labels" :extra="extra"></Chat>

        <BarGraph v-if="type == 'bar'" :values="values" :labels="labels" :extra="extra"></BarGraph>

        <LineGraph v-if="type == 'line'" :values="values" :labels="labels" :extra="extra"></LineGraph>

        <div class="col-12" v-if="type == 'value'">
          <h1 class="value text-center">{{value}}</h1>
        </div>

        <div class="col-12" v-if="content" v-html="content"></div>
      </div>
    </div>

    <div class="card-footer">
      <div class="stats">
        <div>
          <i class="fa fa-refresh"></i>
          <span class="text-small">{{updated_at}}</span>
          <span class="text-small float-right">{{fetched_at}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chat from "./Chat";
import Table from "./Table";
import BarGraph from "./BarGraph";
import LineGraph from "./LineGraph";

export default {
  name: "Panel",
  components: {
    Chat,
    Table,
    BarGraph,
    LineGraph
  },
  props: [
    "id",
    "title",
    "icon",
    "type",
    "size",
    "value",
    "values",
    "labels",
    "updated_at",
    "minValue",
    "maxValue",
    "content",
    "fetched_at",
    "subtitle",
    "alert",
    "img",
    "extra",
    "background"
  ]
};
</script>

<style>
</style>
