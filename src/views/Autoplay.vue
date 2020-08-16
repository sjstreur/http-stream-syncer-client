<template>
    <div>
        <audio v-if="streamUrl !== ''" autoplay preload controls>
            <source :src="streamUrl" type="audio/mpeg">
        </audio>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component';

    @Component
    export default class Autoplay extends Vue {
        streamUrl: string | null = '';

        mounted() {
            this.streamUrl = localStorage.getItem('streamUrl');
            console.log(this.streamUrl);
            
        }
    }
</script>