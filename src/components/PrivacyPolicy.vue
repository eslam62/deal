<template>

    <!-- <div class="container max-w-6xl p-5 mx-auto "> -->
        <iframe class="w-screen h-screen" :src="`${this.$store.state.baseUrl}privacy/policy`" frameborder="0">
        </iframe>
    <!-- </div> -->

    <Download/>
</template>
<script>
import Download from '@/components/Downloads.vue'
import axios from 'axios'
export default {
    components: {
        Download,
    },
  data () {
    return {
        settings: null,
        base_url: this.$store.state.baseUrl
    }
  },
};
</script>