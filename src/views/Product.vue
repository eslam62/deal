<template>
  <div class="product">
    <div class="container max-w-6xl px-5 mx-auto mt-10 mb-5" v-if="product">
        <nav class="w-full p-3 m-4 font-sans rounded bg-grey-light">
            <ol class="flex items-center max-w-2xl px-4 mx-auto space-x-2 sm:px-6 lg:max-w-7xl lg:px-8">
                <li><a :href="$router.resolve({name: 'Vendor', params: { id: product.vendor.id, slug: sanitizeTitle(`${product.vendor.name}`) }}).href" class="mr-2 text-sm font-medium text-gray-900">{{ product.vendor.name }}</a></li>
                <li><span class="mx-2">\</span></li>
                <!-- <li><a href="#" class="font-bold text-blue">Library</a></li>
                <li><span class="mx-2">/</span></li> -->
                <li class="text-sm">
                   <a class="font-medium text-gray-500 hover:text-gray-600" href="#">{{ product.name}}</a>
                </li>
            </ol>
        </nav>
        <div class="grid grid-cols-6 gap-2">
            <div class="col-span-full md:col-span-4 md:mr-10">
                <img  v-if="product.photo" v-bind:src="product.photo" class="mx-auto rounded-lg h-96 md:h-64 lg:h-132">
            </div>
            <div class="md:col-start-5 md:col-end-7 col-span-full">
                <p class="mt-2 mt-5 text-4xl font-light sm:mt-0 leading-large ">{{ product.name }}</p>
                <span v-if="product.discount_price > 0">
                    <p class="pt-5 mt-3 text-2xl tracking-wide">{{ currency }}{{ product.discount_price.toFixed(2) }}</p>
                <p class="pb-5 mt-3 text-2xl tracking-wide">{{ currency }}<span class="line-through">{{ product.price.toFixed(2) }}</span> </p>
                </span>
                <span v-else>
                    <p class="pt-5 mt-3 text-2xl tracking-wide">{{ currency }}{{ product.price.toFixed(2) }}</p>
                </span>
                <!-- <p class="pb-5 mt-3 text-2xl tracking-wide">{{ currency }}<span class="line-through">{{ product.price.toFixed(2) }}</span> </p> -->
                <p class="pb-5 leading-7 text-gray-600">{{ product.description }}</p>
                <!-- <p class="my-5 text-sm font-bold text-black md:text-xl md:mb-36"></p> -->
                    
                <div class="flex mb-20 space-x-4" v-if="product.vendor.vendor_type.slug != 'service'">
                    <div class="p-2 text-sm font-light text-black text-gray-500 border border-green-600" v-if="product.deliverable == 1">Deliverable</div>
                    <div class="p-2 text-xs font-light text-black text-gray-500 border border-red-600" v-if="product.deliverable == 0">Not Deliverable</div>
                    <div class="p-2 text-xs font-light text-black text-gray-500 border border-gray-500 ">{{ product.capacity }} {{ product.unit }}</div>
                    <div class="p-2 text-xs font-light text-black text-gray-500 border border-gray-500">{{ product.package_count }} Item(s)</div>
                </div>
                <div class="flex" v-if="product.vendor.vendor_type.slug != 'service'">
                    <p class="flex items-center px-2 text-xs">Quantity:</p>
                    <!-- <div> -->
                        <div class="flex items-center">
                            <button
                            class="p-2 m-2 font-extrabold text-green-500 transition duration-500 ease-in-out transform border-transparent cursor-pointer rounded-xl hover:bg-green-50 hover:-translate-y-1 hover:scale-110"
                            @click="decrement()">
                            -
                            </button>
                            <div class="w-10 h-10 overflow-hidden bg-gray-100 shadow-md rounded-xl">
                            <input class="w-full h-full font-bold text-center text-1xl"
                            v-model="quantity" />
                            </div>
                            <button
                            class="p-2 m-2 font-extrabold text-green-500 transition duration-500 ease-in-out transform rounded cursor-pointer hover:bg-green-50 hover:-translate-y-1 hover:scale-110"
                            @click="increment(product)">
                            +
                            </button>
                        </div>
                    <!-- </div> -->
                </div>
                <div class=""  v-if="product.available_qty > 0">
                    <p class="my-5 text-xs">
                        Instock: <span>{{ product.available_qty }}</span>
                    </p>
                </div>
                <div v-else>
                    <p class="my-5 text-xs">
                        Out of stock
                    </p>
                </div>
                 <div class="mt-1" v-if="settings"> 
                    <button 
                        v-if="product.vendor.vendor_type.slug != 'service'"
                        :style="{ 'background-color': settings.colors.primaryColor }" 
                        @click="addToCart(product)" 
                        class="w-full px-3 py-5 mr-5 text-xs font-semibold text-white md:py-4">
                        Add {{ currency }} {{ totalPrice.toFixed(2) }}
                    </button>
                    <button 
                    v-else
                        :style="{ 'background-color': settings.colors.primaryColor }" 
                        @click="addToCart(product)" 
                        class="w-full px-3 py-5 mr-5 text-xs font-semibold text-white md:py-4">
                        Continue
                    </button>
                </div>
            </div>
        </div>
        <div class="mt-20" v-if="product.option_groups">
            <p class="mb-3 text-4xl" v-if="product.option_groups.length != '0'">Options</p>
            <p class="mt-4 text-sm text-gray-600" v-if="product.option_groups.length != '0'">Select options to add them to the product</p>

            <div  v-for="option_group in product.option_groups" :key="option_group.id">
                <p class="mt-4 text-xs font-medium md:text-xl">{{ option_group.name }}</p>
                <div class="grid gap-4 md:grid-cols-2">
                    <div class="mt-5 bg-white shadow-md rounded-xl md:w-96" v-for="(option, index) in option_group.options" :key="index">
                        <div class="flex mx-auto">
                            <div class="flex items-center flex-shrink-0">
                                <img class="object-contain w-24 h-24"  v-if="option" v-bind:src="option.photo" alt="">
                            </div>
                            <div class="self-center px-2 pt-2 md:p-4">
                                <div class="font-semibold text-black">{{ option.name }}</div>
                                <p class="text-xs text-gray-500">{{ option.description }}</p>
                            </div>
                            <div class="self-center p-1">
                                <p class="text-xs text-center text-black">{{ currency }}{{ option.price }}</p>
                            </div>
                            <div class="self-center p-2">
                                <label class="">
                                    <div class="relative flex items-center w-4 h-4 bg-white border-2 border-gray-400 rounded-full ">
                                        <input type="radio" class="absolute opacity-0" v-model="selectedOption" :value="option">
                                        <svg class="hidden w-4 h-4 text-green-500 pointer-events-none fill-current" viewBox="0 0 20 20">
                                            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/>
                                        </svg>
                                    </div>
                                </label>
                                <!-- <div v-if="selectedOption"> -->
                                <!-- checked: {{ selectedOption[index] }} -->
                                <!-- </div> -->
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Recommended/>
  </div>
  <Download/> 
