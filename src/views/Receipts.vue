<template>
  <div class="flex h-screen w-full bg-slate-100">
    <div class="w-[300px]">
      <sidebar />
    </div>

    <div class="w-full">
      <navbar />

      <!-- ADD RECEIPT MODAL -->
      <div
        v-if="isOpen"
        class="border border-gray-200 rounded-md absolute w-9/12 -ml-32 shadow-2xl bg-white z-50 top-20"
      >
        <form @submit.prevent="postReceipt">
          <div class="flex justify-between bg-gray-100 p-3">
            <div class="text-blue-700 font-bold">Add Receipt</div>
            <p @click="closeIsOpen" class="cursor-pointer">X</p>
          </div>

          <div class="flex p-3">
            <div class="w-1/2">
              <label>Received From</label>
              <input v-model="received_from" placeholder="Received From" class="input" required />

              <label class="mt-4 block">Contacts</label>
              <input v-model="contacts" placeholder="Enter Contacts" class="input" required />

              <label>Address</label>
              <input v-model="address" placeholder="Address" class="input" />

              <label class="mt-4 block">Payment Method</label>
              <input v-model="payment_method" placeholder="Enter Method" class="input" />
            </div>

            <div class="w-1/2">
              <!-- ITEMS -->
              <button
                type="button"
                class="text-xs ml-5 text-blue-700"
                @click="addItem"
              >
                + Add Item
              </button>

              <div
                v-for="(item, index) in receiptItems"
                :key="index"
                class="flex px-5"
              >
                <input
                  v-model="item.item"
                  class="input w-1/3"
                  placeholder="Item"
                />
                <input
                  v-model.number="item.qty"
                  type="number"
                  class="input w-1/6 mx-1"
                  placeholder="Qty"
                />
                <input
                  v-model.number="item.unit_cost"
                  type="number"
                  class="input w-1/4"
                  placeholder="Unit cost"
                />

                <div class="p-2 bg-gray-100 m-2 rounded">
                  {{ item.qty * item.unit_cost || 0 }}
                </div>

                <button
                  v-if="index !== 0"
                  type="button"
                  class="text-red-600 text-xs mt-4"
                  @click="removeItem(index)"
                >
                  Remove
                </button>
              </div>

              <p class="ml-5 mt-3">Comment</p>
              <textarea
                v-model="comment"
                class="border w-10/12 ml-5 rounded-md p-2"
              ></textarea>

              <button
                type="submit"
                class="mt-6 text-white p-2 bg-blue-700 rounded-md w-3/4"
              >
                Add Receipt
              </button>
            </div>
          </div>

          <br /><br />
        </form>
      </div>

      <!-- RECEIPTS TABLE -->
      <div
        class="w-[99%] px-5 pt-5 bg-white rounded-md shadow-2xl"
        style="height: 90vh"
      >
        <div class="flex justify-between">
          <p class="text-xl text-blue-500 font-bold">Receipts</p>

          <div
            @click="openModal"
            class="bg-blue-700 w-[200px] cursor-pointer rounded-md p-2 text-white text-sm text-center"
          >
            + Add new Receipt
          </div>
        </div>

        <div class="flex p-2 bg-gray-100 text-sm mt-5">
          <div class="w-1/6">No</div>
          <div class="w-1/6">Date</div>
          <div class="w-1/6">Received From</div>
          <div class="w-1/6">Contacts</div>
          <div class="w-1/6">Amount</div>
          <div class="w-1/6">Action</div>
        </div>

        <div
          v-for="receipt in receipts"
          :key="receipt.id"
          class="flex p-2 border-b text-xs text-gray-600 hover:bg-gray-50 cursor-pointer"
        >
          <div class="w-1/6">REC-{{ receipt.id }}</div>
          <div class="w-1/6">{{ formatDate(receipt.created_at) }}</div>
          <div class="w-1/6 truncate">{{ receipt.received_from }}</div>
          <div class="w-1/6">{{ receipt.contacts }}</div>
          <div class="w-1/6">{{ formatMoney(receipt.amount) }}</div>

          <div class="w-1/6">
            <span
              class="text-blue-600 cursor-pointer hover:underline"
              @click="viewReceipt(receipt.id)"
            >
              View
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sidebar from "../components/sidebar.vue";
import navbar from "../components/navbar.vue";
import AxiosInstance from "../../AxiosInstance";

export default {
  components: { sidebar, navbar },

  data() {
    return {
      isOpen: false,
      receipts: [],
      received_from: "",
      contacts: "",
      address: "",
      payment_method: "",
      comment: "",
      receiptItems: [{ item: "", qty: 1, unit_cost: 0 }],
    };
  },

  methods: {
    openModal() {
      this.isOpen = true;
    },

    closeIsOpen() {
      this.isOpen = false;
    },

    addItem() {
      this.receiptItems.push({ item: "", qty: 1, unit_cost: 0 });
    },

    removeItem(index) {
      this.receiptItems.splice(index, 1);
    },

    async postReceipt() {
      const amount = this.receiptItems.reduce(
        (sum, i) => sum + i.qty * i.unit_cost,
        0
      );

      const payload = {
        received_from: this.received_from,
        contacts: this.contacts,
        address: this.address,
        payment_method: this.payment_method,
        comment: this.comment,
        amount,
        items: this.receiptItems,
      };

      await AxiosInstance.post("/receipts", payload);

      this.fetchReceipts();
      this.resetForm();
      this.closeIsOpen();
    },

    async fetchReceipts() {
      const res = await AxiosInstance.get("/receipts");
      this.receipts = res.data;
    },

    resetForm() {
      this.received_from = "";
      this.contacts = "";
      this.address = "";
      this.payment_method = "";
      this.comment = "";
      this.receiptItems = [{ item: "", qty: 1, unit_cost: 0 }];
    },

    viewReceipt(id) {
      this.$router.push(`/printreceipt/${id}`);
    },

    formatMoney(value) {
      return Number(value).toLocaleString();
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
  },

  mounted() {
    this.fetchReceipts();
  },
};
</script>

<style scoped>
.input {
  border: 1px solid #d1d5db;
  padding: 0.5rem;
  border-radius: 0.375rem;
  width: 95%;
  margin-top: 0.5rem;
}
</style>
