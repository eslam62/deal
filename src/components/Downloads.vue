<template>
    <div class="mt-8 md:mt-20" v-if="settings">
        <div class="pt-5 bg-gray-50">
          <div class="container max-w-6xl px-5 mx-auto">
            <div class="grid gap-4 md:grid-cols-2">
              <div class="self-center pb-14 pt-14">
                  <h4 class="text-sm font-bold leading-relaxed md:text-4xl">Make your online shop easier with our mobile app</h4>
                  <p class="pt-5 text-xs font-light leading-normal text-gray-600 md:text-2l">{{ settings.strings.app_name }} makes online food, grocery, parcel delivery and pharmacy shopping fast and easy. Get groceries delivered and order your favourite foods from the best vendors.</p>
                  <div class="flex flex-row mt-6" v-if="settings">
                    <a :href="settings.strings.androidDownloadLink" target="__blank"><img src="/img/play-store.png" class=" h-9 md:h-20"/></a>
                    <a :href="settings.strings.iosDownloadLink" target="__blank"><img src="/img/app-store.png" class="h-9 md:h-20"/></a>
                  </div>
              </div>
              <div>
                  <img :src="settings.strings.website.websiteFooterImage" class="mx-auto md:h-full "/>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            settings: null,
            base_url: this.$store.state.baseUrl
        }
    },
    mounted() {
        axios.get(this.base_url+'api/app/settings')
        .then((response) => {
            this.settings = response.data
        })
        .catch(error => console.log(error))

    },
}
</script>