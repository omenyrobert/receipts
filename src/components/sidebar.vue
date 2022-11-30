<template>
    <div class="border-r-2 border-gray-200 p-10 h-full w-full">
        <p>Flows</p>
        <br/><br/>
        <div class="py-2 px-5 bg-green-200  text-sm rounded-md">+ &nbsp;&nbsp;Add new task</div>
        <br/>
        <div class="flex mt-3">
         <FolderIcon class="h-3"/><p class="ml-3 text-sm -mt-1">Plan</p>
        </div>
        <div class="flex mt-3">
         <FolderIcon class="h-3"/><p class="ml-3 text-sm -mt-1">Task List</p>
        </div>
       
        <Disclosure>
    <DisclosureButton class="py-2">
        <div class="flex mt-3 justify-between">
         <FolderIcon class="h-3"/><p class="ml-3 text-sm -mt-1">Projects</p>
         <ChevronDownIcon class="h-3 ml-20"/>
        </div>
    </DisclosureButton>
    <DisclosurePanel class="text-gray-500">
        <div class="flex mt-3 ml-5">
         <FolderIcon class="h-3 text-pink-600"/><p class="ml-3 text-sm -mt-1">Plan</p>
        </div>
        <div class="flex mt-3 ml-5">
         <FolderIcon class="h-3 text-green-500"/><p class="ml-3 text-sm -mt-1">Plan</p>
        </div>
        <div class="flex mt-3 ml-5">
         <FolderIcon class="h-3 text-blue-500"/><p class="ml-3 text-sm -mt-1">Plan</p>
        </div>
    </DisclosurePanel>
  </Disclosure>
  <div class="flex mt-3">
         <FolderIcon class="h-3"/><p class="ml-3 text-sm -mt-1">Tags</p>
        </div>
        <br/><br/><br/><br/><br/><br/><br/><br/>
        <div class="flex mt-3">
         <FolderIcon class="h-3"/><p class="ml-3 text-sm -mt-1">Free Plans</p>
         <br/><br/>
        
        </div>
        <p class="text-sm">Projects</p>
         <hr class="bg-green-300 my-1 h-1"/>
         <p class="text-sm">Tasks</p>
       
    </div>
  
</template>
<script>
import {
FolderIcon,ChevronDownIcon
} from "@heroicons/vue/24/solid";
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
  } from '@headlessui/vue'
export default{
    name: 'sidebar',
    components:{
        FolderIcon,
        Disclosure,
    DisclosureButton,
    DisclosurePanel,
    ChevronDownIcon
    }

}
</script>