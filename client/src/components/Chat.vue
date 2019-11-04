<template>
  <div class="col-12">
    <table class="table table-striped table-sm" style="overflow:auto">
      <tr v-if="labels">
        <th :class="extra" v-for="(val,i) in labels" :key="i" v-html="val"></th>
      </tr>
      <tr v-for="(row,ii) in values" :key="ii">
        <td :class="extra" v-for="(val,i) in row" :key="i" v-html="val"></td>
      </tr>
    </table>
    <input type="text" @keyup.enter="sendMsg()" v-model="chat" />
  </div>
</template>

<script>
export default {
  name: "Chat",
  props: ["labels", "values", "extra"],
  data() {
    return {
      chat: ""
    };
  },
  methods: {
    sendMsg() {
      this.$root.socket.emit("chat", this.chat);
      this.chat = "";
    }
  }
};
</script>

<style>
</style>
