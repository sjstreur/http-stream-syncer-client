<template>
    <div>
        <p v-if="!isPlaying">Awaiting {{ currentUsers - amountOfReadyUsers }} clients to buffer the stream...</p>
        <audio v-if="streamUrl" ref="audioPlayer" :src="streamUrl" type="audio/mpeg" muted="true" @canplay="userIsReady" controls preload>
        </audio>
        <!-- howler player -->

        <!-- <button @click="howler.mute(false);">unmute</button> -->
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component';
    import { Howl, Howler } from 'howler';

    @Component
    export default class Autoplay extends Vue {
        streamUrl = '';
        sound: Howl | null = null;     
        howler = Howler;
        isPlaying = false;
        amountOfReadyUsers = 0;
        currentUsers = 0;
        
        get audioPlayer(): HTMLAudioElement {
            return this.$refs.audioPlayer as HTMLAudioElement;
        }

        mounted() {
            const localStorageItem = localStorage.getItem('streamUrl');
            this.currentUsers = parseInt(localStorage.getItem('currentUsers') as string); 
            this.streamUrl = localStorageItem ? localStorageItem : '';
            this.$nextTick(() => {
                this.audioPlayer.muted = true;
                this.audioPlayer.load();
            });

            (this as any).sockets.subscribe('goPlay', () => {   
                this.isPlaying = true;
                this.audioPlayer.play();
            // window.alert('started playback');

            });

            (this as any).sockets.subscribe('readyUsersChange', (data: any) => {   
                this.amountOfReadyUsers = data;
            });
        }

        async userIsReady() {
            console.log('canplay');
            try {
                await (this as any).axios.post(`http://${location.hostname}:3000/readyToPlay`, {});
            } catch (e) {
                console.log('something has gone wrong readying up');
            }
        }
    }
</script>