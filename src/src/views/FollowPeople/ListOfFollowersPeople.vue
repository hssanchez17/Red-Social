<template>
  <div class="app">
    <Navbar></Navbar>

    <div class="container">
    <div class="row">
      <div class="col-md-4"  v-for="user in listOfFollowersPeople">
        
        <div class="card" style="width: 18rem;">
            <img src="https://scontent-mia3-2.xx.fbcdn.net/v/t1.0-0/p640x640/28795077_1661868463904242_3743419492907089920_o.jpg?_nc_cat=103&_nc_ohc=OfF0y6tInGIAX_8aSsz&_nc_ht=scontent-mia3-2.xx&_nc_tp=6&oh=40c6e56c3305e546586760f9097666ae&oe=5EC56ED8" class="card-img-top"">
            <div class="card-body">
              <h5 class="card-title">{{user.user.name}}</h5>
              <a :href="`/user/show/${user.user.id}`"class="btn btn-primary">view</a>
            </div>
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