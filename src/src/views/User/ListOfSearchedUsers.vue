<template>
	<div class="app">

		<Navbar></Navbar>	
		<input class="form-control form-control-lg form-control-borderless" type="search" placeholder="Search for a user by name" v-model="search">

		<button @click="searchUser()" class="btn btn-primary">Search</button>
		<!--<div class="card">
            <div class="card-header bg-secondary text-white">
              <h3><i class="far fa-images"></i>Publicaciones</h3>
            </div>

            <div class="card-body">
              <div class="row">
                <div class="col-md-4 text-center" v-for="user in listOfUsers">
           			<img src="https://66.media.tumblr.com/avatar_bb6b63dbb74a_128.pnj" id="img" class="img-thumbnail" />
                </div>
              </div>
            </div>
          </div>

	</div>-->

	<!--<div class="col-md-9">
		<div class="card-columns">

			div v-for="user in listOfUsers">

			<div class="card">
				<img src="https://scontent-mia3-2.xx.fbcdn.net/v/t1.0-0/p640x640/28795077_1661868463904242_3743419492907089920_o.jpg?_nc_cat=103&_nc_ohc=OfF0y6tInGIAX_8aSsz&_nc_ht=scontent-mia3-2.xx&_nc_tp=6&oh=40c6e56c3305e546586760f9097666ae&oe=5EC56ED8" id="img" class="card-img-top" style="
				height: 250px; object-fit: cover;margin-top: 40px" />
			<div class="card-body p-2 position-relative">
				<div class="row row justify-content-md-center" v-for="user in listOfUsers">

				<strong class="d-block card-title mb-1">Hermes Sanchez</strong>
			</div>

</div>
			</div>
			</div>

		</div>
		</div>
	</div>-->

	<div class="container">
		<div class="row">
			<div class="col-md-4"  v-for="user in listOfUsers">
				
				<div class="card" style="width: 18rem;">
  					<img src="https://scontent-mia3-2.xx.fbcdn.net/v/t1.0-0/p640x640/28795077_1661868463904242_3743419492907089920_o.jpg?_nc_cat=103&_nc_ohc=OfF0y6tInGIAX_8aSsz&_nc_ht=scontent-mia3-2.xx&_nc_tp=6&oh=40c6e56c3305e546586760f9097666ae&oe=5EC56ED8" class="card-img-top"">
  					<div class="card-body">
    					<h5 class="card-title">{{user.name}}</h5>
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
  		listOfUsers:{},
  		search:'herme',
  	}
  },

  mounted(){
  	this.getListOfSearchedUsers()
  },

  computed:{
  	filteredUsers:function(){
  		return this.listOfUsers.filter((user)=>{
  			console.log(this.search)
  			return user.name.match(this.search);
  		})
  	}
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
  	},

  	filteredUsers(){
  		return this.listOfUsers.filter((user)=>{
  			return user.name.match(this.search);
  		})
  	},

  	searchUser(){
  		console.log('hola')
  	}
  }



</script>