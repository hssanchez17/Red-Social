<template>
  <div class="app">
    <Navbar></Navbar>

    <div class="row row justify-content-md-center">

        <div class="card">

           <div class="card-header bg-secondary">
              <h3 class="card-title text-white">Seguidores</h3>
          </div> 
    <ListOfUsers :listOfUsers="listOfFollowersPeople"></ListOfUsers>

</div>
</div>


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