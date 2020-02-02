<template>
	<div class="app">

		<Navbar></Navbar>	

  <input class="form-control form-control-lg form-control-borderless" type="search" placeholder="Search for a user by name">



        <button v-model="search" class="btn btn-lg btn-success" type="submit" @click="searchUser()">Search</button>

        <div class="container">
    <div class="row">
      <div class="col-md-4"  v-for="user in listOfUsers">
        
        <div class="card" style="width: 18rem;">
            <img src="https://scontent-mia3-2.xx.fbcdn.net/v/t1.0-0/p640x640/28795077_1661868463904242_3743419492907089920_o.jpg?_nc_cat=103&_nc_ohc=OfF0y6tInGIAX_8aSsz&_nc_ht=scontent-mia3-2.xx&_nc_tp=6&oh=40c6e56c3305e546586760f9097666ae&oe=5EC56ED8" class="card-img-top"">
            <div class="card-body">
              <h5 class="card-title"> {{user.name}}</h5>
              <a :href="`/user/show/${user.id}`"class="btn btn-primary">view</a>
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
  		listOfUsers:[],
  		search:'',

  	}
  },

  mounted(){
  	this.getListOfSearchedUsers()
  },

  methods:{
  	getListOfSearchedUsers(){
        this.axios.get(`user/list/${this.name}`)
        .then((response) => {
          this.listOfUsers= response.data;
          console.log(this.listOfUsers)
        })
        .catch((e)=>{
          console.log('error' + e);
        })
      },

  	searchUser(){
  		 this.axios.get(`user/list/${this.name}`,{name:this.search})
        .then((response) => {
          //console.log(response.data)
          this.listOfUsers= response.data;
          //console.log(this.listOfUsers)
        })
        .catch((e)=>{
          console.log('error' + e);
        })
  	},
  }
  }



</script>