</template>

<script>
import axios from 'axios'
import Recommended from '@/components/Recommended.vue'
import { notify } from "@kyvg/vue3-notification"
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Download from '@/components/Downloads.vue'
import 'sweetalert2/src/sweetalert2.scss'
export default {
    name: 'product',
    components: {
        Recommended,
        Download
    },
    data () {
      return {
          product: null,
          currency: null,
          quantity: 1,
          selectedOption: [], 
          animationDown :{
              translateY:'translateY(-100%)',
              // eslint-disable-next-line no-dupe-keys
              translateY:'translateY(100%)'
          },
          settings: null,
          base_url: this.$store.state.baseUrl
      }
    },
    computed: {
        totalPrice() {

            let total
            if(this.product.discount_price != 0)
            {
                total  = Number(this.quantity) * Number(this.product.discount_price)
            }else{
                total =  Number(this.quantity) * Number(this.product.price)
            }
            
            if(this.selectedOption){
                this.selectedOption.forEach((item, i) => {
                    total += Number(this.selectedOption[i].price);
                    console.log(total)
                })
            }
          return total;
        },
    },
    mounted () {
      
      axios.get(this.base_url+'api/products/' + this.$route.params.id)
      .then((response) => {
        this.product = response.data
        console.log(this.product)
     })
      .catch(error => console.log(error))

      axios.get(this.base_url+'api/app/settings')
      .then((response) => {
        this.settings = response.data
        this.currency = this.settings.strings.currency
      })
      .catch(error => console.log(error))
    },

    created() {
      this.getCurrency();
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

         getCurrency() {
             this.$store.commit('loading', true)
            let setting;
            axios.get(this.base_url+'api/app/settings')
            .then( (response) => {
                this.$store.commit('loading', false)
                setting = response.data;
                this.currency = setting.strings.currency
            })

            return this.currency;
        },

        addToCart(product, quantity = this.quantity, selectedOption = this.selectedOption) {
            // console.log(selectedOption)
            if(product.available_qty >= 1){
                if(selectedOption)
                {
                    this.$store.commit('addToCart',{ product, quantity, selectedOption});
                }else{
                    this.$store.commit('addToCart',{ product, quantity});
                }
            }else {
                // if(product.vendor.vendor_type.slug != 'service') {
                    Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Product out of stock',
                    })
                // }
                
            }
        },

        increment(product) {
            if(this.quantity >= product.available_qty){
               notify({
                    type: "error",
                    title: "Cart",
                    text: "Product out of stock",
                });
            }else {
                 this.quantity++;
                 if(product.discount_price != 0) {
                     this.totalPrice = product.discount_price + this.quantity;
                 }else{
                      this.totalPrice = product.price + this.quantity;
                 }
               
            }
        },

        decrement() {
            if(this.quantity === 1)
            {
                notify({
                    type: "error",
                    title: "Cart",
                    text: "You cannot add 0 product",
                });
            }else{
                this.quantity--
            }
        },

    }
}
</script>

