<template>
    <div>
        <!-- <audio v-if="streamUrl !== ''" autoplay preload controls>
            <source :src="streamUrl" type="audio/mpeg">
        </audio> -->
        howler player
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component';
    import { Howl } from 'howler';

    @Component
    export default class Autoplay extends Vue {
        streamUrl = '';
        sound: Howl | null = null;

        mounted() {
            const localStorageItem = localStorage.getItem('streamUrl'); 
            this.streamUrl = localStorageItem ? localStorageItem : '';
            console.log(this.streamUrl);
            
            if (this.streamUrl !== '') {
                this.sound = new Howl({
                    src: this.streamUrl,
                    format: ['mp3'],
                    // autoplay: true,
                    loop: true,
                    volume: 1,
                    html5: true,
                    // onload: () => this.sound.play(),
                    // onloaderror: (e, msg) => window.alert(msg),
                    // onplayerror: (e, msg) => console.log('onplayerror', e, msg),
                    // onplay: () => console.log('onplay'),
                    // onend: () => console.log('onend'),
                    // onpause: () => console.log('onpause'),
                    // onrate: () => console.log('onrate'),
                    // onstop: () => console.log('onstop'),
                    // onseek: () => console.log('onseek'),
                    // onfade: () => console.log('onfade'),
                    // onunlock: () => console.log('onunlock'),
                });
                // console.log(this.sound)
                
    
                // sound.play();
            }
        }
    }
</script>