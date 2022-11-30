<template>
  <div class="flex h-full w-full">
    <div class="w-2/12">
      <sidebar />
    </div>
    <div class="w-10/12">
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
      <div class="flex border-y-2 border-gray-250 py-3 px-5">
        <div class="w-9/12 flex">
          <MagnifyingGlassIcon class="h-4" />
          <p class="text-xs font-thin ml-3">Search for something</p>
        </div>
        <div class="w-3/12 flex justify-between">
          <div class="flex">
            <div style="margin-top: -2px">
              <Switch
                v-model="enabled"
                :class="enabled ? 'bg-green-400' : 'bg-gray-400'"
                class="relative inline-flex h-4 w-10 tasks-center rounded-full"
              >
                <span
                  :class="enabled ? 'translate-x-6' : 'translate-x-1'"
                  class="inline-block h-3 w-3 transform rounded-full bg-white transition"
                />
              </Switch>
            </div>

            <p class="text-xs ml-2">seleect TimeFrame</p>
            <ChevronUpIcon class="h-4 ml-2" />
          </div>
          <div class="flex ml-4">
            <ArrowUpOnSquareIcon class="h-4" />
            <p class="text-xs ml-2">Share</p>
          </div>
        </div>
      </div>



      <div class="flex w-full px-5 overflow-y-auto" style="height: 83vh">
        <div class="p-5 w-4/12" >
          <p class="text-sm font-thin py-3">Todo</p>
          <div v-for="task in tasks" :key="task.id" class="board" id="toDo" @dragover.prevent @drop.prevent="drop">
            <div draggable="true"
  @dragstart="startDrag($event, task)"
