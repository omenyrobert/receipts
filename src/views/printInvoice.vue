<template>
  <div class="w-full bg-white p-10 h-full" v-if="invoice">
    <!-- HEADER -->
    <div class="flex justify-between">
      <img src="../views/logo.png" class="w-32" />

      <div class="flex">
        <p class="text-blue-700 font-medium text-xl">Invoice</p>
        <p class="ml-5 mt-1">INV-{{ invoice.id }}</p>
      </div>
    </div>

    <div class="mt-2">
      <p>Media Plaza Kamwokya Level 3</p>
      <p>+256 757227257, WhatsApp +256 757227257</p>
    </div>

    <hr class="bg-blue-400 h-1 w-full my-3" />

    <!-- BILLING -->
    <div class="flex justify-between mt-5">
      <div>
        <p class="text-blue-700 font-medium text-2xl">Billed To</p>
        <p class="text-gray-700">{{ invoice.company_name }}</p>
        <p class="text-gray-700">{{ invoice.address }}</p>
        <p class="text-gray-700">{{ invoice.contacts }}</p>
      </div>

      <div>
        <p class="text-blue-700 font-medium text-2xl">Product</p>
        <p class="text-xl text-gray-700">{{ invoice.product }}</p>
      </div>

      <div class="flex">
        <p class="text-blue-700 font-medium text-xl">Invoice Date</p>
        <p class="ml-5 mt-1">{{ formatDate(invoice.created_at) }}</p>
      </div>
    </div>

    <!-- TABLE HEADER -->
    <div class="mt-8 p-2 flex text-white bg-blue-700">
      <div class="w-1/4">Item</div>
      <div class="w-1/4">Qty</div>
      <div class="w-1/4">Unit Cost</div>
      <div class="w-1/4">Total</div>
    </div>

    <!-- ITEMS -->
    <div
      v-for="(item, index) in invoice.items"
      :key="index"
      class="p-2 flex border-b text-gray-600 text-sm"
    >
      <div class="w-1/4">{{ item.item }}</div>
      <div class="w-1/4">{{ item.qty }}</div>
      <div class="w-1/4">{{ formatMoney(item.unit_cost) }}</div>
      <div class="w-1/4">{{ formatMoney(item.total) }}</div>
    </div>

    <!-- TOTAL -->
    <div class="p-2 flex text-blue-700 bg-blue-100 font-bold">
      <div class="w-3/4 text-right">TOTAL</div>
      <div class="w-1/4">{{ formatMoney(grandTotal) }}</div>
    </div>

    <p class="font-bold text-lg p-2 bg-gray-100 m-2">{{invoice.comment}}</p>
    <!-- BANK DETAILS -->
    <div class="flex gap-2 mt-6">
      <div class="p-3 border border-gray-300">
        <p>Bank Name</p>
        <p class="text-xl">DFCU Bank</p>
      </div>
      <div class="p-3 border border-gray-300">
        <p>Account Name</p>
        <p class="text-xl">Robert Omeny</p>
      </div>
      <div class="p-3 border border-gray-300">
        <p>Account Number</p>
        <p class="text-xl">01490017935449</p>
      </div>
    </div>
  </div>
</template>

<script>
import AxiosInstance from "../../AxiosInstance";

export default {
  name: "PrintInvoice",

  data() {
    return {
      invoice: null
    };
  },

  computed: {
    grandTotal() {
      if (!this.invoice) return 0;
      return this.invoice.items.reduce(
        (sum, item) => sum + Number(item.total),
        0
      );
    }
  },

  methods: {
    async fetchInvoice() {
      const id = this.$route.params.id;
      const res = await AxiosInstance.get(`/invoices/${id}`);
      this.invoice = res.data;
    },

    formatMoney(value) {
      return Number(value).toLocaleString();
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString();
    }
  },

  mounted() {
    this.fetchInvoice();
  }
};
</script>
