<template>
  <div class="w-full bg-white p-10 h-full" v-if="receipt">
    <!-- HEADER -->
    <div class="flex justify-between">
      <img src="../views/logo.png" class="w-64" />

      <div class="flex">
        <p class="text-blue-700 font-medium text-xl">Receipt</p>
        <p class="ml-5 mt-1">REC-{{ receipt.id }}</p>
      </div>
    </div>

    <div class="mt-2">
      <p>Ntinda Stage TechBuzz Hub Building</p>
      <p>
        +256 757227257, +256 771038366 <br />
        jirehdevsoftware.com
      </p>
    </div>

    <hr class="bg-blue-400 h-1 w-full my-3" />

    <!-- DETAILS -->
    <div class="flex justify-between mt-5">
      <div>
        <p class="text-blue-700 font-medium text-2xl">Paid By</p>
        <p class="text-gray-700">{{ receipt.received_from }}</p>
        <p class="text-gray-700">{{ receipt.address }}</p>
        <p class="text-gray-700">{{ receipt.contacts }}</p>
      </div>

      <div>
        <p class="text-blue-700 font-medium text-xl">Receipt Date</p>
        <p class="ml-2">{{ formatDate(receipt.created_at) }}</p>
      </div>
    </div>

    <!-- TABLE HEADER -->
    <div class="mt-6 p-2 flex bg-blue-100 text-blue-700">
      <div class="w-1/4">Item</div>
      <div class="w-1/4">Qty</div>
      <div class="w-1/4">Unit Cost</div>
      <div class="w-1/4">Total</div>
    </div>

    <!-- ITEMS -->
    <div
      v-for="(item, index) in receipt.items"
      :key="index"
      class="border-b p-2 flex text-sm"
    >
      <div class="w-1/4">{{ item.item }}</div>
      <div class="w-1/4">{{ item.qty }}</div>
      <div class="w-1/4">{{ formatMoney(item.unit_cost) }}</div>
      <div class="w-1/4">
        {{ formatMoney(item.qty * item.unit_cost) }}
      </div>
    </div>

    <!-- TOTAL -->
    <div class="mt-4 p-2 flex bg-blue-700 text-white text-xl font-bold">
      <div class="w-3/4">Total</div>
      <div class="w-1/4">{{ formatMoney(receipt.amount) }}</div>
    </div>

    <p class="font-bold text-lg p-2 bg-gray-100 m-2">{{receipt.comment}}</p>
  </div>
</template>

<script>
import AxiosInstance from "../../AxiosInstance";

export default {
  name: "printReceipt",

  data() {
    return {
      receipt: null,
    };
  },

  mounted() {
    this.fetchReceipt();
  },

  methods: {
    async fetchReceipt() {
      const id = this.$route.params.id;
      const res = await AxiosInstance.get(`/receipts/${id}`);
      this.receipt = res.data;
    },

    formatMoney(value) {
      return Number(value).toLocaleString();
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
  },
};
</script>
