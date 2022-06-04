<template>
    <div  v-if="settings">
        <div v-if="getCookie == false">
            <div class="flex flex-col justify-center p-3 mx-auto text-white bg-blue-300 " v-if="setCookie == 1">
                <div class="justify-center md:space-x-2 md:flex">
                    <span class="self-center">We use cookies to improve your experience on our website. By browsing this website, you agree to our use of cookies.</span>
                    <a class="self-center ml-1 font-semibold text-white underline hover:text-gray-600" target="__blank" :href="`${this.$store.state.baseUrl}privacy/policy`"> Privacy Policy</a>
                    <div @click="cookie" class="p-3 text-center text-white uppercase cursor-pointer w-44 rounded-xl" :style="{ 'background-color': settings.colors.primaryColor }">Accept</div>
                </div>
                <!-- <div class="flex mt-2 md:justify-center">
                    <div @click="cookie" class="p-3 text-center text-white cursor-pointer w-44 rounded-xl" :style="{ 'background-color': settings.colors.primaryColor }">Ok, I understand</div>
                </div> -->
            </div>   
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data () {
        return {
            settings: null,
            base_url: this.$store.state.baseUrl,
            setCookie: 1,
            getCookie: false
        }
    },
    components: {
        //   CookieLaw 
    },

    mounted() {
        this.$store.commit('loading', true)
        axios.get(this.base_url+'api/app/settings')
        .then((response) => {
            this.$store.commit('loading', false)
            this.settings = response.data
            // console.log(this.settings)
        })
        .catch(error => console.log(error))

        if (localStorage.getItem("cookie")) {
            this.getCookie = true
        }
            
    },

    methods: {
        cookie()
        {
            const current = new Date();
            const date = current.getFullYear()+'-'+(current.getMonth()+1)+'-'+current.getDate();
            this.setCookie = '0'
            localStorage.setItem("cookie", date)
        }
    }

}
</script>