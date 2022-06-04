<template>
<div id="app">
  
  <div class="flex flex-col h-screen overflow-x-hidden font-sans">
    
    <Nav/>
    
      <div>
        <notifications position="top right"/>
        <div class="flex items-center justify-center spin-content" v-if="loading">
          <pulse-loader class="" :loading="loading"></pulse-loader>
        </div>
        <router-view/>
      </div>
    <Footer/>
    <!-- <span class="absolute sticky inset-x-0 bottom-0 ">
      <Cookies/>
    </span> -->
    <span class="fixed inset-x-0 bottom-0 z-50">
      <Cookies/>
      <span class="md:hidden">
        <MobileNav/>
      </span>
      
      
    </span>
    
  </div>
      
</div>
</template>


<script>
import Nav from '@/components/Nav.vue'
import Cookies from '@/components/Cookies.vue'
import Footer from '@/components/Footer.vue'
import MobileNav from '@/components/MobileNav.vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
export default {
  name: 'Home',
  components: {
    Nav,
    Footer,
    PulseLoader,
    MobileNav,
    Cookies
  },
  computed: {
     loading() {
       return this.$store.getters.loading
     }
   },
}
</script>
<style lang="scss" scoped>

.spin-content {
  background-color: #fff;
  padding: 30px;
  align-items: center;
}
</style>
