<template>
   <div class="flex justify-between">
     <span v-if="this.$route.name === 'payment' | this.$route.name === 'recipientInfo' | this.$route.name === 'packageparameter' | this.$route.name === 'summary'">
     <button class="px-4 py-2 mr-5 text-green-500 uppercase border border-gray-300 rounded" @click="navigatePrevious" v-show="!isFirst()">
       previous
     </button>
     </span>

     <button class="px-4 py-2 text-white uppercase bg-green-500 rounded" @click="navigateNext">
       {{ nextButtonText() }}
     </button>
   </div>
</template>
<script>
import axios from "axios"
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { notify } from "@kyvg/vue3-notification"
export default {
  data() {
    return {
      AuthStr: "Bearer " + localStorage.getItem("authToken"),
      base_url : this.$store.state.baseUrl,
      package_id: localStorage.getItem('packageType'),
      from_id: localStorage.getItem('from'),
      courier: null,
      pickup: null,
      summary: null,
      dropoff_location_id: null,
      pickup_location_id: null,
      address_id: null,
      courier_id: null,
      packageType: null,
      pickup_date: null,
      pickup_time: null,
      recipient_name: null,
      recipient_phone: null,
      weight: null,
      width: null,
      height: null,
      length: null,
      note: null,
      pickup: null,
    };
  },

  mounted(){
    this.dropoff_location_id  = localStorage.getItem('to')
    this.pickup_location_id = localStorage.getItem('from')
    this.address_id = localStorage.getItem('to');
    this.courier_id = localStorage.getItem('courier');
    this.packageType = localStorage.getItem('packageType');
    this.pickup_date = localStorage.getItem('date');
    this.pickup_time = localStorage.getItem('time');
    this.recipient_name = localStorage.getItem('fullname');
    this.recipient_phone = localStorage.getItem('phone');
    this.recipient_name2 = localStorage.getItem('fullname1');
    this.recipient_phone2 = localStorage.getItem('phone1');
    this.weight = localStorage.getItem('weight');
    this.width = localStorage.getItem('width');
    this.height = localStorage.getItem('height');
    this.length = localStorage.getItem('length');
    this.note = localStorage.getItem('note');

    if(this.courier_id != null && this.packageType != null  && this.weight != null && this.pickup_location_id != null && this.dropoff_location_id != null ) {
      axios.get(this.base_url+'api/package/order/summary?vendor_id='+this.courier_id+
          '&package_type_id='+this.packageType+
          '&pickup_location_id='+this.pickup_location_id+
          '&dropoff_location_id='+this.dropoff_location_id+
          // '&stops='+stops+
          '&weight='+this.weight,
          { headers: { Authorization: this.AuthStr }}
      )
      .then((response) => {
        this.summary = response.data
      })
      .catch(error => console.log(error))
    }
    // if(this.packageType) {
      axios.get(this.base_url + "api/vendors?type=package&package_type_id=" + this.packageType, 
        {headers: { Authorization: this.AuthStr },}
      )
      .then((response) => {
          this.courier = response.data.data;
      })
      .catch(error => console.log(error))

      let from_id = localStorage.getItem('from')
      axios.get(this.base_url+'api/delivery/addresses/'+ from_id, 
        { headers: { Authorization: this.AuthStr }}
      )
      .then((response) => {
        this.pickup = response.data.data
      })
    // }
    
  },

  methods: {
    nextButtonText()
    {
      if (
        this.$route.name === 'payment' && !this.$store.state.PaymentStep
        )
      {
        return 'Place Order';
      }
      return 'Next';
    },

    isFirst()
    {
      return this.$route.name === 'Packagetype'
    },

    navigateNext()
    {
      if(this.$route.name === 'payment' && !this.$store.state.PaymentStep)
      {
        let paymentId = localStorage.getItem('paymentId')
        let cash = localStorage.getItem('cash')
        if(paymentId == null)
        {
            notify({
                type: "error",
                title: "Order Checkout",
                text:  'select a payment method',
            })
        }else {
            
            let total_price = this.summary.total
            axios.post(this.base_url+'api/orders', 
                { 
                  total: total_price,
                  sub_total: this.summary.sub_total,
                  tax: this.summary.tax,
                  note: this.note,
                  discount: this.summary.discount ? this.summary.discount : 0,
                  vendor_id: this.courier_id,
                  payment_method_id: paymentId,
                  delivery_fee: this.summary.delivery_fee,
                  type: "package",
                  package_type_id: this.packageType,
                  pickup_date: this.pickup_date,
                  pickup_time: this.pickup_time,
                  recipient_name: this.recipient_name,
                  recipient_phone: this.recipient_phone,
                  pickup_location: this.pickup_location_id,
                  weight: this.weight,
                  width: this.width,
                  length: this.length,
                  height: this.height,
                  payer: this.payer,
                  stops:[
                    {
                        id: this.address_id
                    }
                  ],
                }, 
                { 'headers': { 'Authorization': this.AuthStr } }
            )
            .then(function (response) {
                if (cash == 1) {
                    Swal.fire({
                        title: 'Order Successful',
                        text: "Please pay rider" + " "+ total_price.toFixed(2) +" " +" on delivery",
                        icon: 'success',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Okay'
                    }).then((result) => {
                        if(result.isConfirmed) {
                            window.location.href = '/'
                        }
                    })
                }else {
                    notify({
                        type: "success",
                        title: "Order Checkout",
                        text: response.data.message,
                    });
                    window.location.href = response.data.link
                }
                localStorage.removeItem('packageType')
                localStorage.removeItem('from')
                localStorage.removeItem('to');
                localStorage.removeItem('courier');
                localStorage.removeItem('date');
                localStorage.removeItem('time');
                localStorage.removeItem('fullname');
                localStorage.removeItem('phone');
                localStorage.removeItem('fullname1');
                localStorage.removeItem('phone1');
                localStorage.removeItem('weight');
                localStorage.removeItem('width');
                localStorage.removeItem('height');
                localStorage.removeItem('length');
                localStorage.removeItem('note');
                localStorage.removeItem('paymentId');
                localStorage.removeItem('cash');
                localStorage.removeItem('total');
                localStorage.removeItem('sub_total');
                localStorage.removeItem('tax');
                localStorage.removeItem('discount');
                localStorage.removeItem('delivery_fee');
                
            })
            .catch(error => console.log(error))
            
        }
        
      }
      if (this.$route.name === 'ParcelOrder')
      {
          // for(let loopedCourier of this.courier)
          // {
          //   for(let loopedCountry of loopedCourier.countries)
          //   {
          //     if(this.pickup.country === loopedCountry.name){
          //       this.$router.push({ name: 'recipientInfo' });
          //     }else{
          //       for(let loopedCity of loopedCourier.cities){
          //         if(this.pickup.city === loopedCity.name){
          //           this.$router.push({ name: 'recipientInfo' });
          //         }else{
          //           for(let loopedState of loopedCourier.states){
          //             if(this.pickup.state === loopedState.name){
          //               this.$router.push({ name: 'recipientInfo' });
          //             }else{
          //               notify({
          //                 type: "error",
          //                 title: "Error",
          //                 text:  "Vendor does not service pickup location",
          //               });
          //             }
          //           }
          //         }
          //       }
          //     }
          //   }
          // }
          this.$router.push({ name: 'recipientInfo' });
        
      } else if(this.$route.name === 'recipientInfo'){

          this.$router.push('/package-parameters');

      }else if(this.$route.name === 'packageparameter'){
       
          this.$router.push('/summary');
         
      }else if(this.$route.name === 'summary'){

        this.$router.push('/payments');

      }
    },

    navigatePrevious()
    {
      if (this.$route.name === 'payment')
      {
        this.$router.push('/summary');
        
      } else if(this.$route.name === 'summary')
      {
        this.$router.push('/package-parameters');

      }else if(this.$route.name === 'packageparameter')
      {

        this.$router.push('/recipient');

      }else if(this.$route.name === 'recipientInfo')
      {
        this.$router.push('/parcel-order');
      }
    },
  
  }
}
</script>
