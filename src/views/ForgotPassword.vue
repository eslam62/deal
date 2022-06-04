<template>
  <div class="container px-5 mx-auto mt-10 mb-5" v-if="settings">
    <div class="">
      <div class="p-5 mx-auto rounded shadow-lg sm:p-12 md:w-1/4">
        <p class="mb-5 text-3xl font-semibold">Forgot Password</p>
        <div>
            <div class="block mb-4">
              <span class="font-light text-gray-600">Phone</span>
              <!-- <vue-tel-input v-model="phone" @change="countryChanged"></vue-tel-input> -->
              <input type="tel" v-model="phone" placeholder="+233000000000" class="block w-full px-3 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div class="w-full mt-8" v-if="settings">
                <button type="button" :style="{ 'background-color': settings.colors.primaryColor }" @click="forgotPassword" class="w-full px-10 py-2 text-center text-white rounded">
                Submit
                </button>
            </div>
        </div>
       

      </div>
    </div>
  </div>
  <Download/>
</template>
<script>
import axios from 'axios'
import { VueTelInput } from 'vue-tel-input'
import Download from '@/components/Downloads.vue'
import { notify } from "@kyvg/vue3-notification"
export default {
  name: "Login",
  components: {
    Download,
    VueTelInput,
  },
  data() {
    return {
      phone: null,
      settings: null,
      base_url: this.$store.state.baseUrl,
      countryCode: null
    };
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
  },

  methods: {
    forgotPassword()
    {
        this.$store.commit('loading', true)
        axios.post(this.base_url+'api/password/reset/init',
        {
            phone: this.phone
        })
        .then((response) => {
           let password = response.data.data
            // console.log(this.settings)
            notify({
                type: "success",
                title: "Forgot Password",
                text: "We've sent you an sms",
            })
        })
        .catch((error) => {
            console.log(error)
            notify({
                type: "error",
                title: "Forgot Password",
                text:  "There is no account associated with provided phone number "+ this.phone,
            })
        })
        .finally(() =>this.$store.commit('loading', false))
    },
    
    countryChanged(country) {
      this.countryCode = country.dialCode
      console.log(this.countryCode)
    },
  }
};
</script>

