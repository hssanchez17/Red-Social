<template>
	<div class="app">

		<Navbar></Navbar>	

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
  		listOfUsers:{},
  		name:this.$route.params.name
  	}
  },

  mounted(){
  	this.getListOfSearchedUsers()
  },


  methods:{
  	getListOfSearchedUsers(){
  		console.log(this.name)
  	}
  }
}


</script>