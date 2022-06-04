<template>
    <div class="flex justify-between mx-auto md:max-w-full">
        
        <div class="flex flex-col hidden p-2 mt-8 md:block w-72" v-if="settings">
            <img v-if="settings" :src="settings.strings.website.websiteIntroImage" class=" w-44">
            <p class="pt-5 text-sm font-light leading-normal text-gray-600 md:text-2l">
                {{ settings.strings.app_name }} makes online food, grocery, 
                parcel delivery and pharmacy shopping fast and easy. 
                Get groceries delivered and order your favourite foods from the best vendors.
            </p>
            <div class="flex flex-row mt-4">
                <a :href="settings.strings.androidDownloadLink" target="__blank">
                    <img src="/img/play-store.png" class=" h-9"/>
                </a>
                <a :href="settings.strings.iosDownloadLink" target="__blank">
                    <img src="/img/app-store.png" class="h-9"/>
                </a>
            </div>
        </div>
        <div class="self-center max-w-6xl p-5" v-if="settings">
            <div class="flex flex-col mx-auto">
                <p class="text-2xl font-medium text-black">Everything you need, delivered now</p>
                <p class="my-2 text-xs font-light text-black">Discover local vendors that deliver to your doorstep</p>
                
            </div>
            <div class="">
                <p class="mt-3 text-sm font-light">Choose a service</p>
                <div class="grid md:grid-cols-3 md:gap-x-5">
                   <div v-for="(vendor) in vendors" :key="vendor.id" class="my-4">
                            <a v-if="vendor" :href="`${vendor.id}/`+sanitizeTitle(`${vendor.slug}`)">
                                <div class="flex flex-row items-center p-3 rounded-md shadow w-72 h-28 bg-gray-50">
                                    <img  v-if="vendor" v-bind:src="vendor.logo" class="w-16 h-16 mb-3 ">
                                    <div class="ml-2">
                                        <p class="text-sm font-bold">{{vendor.name}}</p>
                                        <p class="text-xs">{{vendor.description}}</p>
                                    </div>
                                </div>
                            </a>
                        
                    </div>
                    
                </div>
            </div>
        </div>
        
        <div class="flex hidden md:block" v-if="settings">
            <img src="/img/landingpage1.jpg" class="h-full w-72" alt="">
        </div>
    </div>
    <Download/> 
</template>
<script>
import axios from 'axios'
import { SearchIcon } from '@heroicons/vue/outline'
import { StarIcon } from '@heroicons/vue/solid'
import Download from '@/components/Downloads.vue'
export default {
  name: 'Vendors',
  components: {
    SearchIcon,
    StarIcon,
    Download,
  },
  
  data () {
    return {
      vendors: null,
      settings: null,
      base_url: this.$store.state.baseUrl,
      search: null,
      types: null
    }
  },
  
  mounted () {

    axios.get(this.base_url+'api/app/settings')
    .then((response) => {
        this.settings = response.data
    })
    .catch(error => console.log(error))

    axios.get(this.base_url+'api/vendor/types')
    .then((response) => {
        this.vendors = response.data
    })
    .catch(error => console.log(error))

  },

  methods: {

    sanitizeTitle(title) {
      var slug = "";
      // Change to lower case
      var titleLower = title.toLowerCase();
      // Letter "e"
      slug = titleLower.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, 'e');
      // Letter "a"
      slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, 'a');
      // Letter "o"
      slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, 'o');
      // Letter "u"
      slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, 'u');
      // Letter "d"
      slug = slug.replace(/đ/gi, 'd');
      // Trim the last whitespace
      slug = slug.replace(/\s*$/g, '');
      // Change whitespace to "-"
      slug = slug.replace(/\s+/g, '-');
      
      return slug;
    },

    
  },

}
</script>