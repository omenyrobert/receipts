<template>
  <div class="p-5 h-full w-full">
    <div class="bg-white rounded-md p-3 shadow-2xl">
      <img src="../views/logo.png" class="w-full" />
    </div>
    <!-- edit model -->

    <div
      v-if="isOpen"
      class="border border-gray-200 rounded-md absolute w-1/2 shadow-2xl ml-[15vw] bg-white"
    >
      <form @submit.prevent="postreceipt">
        <div class="flex justify-between bg-gray-100 p-3">
          <div class="text-blue-700 font-bold">Add Receipt</div>
          <div>
            <p @click="closeIsOpen" class="cursor-pointer">X</p>
          </div>
        </div>
        <div class="flex p-3">
          <div class="w-1/2">
            <label>Product</label><br />
            <input
              type="text"
              v-model="product"
              placeholder="Enter Product"
              class="border border-gray-300 w-3/4 rounded-md p-2 mt-2"
              required
            />
            <br /><br />
            <label>Contacts</label><br />
            <input
              type="text"
              v-model="contacts"
              placeholder="Enter contacts"
              class="border border-gray-300 w-3/4 rounded-md p-2 mt-2"
              required
            />
          </div>
          <div class="w-1/2">
            <label>Company Name</label><br />
            <input
              type="text"
              v-model="company"
              placeholder="Enter Name"
              class="border border-gray-300 w-3/4 rounded-md p-2 mt-2"
              required
            />
            <br /><br />
            <label>Address</label><br />
            <input
              type="text"
              v-model="address"
              placeholder="Enter Address"
              class="border border-gray-300 w-3/4 rounded-md p-2 mt-2"
              required
            />
            <br /><br /><br />
            <button
              type="submit"
              class="text-white p-2 bg-blue-700 rounded-md w-3/4"
            >
              Add Receipt
            </button>
          </div>
        </div>
        <button type="button" class="text-danger text-xs ml-5" @click="addItem">
          + Add NOK
        </button>
        <div v-for="(item, index) in invoiceItems" :key="index">
          <div class="flex">
            <div class="p-1">
              <input
                v-model="item.item"
                placeholder="Enter Item"
                class="border border-gray-300 w-full rounded-md p-2 mt-2"
                required
              />
            </div>
            <div class="p-1">
              <input
                v-model="item.qty"
                placeholder="qty"
                type="number"
                class="border border-gray-300 w-full rounded-md p-2 mt-2"
                required
              />
            </div>
            <div class="p-1">
              <input
                v-model="item.unitCost"
                type="number"
                placeholder="Unit cost"
                class="border border-gray-300 w-full rounded-md p-2 mt-2"
                required
              />
            </div>
            <div class="text-sm p-2 rounded-md bg-gray-100 m-2">
              {{ item.qty * item.unitCost }}
            </div>
            <br />
            <div>
              <button
                type="button"
                class="text-red-700 text-xs mt-5"
                @click="removeItem(index)"
                v-show="index != 0"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
        <br />
        <br />
      </form>
    </div>

    <!--edit end model -->
    <br /><br />
    <div
      @click="openModal"
      class="m-1 text-blue-700 cursor-pointer rounded-md p-2 bg-white border border-blue-700 text-sm text-center"
    >
      + &nbsp;Add Receipt
    </div>
    <br />

    <br />
    <RouterLink to="/"
      class="m-1 text-blue-700 cursor-pointer rounded-md p-2 flex text-center"
    >
      <FolderIcon class="w-3 mt-1" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Invoices
    </RouterLink>

    <RouterLink to="/receipts"
      class="m-1 text-blue-700 cursor-pointer rounded-md p-2 flex text-center"
    >
      <FolderIcon class="w-3 mt-1" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Receipt
    </RouterLink>
  </div>
</template>
<script>
import { FolderIcon, ChevronDownIcon } from "@heroicons/vue/24/solid";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
export default {
  name: "sidebar",
  components: {
    FolderIcon,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    ChevronDownIcon,
  },

  methods: {
    openModal() {
      this.isOpen = true;
    },
    closeIsOpen() {
      this.isOpen = false;
    },
    addItem() {
      this.invoiceItems.push({
        item: "",
        qty: "",
        unitCost: "",
      });
    },
    removeItem(index) {
      this.invoiceItems.splice(index, 1);
    },

    getReceipts() {
      db.collection("receiptsTable")
        .get()
        .then((receiptsTable) => {
          this.receiptData = receiptsTable;
        });
    },

    postreceipt() {
      let formdata = {
        id: this.receiptData?.length + 1,
        productTbl: this.product,
        companyTbl: this.company,
        addressTbl: this.address,
        contactsTbl: this.contacts,
        paidTbl: 0,
        balanceTbl: 0,
        itemsTbl: JSON.stringify(this.invoiceItems),
        dateTbl: new Date().toLocaleDateString("en-us", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      };
      console.log("form data", formdata);
      db.collection("receiptsTable").add(formdata);
      this.$router.push('/receipts');
     
      this.getReceipts();
      this.product = "";
      this.company = "";
      this.address = "";
      this.contacts = "";
      this.amount = "";
      this.amount = "";
      this.closeIsOpen();
      
     
    },
  },

created(){
    this.getReceipts();
},

  data() {
    return {
      isOpen: false,
      receiptData: [],
      invoiceItems: [
        {
          item: "",
          qty: "",
          unitCost: "",
        },
      ],
    };
  },
};
</script>
