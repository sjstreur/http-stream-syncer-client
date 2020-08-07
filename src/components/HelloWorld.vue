<template>
  <div>
    <ul>
      <li>Current users = {{currentUsers}}</li>
      <li>Stream leader = {{isStreamLeader}}</li>
      <li>streamUrl = {{streamUrl}}</li>
    </ul>

    <div v-if="streamUrl">
      <audio @play="onPressPlay" @playing="onBuffered" preload controls>
        <source :src="streamUrl"  type="audio/mpeg">
      </audio>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class HelloWorld extends Vue {
  public currentUsers = 0;
  public isStreamLeader = false;
  public streamUrl = '';
// https://www.w3schools.com/tags/ref_av_dom.asp
  async mounted() {
    document.addEventListener('beforeunload', () => this.$socket.emit('disconnected'));
    const data = await Vue.axios.get(`http://${location.hostname}:3000/streaming-info`);
    this.isStreamLeader = data.data.streamLeader;
    this.streamUrl = data.data.streamingUrl;

    this.sockets.subscribe('currentUserChange', (data) => {
      // console.log('updated');
      
      this.currentUsers = data;
    });
  }

  onPressPlay(): void {
    // if (this.isStreamLeader) {
      
    //   }
    console.log('start buffering');
  }

  onBuffered(): void {
    console.log('playing, buffering ended');
  }
}
</script>
