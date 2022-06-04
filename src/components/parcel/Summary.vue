<template>
    <div class="mt-10 sm:mt-0" v-show="isLoggedIn">
        <div class="max-w-xl mx-auto overflow-hidden shadow sm:rounded-md">
            <div class="px-4 py-5 bg-white sm:p-6">
                <p class="mb-5 text-2xl font-extrabold">Summary</p>
                <div class="flex flex-col">
                    <p class="mt-5 mb-1 text-sm font-medium ">Package Type</p>
                    <div class="p-5 border-2 border-green-500 rounded-md shadow-md">
                        <div class="flex flex-row space-x-2" v-if="sumPackage">
                            <img :src="sumPackage.photo" class="w-8 h-8">
                            <div>
                                <p class="text-xs font-medium text-gray-500">{{ sumPackage.name }}</p>
                                <p class="text-xs font-light text-gray-500">{{ sumPackage.description }}</p>
                            </div>
                        </div>
                    </div>
                    <p class="mt-5 mb-1 text-sm font-medium ">Courier Vendor</p>
                    <div class="p-5 border-2 border-green-500 rounded-md shadow-md">
                        <div class="flex flex-row space-x-2" v-if="sumCourier">
                            <img :src="sumCourier.logo" class="w-8 h-8">
                            <div>
                                <p class="text-xs font-medium text-gray-500">{{ sumCourier.name }}</p>
                                <p class="text-sm font-light text-gray-500">{{ sumCourier.description }}</p>
                            </div>
                        </div>
                    </div>
                    <p class="mt-5 mb-1 text-sm font-medium ">Delivery Details</p>
                    <div class="p-5 border-2 border-green-500 rounded-md shadow-md">
                        <div class="grid gap-2 md:grid-cols-2">
                            <div>
                                <p class="text-xs font-bold text-gray-700">Pickup</p>
                                <p class="text-xs font-normal text-gray-500" v-if="from">{{ from.address }}</p>

                                <!-- <p class="text-xs font-bold text-gray-700">Stops</p>
                                <p class="text-xs font-normal text-gray-500" v-if="sumTo">{{ sumTo.name }}</p> -->
                            </div>
                            <div>
                                <!-- <p class="text-xs font-bold text-gray-700">From</p>
                                <p class="text-xs font-normal text-gray-500" v-if="sumFrom">{{ sumFrom.name }}</p> -->

                                <p class="text-xs font-bold text-gray-700">Dropoffs</p>
                                <p class="text-xs font-normal text-gray-500" v-if="to">{{ to.address }}</p>
                            </div>
                        </div>
                        
                        <div class="grid gap-2 mt-3 md:grid-cols-2">
                            <div>
                                <p class="text-xs font-bold text-gray-700">Date</p>
                                <p class="text-xs font-normal text-gray-500" v-if="date">{{ date }}</p>
                            </div>
                            <div>
                                <p class="text-xs font-bold text-gray-700">Time</p>
                                <p class="text-xs font-normal text-gray-500" v-if="time">{{ time }}</p>
                            </div>
                        </div>
                    </div>
                    <p class="mt-5 mb-1 text-sm font-medium ">Recipient Info</p>
                    <div class="p-5 border-2 border-green-500 rounded-md shadow-md">
                        <div class="flex justify-between">
                            <div>
                                <p class="text-xs font-bold text-gray-700">Name</p>
                                <p class="text-xs font-normal text-gray-500" v-if="fullname">{{ fullname }}</p>
                            </div>
                            <div>
                                <p class="text-xs font-bold text-gray-700">Phone</p>
                                <p class="text-xs font-normal text-gray-500" v-if="phone">{{ phone }}</p>
                            </div>
                        </div>
                        <p class="text-xs font-bold text-gray-700">Note</p>
                        <p class="text-xs font-normal text-gray-500" v-if="note">{{ note }}</p>
                    </div>
                    <div class="p-5 mt-5 mb-1 border-2 border-green-500 rounded-md shadow-md">
                        <div class="flex justify-between">
                            <div>
                                <p class="text-xs font-bold text-gray-700">Name</p>
                                <p class="text-xs font-normal text-gray-500" v-if="fullname1">{{ fullname1 }}</p>
                            </div>
                            <div>
                                <p class="text-xs font-bold text-gray-700">Phone</p>
                                <p class="text-xs font-normal text-gray-500" v-if="phone">{{ phone1 }}</p>
                            </div>
                        </div>
                        <p class="text-xs font-bold text-gray-700">Note</p>
                        <p class="text-xs font-normal text-gray-500" v-if="note">{{ note1 }}</p>
                    </div>
                    <p class="mt-5 mb-1 text-sm font-medium ">Package Parameters</p>
                    <div class="p-5 border-2 border-green-500 rounded-md shadow-md">
                        <div class="flex justify-between">
                            <div>
                                <p class="text-xs font-bold text-gray-700">Weight</p>
                                <p class="text-xs font-normal text-gray-500" v-if="weight">{{ weight }}</p>
                            </div>
                            <div>
                                <p class="text-xs font-bold text-gray-700">Length</p>
                                <p class="text-xs font-normal text-gray-500" v-if="length">{{ length }}</p>
                            </div>
                        </div>
                        <div class="flex justify-between">
                            <div>
                                <p class="text-xs font-bold text-gray-700">Width</p>
                                <p class="text-xs font-normal text-gray-500" v-if="width">{{ width }}</p>
                            </div>
                            <div>
                                <p class="text-xs font-bold text-gray-700">Height</p>
                                <p class="text-xs font-normal text-gray-500" v-if="height">{{ height }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="px-4 py-3 text-right bg-gray-50 sm:px-6">
              <Navigation></Navigation>
            </div>
        </div>
    </div>
</template>
<script>
import Navigation from './Navigation.vue'
import axios from 'axios'
export default {
    components: {
        Navigation
    },
    data() {
        return {
            base_url: this.$store.state.baseUrl,
            isLoggedIn: false,
            user: null,
            fullname: null,
            sumPackage: null,
            sumPackages: null,
            sumCourier: null,
            sumCouriers: null,
            AuthStr: 'Bearer ' + localStorage.getItem('authToken'),
            from: null,
            sumFrom: null,
            to: null,
            sumTo: null,
            fullname: null,
            phone: null,
            note: null,
            weight: null,
            width: null,
            height: null,
            length: null,
            date: null,
            time: null,
            fullname1: null,
            phone1: null,
            note1: null,
        }
    },
    mounted() {
        this.fullname = localStorage.getItem('fullname')
        this.fullname1 = localStorage.getItem('fullname1')
        this.date = localStorage.getItem('date')
        this.time = localStorage.getItem('time')
        this.phone = localStorage.getItem('phone')
        this.phone1 = localStorage.getItem('phone1')
        this.note = localStorage.getItem('note')
        this.note1 = localStorage.getItem('note1')
        this.height = localStorage.getItem('height')
        this.width = localStorage.getItem('width')
        this.length = localStorage.getItem('plength')
        this.weight = localStorage.getItem('weight')
        let package_id = localStorage.getItem('packageType')
        let courier_id = localStorage.getItem('courier')
        let fromId = localStorage.getItem('from')
        let toId = localStorage.getItem('to')

        if (localStorage.getItem("authToken")) {
            this.isLoggedIn = true;
            this.user = JSON.parse(localStorage.getItem("user"))
        }

        if(this.isLoggedIn == false) {
            this.$router.push("/login");
        }

        if(localStorage.getItem('packageType')){
            this.$store.commit('loading', true)
            axios.get(this.base_url+'api/package/types' )
            .then((response)=> {
                this.$store.commit('loading', false)
                this.sumPackages = response.data;
                let package_id = localStorage.getItem('packageType')
                this.sumPackage = this.sumPackages.find(p => p.id == package_id)
                // console.log(this.sumPackage)
            })
            .catch(error => console.log(error))

        }

        
        axios.get(this.base_url+'api/vendors?type=package&package_type_id='+package_id, 
        { headers: { Authorization: this.AuthStr }})
        .then((response)=> {
            this.sumCouriers = response.data.data
            let courier_id = localStorage.getItem('courier')
            this.sumCourier = this.sumCouriers.find(c => c.id == courier_id)
        })
        .catch(error => console.log(error))
        

        
        axios.get(this.base_url+'api/delivery/addresses/'+ fromId, 
        { headers: { Authorization: this.AuthStr }})
        .then((response) => {
            this.from = response.data.data
        })
        .catch(error => console.log(error))


        axios.get(this.base_url+'api/delivery/addresses/'+ toId, 
        { headers: { Authorization: this.AuthStr }})
        .then((response) => {
            this.to = response.data.data
        })
        .catch(error => console.log(error))

        

    },  
}
</script>