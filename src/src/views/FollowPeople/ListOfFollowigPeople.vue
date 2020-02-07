<template>
	<div class="app">
		<Navbar></Navbar>
    <ListOfUsers :listOfUsers="listOfFollowingPeople"></ListOfUsers>
	</div>
</template>




<script>
  import axios from 'axios'
  import Navbar from '@/components/Navbar.vue'
  import ListOfUsers from '@/components/ListOfUsers.vue'

  export default {
  components: {Navbar,ListOfUsers},

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
          this.listOfFollowingPeople=response.data[0].following
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