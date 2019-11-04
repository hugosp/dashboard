<template>
  <div id="app" :class="{'danger-danger-bg' : alert}">
    <nav class="navbar navbar-dark bg-dark navbar-expand-lg">
      <a class="navbar-brand" href="#">Major Tom to Ground Control</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mr-auto text-capitalize">
          <li class="nav-item" v-for="t in types" :key="t">
            <a :class="['nav-link', t === type ? 'active' : '']" @click="setType(t)">{{t}}</a>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link">
              <label style="margin:0;">
                <input type="checkbox" @click="soundoff=!soundoff" /> Ljud av
              </label>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="showConfig = true">Config</a>
          </li>
          <li class="nav-item">
            <a class="nav-link">Anslutna klienter : {{clients}}</a>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container-grid" ref="container">
      <div
        v-for="panel in panels"
        :key="panel.id"
        :style="{
          ...panel.style,
          gridColumn: 'span ' +(panel.size && panel.size.x) || 1,
          gridRow: 'span ' + (panel.size && panel.size.y) || 1
        }"
      >
        <Panel v-bind="panel"></Panel>
      </div>
    </div>
  </div>
</template>

<script>
import Panel from "./components/Panel";
export default {
  name: "App",
  components: { Panel },
  data() {
    return {
      type: "all",
      types: ["all"],
      alert: false,
      alertMsg: [],
      soundoff: false,
      soundrunning: false,
      panelData: {},
      showConfig: false,
      clients: 0
    };
  },

  // danger-danger-bg
  watch: {
    panels: {
      handler: function() {
        const alerts = Object.values(this.panels).filter(panel => panel.alert);
        this.alert = alerts.length;
        this.soundTheAlarm(alerts);
      },
      deep: true
    }
  },

  created() {
    this.$root.socket.on("update", data => {
      this.$set(this.panelData, data.type, data.content);
      this.clients = data.clients.length;
      if (this.types.indexOf(data.type) === -1) {
        this.types.push(data.type);
      }
    });
  },
  computed: {
    panels() {
      if (this.type == null || this.type == "all") {
        const newData = [];
        Object.values(this.panelData).forEach(i => {
          Object.values(i).forEach(e => newData.push(e));
        });
        return newData;
      }
      return (this.panelData && this.panelData[this.type]) || {};
    }
  },
  methods: {
    setType(type) {
      this.type = type;
    },
    soundTheAlarm(alerts) {
      if (this.alert && !this.soundoff && !this.soundrunning) {
        let txt =
          "attention all personnel, there could be an error in the unitedprofile system";
        if (alerts.length === 1) {
          txt = "attention all personnel, " + alerts[0].alert_txt;
        }
        this.soundrunning = true;
        var msg = new SpeechSynthesisUtterance();
        msg.text = txt;
        window.speechSynthesis.speak(msg);
        setTimeout(() => {
          this.soundrunning = false;
          this.soundTheAlarm();
        }, 30000);
      }
    }
  }
};
</script>

<style>
</style>
