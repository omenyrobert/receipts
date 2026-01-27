<template>
  <div class="flex h-screen w-full bg-slate-100">
    <div class="w-[300px]">
      <sidebar />
    </div>

    <div class="w-full">
      <navbar />

      <!-- MODAL -->
      <div
        v-if="isOpen"
        class="border border-gray-200 rounded-md absolute w-9/12 -ml-32 shadow-2xl bg-white z-50 left-1/4 top-20"
      >
        <form @submit.prevent="postInvoice">
          <div class="flex justify-between bg-gray-100 p-3">
            <div class="text-blue-700 font-bold">Add Invoice</div>
            <p @click="closeIsOpen" class="cursor-pointer">X</p>
          </div>

          <div class="flex p-5">
            <div class="w-1/2">
              <label>Product</label>
              <br />
              <input
                v-model="product"
                placeholder="Enter Product"
                class="input"
                required
              />

              <label class="mt-4 block">Contacts</label>
              <input
                placeholder="Enter Contact"
                v-model="contacts"
                class="input"
                required
              />
              <br /><br />
              <label>Company Name</label>
              <br />
              <input
                placeholder="Enter Company"
                v-model="company"
                class="input"
                required
              />

              <label class="mt-4 block">Address</label>
              <input
                placeholder="Enter Address"
                v-model="address"
                class="input"
                required
              />
            </div>

            <div class="w-1/2 h-[calc(100vh-200px)] overflow-y-auto">
              <!-- ITEMS -->
              <button
                type="button"
                class="text-xs p-1 rounded bg-blue-500 text-white"
                @click="addItem"
              >
                + Add Item
              </button>

              <div
                v-for="(item, index) in invoiceItems"
                :key="index"
                class="flex"
              >
                <input
                  v-model="item.item"
                  class="input w-full"
                  placeholder="Item"
                />
                <input
                  v-model.number="item.qty"
                  type="number"
                  class="input mx-2 w-full"
                  placeholder="Qty"
                />
                <input
                  v-model.number="item.unit_cost"
                  type="number"
                  class="input w-full"
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
                class="border w-full rounded-md p-2"
              ></textarea>
              <button
                type="submit"
                class="mt-6 text-white p-2 bg-blue-700 rounded-md w-1/2"
              >
                Add Invoice
              </button>
            </div>
          </div>

          <br /><br />
        </form>
      </div>

      <!-- TABLE -->
      <div
        class="w-[99%] px-5 pt-5 bg-white rounded-md shadow-2xl"
        style="height: 90vh"
      >
        <div
          @click="openModal"
          class="bg-blue-700 w-[200px] cursor-pointer rounded-md p-2 text-white text-sm text-center"
        >
          + Add new Invoice
        </div>

        <div class="flex p-2 bg-gray-100 text-sm mt-5">
          <div class="w-1/6">No</div>
          <div class="w-1/6">Date</div>
          <div class="w-1/6">Product</div>
          <div class="w-1/6">Company</div>
          <div class="w-1/6">Contacts</div>
          <div class="w-1/6">Action</div>
        </div>

        <div
          v-for="invoice in invoices"
          :key="invoice.id"
          class="flex p-2 border-b text-xs text-gray-600 hover:bg-gray-50 cursor-pointer"
        >
          <div class="w-1/6">INV-{{ invoice.id }}</div>
          <div class="w-1/6">{{ formatDate(invoice.created_at) }}</div>
          <div class="w-1/6 truncate">{{ invoice.product }}</div>
          <div class="w-1/6 truncate">{{ invoice.company_name }}</div>
          <div class="w-1/6">{{ invoice.contacts }}</div>
          
          <div class="w-1/6">
            <span
              @click="viewInvoice(invoice.id)"
              class="text-blue-600 cursor-pointer"
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
      invoices: [],
      product: "",
      company: "",
      address: "",
      contacts: "",
      comment: "",
      invoiceItems: [{ item: "", qty: 1, unit_cost: 0 }],
    };
  },

  methods: {
    openModal() {
      this.isOpen = true;
    },

    viewInvoice(id) {
      this.$router.push(`/printInvoice/${id}`);
    },
    closeIsOpen() {
      this.isOpen = false;
    },

    addItem() {
      this.invoiceItems.push({ item: "", qty: 1, unit_cost: 0 });
    },

    removeItem(index) {
      this.invoiceItems.splice(index, 1);
    },

    async postInvoice() {
      const payload = {
        product: this.product,
        company_name: this.company,
        contacts: this.contacts,
        address: this.address,
        comment: this.comment,
        items: this.invoiceItems,
      };

      await AxiosInstance.post("/invoices", payload);

      this.resetForm();
      this.fetchInvoices();
      this.closeIsOpen();
    },

    async fetchInvoices() {
      const res = await AxiosInstance.get("/invoices");
      this.invoices = res.data;
    },

    resetForm() {
      this.product = "";
      this.company = "";
      this.contacts = "";
      this.address = "";
      this.comment = "";
      this.invoiceItems = [{ item: "", qty: 1, unit_cost: 0 }];
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
  },

  mounted() {
    this.fetchInvoices();
  },
};
</script>

<style scoped>
.input {
  border: 1px solid #d1d5db;
  padding: 0.5rem;
  border-radius: 0.375rem;
  width: 90%;
  margin-top: 0.5rem;
}
</style>
