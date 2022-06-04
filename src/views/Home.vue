<template>

<div v-if="vendor_types">
    <!-- <div v-if="vendor_types[0].slug == 'food'">
      <Food/>
    </div> -->
    
    <!-- <div v-else-if="vendor_types[2].slug == 'grocery'">
      <Food/>
    </div>
    <div v-else-if="vendor_types[3].slug == 'pharmacy'">
      <Pharmacy/>
    </div>
    <div v-else-if="vendor_types[4].slug == 'service'">
      <Food/>
    </div> -->
    
</div>

<div></div>
  
</template>
<script>
import axios from 'axios'
import Food from '@/components/Food.vue'
import Pharmacy from '@/components/pharmacy/Home.vue'
export default {
  name: 'Home',
  components: {
    Food,
    Pharmacy
  },
  data () {
    return {
      base_url: this.$store.state.baseUrl,
      vendor_types: null
    }
  },
  
  mounted () {
    axios.get(this.base_url+'api/vendor/types')
        .then((response) => {
          this.vendor_types = response.data
          console.log(this.vendor_types)
        }
    )
    .catch(error => console.log(error))
  },

}
</script>