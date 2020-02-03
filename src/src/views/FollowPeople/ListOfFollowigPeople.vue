<template>
	<div class="app">
		<Navbar></Navbar>

		<div class="container">
     <div class="row" id="listOfFollowingPeople">
        <div class="col-md-4"  v-for="user in listOfFollowingPeople">
          
          <div class="card">
            <a :href="'/user/show/'+ user.friend.id">
              <img :src="user.friend.profilePicture"  id="profilePicture">
              <div class="card-body">
                <h5 class="card-title"> {{user.friend.name}}</h5>
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
  		listOfFollowingPeople:{}

  	}
  },

  mounted(){
  	this.getFollowingPeople()
  },

  methods:{
  	getFollowingPeople(){
  		this.axios.get(`friend/get/all/following/${this.id}`)
        .then((response) => {
          this.listOfFollowingPeople=response.data
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