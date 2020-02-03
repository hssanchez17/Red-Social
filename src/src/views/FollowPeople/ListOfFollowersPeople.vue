<template>
  <div class="app">
    <Navbar></Navbar>

    <div class="container">
     <div class="row" id="listOfFollowersPeople">
        <div class="col-md-4"  v-for="user in listOfFollowersPeople">
          
          <div class="card">
            <a :href="'/user/show/'+ user.id">
              <img :src="user.user.profilePicture"  id="profilePicture">
              <div class="card-body">
                <h5 class="card-title"> {{user.user.name}}</h5>
              </div>
            </a>
          </div>
        </div>
      </div> 
  </div>  

  </div>
</template>




<script>
  import axios from 'axios'
  import Navbar from '@/components/Navbar.vue'
  export default {
  components: {
    Navbar
  },

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
          this.listOfFollowersPeople=response.data
          console.log(this.listOfFollowersPeople)
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