<template>
  <div class="flex h-screen w-full bg-slate-100">
    <div class="w-[300px]">
      <sidebar />
    </div>
    <div class="w-full">
      <navbar />

      <!-- add model -->

      <div
        v-if="isOpen"
        class="border border-gray-200 rounded-md absolute w-1/2 shadow-2xl bg-white"
      >
        <form @submit.prevent="postInvoice">
          <div class="flex justify-between bg-gray-100 p-3">
            <div class="text-blue-700 font-bold">Add Invoice</div>
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
                Add Invoice
              </button>
            </div>
          </div>
          <button
            type="button"
            class="text-danger text-xs ml-5"
            @click="addItem"
          >
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

      <!-- end model -->



      <div
        class="w-[99%] px-5 h-screen pt-5 -mt-8 bg-white rounded-md shadow-2xl"
        style="height: 90vh"
      >
        <div
          @click="openModal"
          class="bg-blue-700 w-[200px] cursor-pointer rounded-md p-2 text-white text-sm text-center"
        >
          + &nbsp;Add new Invice
        </div>

        <div class="flex p-2 bg-gray-100 cursor-pointer text-sm mt-5">
          <div class="w-1/4">No</div>
          <div class="w-1/4">Date</div>
          <div class="w-1/4">Product</div>
          <div class="w-1/4">Company Name</div>
          <div class="w-1/4">Contacts</div>
          <div class="w-1/4">Address</div>
          <div class="w-1/4">Action</div>
        </div>
        <div
          v-for="invoice in ivoicesData"
          :key="invoice.id" @click="viewInvoice(invoice.id)"
          class="flex p-2 border-gray-200 border-b hover:border-b-2 cursor-pointer text-gray-500 text-xs"
        >
          <div class="w-1/4">00{{ invoice.id }}</div>
          <div class="w-1/4">{{ invoice.dateTbl }}</div>
          <div class="w-1/4 truncate">{{ invoice.productTbl }}</div>
          <div class="w-1/4 truncate">{{ invoice.companyTbl }}</div>
          <div class="w-1/4 truncate">{{ invoice.contactsTbl }}</div>
          <div class="w-1/4">{{ invoice.addressTbl }}</div>

          <div class="w-1/4 flex justify-between">
            <p class="bg-yellow-100 text-yellow-700 px-2 rounded border">
              Edit
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import sidebar from "../components/sidebar.vue";
import navbar from "../components/navbar.vue";

import {
  MagnifyingGlassIcon,
  ChevronUpIcon,
  ArrowUpOnSquareIcon,
  Squares2X2Icon,
  ChevronDownIcon,
  StarIcon,
  ChartBarIcon,
  InboxIcon,
  ViewfinderCircleIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/vue/24/solid";
import { Switch, Dialog, DialogPanel, DialogTitle } from "@headlessui/vue";

let db = new Localbase("db");
export default {
  name: "homeView",
  components: {
    sidebar,
    navbar,
    PencilIcon,
    MagnifyingGlassIcon,
    ChevronUpIcon,
    Switch,
    TrashIcon,
    ArrowUpOnSquareIcon,
    Squares2X2Icon,
    ChevronDownIcon,
    StarIcon,
    ChartBarIcon,
    InboxIcon,
    ViewfinderCircleIcon,
  },
  data() {
    return {
      ivoicesData: [],
      enabled: true,
      isOpen: false,
      product: "",
      company: null,
      address: null,
      contacts: null,
      amount: null,
      invoiceItems: [
        {
          item: "",
          qty: "",
          unitCost: "",
        },
      ],
    };
  },
  methods: {
    closeIsOpen() {
      this.isOpen = false;
    },
    openModal() {
      this.isOpen = true;
    },
    EditTask(task) {
      this.isOpen = true;
      this.isEdit = true;
      this.title = task.title;
      this.id = task.id;
      this.project1 = task.project1;
      this.project2 = task.project2;
      this.deadLine = task.deadLine;
      this.priority = task.priority;
      this.member = task.member;
    },
    deleteTask(task) {
      let taskId = this.tasks.find((task1) => task1.id === task.id).id;
      db.collection("tasks").doc({ id: taskId }).delete();
      // this.tasks.splice(index, 1)
      window.location.reload();
    },
    postInvoice() {
      let formdata = {
        id: this.ivoicesData?.length + 1,
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
      db.collection("invoicesTable").add(formdata);
      this.getTasks();
      this.product = "";
      this.company = "";
      this.address = "";
      this.contacts = "";
      this.amount = "";
      this.amount = "";
      this.closeIsOpen();
      // window.location.reload();
    },
    updateTask() {
      let taskId = this.tasks.find((task1) => task1.id === this.id).id;
      console.log(taskId);
      db.collection("tasks")
        .doc({ id: taskId })
        .update({
          stage: 1,
          title: this.title,
          project1: this.project1,
          project2: this.project2,
          deadLine: this.deadLine,
          priority: this.priority,
          member: this.member,
          start_date: new Date().toLocaleDateString("en-us", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
        });
      this.stage = "";
      this.title = "";
      this.project1 = "";
      this.project2 = "";
      this.deadLine = "";
      this.priority = "";
      this.member = "";
      this.start_date = "";
      this.getTasks();
    },
    getTasks() {
      db.collection("invoicesTable")
        .get()
        .then((invoicesTable) => {
          this.ivoicesData = invoicesTable;
        });
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
    viewInvoice(id) {
			this.$router.push(`/printInvoice/${id}`);
		},
  },
  created() {
    this.getTasks();
  },
};
</script>
