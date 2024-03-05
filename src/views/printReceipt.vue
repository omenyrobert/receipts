<template>
  <div class="w-full bg-white p-10 h-full" >
    <div  v-for="printt in printData" :key="printt.id">
      <div class="flex justify-between">
      <div>
        <img src="../views/logo.png" class="w-64" />
      </div>
      <div class="flex">
        <p class="text-blue-700 font-medium text-xl">Receipt</p>
        <p class="ml-5 mt-1">00{{ printt.id }}</p>
      </div>
    </div>
   
    <div>
      <p>Ntinda Stage TechBuzz Hub Building</p>
      <p>
        +256 757227257, +256 771038366 whatsapp +256 757227257, jirehdevsoftware.com
      </p>
     
    </div>
    <hr class="bg-blue-400 h-1 w-full my-2" />
    <div class="flex justify-between mt-5">
      <div>
        <p class="text-blue-700 font-medium text-2xl">Paid By</p>
        <p class="text-gray-700"> {{ printt.companyTbl }}</p>
        <p class="text-gray-700">{{ printt.addressTbl }}</p>
        <p class="text-gray-700">{{ printt.contactsTbl }}</p>
      </div>
      <div>
        <p class="text-blue-700 font-medium text-2xl">Product</p>
        <p class="text-xl text-gray-700"> {{ printt.productTbl }}</p>
    
      </div>
      <div class="flex">
        <p class="text-blue-700 font-medium text-xl">Receipt Date</p>
        <p class="ml-5 mt-1">{{ printt.dateTbl }}</p>
      </div>
    </div>
    </div>



    <div  class="mt-5 p-2 flex bg-blue-100 text-blue-700">
      <div class="w-1/4">Item</div>
      <div class="w-1/4">Qty</div>
      <div class="w-1/4">Unit Cost</div>
      <div class="w-1/4">Total</div>
    </div>

    <div class="mt-5 border-b border-gray-200 p-2 flex text-black text-sm" v-for="(receiptItem, index) in  receiptItems" :key="index" >
      <div class="w-1/4">{{ receiptItem.item }}</div>
      <!-- Number(item.unitSell).toLocaleString() -->
      <div class="w-1/4">{{ Number(receiptItem.qty).toLocaleString() }}</div>
      <div class="w-1/4">{{ Number(receiptItem.unitCost).toLocaleString() }}</div>
      <div class="w-1/4">{{ Number(receiptItem.qty * receiptItem.unitCost).toLocaleString() }}</div>
    </div>
    <div class="mt-5 border-b border-gray-200 p-2 flex text-black text-sm">
      <div class="w-1/4"></div>
      <!-- Number(item.unitSell).toLocaleString() -->
      <div class="w-1/4"></div>
      <div class="w-1/4"></div>
      <div class="w-1/4"></div>
    </div>
    <div   class="p-2 flex bg-blue-700 text-white text-xl font-bold">
      <div class="w-1/4">Total</div>
      <div class="w-1/4"></div>
      <div class="w-1/4"></div>
      <div class="w-1/4">{{ Number(total).toLocaleString() }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Printreceipt",
  components: {},
  data() {
    return {
      printData: null,
      receiptItems: null,
      total: null,
    };
  },
  created() {
    this.getReceipt();
  },
  methods: {
    getReceipt() {
      db.collection('receiptsTable').get().then(receiptsTable => {
        this.printData = receiptsTable.filter((printt) => printt.id === parseInt(this.$route.params.id));
        this.printData.forEach((item) => {
          let items = item.itemsTbl;
          this.receiptItems = JSON.parse(items);
          this.total = this.receiptItems.reduce((acc, item) => acc + (item.qty * item.unitCost), 0);
         
        });
        console.log(this.receiptItems)
      //  this.receiptItems = JSON.parse(items);

      });
      
    },
  },
};
</script>
<style scoped></style>
