<template>
  <div class="w-full flex">
    <div class="p-5 w-10/12 flex ">
      <div class="bg-orange-400 rounded-md pt-1 px-2 h-6 mt-1 text-white">
        <StarIcon class="h-4" />
      </div>
      <h3 class="font-medium text-xl ml-2 text-blue-700">Hi Omeny Robert</h3>
    </div>
    <div class="p-5 -mt-2 w-2/12 flex">
     <p class="float-right text-blue-700 font-bold">Dashboard</p>
    </div>
  </div>


  <br />
</template>
<script>
import {
  Squares2X2Icon,
  ChevronDownIcon,
  StarIcon,
  ChartBarIcon,
  InboxIcon,
  ViewfinderCircleIcon,
} from "@heroicons/vue/24/solid";
export default {
  name: "navbar",
  components: {
    Squares2X2Icon,
    ChevronDownIcon,
    StarIcon,
    ChartBarIcon,
    InboxIcon,
    ViewfinderCircleIcon,
  },
  data() {
    return {};
  },
  methods: {

  },
};
</script>
