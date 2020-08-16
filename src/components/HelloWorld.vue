<template>
  <div>
    <ul>
      <li>Current users = {{currentUsers}}</li>
      <li>Stream leader = {{isStreamLeader}}</li>
      <li>streamUrl = {{streamUrl}}</li>
    </ul>
    <button @click="onPressPlay">play for everyone</button>
    <div v-if="streamUrl && refresh">
      <audio @loadedmetadata="loadedMetaData = true; " ref="audio" preload controls>
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
  public loadedMetaData = false;
  public hasSetToEnd = false;
  public refresh = true;

  get audioElement(): any {
    // return this.$refs.audio;
    return document.getElementsByTagName('audio')[0];
  }

// https://www.w3schools.com/tags/ref_av_dom.asp
  async mounted() {
    

    // document.addEventListener('beforeunload', () => this.$socket.emit('disconnected'));
    const data = await (this as any).axios.get(`http://${location.hostname}:3000/streaming-info`);
    this.isStreamLeader = data.data.streamLeader;
    this.streamUrl = data.data.streamingUrl;
    localStorage.setItem('streamUrl', this.streamUrl);

    (this as any).sockets.subscribe('currentUserChange', (data: any) => {   
      this.currentUsers = data;
    });

    (this as any).sockets.subscribe('startPlaying', (data: any) => {
      console.log('lol');
      
      (this as any).$router.push({ name: 'play' }).catch((err: any) => console.log(!err ? '' : ''));
      // this._refreshPlayer();
      // setTimeout(() => {
      //   this.audioElement.load();
      //   setTimeout(() => {
      //     this.audioElement.play();
      //   }, 3000);
      // }, 2000);
      
    });
  }

  private _refreshPlayer(): void {
    this.refresh = false;
    this.$nextTick(() => {
      this.refresh = false;
    });
  }

  onPressPlay(e: Event): void {
    // e.preventDefault();
    console.log(e);
    
    // this.audioElement.pause();
    (this as any).$socket.emit('play', null);
    // if (this.isStreamLeader) {
      
    //   }
    // if (this.loadedMetaData && !this.hasSetToEnd) {
    //   this.hasSetToEnd = true;
    //   console.log(Math.round(this.audioElement.duration - 5), this.audioElement.duration);
      
    //   this.audioElement.currentTime = Math.round(this.audioElement.duration - 5);
    // }
    // console.log('start buffering');
  }

  // onBuffered(): void {
  //   console.log('playing, buffering ended');
  // }
}
</script>
