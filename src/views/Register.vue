<template>
  <div class="container px-5 mx-auto mt-10 mb-5">
    <div class="p-5 mx-auto rounded shadow-lg sm:p-12 md:w-1/4" v-if="settings">
        <form @submit.prevent="submit">
          <p class="mb-5 text-3xl font-semibold">Register</p>
          
          <div class="block mb-4">
              <span class="font-light text-gray-600">Name</span>
              <input type="text" placeholder="John Doe"
              v-model="details.name" 
              id="name"
              class="block w-full px-2 py-2 mt-1 text-sm border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input">
             
          </div>
          <div class="block mb-4">
              <span class="font-light text-gray-600">Email</span>
              <input type="email"
              placeholder="mail@example.com"
              id="email"
              v-model="details.email" class="block w-full px-2 py-2 mt-1 text-sm border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input">
             
          </div>
          <div class="block mb-4">
              <span class="font-light text-gray-600">Phone</span>
              
              <div class="flex flex-row">
                  <vue-tel-input class="w-24 " v-model="details.country_code" v-bind="bindProps"></vue-tel-input>
                  <input type="tel"
                  v-model="details.phone" 
                  placeholder="0800000000" 
                  id="phone"
                  class="block w-full px-2 py-2 text-sm border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input">
              </div> 
          </div>
          <div class="block mb-4">
              <span class="font-light text-gray-600">Password</span>
              <input type="password"
              v-model="details.password" 
              placeholder="********************" 
              id="password"
              class="block w-full px-2 py-2 mt-1 text-sm border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input">
              <!-- <p v-if="setErrors" class="text-center text-red-400" id="error"></p> -->
          </div>
            <label class="flex">
              <div class="relative flex items-center w-4 h-4 mr-1 bg-white border-2 border-gray-400 rounded">
                  <input type="checkbox" value="agree" v-model="checked" class="absolute opacity-0">
                  <svg class="hidden w-4 h-4 text-green-500 pointer-events-none fill-current" viewBox="0 0 20 20">
                      <path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/>
                  </svg>
              </div>
              <a target="__blank" :href="`${this.$store.state.baseUrl}pages/terms`" class="text-sm font-light">Terms & Conditions</a>
            </label>
          <div class="mt-5" v-if="!checked">
            <div class="w-full px-10 py-2 text-center text-white bg-gray-300 rounded"> Register</div>
          </div>
          <div class="mt-5" v-else>
            <button @click="register" class="w-full px-10 py-2 text-center text-white rounded" :style="{ 'background-color': settings.colors.primaryColor }"> Register</button>
          </div>
                <!-- focus:outline-none focus:shadow-outline-primary -->
        </form>
        <div class="flex justify-center mt-8">
          <p class="text-sm text-gray-600">Already have an account?</p>
          <router-link to="/login" class="ml-2 text-sm text-gray-600 cursor-pointer">Login</router-link>
        </div>
    </div>
  </div>
  <Download/>
</template>
<script>
import axios from 'axios'
import Download from '@/components/Downloads.vue'
import { VueTelInput } from 'vue-tel-input'
import { notify } from "@kyvg/vue3-notification"
export default {
  name: "Home",
  components: {
    VueTelInput,
    Download,
  },
  data: function() {
    return {
      details: {
        name: null,
        email: null,
        password: null,
        phone: null,
        country_code: null
      },
      checked : false,
      settings: null,
      base_url: this.$store.state.baseUrl,
      bindProps: {
        mode: "international",
        defaultCountry: "GH",
        disabledFetchingCountry: false,
        disabled: false,
        disabledFormatting: false,
        // placeholder: "Enter a phone number",
        required: false,
        enabledCountryCode: true,
        enabledFlags: true,
        autocomplete: "on",
        name: "telephone",
        maxLen: 25,
        wrapperClasses: "",
        inputClasses: "",
        dropdownOptions: {
          disabledDialCode: false
        },
        inputOptions: {
          showDialCode: true
        }
      }
    };
  },
  mounted() {

    axios.get(this.base_url+'api/app/settings')
    .then(response => (this.settings = response.data))
    .catch(error => console.log(error))
  },

  methods: {

    register()
    {
      this.$store.commit('loading', true)
      axios.post(this.base_url+'api/register',this.details)
      .then((response) => {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("user",JSON.stringify(response.data.user));
        console.log(response)
          notify({
          type: "success",
          title: "Register",
          text: response.data.message,
        });
        window.location.href = "/"
      })
      .catch((error) => {
        // if(error.response) {
          // if(error.response.status == '400')
          // {
            notify({
              type: "error",
              title: "Registration failed",
              text:  "Email or phone already taken",
            })
          // }
        // }
      })
      .finally(() => this.$store.commit('loading', false))
    }
    
    // ...mapActions("auth", ["sendRegisterRequest"]),

    // register: function() {
    //   this.$store.commit('loading', true)
    //   this.sendRegisterRequest(this.details, ).then(() => {
    //     this.$store.commit('loading', false)
    //   });
    // },
  }
};
</script>
