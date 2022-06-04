import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../views/Home.vue'
import Vendor from '../views/Vendor.vue'
// import Category from '../views/Category.vue'
import Register from '../views/Register.vue'
// import Login from '../views/Login.vue'
import Product from '../views/Product.vue'
import Cart from '../views/Cart.vue'
import Checkout from '../views/Checkout.vue'
import Profile from '../views/Profile.vue'
import Parcel from '../views/Parcel.vue'
import Orders from '../views/Orders.vue'
// import Wallet from '../views/Wallet.vue'
import Vendors from '../views/Vendors.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import Search from '../components/Search.vue'
import NotFound from '../views/404.vue'
import Category from '../views/Category.vue'
import OrderDetails from '../views/OrderDetails.vue'
// import PackageType from '../components/PackageType.vue'
// import PackageParameter from '../components/parcel/PackageParameter.vue'
// import Summary from '../components/parcel/Summary.vue'
// import VendorProducts from '../components/VendorProducts.vue'
// import PaymentInfo from '../components/parcel/PaymentInfo.vue'
// import RecipientInfo from '../components/parcel/RecipientInfo.vue'
// import store from "../store"


const guest = (to, from, next) => {
  if (!localStorage.getItem("authToken")) {
    return next();
  } else {
    return next("/");
  }
};


const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ "../views/LandingPage.vue")
  },
  {
    path: '/:id/:slug',
    name: 'LandingPage',
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue")
  },
  {
    path: '/vendor/:id/:slug',
    name: 'Vendor',
    component: Vendor,
    meta: { guest: true },
  },
  {
    path: '/vendors',
    name: 'Vendors',
    component: Vendors,
    meta: { guest: true },
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    meta: { guest: true },
  },
  {
    path: '/:id/pharmacy',
    name: 'Pharmacy',
    component: () => import(/* webpackChunkName: "home" */ "../components/pharmacy/Home.vue"),
    meta: { guest: false },
  },
  // {
  //   path: '/:id/service',
  //   name: 'Booking',
  //   component: () => import(/* webpackChunkName: "home" */ "../components/booking/Home.vue"),
  //   meta: { guest: false },
  // },
  {
    path: '/:id/commerce',
    name: 'Booking',
    component: () => import(/* webpackChunkName: "home" */ "../components/ecommerce/Home.vue"),
    meta: { guest: false },
  },
  {
    path: '/upload-prescription/:id/:slug',
    name: 'UploadPrescription',
    component: () => import(/* webpackChunkName: "home" */ "../components/pharmacy/UploadPrescription.vue"),
    meta: { guest: false },
  },
  {
    path: '/:id/food',
    name: 'Food',
    component: () => import(/* webpackChunkName: "home" */ "../components/Food.vue"),
    meta: { guest: true },
  },
  {
    path: '/:id/grocery',
    name: 'Grocery',
    component: () => import(/* webpackChunkName: "home" */ "../components/grocery/Home.vue"),
    meta: { guest: true },
  },
  {
    path: '/:id/parcel',
    name: 'Parcel',
    component: () => import(/* webpackChunkName: "home" */ "../components/parcel/Home.vue"),
    meta: { guest: false },
  },
  {
    path: '/parcel-order',
    name: 'ParcelOrder',
    component: () => import(/* webpackChunkName: "home" */ "../components/parcel/PackageType.vue"),
    meta: { guest: false },
  },
  {
    path: '/:id/taxi',
    name: 'Taxi',
    component: () => import(/* webpackChunkName: "home" */ "../components/taxi/Home.vue"),
    meta: { guest: true },
  },
  {
    path: '/contact-us',
    name: 'ContactUs',
    component: () => import(/* webpackChunkName: "home" */ "../components/ContactUs.vue"),
    meta: { guest: true },
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: () => import(/* webpackChunkName: "home" */ "../components/PrivacyPolicy.vue"),
    meta: { guest: true },
  },
  {
    path: '/terms-&-condition',
    name: 'Terms&Condition',
    component: () => import(/* webpackChunkName: "home" */ "../components/TermsCondition.vue"),
    meta: { guest: true },
  },
  {
    path: '/:id/service',
    name: 'Service',
    component: () => import(/* webpackChunkName: "home" */ "../components/service/Home.vue"),
    meta: { guest: true },
  },
  // {
  //   path: '/package-types',
  //   name: 'packagetype',
  //   component: PackageType,
  // },
  {
    path: '/recipient',
    name: 'recipientInfo',
    component: () => import(/* webpackChunkName: "home" */ "../components/parcel/RecipientInfo.vue"),
    meta: { guest: false },
  },
  {
    path: '/package-parameters',
    name: 'packageparameter',
    component: () => import(/* webpackChunkName: "home" */ "../components/parcel/PackageParameter.vue"),
    meta: { guest: false },
  },
  {
    path: '/summary',
    name: 'summary',
    component: () => import(/* webpackChunkName: "home" */ "../components/parcel/Summary.vue"),
    meta: { guest: false },
  },
  {
    path: '/payments',
    name: 'payment',
    component: () => import(/* webpackChunkName: "home" */ "../components/parcel/PaymentInfo.vue"),
    meta: { guest: false },
  },
  {
    path: '/vendors/:id/:slug',
    name: 'VendorProducts',
    component: Vendors,
    meta: { guest: true },
  },
  {
    path: '/category/:id/:slug',
    name: 'Category',
    component: Category,
    meta: { guest: true },
  },
 
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { guest: false },
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders,
    meta: { guest: false },
  },
  // {
  //   path: '/wallet',
  //   name: 'Wallet',
  //   component: Wallet,
  //   meta: { guest: false },
  // },
  {
    path: '/order/details/:id/:slug',
    name: 'OrderDetails',
    component: OrderDetails,
    meta: { guest: false },
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout,
    meta: { guest: false },
  },
  {
    path: '/product/:id/:slug',
    name: 'Product',
    component: Product,
    meta: { guest: true },
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: { guest: true },
  },
  // {
  //   path: '/:id/parcel',
  //   name: 'Parcel',
  //   component: Parcel,
  //   meta: { guest: false },
  // },
  {
    path: '/register',
    name: "Register",
    component: Register,
    meta: { guest: true },
  },
  {
    path: '/forgot-password',
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: { guest: true },
  },
  {
    path: '/login',
    name: "Login",
    beforeEnter: guest,
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue")
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Not Found',
    component: NotFound,
  },
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (store.getters.isAuthenticated) {
//       next();
//       return;
//     }
//     next("/login");
//   } else {
//     next();
//   }
// });

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.guest)) {
//     if (store.getters.isAuthenticated) {
//       next("/");
//       return;
//     }
//     next();
//   } else {
//     next();
//   }
// });


router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    // eslint-disable-next-line no-undef
    NProgress.start()
  }
  next()
})

// eslint-disable-next-line no-unused-vars
router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  // eslint-disable-next-line no-undef
  NProgress.done()
})

export default router
