<template>
     <div class="w-full flex">
        <div class="p-5 w-8/12 flex mt-3">
          <div class="bg-orange-400 rounded-md pt-1 px-2 h-6 mt-1 text-white">
            <StarIcon class="h-4" />
          </div>
          <h3 class="font-bold text-xl ml-2">Statra Insurance</h3>
          <ChevronDownIcon class="h-4 mt-2 ml-2" />
        </div>
        <div class="p-5 w-4/12 flex">
          <div class="w-1/6 m-1 flex">
            <img
              class="rounded-full w-8 h-8 object-cover"
              src="https://i.pinimg.com/236x/d3/e6/1e/d3e61e5c9d8fc2eac93605064d0b9b4c.jpg"
            />
            <img
              class="rounded-full w-8 h-8 object-cover -ml-3 border-white border"
              src="https://i.pinimg.com/236x/b4/af/e8/b4afe84cd0bbb8ac1747e569221161a4.jpg"
            />
            <div
              class="rounded-full w-8 h-8 -ml-3 bg-black border text-center text-white text-xs pt-2"
            >
              +8
            </div>
          </div>
          <div
            class="w-2/6 border-2 rounded-md m-1 p-2 text-sm text-center border-gray-200 flex justify-between"
          >
            <Squares2X2Icon class="h-4" />
            <p class="-mt-1">App</p>
            <ChevronDownIcon class="h-4" />
          </div>
          <div
            @click="OpenModal"
            class="w-2/6 m-1 bg-black cursor-pointer rounded-md p-2 text-white text-sm text-center"
          >
            + &nbsp;Add new task
          </div>
        </div>
      </div>
      <Dialog :open="isOpen"  class="rounded-md shadow-2xl z-50 w-1/2">
        <DialogPanel>
          <DialogTitle class="font-bold text-lg" v-if="!isEdit">Add Task</DialogTitle>
          <DialogTitle class="font-bold text-lg" v-if="isEdit">Edit Task</DialogTitle>

      <br/><br/>
          <input type="hidden" v-model="stage">
          <div class="flex justify-between">
            <div class="w-1/2 pr-2">
              <label>Task Title</label>
              <input type="text" v-model="title" class="form-control h-10 border-2 w-full p-2 rounded-md" placeholder="Task Title">
            </div>
            <div class="w-1/2 pl-2">
           <label>Attach project1</label>
            <select v-model="project1" class="form-control border-2 w-full p-2 rounded-md" placeholder="Attach Project" >
              <option>Authentication</option>
              <option>MetaDent</option>
              <option>MFI</option>
              <option>Rapid Boda</option>
              <option>Lendry</option>
              <option>TransFund</option>
              </select>
              </div>
          </div>
          <div class="flex justify-between mt-5">
            <div class="w-1/2 pr-2">
              <label>Dead Line</label>
              <input type="date" v-model="deadLine" class="form-control h-10 border-2 w-full p-2 rounded-md" placeholder="Task Title">
            </div>
            <div class="w-1/2 pl-2">
           <label>Attach project2</label>
            <select v-model="project2" class="form-control border-2 w-full p-2 rounded-md" placeholder="Attach Project" >
              <option >Authentication</option>
              <option>MFI</option>
              <option>TransFund</option>
              <option>Rapid Boda</option>
              <option>Lendry</option>
              <option>MetaDent</option>
              </select>
              </div>
          </div>
          <div class="flex justify-between mt-5">
            <div class="w-1/2 pr-2">
              <label>Priority</label>
              <select v-model="priority" class="form-control border-2 w-full p-2 rounded-md" placeholder="Attach Project" >
              <option value="1">High</option>
              <option value="2"> Low</option>
              <option value="3">Medium</option>
              </select>
            </div>
            <div class="w-1/2 pl-2">
           <label>Attach Memmber</label>
            <select v-model="member" class="form-control border-2 w-full p-2 rounded-md" placeholder="Attach Project" >
              <option>Omeny Robert</option>
              <option>Sebagala Andrew</option>
              <option>Semtamu Joel</option>
              </select>
              </div>
          </div>
          
       
        
         
<div class="flex justify-between mt-5">
  <button @click="setIsOpen" class="px-5 py-2 rounded-md border-black border text-sm">Cancel</button>
  <button type="button" v-if="!isEdit" @click="postTask" class="bg-green-200 px-5 py-2 rounded-md">Add task</button>
          <button type="button" v-if="isEdit" @click="updateTask" class="bg-yellow-200 px-5 py-2 rounded-md">Update task</button>
</div>
         
        </DialogPanel>
      </Dialog>
      <div class="flex w-full pl-5 pb-2">
        <p class="text-xs flex">
          <InboxIcon class="h-3" style="margin-top: 2px" /> &nbsp;Backlog
        </p>
        <p class="ml-5 text-xs flex">
          <ViewfinderCircleIcon
            class="h-3"
            style="margin-top: 2px"
          />&nbsp;Priority Chart
        </p>
        <p class="ml-5 text-xs flex">
          <ChartBarIcon class="h-3" style="margin-top: 2px" />&nbsp;Kanban
          Workflow
        </p>
      </div>
  <br/>
</template>
<script>
import { Squares2X2Icon, ChevronDownIcon, StarIcon, ChartBarIcon, InboxIcon, ViewfinderCircleIcon } from '@heroicons/vue/24/solid'
export default {
  name: "navbar",
  components:{
    Squares2X2Icon,
    ChevronDownIcon,
    StarIcon,
    ChartBarIcon,
    InboxIcon,
    ViewfinderCircleIcon
  },
  data(){
    return{

    }
  },
  methods:{
    OpenModal() {
      this.isOpen = true;
     
    },
  }
};
</script>
