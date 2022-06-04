<template>
  <div class="mt-10 sm:mt-0" v-show="isLoggedIn">
    <div class="max-w-3xl mx-auto mt-5 overflow-hidden shadow sm:rounded-md">
      <div class="">
        <!-- <form action="#" method="POST"> -->
        <div class="">
          <div class="px-4 py-5 bg-white sm:p-6">
            <p class="font-bold">Send packages</p>
            <div class="flex justify-between">
              <p class="my-1 text-xs font-light text-gray-500">
                Your on demand local courier
              </p>
              <button @click="clearAll()" class="text-sm text-green-400">
                Clear all
              </button>
            </div>

            <!-- <p class="text-xl font-extrabold">Package Type</p> -->
            <div class="flex flex-col">
              <div class="mb-3">
                <label
                  for="package"
                  class="block mt-5 text-sm font-medium text-gray-700"
                >
                  Package Types<span class="text-red-500">*</span>
                </label>
                <select
                  id="package"
                  v-model="packageType"
                  @change="getCouriers"
                  class="block w-full px-3 py-3 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="0">Select a package type</option>
                  <option
                    v-for="packageType in packageTypes"
                    :value="packageType.id"
                    :key="packageType.id"
                  >
                    {{ packageType.name }}
                  </option>
                </select>
              </div>

              <div class="">
                <label
                  for="courier"
                  class="block text-sm font-medium text-gray-700"
                >
                  Courier Vendors<span class="text-red-500">*</span>
                </label>
                <select
                  id="courier"
                  v-model="courier"
                  class="block w-full px-3 py-3 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                >
                  <option value="0">Select a courier vendor</option>
                  <option
                    v-for="courier in couriers"
                    :value="courier.id"
                    :key="courier.id"
                  >
                    {{ courier.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="mt-10 mb-5">
              <p class="font-bold">Delivery Info</p>
              <p class="my-1 text-xs font-light text-gray-500">
                Add pickup and destination addresses here
              </p>
            </div>

            <div class="flex flex-col">
              <div class="mb-3">
                <label
                  for="from"
                  class="space-x-2 text-xl font-medium text-gray-700"
                >
                  <div class="flex justify-between">
                    <div class="flex space-x-2">
                      <TruckIcon
                        class="w-3 h-3 mt-1 text-green-500 md:w-6 md:h-6"
                        aria-hidden="true"
                      />
                      <span class="block mt-1 text-sm font-medium text-gray-700"
                        >Pickup Location<span class="text-red-500">*</span>
                      </span>
                    </div>
                    <a
                      href="/profile"
                      class="text-sm font-medium text-green-500 hover:underline"
                      >Add address</a
                    >
                  </div>
                </label>

                <select
                  id="from"
                  v-model="from"
                  @change="fromValidation"
                  class="block w-full px-3 py-3 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <!-- <option value="0">Select a delivery address</option> -->
                  <option
                    v-for="from in addresses"
                    :value="from.id"
                    v-bind:key="from.id"
                  >
                    {{ from.name }} [{{ from.address }}]
                  </option>
                </select>

                <input
                  v-if="fromError"
                  type="text"
                  v-model="fromError"
                  class="w-full text-red-500"
                />
                <input
                  v-else
                  type="text"
                  v-model="fromSuccess"
                  class="w-full text-green-500"
                />
                <!-- <input type="text" name="from" id="from" v-model="from" placeholder="Pickup" class="block w-full px-3 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" /> -->
              </div>

              <div class="mb-5">
                <label
                  for="to"
                  class="flex block space-x-2 text-xl font-medium text-gray-700"
                >
                  <LocationMarkerIcon
                    class="w-3 h-3 mt-1 text-red-500 md:w-6 md:h-6"
                    aria-hidden="true"
                  />
                  <span class="block mt-1 text-sm font-medium text-gray-700"
                    >Dropoff<span class="text-red-500">*</span>
                  </span>
                </label>

                <select
                  id="to"
                  v-model="to"
                  @change="toValidation"
                  class="block w-full px-3 py-3 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <!-- <option value="0">Select a delivery address</option> -->
                  <option
                    v-for="to in addresses"
                    :value="to.id"
                    v-bind:key="to.id"
                  >
                    {{ to.name }} [{{ to.address }}]
                  </option>
                </select>
                <input
                  v-if="toError"
                  type="text"
                  v-model="toError"
                  class="w-full text-red-500"
                />
                <input
                  v-else
                  type="text"
                  v-model="toSuccess"
                  class="w-full text-green-500"
                />
                <!-- <div v-for="(input, index) in dropOffs" :key="`phoneInput-${index}`" class="flex items-center input wrapper">
                  <select required id="to" v-model="input.to" class="block w-full px-3 py-3 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  
                  <option v-for="to in addresses" :value="to.id" v-bind:key="to.id">
                    {{ to.name }} [{{ to.address }}]
                  </option>
                </select>
                  
                  <button @click="addField(input, dropOffs)">
                    <PlusCircleIcon class="w-3 h-3 mt-1 text-green-500 md:w-6 md:h-6" aria-hidden="true"/>
                  </button>

                  <button v-show="dropOffs.length > 1" @click="removeField(index, dropOffs)">
                    <MinusCircleIcon class="w-3 h-3 mt-1 text-red-500 md:w-6 md:h-6" aria-hidden="true"/>
                  </button>
                  
                </div> -->
              </div>
              <!-- <div class="flex py-3">
                <label class="md:items-start md:justify-start md:flex">
                  <div
                    class="flex items-center justify-center flex-shrink-0 w-4 h-4 mr-2 bg-white border-2 border-gray-400 rounded focus-within:border-blue-500"
                  >
                    <input
                      type="checkbox"
                      class="absolute opacity-0"
                      v-model="addAddress"
                      value="true"
                    />
                    <svg
                      class="hidden w-4 h-4 text-green-500 pointer-events-none fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                    </svg>
                  </div>
                  <p class="text-sm">Add Stop</p>
                </label>
              </div> -->

              <!-- <div class="mb-3" v-show="addAddress == true">
                <label
                  for="to"
                  class="flex block space-x-2 text-xl font-medium text-gray-700"
                >
                  <LocationMarkerIcon
                    class="w-3 h-3 mt-1 text-red-500 md:w-6 md:h-6"
                    aria-hidden="true"
                  />
                  <span class="block mt-1 text-sm font-medium text-gray-700"
                    >Dropoff<span class="text-red-500">*</span></span
                  >
                </label>
                <select
                  required
                  id="to"
                  v-model="to"
                  class="block w-full px-3 py-3 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option
                    v-for="to in addresses"
                    :value="to.id"
                    v-bind:key="to.id"
                  >
                    {{ to.name }} [{{ to.address }}]
                  </option>
                </select>
              </div> -->

              <div class="flex justify-between">
                <div class="mb-3">
                  <label
                    for="date"
                    class="flex block space-x-2 text-xl font-medium text-gray-700"
                  >
                    <CalendarIcon
                      class="w-3 h-3 mt-1 text-green-500 md:w-6 md:h-6"
                      aria-hidden="true"
                    />
                    <span class="block mt-1 text-sm font-medium text-gray-700"
                      >Date<span class="text-red-500">*</span></span
                    >
                  </label>
                  <input
                    type="date"
                    required
                    name="date"
                    id="date"
                    v-model="date"
                    class="block w-full px-3 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div class="">
                  <label
                    for="time"
                    class="flex block space-x-2 text-xl font-medium text-gray-700"
                  >
                    <ClockIcon
                      class="w-3 h-3 mt-1 text-green-500 md:w-6 md:h-6"
                      aria-hidden="true"
                    />
                    <span class="block mt-1 text-sm font-medium text-gray-700"
                      >Time<span class="text-red-500">*</span></span
                    >
                  </label>
                  <input
                    type="time"
                    required
                    name="time"
                    id="time"
                    v-model="time"
                    class="block w-full px-3 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
          <div v-if="pickup1">
            <div
              class="px-4 py-3 text-right bg-gray-50 sm:px-6"
              v-if="
                pickup.country != null &&
                pickup.city != null &&
                pickup.state &&
                pickup1.country != null &&
                pickup1.city != null &&
                pickup1.state
              "
            >
              <div
                v-if="
                  pickup1.country === loopedCountry1 ||
                  pickup1.city === loopedCity1 ||
                  (pickup1.state === loopedState1 &&
                    pickup.country === loopedCountry) ||
                  pickup.city === loopedCity ||
                  pickup.state === loopedState
                "
              >
                <Navigation></Navigation>
              </div>
            </div>
            
          </div>
          <div
              class="flex justify-between px-4 py-3 text-right bg-gray-50 sm:px-6"
              v-else
            >
              <div
                class="px-4 py-2 mr-5 text-white uppercase bg-gray-200 border border-gray-300 rounded"
              >
                Next
              </div>
            </div>
        </div>
        <!-- </form> -->
      </div>
    </div>
  </div>
  <Download />
</template>
<script>
import axios from "axios";
import {
  TruckIcon,
  ClockIcon,
  CalendarIcon,
  PlusSmIcon,
  PlusCircleIcon,
  MinusCircleIcon,
} from "@heroicons/vue/outline";
import { LocationMarkerIcon } from "@heroicons/vue/solid";
import Navigation from "./Navigation.vue";
import Download from "@/components/Downloads.vue";
// import { notify } from "@kyvg/vue3-notification";
export default {
  components: {
    LocationMarkerIcon,
    TruckIcon,
    ClockIcon,
    CalendarIcon,
    PlusSmIcon,
    PlusCircleIcon,
    MinusCircleIcon,
    Download,
    Navigation,
  },
  data() {
    return {
      packageTypes: [],
      couriers: [],
      packageType: 0,
      courier: 0,
      isLoggedIn: false,
      user: null,
      addresses: null,
      showModal: false,
      addAddress: false,
      fromError: "",
      toError: "",
      // package_type: '',
      // courier_services: '',
      from: "",
      to: "",
      // dropOffs: [{ to: "" }],
      date: "",
      time: "",
      AuthStr: "Bearer " + localStorage.getItem("authToken"),
      base_url: this.$store.state.baseUrl,
      pickup1: null,
      pickup: null,
      loopedCountry: null,
      loopedCity: null,
      loopedState: null,
      loopedCountry1: null,
      loopedCity1: null,
      loopedState1: null,
      fromSuccess: "",
      toSuccess: "",
    };
  },

  mounted() {
    axios
      .get(this.base_url + "api/delivery/addresses", {
        headers: { Authorization: this.AuthStr },
      })
      .then((response) => (this.addresses = response.data.data))
      .catch((error) => console.log(error));

    if (localStorage.getItem("authToken")) {
      this.isLoggedIn = true;
      this.user = JSON.parse(localStorage.getItem("user"));
    }

    if (this.isLoggedIn == false) {
      this.$router.push("/login");
    }

    this.getPackageTypes();
    this.getCouriers();

    //localstore for fields
    if (localStorage.packageType) {
      this.packageType = localStorage.packageType;
    }

    if (localStorage.courier) {
      this.courier = localStorage.courier;
      // console.log(this.courier)
    }

    if (localStorage.from) {
      this.from = localStorage.from;
      // console.log(this.dropOffs)
    }

    // localStorage.setItem("destinations", JSON.stringify(this.dropOffs));
    if (localStorage.to) {
      this.to = localStorage.to;
      // console.log(this.to)
    }

    if (localStorage.date) {
      this.date = localStorage.date;
    }

    if (localStorage.time) {
      this.time = localStorage.time;
    }
  },

  watch: {
    packageType(newPackage) {
      localStorage.packageType = newPackage;
    },

    courier(newCourier) {
      localStorage.courier = newCourier;
      // console.log(newCourier)
    },

    from(newfrom) {
      localStorage.from = newfrom;
    },

    to(newTo) {
      localStorage.to = newTo;
      // console.log(newTo)
    },

    date(newDate) {
      localStorage.date = newDate;
    },

    time(newTime) {
      localStorage.time = newTime;
    },
  },

  // computed: {
  //   loopedCountry() {
  //     return this.addresses.find((country) => country.id === this.from);
  //   },

  //   loopedCity() {
  //     return this.loopedCountry.cities.find(
  //       (city) => city.id === this.from
  //     );
  //   },

  //   loopedState() {
  //     return this.loopedCity.states.find((state) => state.id === this.from);
  //   },
  // },

  methods: {
    addField(value, fieldType) {
      fieldType.push({ value: "" });
    },
    removeField(index, fieldType) {
      fieldType.splice(index, 1);
    },

    getPackageTypes() {
      this.$store.commit("loading", true);
      axios
        .get(this.base_url + "api/package/types", {
          headers: { Authorization: this.AuthStr },
        })
        .then(
          function (response) {
            this.$store.commit("loading", false);
            this.packageTypes = response.data;
          }.bind(this)
        );
    },

    getCouriers() {
      if (this.packageType) {
        this.$store.commit("loading", true);
        axios
          .get(
            this.base_url +
              "api/vendors?type=package&package_type_id=" +
              this.packageType,

            { headers: { Authorization: this.AuthStr } }
          )
          .then(
            function (response) {
              this.$store.commit("loading", false);
              this.couriers = response.data.data;
            }.bind(this)
          );
      }
    },

    fromValidation() {
      axios
        .get(this.base_url + "api/delivery/addresses/" + this.from, {
          headers: { Authorization: this.AuthStr },
        })
        .then((response) => {
          this.pickup = response.data.data;
          for (let loopedCourier of this.couriers) {
            for (let country of loopedCourier.countries) {
              this.loopedCountry = country.name;
              if (this.pickup.country === this.loopedCountry) {
                if (this.pickup.country != null && this.loopedCountry != null) {
                  this.fromSuccess = "all set";
                  for (let state of loopedCourier.states) {
                    this.loopedState = state.name;
                  }
                  break;
                } else {
                  this.fromError = "Vendor does not deliver to this location";
                }
              } else if (this.loopedState === this.pickup.state) {
                if (this.pickup.state != null && this.loopedState != null) {
                  this.fromSuccess = "all set";
                  for (let city of loopedCourier.cities) {
                    this.loopedCity = city.name;
                  }
                  break;
                } else {
                  this.fromError = "Vendor does not deliver to this location";
                }
              } else if (this.loopedCity === this.pickup.city) {
                if (this.loopedCity != null && this.pickup.city != null) {
                  this.fromSuccess = "all set";
                  break;
                } else {
                  this.fromError = "Vendor does not deliver to this location";
                }
                break;
              } else if (
                this.loopedCountry != this.pickup.country ||
                this.loopedState != this.pickup.state ||
                this.loopedCity != this.pickup.city
              ) {
                this.fromError = "Vendor does not deliver to this location";
              }
            }
          }
        })
        .catch((error) => console.log(error));
    },

    clearAll() {
      localStorage.removeItem("packageType");
      localStorage.removeItem("courier");
      localStorage.removeItem("from");
      localStorage.removeItem("to");
      localStorage.removeItem("date");
      localStorage.removeItem("time");
      // this.$router.go();
      this.packageType = "";
      this.courier = "";
      this.from = "";
      this.to = "";
      this.date = "";
      this.time = "";
      this.fromSuccess = "";
      this.fromError = "";
      this.toSuccess = "";
      this.toError = "";
    },

    toValidation() {
      axios
        .get(this.base_url + "api/delivery/addresses/" + this.to, {
          headers: { Authorization: this.AuthStr },
        })
        .then((response) => {
          this.pickup1 = response.data.data;
          for (let loopedCourier of this.couriers) {
            for (let country of loopedCourier.countries) {
              this.loopedCountry1 = country.name;
              if (this.pickup1.country === this.loopedCountry1) {
                if (
                  this.pickup1.country != null &&
                  this.loopedCountry1 != null
                ) {
                  this.toSuccess = "all set";
                  for (let state of loopedCourier.states) {
                    this.loopedState1 = state.name;
                  }
                  break;
                } else {
                  this.toError = "Vendor does not deliver to this location";
                }
              } else if (this.loopedState1 === this.pickup1.state) {
                if (this.pickup1.state != null && this.loopedState1 != null) {
                  this.toSuccess = "all set";
                  for (let city of loopedCourier.cities) {
                    this.loopedCity1 = city.name;
                  }
                  break;
                } else {
                  this.toError = "Vendor does not deliver to this location";
                }
              } else if (this.loopedCity1 === this.pickup1.city) {
                if (this.loopedCity1 != null && this.pickup1.city != null) {
                  this.toSuccess = "all set";
                  break;
                } else {
                  this.toError = "Vendor does not deliver to this location";
                }
                break;
              } else if (
                this.loopedCountry1 != this.pickup1.country ||
                this.loopedState1 != this.pickup1.state ||
                this.loopedCity1 != this.pickup1.city
              ) {
                this.toError = "Vendor does not deliver to this location";
              }
            }
          }
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
