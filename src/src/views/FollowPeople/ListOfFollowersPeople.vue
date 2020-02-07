<template>
  <div class="app">
    <Navbar></Navbar>
    <ListOfUsers :listOfUsers="listOfFollowersPeople"></ListOfUsers>

  </div>
</template>




<script>
  import Navbar from '@/components/Navbar.vue'
  import ListOfUsers from '@/components/ListOfUsers.vue'
  export default {
  components: {Navbar,ListOfUsers},

  data(){
    return {
      id:this.$route.params.id,
      listOfFollowersPeople:{}

    }
  },

  mounted(){
    this.getFollowersPeople()
  },

  methods:{
    getFollowersPeople(){
      this.axios.get(`friend/get/all/followers/${this.id}`)
        .then((response) => {
          this.listOfFollowersPeople=response.data[0].followers
        })
        .catch((e)=>{
          console.log('error' + e);
        })
    }
 
  }
  }



</script>

<style>
    #profilePicture{
    width: 100%; 
    height: 300px;
},
* {
  box-sizing: border-box;
}
</style>