:id="task.id" @dragover.stop

              class="bg-white w-full card rounded-lg shadow-md h-40 mt-3 p-5 flex drag-el"
            >
              <div class="w-3/4">
                <div class="flex">
                  <img
                    class="rounded-full w-8 h-8 object-cover"
                    src="https://i.pinimg.com/236x/d3/e6/1e/d3e61e5c9d8fc2eac93605064d0b9b4c.jpg"
                  />
                  <img
                    class="rounded-full w-8 h-8 object-cover -ml-3 border-white border"
                    src="https://i.pinimg.com/236x/b4/af/e8/b4afe84cd0bbb8ac1747e569221161a4.jpg"
                  />
                  <img
                    class="rounded-full w-8 h-8 object-cover -ml-3 border-white border"
                    src="https://i.pinimg.com/236x/d3/e6/1e/d3e61e5c9d8fc2eac93605064d0b9b4c.jpg"
                  />
                </div>
                <p class="text-sm py-2">{{ task.title }}</p>
                <div class="flex">
                  <p
                    class="text-xs text-blue-500 bg-blue-50 p-1 rounded-md m-1"
                  >
                    {{ task.project1 }}
                  </p>
                  <p
                    class="text-xs text-purple-700 m-1 bg-purple-50 p-1 rounded-md"
                  >
                    {{ task.project2 }}
                  </p>
                </div>
                <div class="flex my-2">
                  <p class="text-xs font-thin">{{ task.start_date }}</p>
                  <p class="text-xs font-thin ml-5">{{ task.deadLine }}</p>
                </div>
              </div>

              <div class="w-1/4">
                <div class="w-14 ml-8">
                  
                  <p v-if="task.priority==='1'"
                  class="text-xs float-right   text-red-600 bg-red-50 py-1 px-3 rounded-md font-thin"
                >
                  High
                </p>
                <p v-if="task.priority==='2'"
                  class="text-xs float-right text-blue-500 bg-blue-50 py-1 px-3 rounded-md font-thin"
                >
                  Medium
                </p>
                
                <p v-if="task?.priority === '3'"
                  class="text-xs float-right text-green-600 bg-green-50 py-1 px-3 rounded-md font-thin"
                >
                  Low
                </p>
                <div class="flex w-14 ml-4">
                  <TrashIcon @click="deleteTask(task)"  class="h-4 mt-20 cursor-pointer float-right text-red-600"/>
                  <PencilIcon @click="EditTask(task)"  class="h-4 mt-20 ml-2 cursor-pointer float-right text-yellow-600"/>
                </div>
             
                </div>
             
              </div>
            </div>
          </div>
        </div>
        <div class="p-5 w-4/12">
          <p class="text-sm font-thin py-3">In Process</p>
          <div v-for="task in inProcess" :key="task.id" class="board" @dragover.prevent @drop.prevent="drop(event,task)">
            <div
            draggable="true"
  @dragstart="startDrag($event, task)"

  @dragover.stop
              class="bg-white w-full rounded-lg shadow-md h-40 mt-3 p-5 flex"
            >
              <div class="w-3/4">
                <div class="flex">
                  <img
                    class="rounded-full w-8 h-8 object-cover"
                    src="https://i.pinimg.com/236x/d3/e6/1e/d3e61e5c9d8fc2eac93605064d0b9b4c.jpg"
                  />
                  <img
                    class="rounded-full w-8 h-8 object-cover -ml-3 border-white border"
                    src="https://i.pinimg.com/236x/b4/af/e8/b4afe84cd0bbb8ac1747e569221161a4.jpg"
                  />
                  <img
                    class="rounded-full w-8 h-8 object-cover -ml-3 border-white border"
                    src="https://i.pinimg.com/236x/d3/e6/1e/d3e61e5c9d8fc2eac93605064d0b9b4c.jpg"
                  />
                </div>
                <p class="text-sm py-2">{{ task.title }}</p>
                <div class="flex">
                  <p
                    class="text-xs text-blue-500 bg-blue-50 p-1 rounded-md m-1"
                  >
                    {{ task.project1 }}
                  </p>
                  <p
                    class="text-xs text-purple-700 m-1 bg-purple-50 p-1 rounded-md"
                  >
                    {{ task.project2 }}
                  </p>
                </div>
                <div class="flex my-2">
                  <p class="text-xs font-thin">{{ task.start_date }}</p>
                  <p class="text-xs font-thin ml-5">{{ task.deadLine }}</p>
                </div>
              </div>

              <div class="w-1/4">
                <div class="w-14 ml-8">
                  <p class="text-xs cursor-pointer">Edit</p>
                  <p v-if="task.priority==='1'"
                  class="text-xs float-right   text-red-600 bg-red-50 py-1 px-3 rounded-md font-thin"
                >
                  High
                </p>
                <p v-if="task.priority==='2'"
                  class="text-xs float-right text-blue-500 bg-blue-50 py-1 px-3 rounded-md font-thin"
                >
                  Medium
                </p>
                
                <p v-if="task?.priority === '3'"
                  class="text-xs float-right text-green-600 bg-green-50 py-1 px-3 rounded-md font-thin"
                >
                  Low
                </p>
                
              <TrashIcon @click="deleteTask(task)"  class="h-4 mt-20 float-right text-red-600"/>
                </div>
             
              </div>
            </div>
          </div>
        </div>
        <div class="p-5 w-4/12">
          <p class="text-sm font-thin py-3">Done</p>
          <div v-for="task in inDone" :key="task.id" class="board" @dragover.prevent @drop.prevent="drop(event,task)">
            <div draggable="true"
  @dragstart="startDrag($event, task)"
  @dragover.stop
              class="bg-white w-full rounded-lg shadow-md h-40 mt-3 p-5 flex"
            >
              <div class="w-3/4">
                <div class="flex">
                  <img
                    class="rounded-full w-8 h-8 object-cover"
                    src="https://i.pinimg.com/236x/d3/e6/1e/d3e61e5c9d8fc2eac93605064d0b9b4c.jpg"
                  />
                  <img
                    class="rounded-full w-8 h-8 object-cover -ml-3 border-white border"
                    src="https://i.pinimg.com/236x/b4/af/e8/b4afe84cd0bbb8ac1747e569221161a4.jpg"
                  />
                  <img
                    class="rounded-full w-8 h-8 object-cover -ml-3 border-white border"
                    src="https://i.pinimg.com/236x/d3/e6/1e/d3e61e5c9d8fc2eac93605064d0b9b4c.jpg"
                  />
                </div>
                <p class="text-sm py-2">{{ task.title }}</p>
                <div class="flex">
                  <p
                    class="text-xs text-blue-500 bg-blue-50 p-1 rounded-md m-1"
                  >
                    {{ task.project1 }}
                  </p>
                  <p
                    class="text-xs text-purple-700 m-1 bg-purple-50 p-1 rounded-md"
                  >
                    {{ task.project2 }}
                  </p>
                </div>
                <div class="flex my-2">
                  <p class="text-xs font-thin">{{ task.start_date }}</p>
                  <p class="text-xs font-thin ml-5">{{ task.deadLine }}</p>
                </div>
              </div>

              <div class="w-1/4">
                <div class="w-14 ml-8">
                  <p class="text-xs cursor-pointer">Edit</p>
                  <p v-if="task.priority==='1'"
                  class="text-xs float-right   text-red-600 bg-red-50 py-1 px-3 rounded-md font-thin"
                >
                  High
                </p>
                <p v-if="task.priority==='2'"
                  class="text-xs float-right text-blue-500 bg-blue-50 py-1 px-3 rounded-md font-thin"
                >
                  Medium
                </p>
                
                <p v-if="task?.priority === '3'"
                  class="text-xs float-right text-green-600 bg-green-50 py-1 px-3 rounded-md font-thin"
                >
                  Low
                </p>
                
              <TrashIcon @click="deleteTask(task)"  class="h-4 mt-20 float-right text-red-600"/>
                </div>
             
              </div>
            </div>
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
import {
  Switch,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";


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
      enabled: true,
      isOpen: false,
      stage: "",
      title: "",
      project1: "",
      project2: "",
      deadLine: "",
      priority: "",
      member: "",
      id: "",
      start_date: "",
      inProcess:[],
      inDone:[],
      tasks:[],
      isEdit: false,
    };
  },
  methods: {
    setIsOpen() {
      this.isOpen = false;
    },
    EditTask(task){
  this.isOpen= true;
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
      let taskId = this.tasks.find(task1 => task1.id === task.id).id;
      db.collection('tasks').doc({ id: taskId }).delete();
      // this.tasks.splice(index, 1)
      window.location.reload();
    },
    postTask(){
      
      let newTask = {
        stage : 1,
      id : this.tasks.length + 1,
      title:  this.title,
      project1: this.project1,
      project2: this.project2,
      deadLine: this.deadLine,
      priority: this.priority,
      member: this.member,
   
      start_date: new Date().toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"}),
      }
      db.collection('tasks').add(newTask)
      this.tasks.push(newTask)
      this.stage= "";
      this.title= "";
      this.project1= "";
      this.project2= "";
      this.deadLine= "";
      this.priority = "";
      this.member = "";
      this.start_date = "";
      this.setIsOpen();
      window.location.reload();
      
    },
    updateTask(){
      let taskId = this.tasks.find(task1 => task1.id === this.id).id;
  console.log(taskId);
      db.collection('tasks').doc({ id: taskId }).update({
      stage : 1,
      title:  this.title,
      project1: this.project1,
      project2: this.project2,
      deadLine: this.deadLine,
      priority: this.priority,
      member: this.member,
      start_date: new Date().toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"}),
      });
      this.stage= "";
      this.title= "";
      this.project1= "";
      this.project2= "";
      this.deadLine= "";
      this.priority = "";
      this.member = "";
      this.start_date = "";
   this.getTasks();
      
    },
    getTasks() {
      db.collection('tasks').get().then(tasks => {
        this.tasks = tasks.filter((task) => task.stage === 1);
        this.inProcess = tasks.filter((task) => task.stage === 2);
        this.inDone = tasks.filter((task) => task.stage === 3);
      });
      
    },
    OpenModal() {
      this.isOpen = true;
     
    },
    startDrag(event, task) {
      console.log('dragging');
      // document.getElementById('toDo').style.backgroundColor = "#fff";
      const target = event.target;
      event.dataTransfer.setData('card_id', target.id);
      setTimeout(()=>{
        target.style.display = "none";
        // target.style.marginTop = "200px";
      },0)
      setTimeout(()=>{
        // target.style.display = "none";
        target.style.marginTop = "200px";
      },1000)
    },
    drop(event, task){
      console.log('dropped');
      const card_id = event.dataTransfer.getData('card_id');
      const card = document.getElementById(card_id);
      card.style.display = "block";
      // card.style.backgroundColor = "#f9f9f9"
      event.target.appendChild(card);
    },

  },
  created() {
    this.getTasks()
  }
};
</script>
